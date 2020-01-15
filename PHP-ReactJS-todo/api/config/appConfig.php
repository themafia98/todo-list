<?php

/**
 * App config file
 */
namespace config\app\env;

use Dotenv\Dotenv;

require  "../vendor/autoload.php";

$dotenv = Dotenv::createImmutable("../".__DIR__, "process.env");
$dotenv -> load();

namespace config\app\db;

$dbserver = "localhost";
$dbport = "9000";
$dbname = "todolistdb";

?>