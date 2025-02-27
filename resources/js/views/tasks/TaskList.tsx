import { AxiosError } from "axios";
import React from "react";
import { useTaskContext } from "../../components/context/TaskContext";
import apiService from "../../services/api";
import { TaskData } from "../../types/types";
import { truncateText } from "../../utils/string";

const TaskList = () => {
    const { taskList, updateContext } = useTaskContext();

    const errMessage = (error: unknown) => {
        console.error("API Error:", error);
        const errMessage =
            error instanceof AxiosError && error.response
                ? error.response.data.error || "Something went wrong!"
                : "Unable to connect to the server.";
        alert(`Error: ${errMessage}`);
    };

    const markAsDone = async (id: number) => {
        try {
            const response = await apiService.put<{ message: string }>(
                "mark-as-done/" + id
            );
            alert(response.data.message);
            updateContext();
        } catch (error) {
            errMessage(error);
        }
    };

    const removeTask = async (id: number) => {
        const isConfirmed = window.confirm(
            "Are you sure you want to permanent delete this task?"
        );

        if (!isConfirmed) return;

        try {
            const response = await apiService.delete<{ message: string }>(
                "remove-task/" + id
            );
            alert(response.data.message);
            updateContext();
        } catch (error) {
            errMessage(error);
        }
    };

    const renderList = (task: TaskData) => {
        const { title, id, description, completed } = task;
        return (
            <div
                className="flex flex-col bg-slate-800 rounded-lg mx-5"
                key={id}
            >
                <div className="flex items-center justify-between px-8 py-3 w-full -5">
                    <div className="task-info">
                        <h3 className="text-lg">{title}</h3>
                        <p className="text-gray-400 text-sm">
                            {truncateText(description)}
                        </p>
                    </div>
                    <div className="crud-buttons flex gap-2 justify-between">
                        <ul className="menu menu-horizontal rounded-box flex items-center">
                            {completed ? (
                                <div className="badge badge-secondary">
                                    completed
                                </div>
                            ) : (
                                <li>
                                    <div
                                        className="tooltip tooltip-bottom"
                                        data-tip="Mark as completed"
                                    >
                                        <svg
                                            width={25}
                                            height={25}
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => markAsDone(id)}
                                        >
                                            <path d="m9 11 3 3L22 4" />
                                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                        </svg>
                                    </div>
                                </li>
                            )}

                            <li>
                                <div
                                    className="tooltip tooltip-bottom"
                                    data-tip="Delete"
                                >
                                    <svg
                                        width={25}
                                        height={25}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        onClick={() => removeTask(id)}
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                    </svg>
                                </div>
                            </li>
                        </ul>
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
                    <p className="text-gray-400 px-8">No tasks available.</p>
                )}
            </div>
        </div>
    );
};

export default TaskList;
