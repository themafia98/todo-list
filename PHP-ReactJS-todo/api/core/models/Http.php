<?php

/**
 * Entity for requst/response managment
 */
namespace core\models\Http;

use core\interfaces\models\Http\HtttpServer as HtttpServer;

abstract class Http implements HtttpServer 
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
        parent::__construct($props["methods"]);
    }

    static function factory(array $props){
        return new Request($props["methods"]);
    }

}

?>