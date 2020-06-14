<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\PersonImport;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

use App\Http\Resources\PeopleCollection;
use App\Http\Resources\PersonResource;
use App\Models\Person;




class PeopleController extends Controller
{
    public function import() 
    {
        Excel::import(new PersonImport, request()->file('file'));
       // Excel::import(new PersonImport, 'testP.csv');

        return response()->json(null, 204);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new PeopleCollection( $person = DB::table('groups')
            ->rightJoin('people', 'groups.id', '=', 'people.group_id')
            ->select('people.*','groups.group_name')
            ->get());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name'    => 'required|max:255',
            'last_name'     => 'required|max:255',
            'email_address' => 'required|email',
            'group_id' => 'max:20',
            'status'        => Rule::in(['active', 'archived'])
        ]);

        $person = Person::create($request->all());

        return (new PersonResource($person))
            ->response()
            ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {

        $person = DB::table('people')
            ->leftJoin('groups', 'groups.id', '=', 'people.group_id')
            ->select('people.*','groups.group_name')
            ->where('people.id', '=', $id)
            ->get();

            return ($person);
           // return new PersonResource(Person::findOrFail($id));
      
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);
        $person->update($request->all());

        return response()->json(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->delete();

        return response()->json(null, 204);
    }

     public function get_people_group($id_group) {

      $person = DB::table('people')
            ->select('people.*')
            ->where('people.group_id', '=', $id_group)
            ->where('people.status', '=', 'active' )
            ->get();

            return new PeopleCollection($person);
}

}
