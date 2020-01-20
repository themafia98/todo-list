<?php

/**
 * Database config
 */
namespace config\db;
require 'vendor/autoload.php';
use Dotenv\Dotenv;

$env = Dotenv::createImmutable(realpath(""));
$env -> load();


$dbserver = getenv("DB_SERVER");
$dbport = getenv("DB_PORT");
$dbname = getenv("DB_NAME");
$dbpassword = getenv("DB_PASSWORD");
$dbuser = getenv("DB_USER");