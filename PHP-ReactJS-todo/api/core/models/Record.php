<?php

/**
 * Todo record package
 */
namespace core\models\Records;

/**
 * Todo response object
 */
class Record
{

    public $id = null;
    public $recordName = null;
    public $time = null;
    public $additionalNote = null;

    public function __construct(int $id, string $recordName, string $time, string $additionalNote)
    {
        $this -> id = $id;
        $this -> recordName = $recordName;
        $this -> time = $time;
        $this -> additionalNote = $additionalNote;
    }

}

/**
 * Record managment entity
 */
class RecordManagment 
{

    private $record = null;

    public function create(int $id, string $recordName, string $time, string $additionalNote)
    {
        $this -> record = new Record($id, $recordName, $time, $additionalNote);
    }

    public function getRecord()
    {
        return $this -> record;
    }
};

