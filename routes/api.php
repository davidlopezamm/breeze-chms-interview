<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('peoplegroup/{id}', 'PeopleController@get_people_group');
Route::get('export', 'DemoController@export')->name('export');
//Route::get('importExportView', 'DemoController@importExportView');
Route::post('import', 'DemoController@import')->name('import');
Route::post('pimport', 'PeopleController@import')->name('import');
Route::post('gimport', 'GroupController@import')->name('import');

Route::resource('people', 'PeopleController');
Route::resource('group', 'GroupController');

