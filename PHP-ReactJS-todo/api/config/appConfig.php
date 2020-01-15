<?php

/**
 * App config file
 */
namespace config\app\env;

use Dotenv\Dotenv;

require  "../vendor/autoload.php";

$dotenv = Dotenv::createImmutable("../".__DIR__, "process.env");
$dotenv -> load();

namespace config\app\http;

$rest = "/api";

?>