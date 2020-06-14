<?php

namespace App\Imports;

use App\Models\Person;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;



class PersonImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row)
    {

        return new Person([
            'id'               => $row['id'],
            'first_name'       => $row['first_name'],
            'last_name'        => $row['last_name'],
            'email_address'    => $row['email_address'],
            'status'           => $row['status'],
        ]);
    }
}
