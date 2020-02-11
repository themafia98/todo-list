<?php

namespace core\models\lists;

use core\interfaces\models\TodoList;

/**
 * Todo list entity
 */
class RecordList implements TodoList
{

    private $array = array();

    public function fill(array $records, array $list): void
    {
        foreach ($records as $key => $value) {
            $this->$list[$key] = $value;
        }
    }

    public function getList(): array
    {
        return $this->array;
    }

    public function createList(): array
    {
        return $this->array;
    }
};
