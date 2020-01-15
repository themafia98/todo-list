<?php

/**
 * Entity for requst/response managment
 */
namespace core\models\Http;

use core\interfaces\models\Http\HtttpServer as HttpServer;
use Error;

abstract class Http implements HttpServer
{
    private $methods = null;

    public function __construct(array $methodsProps)
    {
        $this -> methods = $methodsProps;   
    }

    public function getMethods()
    {
        return $this -> methods;
    }

}

class Request extends Http 
{
    public function __construct(array $props)
    {
        if (!array_key_exists("methods", $props))
        {
            throw new Error("Http constructor error");
        }

        parent::__construct($props["methods"]);
    }

    static function factory(array $props){
        if (array_key_exists("methods", $props))
        return new Request($props["methods"]);
        else return null;
    }

}

?>