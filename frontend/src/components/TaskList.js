import React from "react";
import TaskItem from "./TaskItem";


function TaskList({ tasks, toggleTask, deleteTask }) {
    return (
        <div>
            <h3>Tasks:</h3>
        {tasks.map((task) => (
            <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            />
        ))}
        </div>
    );
}

export default TaskList;