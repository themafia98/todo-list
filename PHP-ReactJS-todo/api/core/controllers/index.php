<?php

/**
 * Application controllers
 */

namespace core\controllers;

require_once realpath("") . "/core/interfaces/index.php";
require_once realpath("") . "/core/models/Record.php";
require_once realpath("") . "/core/models/RecordList.php";
require_once realpath("") . "/core/models/Http.php";

use Monolog\Logger as Logger;
use Monolog\Handler\StreamHandler as StreamHandler;
use Ramsey\Uuid\Uuid;

use core\models\server\{Response};
use core\models\Records\{RecordManagment};
use core\models\lists\{RecordList};

use core\interfaces\models\{Controller};
use Exception;

class AppController implements Controller
{
    private $method = null;
    private $requestBody = null;
    private $db = null;
    public $log = null;

    /**
     * AppController constructor.
     * @param $dbms
     * @param string $method
     */

    public function __construct($dbms, $method, $body)
    {
        $this->requestBody = $body;
        $this->method = $method;
        $this->db = $dbms;
        $this->log = new Logger('todo-app');
        $this->log->pushHandler(new StreamHandler('controllerError.log', Logger::WARNING));
    }

    /**
     * get db interface
     */
    public function getDb()
    {
        return $this->db;
    }

    /**
     * get method
     * return {string}
     */

    public function getMethod()
    {
        return $this->method;
    }

    public function getRequestBody()
    {
        return $this->requestBody;
    }

    public function getAllRecords($actionType)
    {
        if ($actionType !== "all" && $actionType !== "updateAfterAction") {
            return [];
        }

        $sql = "SELECT * FROM `records`";
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
                    isset($row["additionalNote"])
                ) {

                    $manager->create(
                        $row["num"],
                        $row["id"],
                        $row["recordName"],
                        $row["time"],
                        $row["additionalNote"]
                    );
                    array_push($list, $manager->getRecord());
                }
            }
        }

        return $list;
    }

    public function getSqlQueryUpdateByCol(string $col, $updateField, $id)
    {

        switch ($col) {
            case "additionalNote": {
                    return  "UPDATE records SET additionalNote = '$updateField' WHERE id = '$id'";
                }
            default: {
                    return null;
                }
        }
    }

    public function editAction($data, string $actionType, bool $isSingleField)
    {

        if (is_null($data)) {
            $this->log->error("editAction: !is_null(data)");

            http_response_code(404);
            return array("error" => "bad data");
        }

        if (strpos($actionType, "single_record") !== false) {
            switch ($isSingleField) {
                case true: {
                        $this->getDb()->connection();

                        $field = explode("__", $actionType);

                        $id = isset($data["id"]) ? $data["id"] : null;

                        if (!$id) {
                            $this->log->error("editAction: id invalid");

                            http_response_code(404);
                            return array("error" => "invalid id");
                        }

                        if (!isset($field[1])) {
                            $this->log->error("editAction: !isset(field[1])");
                            return array("error" => "lost field action");
                        }

                        $col = $field[1];
                        $content = $data[$col];


                        $sql = $this->getSqlQueryUpdateByCol($col, $content, $id);

                        if (!$sql) {
                            $this->log->error("editAction: invalid sql query string");
;
                            return array("error" => "invalid sql query string");
                        }

                        $query = $this->getDb()->makeQuery($sql);

                        if (!$query) {
                            $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                            $this->log->error("editAction: $error");

                            http_response_code(500);
                            return array("error" => $error);
                        }

                        return $this->getAllRecords("updateAfterAction");
                    }
                case false: {

                        return $this->getAllRecords("updateAfterAction");
                    }
                default: {
                        return $this->getAllRecords("updateAfterAction");
                    }
            }
        }
    }

    public function deleteAction($data, string $actionType, bool $isSingleField)
    {
        if (strpos($actionType, "single_record") !== false) {
            if (is_null($data)) {
                $this->log->error("deleteAction: bad data");

                http_response_code(404);
                return array("error" => "bad data");
            }

            $this->getDb()->connection();

            $id = isset($data["id"]) ? $data["id"] : null;

            if (!$id) {
                $this->log->error("deleteAction: invalid id");

                http_response_code(404);
                return array("error" => "invalid id");
            }

            $sql = "DELETE FROM records WHERE id = '$id'";

            $query = $this->getDb()->makeQuery($sql);

            if (!$query) {
                $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                $this->log->error("deleteAction: $error");

                http_response_code(500);
                return array("error" => $error);
            }

            return $this->getAllRecords("updateAfterAction");
        }
    }

    public function addAction($data, $actionType, $isSingleField)
    {
        if (strpos($actionType, "single_record") !== false) {
            if (is_null($data)) {
                $this->log->error("addAction: bad data is_null(data)");

                http_response_code(404);
                return array("error" => "bad data");
            }

            $this->getDb()->connection();

            $id = Uuid::uuid4();
            $recordName = isset($data["recordName"]) ? $data["recordName"] : null;
            $time = isset($data["time"]) ? $data["time"] : null;

            if (!$recordName || !$time) {
                $this->log->error("addAction: bad data");

                http_response_code(404);
                return array("error" => "bad data");
            }

            $sql = "INSERT INTO records (id, recordName, time, additionalNote)
                        VALUES ('$id', '$recordName' , '$time', '')";
            $query = $this->getDb()->makeQuery($sql);

            if (!$query) {
                $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                $this->log->error("addAction: $error");

                http_response_code(500);
                return array("error" => $error);
            }

            return $this->getAllRecords("updateAfterAction");
        }
    }

    public function regAction($data, string $actionType)
    {
        if ($actionType === "default") {
            
            $username = isset($data["username"]) ? $data["username"] : null;
            $password = isset($data["password"]) ? $data["password"] : null;
            $name = isset($data["name"]) ? $data["name"] : null;

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

    /**
    * check session
    */
   public function session()
   {
      if (!isset($_SESSION)) session_start();

       if (isset($_SESSION["userId"]) && isset($_COOKIE["sid"])) {
           return true;
       } elseif (isset($_COOKIE["sid"])){
           $sid = $_COOKIE["sid"];
           $parseCookie = explode(".x.", $sid);
           if (isset($parseCookie[1])){

               $sql = "SELECT * FROM users WHERE userId='$parseCookie[0]'";
               $this->getDb()->connection();
               $query = $this->getDb()->makeQuery($sql);

               if (!$query || mysqli_num_rows($query) < 1) {
                   $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                   $this->log->error("regAction: $error");
       
                  return false;
               }
       
               $user = mysqli_fetch_assoc($query);

               $password = isset($user["password"]) ? $user["password"] : null;
               $id = isset($user["userId"]) ? $user["userId"] : null;

               if (!$password || !$id) return false;

               $isEqualId = password_verify($id, $parseCookie[0]);
               $isEqualPassword = $password === $parseCookie[1];

               if (!$isEqualPassword || !$isEqualId) return false;

                $_SESSION["userId"] = $id;
                return true;
           }
       } else return false;
   }

    public function loginAction($data, string $actionType)
    {
        $username = isset($data["username"]) ? $data["username"] : null;
        $password = isset($data["password"]) ? $data["password"] : null;

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
            $this->log->error("regAction: $error");

            http_response_code(404);
            return array("error" => $error);
        }

        $user = mysqli_fetch_assoc($query);

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $isEqual = password_verify($password, $hash); 

        if ($isEqual) {

            $key =  password_hash($user["userId"], PASSWORD_DEFAULT);

            setcookie("sid", $key.".x.".$hash, time() +60*60*24*3, "/", null, null, true);
            $_SESSION["userId"] = $user["userId"];

            $userId = $_SESSION["userId"];

            $this->getDb()->disconnection();

            return array("uid" => $userId);

        } else {
            $this->getDb()->disconnection();
            $this->log->error("loginAction: bad query: $error");
            http_response_code(401);
            return array("error" => $error);
        }
    }

    public function parseAction(string $actionPath, string $actionType, $data = null)
    {
        $field = explode("__", $actionType);
        $isSingleField = isset($field[1]);

        if ($actionPath === "list") {

            if (strpos($actionType, "all") !== false) {
                $this->getDb()->connection();
                return $this->getAllRecords($actionType);
            }
        } elseif ($actionPath === "add") {

            return $this->addAction($data, $actionType, $isSingleField);
        } elseif ($actionPath === "delete") {

            return $this->deleteAction($data, $actionType, $isSingleField);
        } elseif ($actionPath === "edit") {

            return $this->editAction($data, $actionType, $isSingleField);
        } elseif ($actionPath === "reg") {

            return $this->regAction($data, $actionType);
        } elseif ($actionPath === "login") {

            return $this->loginAction($data, $actionType);
        }

        return null;
    }

    public function runRequest()
    {
        try {
            $callback = array($this, 'parseAction');
            $session = array($this, 'session');

            $props = array(
                'METHOD' => $this->getMethod(),
                "BODY_ACTION" => $this->getRequestBody()
            );


            $res = new Response($props);

            $res->setJsonHeaders();
            $res->active($callback, $session);
        } catch (Exception $error) {
            $msg = $error->getMessage();
            $this->log->error("global error handler: $msg");

            http_response_code(503);
            echo $msg;
        }
    }
}
