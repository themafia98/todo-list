<?php

declare(strict_types=1);

namespace core\models\Action;

require_once realpath("") . "/core/models/Record.php";
require_once realpath("") . "/core/models/RecordList.php";

use core\models\Records\{RecordManagment};
use core\models\lists\{RecordList};

use Ramsey\Uuid\Uuid;

/**
 * Request action entity
 */
class Action
{
    private $path = null;
    private $type = null;
    private $actionData = null;
    private $db = null;
    public $log = null;

    public function __construct(string $actionPath, string $actionType, $data, $log, $db)
    {
        $this->path = $actionPath;
        $this->type = $actionType;
        $this->actionData = $data;
        $this->db = $db;
        $this->log = $log;
    }

    public function getDb()
    {
        return $this->db;
    }

    public function getActionPath(): string
    {
        return $this->path;
    }

    public function getActionType(): string
    {
        return $this->type;
    }

    public function getActionData()
    {
        return $this->actionData;
    }

    public function getAllRecords(string $mode, string $uid): array
    {
        if ($mode !== "updateAfterAction" || !$uid) {
            return [];
        }

        $sql = "SELECT * FROM `records` WHERE userId='$uid'";
        $query = $this->getDb()->makeQuery($sql);

        $this->getDb()->disconnection();

        $manager = new RecordManagment();
        $recordList = new RecordList();

        $list = $recordList->createList();

        if ($query && $query->num_rows > 0) {
            // output data of each row
            while ($row = $query->fetch_assoc()) {
                if (
                    isset($row["num"]) &&
                    isset($row["id"]) &&
                    isset($row["recordName"]) &&
                    isset($row["time"]) &&
                    isset($row["additionalNote"]) &&
                    isset($row["position"])
                ) {
                    $manager->create(
                        $row["num"],
                        $row["id"],
                        $row["recordName"],
                        $row["time"],
                        $row["additionalNote"],
                        (int) $row["position"]
                    );
                    array_push($list, $manager->getRecord());
                }
            }
        }

        /**
         * Sort position todo
         */
        usort($list, function (object $a, object $b): int {
            return strcmp((string) $a->position, (string) $b->position);
        });

        return $list;
    }

    public function manyRecordsUpdate(array $items, string $uid): bool
    {

        $isUpdate = true;

        for ($i = 0; $i < count($items); $i++) {
            $id = $items[$i]["id"];
            $position = $items[$i]["position"];

            $sql = "UPDATE records SET position = '$position' 
                    WHERE userId='$uid' AND id='$id'";

            $query = $this->getDb()->makeQuery($sql);

            if (!$query) {
                $isUpdate = false;
                break;
            }
        }

        return $isUpdate;
    }

    public function editAction(bool $isSingleField, callable $cbGetSql)
    {
        if (is_null($this->getActionData())) {
            $this->log->error("editAction: !is_null(data)");

            http_response_code(404);
            return array("error" => "bad data");
        }

        if (strrpos($this->getActionType(), "update_list") !== false) {
            $this->getDb()->connection();

            $items = (array) $this->getActionData()["items"];
            $uid = (string) $this->getActionData()["uid"];

            if (!$items || !is_array($items)) {
                return null;
            }

            $isUpdate = (bool) $this->manyRecordsUpdate($items, $uid);
            
            if (!$isUpdate) return null;

            $list = $this->getAllRecords("updateAfterAction", $uid);

            return $list;
        }

        if (strpos($this->getActionType(), "single_record") !== false) {
            switch ($isSingleField) {
                case true: {
                        $this->getDb()->connection();

                        $field = explode("__", $this->getActionType());

                        $id = isset($this->getActionData()["id"]) ? $this->getActionData()["id"] : null;
                        $uid = isset($this->getActionData()["uid"]) ? $this->getActionData()["uid"] : null;

                        if (!$id || !$uid) {
                            $this->log->error("editAction: id invalid");

                            http_response_code(404);
                            return array("error" => "invalid id");
                        }

                        if (!isset($field[1])) {
                            $this->log->error("editAction: !isset(field[1])");
                            return array("error" => "lost field action");
                        }

                        $col = $field[1];
                        $content = $this->getActionData()[$col];

                        $sql = call_user_func($cbGetSql, $col, $content, $id, $uid);

                        if (!$sql) {
                            $this->log->error("editAction: invalid sql query string");;
                            return array("error" => "invalid sql query string");
                        }

                        $query = $this->getDb()->makeQuery($sql);

                        if (!$query) {
                            $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                            $this->log->error("editAction: $error");

                            http_response_code(500);
                            return array("error" => $error);
                        }

                        return $this->getAllRecords("updateAfterAction", $uid);
                    }
                case false: {

                        return $this->getAllRecords("updateAfterAction", $uid);
                    }
                default: {
                        return $this->getAllRecords("updateAfterAction", $uid);
                    }
            }
        }
    }

    public function deleteAction()
    {
        if (strpos($this->getActionType(), "single_record") !== false) {
            if (is_null($this->getActionData())) {
                $this->log->error("deleteAction: bad data");

                http_response_code(404);
                return array("error" => "bad data");
            }

            $this->getDb()->connection();

            $id = isset($this->getActionData()["id"]) ? $this->getActionData()["id"] : null;
            $uid = isset($this->getActionData()["uid"]) ? $this->getActionData()["uid"] : null;

            if (!$id || !$uid) {
                $this->log->error("deleteAction: invalid id");

                http_response_code(404);
                return array("error" => "invalid id");
            }

            $sql = "DELETE FROM records WHERE id = '$id' AND userId = '$uid'";

            $query = $this->getDb()->makeQuery($sql);

            if (!$query) {
                $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                $this->log->error("deleteAction: $error");

                http_response_code(500);
                return array("error" => $error);
            }

            return $this->getAllRecords("updateAfterAction", $uid);
        }
    }

    public function addAction()
    {
        if (strpos($this->getActionType(), "single_record") !== false) {
            if (is_null($this->getActionData())) {
                $this->log->error("addAction: bad data is_null(data)");

                http_response_code(404);
                return array("error" => "bad data");
            }

            $this->getDb()->connection();

            $id = Uuid::uuid4();
            $uid = isset($this->getActionData()["uid"]) ? $this->getActionData()["uid"] : null;
            $recordName = isset($this->getActionData()["recordName"]) ? $this->getActionData()["recordName"] : null;
            $time = isset($this->getActionData()["time"]) ? $this->getActionData()["time"] : null;
            $position = isset($this->getActionData()["position"]) ? $this->getActionData()["position"] : null;

            if (!$recordName || !$time || !$uid) {
                $this->log->error("addAction: bad data");

                http_response_code(404);
                return array("error" => "bad data");
            }

            $sql = "INSERT INTO records (id, recordName, time, additionalNote, userId, position)
                        VALUES ('$id', '$recordName' , '$time', '', '$uid', '$position')";
            $query = $this->getDb()->makeQuery($sql);

            if (!$query) {
                $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                $this->log->error("addAction: $error");

                http_response_code(500);
                return array("error" => $error);
            }

            return $this->getAllRecords("updateAfterAction", $uid);
        }
    }

    public function loginAction()
    {
        if (!$this->getActionType()) {
            $this->log->error("Bad action type: loginAction");
            http_response_code(503);
            return;
        }

        $username = isset($this->getActionData()["username"]) ? $this->getActionData()["username"] : null;
        $password = isset($this->getActionData()["password"]) ? $this->getActionData()["password"] : null;

        if (!$username || !$password) {
            $this->log->error("loginAction: bad data");

            http_response_code(404);
            return array("error" => "bad data");
        }

        $this->getDb()->connection();

        $sql = "SELECT * FROM users WHERE username='$username'";
        $query = $this->getDb()->makeQuery($sql);

        if (!$query || mysqli_num_rows($query) < 1) {
            $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
            $this->log->error("loginAction: $error");

            http_response_code(404);
            return array("error" => $error);
        }

        $user = mysqli_fetch_assoc($query);
        $userPassword = isset($user["password"]) ? $user["password"] : null;
        $name = isset($user["name"]) ? $user["name"] : null;

        if (!$userPassword) {
            $error = "Password not exist in db";
            $this->log->error("loginAction: $error");

            http_response_code(404);
            return array("error" => $error);
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $isEqual = password_verify($password, $userPassword);

        if ($isEqual) {
            $key =  $user["userId"];

            setcookie("sid", $key . "|x|" . $userPassword, time() + 60 * 60 * 24 * 1, "/", null, null, true);
            $_SESSION["userId"] = $user["userId"];

            $userId = $_SESSION["userId"];

            $this->getDb()->disconnection();

            return array(
                "uid" => $userId,
                "name" => $name,
            );
        } else {
            $this->getDb()->disconnection();
            $this->log->error("loginAction: invalid user: $error");
            http_response_code(404);
            return array("error" => $error);
        }
    }

    public function logoutAction()
    {
        session_unset();
        session_destroy();
        setcookie("sid", null, null, "/", null, null, true);
    }

    public function regAction()
    {
        if ($this->getActionType() === "default") {
            $username = isset($this->getActionData()["username"]) ? $this->getActionData()["username"] : null;
            $password = isset($this->getActionData()["password"]) ? $this->getActionData()["password"] : null;
            $name = isset($this->getActionData()["name"]) ? $this->getActionData()["name"] : null;

            if (!$username || !$password || !$name) {
                $this->log->error("regAction: bad data");

                http_response_code(404);
                return array("error" => "bad data");
            }

            $userId = Uuid::uuid4();
            $hash = password_hash($password, PASSWORD_DEFAULT);

            if (!$hash) {
                $this->log->error("regAction: bad data");

                http_response_code(404);
                return array("error" => "bad data");
            }

            $this->getDb()->connection();

            $sql = "INSERT INTO users (name, password, userId, username)
                    VALUES ('$name', '$hash' , '$userId', '$username')";

            $query = $this->getDb()->makeQuery($sql);

            if (!$query) {
                $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                $this->log->error("regAction: $error");

                http_response_code(403);
                return array("error" => $error);
            }

            $this->getDb()->disconnection();

            return array(
                "status" => "done",
                "userId" => $userId,
            );
        }
    }


    public function parse(callable $cbGetSql)
    {
        $field = explode("__", $this->getActionType());
        $isSingleField = isset($field[1]) || false;

        switch ($this->getActionPath()) {
            case "list": {
                    if (strpos($this->getActionType(), "all") !== false) {
                        $this->getDb()->connection();
                        $uid = isset($this->getActionData()["uid"]) ? $this->getActionData()["uid"] : null;
                        if (!$uid) {
                            return null;
                        }

                        return $this->getAllRecords("updateAfterAction", $uid);
                    }
                    break;
                }

            case "add": {
                    return $this->addAction($isSingleField);
                    break;
                }
            case "delete": {
                    return $this->deleteAction($isSingleField);
                    break;
                }

            case "edit": {
        
                    $editResult = $this->editAction($isSingleField, $cbGetSql);
                    return $editResult;
                    break;
                }

            case "login": {
                    return $this->loginAction();
                    break;
                }

            case "logout": {
                    return $this->logoutAction();
                    break;
                }

            case "reg": {
                    return $this->regAction();
                    break;
                }
        }
        return null;
    }
};
