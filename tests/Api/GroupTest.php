<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Group;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GroupTest extends TestCase
{
     use WithFaker;

    public function testGroupCreated()
    {
        $expected = [
            'group_name' => 'Sally'
        ];
        $response = $this->json('POST', '/api/group', $expected);
        $response
            ->assertStatus(201)
            ->assertJsonFragment($expected);

    }

    public function testGroupRetrieved()
    {
        $group = factory('App\Models\Group')->create();

        $response = $this->json('GET', '/api/group/' . $group->id);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                  'data' => [
                    'group_name',
                    'created_at',
                    'updated_at'
                ]
            ]);
    }

    public function testAllGroupRetrieved()
    {
        $group = factory('App\Models\Group')->create();

        $response = $this->get('/api/group');
           $response
            ->assertStatus(200);
    }

    public function testNoGroupRetrieved()
    {
        $group = factory('App\Models\Group')->create();
        Group::destroy($group->id);

        $response = $this->json('GET', '/api/group/' . $group->id);
        $response->assertStatus(404);
    }

    public function testGroupUpdated()
    {
        $group = factory('App\Models\Group')->create();

        $updatedGroupName = $this->faker->jobTitle();
        $response = $this->json('PUT', '/api/group/' . $group->id, [
            'group_name' =>  $updatedGroupName
        ]);
        $response->assertStatus(204);

         $updatedName = Group::find($group->id);
        $this->assertEquals( $updatedGroupName,  $updatedName->group_name);
    }

    public function testGroupDeleted()
    {
        $group = factory('App\Models\Group')->create();

        $deleteResponse = $this->json('DELETE', '/api/group/' . $group->id);
        $deleteResponse->assertStatus(204);

        $response = $this->json('GET', '/api/group/' . $group->id);
        $response->assertStatus(404);

    }
}
