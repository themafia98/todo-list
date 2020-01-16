<?php

/**
 * Router for application controllers
 */
namespace core\models\Router;
require "Http.php";

use core\interfaces\models\Controller\{Controller};
use core\interfaces\models\Router\Route;
use core\models\Http\Response as Response;



class Router /*implements Route */
{
    private $route = "/";

    public function __construct(string $path)
    {
        $this -> route = $path;
    }

    public function runProcessRequest($method)
    {

        switch ($method){
            case "GET": {
               $res = new Response([$method]);
               $res -> setJsonHeaders();
               return $res -> send();

            }
            case "POST": {
                $res = new Response([$method]);
                $res -> setJsonHeaders();
               return $res -> send();
            }
            case "PUT": {
                $res = new Response([$method]);
                $res -> setJsonHeaders();
                return $res -> send();

            }
            case "DELETE": {
                $res = new Response([$method]);
                $res -> setJsonHeaders();
                return $res -> send();
            }
        }

        $res = new Response([$method]);
        $res -> setJsonHeaders();
        if ($res -> getBody()) {
           echo "empty";
        }
    }


    public function getRoute()
    {

        return $this -> route;
    }
}

?>