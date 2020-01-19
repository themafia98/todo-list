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
    private $action = "";

    public function __construct(string $action)
    {
        $this -> action = $action;
    }

    protected function getAction()
    {

        return $this -> action;
    }

    public function run($method, $body)
    {
      
            $res = new Response(array('METHOD' => $method, "BODY" => $body ));
            $res -> setJsonHeaders();
            $res -> send();
    }
}

?>