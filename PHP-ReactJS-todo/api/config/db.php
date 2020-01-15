<?php

/**
 * Database config
 */
namespace config\db;

use Dotenv\Dotenv;

require "../vendor/autoload.php";

$env = Dotenv::createImmutable("../".__DIR__, "process.env");


$dbserver = getenv("DB_SERVER");
$dbport = getenv("DB_PORT");
$dbname = getenv("DB_NAME");
$dbpassword = getenv("DB_PASSWORD");
$dbuser = getenv("DB_USER");


?>