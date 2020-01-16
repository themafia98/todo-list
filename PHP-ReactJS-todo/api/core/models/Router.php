<?php

/**
 * Router for application controllers
 */
namespace core\models\Router;
use core\interfaces\models\Controller\{Controller};
use core\interfaces\models\Router\Route;

class Router /*implements Route */
{
    private $route = "/";

    public function __construct(string $path)
    {
        $this -> route = $path;
    }

    public function runProcessRequest(Controller $getMethod)
    {
        $method = $getMethod();

        switch ($method){
            case "GET": {
               $res = null;
            }
            case "POST": {
                $res = null;
            }
            case "PUT": {
                $res = null;
            }
            case "DELETE": {
                $res = null;
            }
        }

        header($res['status_code_header']);
        if ($res['body']) {
            echo $res['body'];
        }
    }


    public function getRoute()
    {

        return $this -> route;
    }
}

?>