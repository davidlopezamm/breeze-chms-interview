<?php

namespace App\Imports;

use App\Models\Group;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class GroupImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Group([
               'id' => $row['id'],
               'group_name' => $row['group_name'],
            //
        ]);
    }
}
