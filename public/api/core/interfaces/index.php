<?php

declare(strict_types=1);

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
    public function __construct(
        string $num,
        string $id,
        string $recordName,
        string $time,
        string $additionalNote,
        int $position
    );
};

/**
 * inerface for calss RecordManagment
 */
interface ManagerRecord
{
    public function create(
        string $num,
        string $id,
        string $recordName,
        string $time,
        string $additionalNote,
        int $position
    ): void;
    public function getRecord();
}
/**
 * Interface for class RecordList
 */

interface TodoList
{
    public function fill(array $records, array $list): void;
    public function getList(): array;
    public function createList(): array;
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
    public function session();
    public function getSqlQueryUpdateByCol(string $col, $updateField, $id, $uid);
    public function getActionData($path, $type, $data);
    public function runRequest();
}
