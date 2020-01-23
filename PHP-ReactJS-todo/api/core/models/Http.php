<?php

/**
 * Entity for requst/response managment
 */

namespace core\models\server;

require_once realpath("") . "/core/utils/consts.php";

use core\interfaces\models\{HttpServer};
use Error;
use Exception;
use Ramsey\Uuid\Uuid;

/**
 * Class JsonBody
 * @package core\models\server
 * For tests
 */
class JsonBody
{

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
        $this->bodyRequest = $props;
    }

    protected function getBody()
    {
        return $this->bodyRequest;
    }


    protected function getResponseBody()
    {
        if (is_array($this->responseBody)) {
            return $this->responseBody;
        } else {
            $this->responseBody = array();
            return $this->responseBody;
        }
    }

    protected function setPropResponseBody(string $key, $prop)
    {

        if (is_array($this->responseBody)) {

            $this->responseBody[$key] = $prop;
        } else {

            $this->responseBody = array();
            $this->responseBody[$key] = $prop;
        }
    }

    public function setBody($props)
    {


        $this->setPropResponseBody("response", $props["response"]);
        $this->setPropResponseBody("id", Uuid::uuid4());
        $this->setPropResponseBody("actionPath", $props["actionPath"]);
        $this->setPropResponseBody("actionType", $props["actionType"]);

        if ($this->getResponseBody()) {
            return $this->getResponseBody();
        } else return new JsonBody();
    }
}

class Response extends Http
{
    public function __construct(array $props)
    {

        if (!is_array($props)) {
            throw new Error("Http constructor error");
        }

        parent::__construct($props);
    }

    public function setJsonHeaders()
    {
        header('Cache-Control: no-cache, no-store, max-age=0, must-revalidate');
        header('Pragma: no-cache');
        header('Content-Type: application/json');
    }

    /**
     *GET METHOD
     */
    private  function get($actionPath, $actionType, $actionData)
    {
        /** No support */
        $props["response"] = 'no support';
        echo json_encode(self::factory($props)->getBody(), JSON_INVALID_UTF8_SUBSTITUTE);
    }

    /**
     * POST METHOD
     */
    private function post(string $actionPath, string $actionType, $actionData)
    {

        $type = explode("__", $actionType);

        switch ($type[0]) {
            case "single_record":
            case "all": {
                    $res = array(
                        "response" => $actionData,
                        "actionPath" => $actionPath,
                        "actionType" => $actionType
                    );

                    echo json_encode($this->setBody($res), JSON_OBJECT_AS_ARRAY);
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
        try {
            $bodyAction = $this->getBody()["BODY_ACTION"];
            $method = strtoupper($this->getBody()["METHOD"]);

            $actionType = $bodyAction && array_key_exists("TYPE", $bodyAction) ? $bodyAction["TYPE"] : null;
            $actionPath = $bodyAction && array_key_exists("ACTION", $bodyAction) ? $bodyAction["ACTION"] : null;
            $data = $bodyAction && array_key_exists("DATA", $bodyAction) ? $bodyAction["DATA"] : null;


            $isValid = $actionType && $actionPath;

            if (!is_string($actionPath) || !is_string($actionType) || !is_callable($parseAction)) {

                $props["response"] = array(
                    "parseAction" => $parseAction,
                    "actionPath" => $actionPath,
                    "actionType" => $actionType
                );

                echo json_encode(self::factory($props)->getBody());
                return;
            }


            $actionData = $isValid ? call_user_func($parseAction, $actionPath, $actionType, $data) : null;

            switch ($method) {
                case "DELETE":
                case "PUT":
                case "POST": {
                        return $this->post($actionPath, $actionType, $actionData);
                        break;
                    }
                default: {
                        return $this->get($actionPath, $actionType, $actionData);
                    }
            }
        } catch (Exception $error) {
            var_export($error);
            return;
            $msg = $error->getMessage();
            $props = array();
            $props["response"] = json_decode("{'error': $msg }");
            echo json_encode(self::factory($props)->getBody());
            return;
        }
    }

    static function factory(array $props)
    {
        if (is_array($props))
            return new Response($props);
        else return null;
    }
}
