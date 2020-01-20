<?php

/**
 * Application controllers
 */
namespace core\controllers;

require realpath("")."/core/models/Router.php";
require realpath("")."/core/models/Record.php";
require realpath("")."/core/models/RecordList.php";

use core\models\Router\{Router};
use core\interfaces\models\Dbms\{Dbms};
use core\models\Records\{RecordManagment};
use core\models\lists\{RecordList};
use core\interfaces\models\Controller as Controller;
use Exception;

class AppController
{

    /**
     * Router api
     */
    private $route = null;
    private $method = null;
    private $requestBody = null;
    private $db = null;

    /**
     * AppController constructor.
     * @param Dbms $dbms
     * @param string $method
     */

    public function __construct($dbms, $method, $body)
    {
        $this -> route = new Router($body["ACTION"]);
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

    public function getRoute()
    {
        return $this -> route;
    }

    public function parseAction(string $actionPath, string $actionType)
    {
        
        $manager = new RecordManagment();
        $recordList = new RecordList();

        $list = $recordList -> createList();
     
        for ($i = 0; $i <= 20; $i++)
        {
            $manager -> create($i,"Random", "10.10.2019", "Test note");
            array_push($list , $manager -> getRecord());
        }

        return $list;
    }

    public function runRequest()
    {

        try 
        {
            $callback = array($this, 'parseAction');

            $this -> getRoute() -> run(
                $this -> getMethod(),
                $this -> getRequestBody(),
                $callback
            );

        } catch(Exception $error)
        {
            echo $error -> getMessage();
        }
    }
}

