<?php

/**
 * Managmnet database entity
 */
namespace core\models\Database;

use core\interfaces\models\{Dbms};
use Error;
use Exception;
use mysqli;

//$link = mysqli_connect($dbserver, $dbuser, $dbpassword, $dbname, $dbport);

    // connect example 
// if (mysqli_connect_errno()) {
//     printf("Подключение невозможно: %s\n", mysqli_connect_error());
//     exit();
// }

// $sql = "SELECT * FROM `tableTest`";
// $result = $link -> query($sql);

// if ($result->num_rows > 0) {
//     // output data of each row
//     while($row = $result->fetch_assoc()) {
//        var_export($row);
//     }
// } else {
//     echo "0 results";
// }

// mysqli_close($link);

class Database 
{

    private $connect = null;
    private $dbData = array();

    public function __construct(string $dbserver, string $dbuser, 
                                string $dbpassword, string $dbname, 
                                string $dbport)
    {
        $this -> dbData["server"] = $dbserver;
        $this -> dbData["user"] = $dbuser;
        $this -> dbData["passwd"] = $dbpassword;
        $this -> dbData["db"] = $dbname;
        $this -> dbData["port"] = $dbport;
    }

    public function getConnect()
    {
        return $this -> connect;
    }

    public function getDbDataByKey(string $key)
    {
        return $this -> dbData[$key];
    }

    public function setConnect($cnt)
    {
        $this -> connect = $cnt;
    }
    
    public function connection()
    {
        if (!is_array($this -> getConnect())) 
        {
            $connect = mysqli_connect(
                $this -> getDbDataByKey("server"),
                $this -> getDbDataByKey("user"),
                $this -> getDbDataByKey("passwd"),
                $this -> getDbDataByKey("db"),
                $this -> getDbDataByKey("port") 
            ) or die(mysqli_error($connect));

            if (mysqli_connect_errno()) 
            {
                printf("Подключение невозможно: %s\n", mysqli_connect_error());
                exit();
            }

            $this -> setConnect($connect);

            return $this -> $connect;
        } else return $this -> getConnect();
    }

    public function disconnection()
    {
       if (!is_null($this -> getConnect())) 
       {
           mysqli_close($this -> getConnect());
       }
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
