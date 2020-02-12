<?php

declare(strict_types=1);

/**
 * Managmnet database entity
 */

namespace core\models\Database;

use core\interfaces\models\{Dbms};
use Error;
use Exception;
use mysqli;

class Database
{

    private $connect = null;
    private $dbData = array();

    public function __construct(
        string $dbserver,
        string $dbuser,
        string $dbpassword,
        string $dbname,
        string $dbport
    ) {
        $this->dbData["server"] = $dbserver;
        $this->dbData["user"] = $dbuser;
        $this->dbData["passwd"] = $dbpassword;
        $this->dbData["db"] = $dbname;
        $this->dbData["port"] = $dbport;
    }

    public function getConnect()
    {
        return $this->connect;
    }

    public function getDbDataByKey(string $key)
    {
        return $this->dbData[$key];
    }

    public function setConnect($cnt): void
    {
        $this->connect = $cnt;
    }

    public function connection()
    {

        $connect = mysqli_connect(
            $this->getDbDataByKey("server"),
            $this->getDbDataByKey("user"),
            $this->getDbDataByKey("passwd"),
            $this->getDbDataByKey("db"),
           (int) $this->getDbDataByKey("port")
        ) or die(mysqli_error($connect));

        $this->connect = $connect;

        return $this->connect;
    }

    public function disconnection(): bool
    {
        if (!is_null($this->getConnect())) {
            mysqli_close($this->getConnect());
        }
        return true;
    }

    public function makeQuery($query)
    {
        try {
            if (null === $this->getConnect()) throw new Error("Bad connect to bd");
            $resultQuery = $this->getConnect()->query($query);
            return $resultQuery;
        } catch (Exception $error) {
            var_dump($error);
        }
    }
}
