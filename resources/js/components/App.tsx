import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routes/Routes";
import { TaskProvider } from "./context/TaskContext";
import { QueryProvider } from "./providers/QueryProvider";

export default function App() {
    return (
        <QueryProvider>
            <BrowserRouter>
                <TaskProvider>
                    <Routes />
                </TaskProvider>
            </BrowserRouter>
        </QueryProvider>
    );
}
