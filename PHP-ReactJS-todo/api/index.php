<?php

/**
 * Entrypoint API
 * Author: Pavel Petrovich
 * Github: https://github.com/themafia98/todo-list
 */

namespace core\root;

require "../api/bootstrap.php";
require realpath("") . "/core/models/Database.php";
// require  "./utils/headers.php";
require "./core/controllers/index.php";
require "./core/utils/index.php";
require "./config/db.php";

require_once "./core/utils/logger.php";

use Exception;
use config\app\http;
use core\controllers\{AppController};

/**
 * Database class init
 */

use core\models\Database\{Database};

try {
    
    $uri = parse_url(isset($_SERVER["REQUEST_URI"]) ? $_SERVER["REQUEST_URI"] : "\\", PHP_URL_PATH);
    $uri = explode("/", $uri);
    
    if (!$uri || isset($uri[2]) && !$uri[2] === "api") {
        header("HTTP/1.1 404 Not Found");
        exit();
    }

    $requestMethod = isset($_SERVER["REQUEST_METHOD"]) ? $_SERVER["REQUEST_METHOD"] : "";
    $body = $requestMethod !== "GET" ? json_decode(file_get_contents('php://input'), JSON_OBJECT_AS_ARRAY) : null;


    $db = new Database($dbserver, $dbuser, $dbpassword, $dbname, $dbport);

    $controller = new AppController($db, $requestMethod, $body);
    $controller->runRequest();
} catch (Exception $err) {
    $log->warning($err -> getMessage());
}
