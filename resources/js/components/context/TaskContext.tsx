import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, ReactNode, useContext } from "react";
import apiService from "../../services/api";
import { TaskData } from "../../types/types";

interface TaskContentType {
    taskList: TaskData[];
    isLoading: boolean;
    isError: boolean;
    updateContext: () => void;
    fetchTaskList: () => void;
    fetchTaskCompleted: () => void;
}

const TaskContext = createContext<TaskContentType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const queryClient = useQueryClient();

    const {
        data: taskList = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const response = await apiService.get<{ data: TaskData[] }>(
                "get-task-list"
            );
            return response.data.data;
        },
    });

    const fetchTaskList = () => {
        queryClient.invalidateQueries({ queryKey: ["tasks"] });
    };

    const fetchTaskCompleted = async () => {
        const response = await apiService.get<{ data: TaskData[] }>(
            "get-task-completed-list"
        );
        queryClient.setQueryData(["tasks"], response.data.data);
    };

    const updateContext = () => {
        fetchTaskList();
    };

    return (
        <TaskContext.Provider
            value={{
                taskList,
                isLoading,
                isError,
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
