<?php

/**
 * Application controllers
 */
namespace core\controllers;

require realpath("")."/core/interfaces/index.php";
require realpath("")."/core/models/Record.php";
require realpath("")."/core/models/RecordList.php";
require realpath("")."/core/models/Http.php";

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
        $this -> requestBody = $body;
        $this -> method = $method;
        $this -> db = $dbms;
    }

    /**
     * get db interface
     */
    public function getDb()
    {
        return $this -> db;
    }

    /**
     * get method
     * return {string}
     */

    public function getMethod()
    {
        return $this -> method;
    }

    public function getRequestBody()
    {

        return $this -> requestBody;
    }

    public function parseAction(string $actionPath, string $actionType)
    {
        if ($actionPath === "list" && $actionType === "all") 
        {
            $manager = new RecordManagment();
            $recordList = new RecordList();

            $list = $recordList -> createList();
     
            for ($i = 0; $i <= 20; $i++) {
                $manager -> create($i, "Random", "10.10.2019", "Test note");
                array_push($list, $manager -> getRecord());
            }

            return $list;
        }
    }

    public function runRequest()
    {

        try 
        {

            $callback = array($this, 'parseAction');

            $props = array(
                'METHOD' => $this -> getMethod(), 
                "BODY_ACTION" => $this -> getRequestBody()
            );
            
     
           $res = new Response($props);
 
            $res -> setJsonHeaders();
            $res -> active($callback);

        } catch(Exception $error)
        {
            echo $error -> getMessage();
        }
    }
}

