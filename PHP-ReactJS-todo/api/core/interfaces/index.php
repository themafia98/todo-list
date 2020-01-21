<?php

namespace core\interfaces\models;

/**
 * Application inerfaces
 */

/**
 * Interface for class Database
 */
interface Dbms
{
    public function __construct(
        string $dbserver,
        string $dbuser,
        string $dbpassword,
        string $dbname,
        string $dbport
    );
    public function getConnect();
    public function getDbDataByKey(string $key);
    public function setConnect($cnt);
    public function connection();
    public function disconnection();
    public function makeQuery($query);
}

/**
 * Interface for class Record
 */
interface TodoRecord
{
};

/**
 * Interface for class RecordList
 */

interface TodoList
{
};


/**
 * Some http interfaces
 */

interface HttpServer
{

    public function __construct(array $props);
    public function setBody($props);
};

/**
 * Controller interface
 */

interface Controller
{

    public function __construct($dbms, $method, $body);
    public function getDb();
    public function getMethod();
    public function getRequestBody();
    public function parseAction(string $actionPath, string $actionType);
    public function runRequest();
}
