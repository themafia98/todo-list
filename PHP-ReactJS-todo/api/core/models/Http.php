<?php

/**
 * Entity for requst/response managment
 */
namespace core\models\Http;

use core\interfaces\models\Http\HtttpServer as HttpServer;
use Error;

abstract class Http implements HttpServer
{
    private $methods;

    public function __construct(array $methodsProps)
    {
        $this -> methods = $methodsProps;
    }

    public function getMethods()
    {
        return $this -> methods;
    }

}

class Response extends Http
{
    public function __construct(array $props)
    {
        if (!array_key_exists("methods", $props))
        {
            throw new Error("Http constructor error");
        }

        parent::__construct($props["methods"]);
    }

   public function getJsonHeaders()
    {
        header( 'Cache-Control: no-cache, no-store, max-age=0, must-revalidate' );
        header( 'Pragma: no-cache');
        header('Content-Type: application/json');
    }

    static function factory(array $props){
        if (array_key_exists("methods", $props))
        return new Req($props["methods"]);
        else return null;
    }
}

?>