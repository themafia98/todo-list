<?php

use Monolog\Logger as Logger;
use Monolog\Handler\StreamHandler as StreamHandler;

// create a log channel
$log = new Logger('todo-app');
$log->pushHandler(new StreamHandler('error.log', Logger::WARNING));

// // add records to the log
// $log->warning('d') ->error_log("sas");
// $log->error('Bar');