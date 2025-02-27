<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TaskApiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/save-task', [TaskApiController::class, 'saveTask']);
Route::get('/get-task-list', [TaskApiController::class, 'getAllTasks']);
Route::put('/mark-as-done/{id}', [TaskApiController::class, 'markAsDone']);
Route::delete('/remove-task/{id}', [TaskApiController::class, 'removeTask']);


