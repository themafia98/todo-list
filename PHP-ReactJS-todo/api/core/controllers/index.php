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

    /**
     * AppController constructor.
     * @param Dbms $dbms
     * @param string $method
     */

    public function __construct($dbms, $method, $api)
    {

        $this -> route = new Router($api);
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
}

?>
