<?php

/**
 * Entrypoint API
 * Author: Pavel Petrovich
 * Github: https://github.com/themafia98/todo-list
 */

namespace core\root;

require_once "./bootstrap.php";
require_once realpath("") . "/core/models/Database.php";
// require_once  "./utils/headers.php"; /** includes this if you want use default headers */
require_once "./core/controllers/index.php";
require_once "./core/utils/index.php";
require_once "./config/db.php";

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
    error_log($err->getMessage(), 1, "gaara33377@gmail.com");
}
