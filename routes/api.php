<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['prefix' => 'v1'], function () {
    Route::get('/characters/{id?}', 'App\Http\Controllers\Api\RickAndMortyController@characters');
    //Route::get('/locations', 'App\Http\Controllers\Api\RickAndMortyController@locations');
    //Route::get('/episodes', 'App\Http\Controllers\Api\RickAndMortyController@episodes');
});
