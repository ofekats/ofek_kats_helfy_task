import React from "react";
import TaskItem from "./TaskItem";


function TaskList({ tasks, toggleTask, deleteTask, updateTask }) {
    return (
        <div>
            <h2>Tasks:</h2>
            {tasks.map((task) => (
                <TaskItem
                key={task.id}
                task={task}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                updateTask={updateTask}
                />
            ))}
        </div>
    );
}

export default TaskList;