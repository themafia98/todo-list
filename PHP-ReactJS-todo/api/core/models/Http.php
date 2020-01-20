<?php

/**
 * Entity for requst/response managment
 */
namespace core\models\Http;

require realpath("")."/core/interfaces/index.php";
require realpath("")."/core/utils/consts.php";

use core\interfaces\models\Http\HtttpServer as HttpServer;
use Error;
use Ramsey\Uuid\Uuid;

/**
 * Class JsonBody
 * @package core\models\Http
 * For tests
 */
class JsonBody  {

    public $response = null;
    public $actionPath = null;
    public $actionType = null;
    public $id = null;

};

abstract class Http implements HttpServer
{
    private $bodyRequest;
    private $responseBody = array();

    public function __construct(array $props)
    {
        $this -> body = $props;
    }

    protected function getBody()
    {
        return $this -> body;
    }


    protected function getResponseBody()
    {
        if (is_array($this -> $responseBody))
        {
            return $this -> $responseBody;
        }
        else 
        {
           $this -> $responseBody = array();
            return $this -> $responseBody;
        }
    }

    protected function setPropResponseBody(string $key, $prop)
    {

        if (is_array($this -> $responseBody))
        {

            $this -> $responseBody[$key] = $prop;

        } else 
        {

            $this -> $responseBody = array();
            $this ->$responseBody[$key] = $prop;

        }
    }

    public function setBody($props)
    {


        $this -> setPropResponseBody("response", $props["response"]);
        $this -> setPropResponseBody("id", Uuid::uuid4());
        $this -> setPropResponseBody("actionPath", $props["actionPath"]);
        $this -> setPropResponseBody("actionType", $props["actionType"]);

        if ($this -> getResponseBody()){
           return $this -> getResponseBody();
        } else return new JsonBody();
    }
}

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
    private  function get($actionPath)
    {
        /** No support */
    }

    /**
     * POST METHOD
     */
    private function post($actionPath, $actionType)
    {
        switch ($actionType)
        {
            case "all": {
                $response = [1,2,3];
                $res = array(
                    "response" => $response, 
                    "actionPath" => $actionPath, 
                    "actionType" => $actionType
                );

                echo json_encode($this -> setBody($res), JSON_OBJECT_AS_ARRAY);
                break;
            }
        }

    }

    public function send()
    {

            $body = $this -> getBody()["BODY"];
    
            $method = strtoupper($this -> getBody()["METHOD"]);
            $actionType = $body["TYPE"] ? $body["TYPE"] : null;
            $actionPath = $body["ACTION"] ? $body["ACTION"] : null;
         
            switch ($method){
                case "DELETE":
                case "PUT":
                case "POST": {
                    return $this -> post($actionPath, $actionType);
                    break;
                }
                default: {
                    return $this -> get($actionPath, $actionType);
                }
            }
    }

    static function factory(array $props)
    {
        if (is_array($props))
        return new Response($props);
        else return null;
    }
}
