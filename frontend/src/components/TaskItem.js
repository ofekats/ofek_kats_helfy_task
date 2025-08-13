import React from "react";

function TaskItem({ task, toggleTask, deleteTask }) {

    async function deleteThisTask(id){
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed){
            return;
        }
        await deleteTask(id); 
    }

    return (
        <div className="TaskItem">
        <h3>
            {task.title}
        </h3>
        <p>{task.description}</p>
        <p>Priority: {task.priority}</p>
        <p>Created at: {new Date(task.createdAt).toLocaleString()}</p>
        <button onClick={() => toggleTask(task.id)}>
            {task.completed ? "Completed" : "Pending"}
        </button>
        <button onClick={() => deleteThisTask(task.id)}>Delete</button>
        </div>
    );
}

export default TaskItem;