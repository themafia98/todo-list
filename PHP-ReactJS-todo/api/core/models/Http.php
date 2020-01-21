<?php

/**
 * Entity for requst/response managment
 */
namespace core\models\server;

require realpath("")."/core/utils/consts.php";

use core\interfaces\models\{HttpServer};
use Error;
use Ramsey\Uuid\Uuid;

/**
 * Class JsonBody
 * @package core\models\server
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
    private $bodyRequest = array();
    private $responseBody = array();

    public function __construct(array $props)
    {
        $this -> bodyRequest = $props;
    }

    protected function getBody()
    {
        return $this -> bodyRequest;
    }


    protected function getResponseBody()
    {
        if (is_array($this -> responseBody))
        {
            return $this -> responseBody;
        }
        else 
        {
           $this -> responseBody = array();
            return $this -> responseBody;
        }
    }

    protected function setPropResponseBody(string $key, $prop)
    {

        if (is_array($this -> responseBody))
        {

            $this -> responseBody[$key] = $prop;

        } else 
        {

            $this -> responseBody = array();
            $this -> responseBody[$key] = $prop;

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
    private  function get(string $actionPath, string $actionType, $actionData)
    {
        /** No support */
    }

    /**
     * POST METHOD
     */
    private function post(string $actionPath,string $actionType, $actionData)
    {

        switch ($actionType)
        {
            case "all": {
                $res = array(
                    "response" => $actionData, 
                    "actionPath" => $actionPath, 
                    "actionType" => $actionType
                );

                echo json_encode($this -> setBody($res), JSON_OBJECT_AS_ARRAY);
                break;
            }

            default: {
                echo json_encode(new JsonBody(), JSON_OBJECT_AS_ARRAY);
                break;
            }
        }

    }

    public function active(callable $parseAction)
    {

        return;
            $bodyAction = $this -> getBody()["BODY_ACTION"];
            $method = strtoupper($this -> getBody()["METHOD"]);

            $actionType = $bodyAction["TYPE"] ? $bodyAction["TYPE"] : null;
            $actionPath = $bodyAction["ACTION"] ? $bodyAction["ACTION"] : null;

            $actionData = call_user_func($parseAction, $actionPath, $actionType);


            switch ($method){
                case "DELETE":
                case "PUT":
                case "POST": {
                    return $this -> post($actionPath, $actionType, $actionData);
                    break;
                }
                default: {
                    return $this -> get($actionPath, $actionType, $actionData);
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
