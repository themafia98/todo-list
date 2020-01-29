<?php

/**
 * Application controllers
 */

namespace core\controllers;

require_once realpath("") . "/core/interfaces/index.php";
require_once realpath("") . "/core/models/Http.php";
require_once realpath("") . "/core/models/Action.php";

use Monolog\Logger as Logger;
use Monolog\Handler\StreamHandler as StreamHandler;

use core\models\server\{Response};

use core\interfaces\models\{Controller};
use core\models\Action\{Action};
use Exception;

class AppController implements Controller
{
    private $method = null;
    private $requestBody = null;
    private $db = null;
    public $log = null;

    /**
     * AppController constructor.
     * @param $dbms
     * @param string $method
     */

    public function __construct($dbms, $method, $body)
    {
        $this->requestBody = $body;
        $this->method = $method;
        $this->db = $dbms;
        $this->log = new Logger('todo-app');
        $this->log->pushHandler(new StreamHandler('controllerError.log', Logger::WARNING));
    }

    /**
     * get db interface
     */
    public function getDb()
    {
        return $this->db;
    }

    /**
     * get method
     * return {string}
     */

    public function getMethod()
    {
        return $this->method;
    }

    public function getRequestBody()
    {
        return $this->requestBody;
    }

    public function getSqlQueryUpdateByCol(string $col, $updateField, $id, $uid)
    {

        switch ($col) {
            case "additionalNote": {
                    return  "UPDATE records SET additionalNote = '$updateField' WHERE id = '$id' AND userId='$uid'";
                }
            default: {
                    return null;
                }
        }
    }

    /**
     * check session
     */
    public function session()
    {
        //if (!isset($_SESSION)) session_start();

        if (isset($_SESSION["userId"]) && isset($_COOKIE["sid"])) {
            return true;
        } elseif (isset($_COOKIE["sid"])) {
            $sid = $_COOKIE["sid"];
            $parseCookie = explode("|x|", $sid);
            if (isset($parseCookie[1])) {
                $pass = password_get_info($parseCookie[0]);
                $sql = "SELECT * FROM users WHERE userId='$parseCookie[0]'";
                $this->getDb()->connection();
                $query = $this->getDb()->makeQuery($sql);

                if (!$query || mysqli_num_rows($query) < 1) {
                    $error = "Error: " .$sql." || ". $this->getDb()->getConnect()->error;
                    $this->log->error("regAction: $error");

                    return false;
                }

                $user = mysqli_fetch_assoc($query);

                $password = isset($user["password"]) ? $user["password"] : null;
                $id = isset($user["userId"]) ? $user["userId"] : null;
                $name = isset($user["name"]) ? $user["name"] : null;

                if (!$password || !$id) return false;

                $isEqualId = $id === $parseCookie[0];
                $isEqualPassword = $password === $parseCookie[1];

                if (!$isEqualPassword || !$isEqualId) return false;

                $_SESSION["userId"] = $id;
                $_SESSION["name"] = $name;

                return true;
            }
        } else return false;
    }

    public function getActionData($path, $type, $data)
    {
        $action = new Action($path, $type, $data, $this->log, $this->getDb());
        $cb = array($this, "getSqlQueryUpdateByCol");

        return $action->parse($cb);
    }

    public function runRequest()
    {
        try {
            
            $callback = array($this, 'getActionData');
            $session = array($this, 'session');

            $props = array(
                'METHOD' => $this->getMethod(),
                "BODY_ACTION" => $this->getRequestBody()
            );


            $res = new Response($props);

            $res->setJsonHeaders();
            $res->active($callback, $session);
        } catch (Exception $error) {
            $msg = $error->getMessage();
            $this->log->error("global error handler: $msg");

            http_response_code(503);
            echo $msg;
        }
    }
}
