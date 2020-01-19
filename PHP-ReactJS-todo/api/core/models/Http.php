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
    private $body;

    public function __construct(array $props)
    {
        $this -> body = $props;
    }

    protected function getBody()
    {
        return $this -> body;
    }

    protected function createResponseBody()
    {
        if ($this -> getBody() && $this -> getBody()["BODY"]){
         
            $this -> body["BODY"]["bodyResponse"] = [];
            var_dump($this -> body["BODY"]);
        }
    }

    protected function getResponseBody()
    {
        if (is_array($this -> getBody()["BODY"]) && 
            array_key_exists("bodyResponse", $this -> getBody()["BODY"]))
        {
            return $this -> getBody()["BODY"]['bodyResponse'];
        }
        else {
           $this -> createResponseBody();
            return $this -> getBody()["BODY"]['bodyResponse'];
        }
    }

    protected function setPropResponseBody(string $key, $prop)
    {

        if (is_array($this -> getBody()["BODY"]) && 
            array_key_exists("bodyResponse", $this -> getBody()["BODY"]))
        {
            $this -> body["BODY"]["bodyResponse"][$key] = $prop;
        } else {
            $this -> body["BODY"]["bodyResponse"] = [];
            $this -> body["BODY"]["bodyResponse"][$key] = $prop;
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

    public function send(){

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
            // echo json_encode( new JsonBody(), JSON_OBJECT_AS_ARRAY);
    }

    static function factory(array $props){
        if (is_array($props))
        return new Response($props);
        else return null;
    }
}
