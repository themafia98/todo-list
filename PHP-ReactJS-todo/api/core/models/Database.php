<?php

/**
 * Managmnet database entity
 */
namespace core\models\Database;
use core\interfaces\models\Dbms\Dbms as Dbms;
use Error;
use Exception;
use mysqli;
class Database /*implements Dbms */
{

    private $connect = null;

    public function getConnect()
    {
        return $this -> connect;
    }

    public function setConnect(mysqli $cnt)
    {
        $this -> connect = $cnt;
    }
    
    public function connection(string $host, string $user, string $password, string $db)
    {
        $connect = mysqli_connect($host, $user, $password, $db) or die(mysqli_error($connect));
        $this -> setConnect($connect);
    }

    public function disconnection()
    {
        mysqli_close($this -> getConnect());
        return true;
    }

    public function makeQuery($query)
    {
        try {
            if (null === $this -> getConnect()) throw new Error ("Bad connect to bd"); 
                $resultQuery = mysqli_query($this -> getConnect(), $query) or 
                    die("Error:". mysqli_error($this -> getConnect()));
            return $resultQuery;       
            
        } catch (Exception $error){
            print_r($error);
        }
    }
}
