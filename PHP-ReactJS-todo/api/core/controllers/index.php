<?php

/**
 * Application controllers
 */
namespace core\controllers;
require "models/Router.php";

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

    /**
     *GET METHOD
     */
    public  function get($path, $callback)
    {
      if ($path) return $callback();
    }

    /**
    * POST METHOD
    */
    public function POST($path, $callback)
    {
        if ($path) return $callback;
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
