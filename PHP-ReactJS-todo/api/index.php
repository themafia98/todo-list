<?php

/**
 * Entrypoint API
 * Author: Pavel Petrovich
 * Github: https://github.com/themafia98/todo-list
 */
namespace core\root;


$page = isset($_GET['page']) ? $_GET['page'] : "";

echo "<a href = '?page=about'>about</a><br/>";
echo "<a href = '?page=document'>document</a></br>";
echo "<a href = '?'>main</a> <br/>";

switch ($page){
    case "about": {
        echo " page about";
        break;
    }

    case "document": {
        echo "page document";
        break;
    }

    default: {
        echo "hi";
    }
}

?>