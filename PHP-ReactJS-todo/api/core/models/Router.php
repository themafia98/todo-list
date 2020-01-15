<?php

/**
 * Router for application controllers
 */
namespace core\models\Router;

use core\interfaces\models\Router\Route as Route;

class Router implements Route
{

    private $rest = "/";

    public function __construct($path)
    {
        $this -> rest = $path;
    }

    public function getRest()
    {
        return $this -> rest;
    }
}

?>