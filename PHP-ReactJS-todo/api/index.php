<?php
/**
 * Entrypoint API
 * Author: Pavel Petrovich
 * Github: https://github.com/themafia98/todo-list
 */

namespace core\root;
require "../api/bootstrap.php";
require "./core/models/Database.php";
//require  "./utils/headers.php";
require "./core/controllers/index.php";
require "./core/utils/index.php";

use config\app\http;
use core\controllers\AppController;

/**
 * Database class init
 */

use core\models\Database\Database as Database;

$uri = parse_url(isset($_SERVER["REQUEST_URI"]) ? $_SERVER["REQUEST_URI"] : "\\", PHP_URL_PATH);
$uri = explode("/", $uri);
var_dump(queryToArray($_SERVER["REQUEST_URI"]));
if (!$uri || !$uri[2] === "api"){
    header("HTTP/1.1 404 Not Found");
    exit();
}



$requestMethod = isset($_SERVER["REQUEST_METHOD"]) ? $_SERVER["REQUEST_METHOD"] : "";
$controller = new AppController(new Database(), $requestMethod, "/rest");
$controller -> runRequest();
?>