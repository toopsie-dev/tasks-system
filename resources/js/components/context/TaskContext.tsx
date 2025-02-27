import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import apiService from "../../services/api";

interface TaskData {
    id: number;
    title: string;
    description: string;
    completed: 0 | 1;
    created_at: string;
    updated_at: string;
}

interface TaskContentType {
    taskList: TaskData[];
    updateContext: () => void;
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

    const updateContext = () => {
        fetchTaskList();
    };

    useEffect(() => {
        fetchTaskList();
    }, []);

    return (
        <TaskContext.Provider value={{ taskList, updateContext }}>
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
