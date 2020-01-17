<?php

/**
 * Application controllers
 */
namespace core\controllers;

require realpath("")."/core/models/Router.php";

use core\models\Router\{Router};
use core\interfaces\models\Dbms\{Dbms};
use core\interfaces\models\Controller as Controller;

class AppController
{

    /**
     * Router api
     */
    private $route = null;
    private $method = null;
    private $db = null;

    /**
     * AppController constructor.
     * @param Dbms $dbms
     * @param string $method
     */

    public function __construct($dbms, $method, $api)
    {

        $this -> route = new Router($api);
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

    public function getRoute()
    {
        return $this -> route;
    }

    public function runRequest()
    {
        $this -> getRoute() -> runProcessRequest($this -> getMethod());
    }
}

?>
