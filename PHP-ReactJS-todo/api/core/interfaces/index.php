<?php

/**
 * Application inerfaces
 */
namespace core\interfaces\models\Dbms;

/**
 * Interface for class Database
 */
interface Dbms 
{

}

/**
 * Interface for class Record
 */
namespace core\interfaces\models\TodoRecord;

interface TodoRecord 
{

};

/**
 * Interface for class RecordList
 */
namespace core\interfaces\models\TodoList;

interface TodoList
{

};

/**
 * Interface for class Router
 */
namespace core\interfaces\models\Router;

interface Route 
{
    public function getRest();

};

/**
 * Some http interfaces
 */
namespace core\interfaces\models\Http;

interface HtttpServer {

};

?>