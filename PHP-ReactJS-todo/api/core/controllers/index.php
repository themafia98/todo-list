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

    public function parseAction(string $actionPath, string $actionType, $data = null)
    {
        if ($actionPath === "list") {
            if ($actionType === "all") {
                $manager = new RecordManagment();
                $recordList = new RecordList();

                $list = $recordList->createList();

                $this->getDb()->connection();

                $sql = "SELECT * FROM `records`";
                $query = $this->getDb()->makeQuery($sql);

                $this->getDb()->disconnection();

                if ($query && $query->num_rows > 0) {
                    // output data of each row
                    while ($row = $query->fetch_assoc()) {
                        $manager->create(
                        $row["id"],
                        $row["recordName"],
                        $row["time"],
                        $row["additionalNote"]
                    );

                        array_push($list, $manager->getRecord());
                    }
                }

                return $list;
            }
        }

        if ($actionPath === "add"){
            if ($actionType === "single_record"){
                if (is_null($data)) return;

                $this->getDb()->connection();

                $id = Uuid::uuid4();
                $recordName = $data["recordName"];
                $time = $data["time"];

                $sql = "INSERT INTO records (id, recordName, time, additionalNote)
                            VALUES ('$id', '$recordName' , '$time', '')";
                $query = $this->getDb()->makeQuery($sql);

                if (!$query){
                    $error = "Error: " . $sql . "<br>" . $this->getDb()->getConnect()->error;
                    return "{'status': 'error', 'error': $error}";
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
                        $manager->create(
                        $row["id"],
                        $row["recordName"],
                        $row["time"],
                        $row["additionalNote"]
                    );

                        array_push($list, $manager->getRecord());
                    }
                }

                return $list;
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
            echo $error->getMessage();
        }
    }
}
