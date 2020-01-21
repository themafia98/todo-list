<?php

namespace core\models\lists;

/**
 * Todo list entity
 */
class RecordList
{

    public function fill(array $records, array $list)
    {
        foreach ($records as $key => $value) {
            $this->$list[$key] = $value;
        }
    }

    public function createList(): array
    {
        return array();
    }
};
