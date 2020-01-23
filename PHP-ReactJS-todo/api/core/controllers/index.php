<?php

/**
 * Application controllers
 */

namespace core\controllers;

require realpath("") . "/core/interfaces/index.php";
require realpath("") . "/core/models/Record.php";
require realpath("") . "/core/models/RecordList.php";
require realpath("") . "/core/models/Http.php";

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
        if ($actionType !== "all" && $actionType !== "updateAfterAction"){
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
                
                if (isset($row["num"]) &&
                    isset($row["id"]) &&
                    isset($row["recordName"]) &&
                    isset($row["time"]) &&
                    isset($row["additionalNote"])){

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

    public function parseAction(string $actionPath, string $actionType, $data = null)
    {
        if ($actionPath === "list") {
            if ($actionType === "all") {
                $this->getDb()->connection();
                return $this->getAllRecords($actionType);
            }
        }

        if ($actionPath === "add") {
            if ($actionType === "single_record") {
                if (is_null($data)) {
                    http_response_code(404);
                    return 'bad data';
                }

                $this->getDb()->connection();

                $id = Uuid::uuid4();
                $recordName = isset($data["recordName"]) ? $data["recordName"] : null;
                $time = isset($data["time"]) ? $data["time"] : null;

                if (!$recordName || !$time){
                    http_response_code(404);
                    return 'bad data';
                }

                $sql = "INSERT INTO records (id, recordName, time, additionalNote)
                            VALUES ('$id', '$recordName' , '$time', '')";
                $query = $this->getDb()->makeQuery($sql);

                if (!$query) {
                    http_response_code(500);
                    $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                    return "{'status': 'error', 'error': $error}";
                }

                return $this->getAllRecords("updateAfterAction");
            }
        }

        if ($actionPath === "delete") {
            if ($actionType === "single_record") {
                if (is_null($data)) {
                    http_response_code(404);
                    return 'bad data';
                }

                $this->getDb()->connection();

                $id = isset($data["id"]) ? $data["id"] : null;

                if (!$id){
                    http_response_code(404);
                    return "invalid id";
                }

                $sql = "DELETE FROM records WHERE id = '$id'";

                $query = $this->getDb()->makeQuery($sql);

                if (!$query) {
                    http_response_code(500);
                    $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                    return "{'status': 'error', 'error': $error}";
                }

                return $this->getAllRecords("updateAfterAction");
            }
        }
    }

    public function runRequest()
    {
        try {
            $callback = array($this, 'parseAction');

            $props = array(
                'METHOD' => $this->getMethod(),
                "BODY_ACTION" => $this->getRequestBody()
            );


            $res = new Response($props);

            $res->setJsonHeaders();
            $res->active($callback);
        } catch (Exception $error) {
            http_response_code(503);
            echo $error->getMessage();
        }
    }
}
