<?php

/**
 * Entity for requst/response managment
 */
namespace core\models\Http;
include "interfaces/index.php";
use core\interfaces\models\Http\HtttpServer as HttpServer;
use Error;

abstract class Http implements HttpServer
{
    private $body;

    public function __construct(array $props)
    {
        $this -> body = $props;
    }

    public function getBody()
    {
        return $this -> body;
    }

}

class JsonTest  {

    public $res = [];

    public function __construct()
    {
        $this -> res = [1,2,3];
    }
};

class Response extends Http
{
    public function __construct(array $props)
    {
        if (!is_array($props))
        {
            throw new Error("Http constructor error");
        }

        parent::__construct($props);
    }

   public function setJsonHeaders()
    {
        header( 'Cache-Control: no-cache, no-store, max-age=0, must-revalidate' );
        header( 'Pragma: no-cache');
        header('Content-Type: application/json');
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
    public function post($path, $callback)
    {
        if ($path) return $callback;
    }

    public function send(){
        echo json_encode( new JsonTest(), JSON_FORCE_OBJECT );
    }

    static function factory(array $props){
        if (is_array($props))
        return new Response($props);
        else return null;
    }
}

?>