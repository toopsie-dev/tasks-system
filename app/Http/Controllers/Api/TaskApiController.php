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

    public function markAsDone($taskId) {
        $isUpdated = $this->taskModel->markAsDone($taskId);
        
        if($isUpdated) {
            return response()->json(['message' => 'Task is done!'], 200);
        }

        return response()->json(['error' => 'Failed to update task!'], 422);
    }

    public function removeTask($taskId) {
        $isDeleted = $this->taskModel->removeTask($taskId);

        if($isDeleted) {
            return response()->json(['message' => 'Task is deleted!'], 200);
        }

        return response()->json(['error' => 'Failed to delete task!'], 422);
    }

    public function getTaskCompleted() {
        return response()->json(['data' => $this->taskModel->getTaskCompleted(), 200]);
    }
}
