import { AxiosError } from "axios";
import React, { ChangeEvent, useState } from "react";
import { useTaskContext } from "../../components/context/TaskContext";
import apiService from "../../services/api";

const TaskForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { updateContext } = useTaskContext();

    const handleSubmit = async () => {
        try {
            const { data } = await apiService.post<{ message: string }>(
                "save-task",
                {
                    title,
                    description,
                }
            );

            setTitle("");
            setDescription("");
            alert(data.message);
            updateContext();
        } catch (error) {
            console.error("API Error:", error);

            const errMessage =
                error instanceof AxiosError && error.response
                    ? error.response.data.error || "Something went wrong!"
                    : "Unable to connect to the server.";
            alert(`Error: ${errMessage}`);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <input
                value={title}
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                }
            />
            <textarea
                value={description}
                className="textarea textarea-bordered min-h-52"
                placeholder="Description"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                    setDescription(e.target.value)
                }
            ></textarea>
            <button className="btn btn-secondary" onClick={handleSubmit}>
                Save Task
            </button>
        </div>
    );
};

export default TaskForm;
