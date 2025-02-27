import React from "react";
import { useTaskContext } from "../../components/context/TaskContext";

const TaskList = () => {
    const { taskList } = useTaskContext();

    const renderList = (task) => {
        const { title, id, description } = task;
        return (
            <div
                className="flex flex-col bg-slate-800 rounded-lg mx-5"
                key={id}
            >
                <div className="flex items-center justify-between px-8 py-3 w-full -5">
                    <div className="task-info">
                        <h3 className="text-lg">{title}</h3>
                        <p className="text-gray-400 text-sm">{description}</p>
                    </div>
                    <div className="crud-buttons flex gap-5 justify-between">
                        <button className="btn btn-active btn-primary">
                            Complete
                        </button>
                        <button className="btn btn-active btn-secondary">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card bg-slate-600/50 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-gray-100 text-3xl">Your Task</h2>
                <p className="font-display">Make your day more productive.</p>
            </div>

            <div className="flex flex-col gap-2 max-h-[28rem] overflow-y-auto mb-10">
                {taskList.length > 0 ? (
                    taskList.map(renderList)
                ) : (
                    <p className="text-gray-400">No tasks available.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
