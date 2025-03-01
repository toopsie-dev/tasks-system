import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import apiService from "../../services/api";
import { TaskData } from "../../types/types";

interface TaskContentType {
    taskList: TaskData[];
    updateContext: () => void;
    fetchTaskList: () => void;
    fetchTaskCompleted: () => void;
}

const TaskContext = createContext<TaskContentType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [taskList, setTaskList] = useState<TaskData[]>([]);

    const fetchTaskList = async () => {
        try {
            const response = await apiService.get<{ data: TaskData[] }>(
                "get-task-list"
            );
            setTaskList(response.data.data);
        } catch (error) {
            console.error("Error fetching task list:", error);
        }
    };

    const fetchTaskCompleted = async () => {
        try {
            const response = await apiService.get<{ data: TaskData[] }>(
                "get-task-completed-list"
            );
            setTaskList(response.data.data);
        } catch (error) {
            console.error("Error fetching completed task list:", error);
        }
    };

    const updateContext = () => {
        fetchTaskList();
    };

    useEffect(() => {
        fetchTaskList();
    }, []);

    return (
        <TaskContext.Provider
            value={{
                taskList,
                updateContext,
                fetchTaskList,
                fetchTaskCompleted,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error("useTaskContext must be used within a TaskProvider");
    }
    return context;
};
