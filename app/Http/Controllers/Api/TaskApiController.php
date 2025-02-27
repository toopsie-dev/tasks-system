<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Task;

class TaskApiController extends Controller
{
    protected $taskModel;

    function __construct() {
        $this->taskModel = new Task();
    }

    public function saveTask(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        if($validator->fails()) {
            return response()->json(['error' => 'Please check form fields.'], 422);
        }

        $this->taskModel->createTask([
            'title' => $request->title,
            'description' => $request->description
        ]);

        return response()->json(['message' => 'Task Added!'], 200);
    }

    public function getAllTasks() {
        return response()->json(['data' => $this->taskModel->getTaskList()], 200);
    }
}
