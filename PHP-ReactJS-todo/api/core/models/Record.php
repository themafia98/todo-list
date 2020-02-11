<?php

/**
 * Todo record package
 */

namespace core\models\Records;

use core\interfaces\models\TodoRecord;
use core\interfaces\models\ManagerRecord;

/**
 * Todo response object
 */
class Record implements TodoRecord
{

    public $id = null;
    public $recordName = null;
    public $time = null;
    public $additionalNote = null;
    public $position = null;

    public function __construct(
        string $num,
        string $id,
        string $recordName,
        string $time,
        string $additionalNote,
        int $position
    ) {
        $this->num = $num;
        $this->id = $id;
        $this->recordName = $recordName;
        $this->time = $time;
        $this->additionalNote = $additionalNote;
        $this->position = $position;
    }
}

/**
 * Record managment entity
 */
class RecordManagment implements ManagerRecord
{

    private $record = null;

    public function create(
        string $num,
        string $id,
        string $recordName,
        string $time,
        string $additionalNote,
        int $position
    ): void {
        $this->record = new Record($num, $id, $recordName, $time, $additionalNote, $position);
    }

    public function getRecord()
    {
        return $this->record;
    }
};
