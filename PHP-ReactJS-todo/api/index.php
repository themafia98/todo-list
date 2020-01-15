<?php

/**
 * Entrypoint API
 * Author: Pavel Petrovich
 * Github: https://github.com/themafia98/todo-list
 */
namespace core\root;


$page = isset($_GET['page']);

echo "<a href = '?page=about'>about</a><br/>";
echo "<a href = '?page=document'>document</a></br>";
echo "<a href = '?'>main</a> <br/>";

switch ($page){
    case "about": {
        echo " page about";
    }

    case "todo": {
        echo "page todo";
    }

    default: {
        echo "hi";
    }
}

?>