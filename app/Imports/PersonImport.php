<?php

namespace App\Imports;

use App\Models\Person;
use App\Models\Group;
use App\Http\Resources\GroupResource;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Arr;



class PersonImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row)
    {


        if(Arr::exists($row, 'group_id')){
             return new Person([
            'id'               => $row['id'],
            'first_name'       => $row['first_name'],
            'last_name'        => $row['last_name'],
            'email_address'    => $row['email_address'],
            'group_id'         => $row['group_id'],
            'status'           => $row['status'],
        ]);
         } else{
             return new Person([
            'id'               => $row['id'],
            'first_name'       => $row['first_name'],
            'last_name'        => $row['last_name'],
            'email_address'    => $row['email_address'],
            'status'           => $row['status'],
        ]);
         }

       
    }

}
