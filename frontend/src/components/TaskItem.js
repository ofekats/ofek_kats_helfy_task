import React from "react";

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div>
      <h3>
        {task.title}
      </h3>
      <p>{task.description}</p>
      <p>Priority: {task.priority}</p>
      <button onClick={() => toggleTask(task.id)}>
        {task.completed ? "Undo" : "Complete"}
      </button>
      <button onClick={() => deleteTask(task.id)}>Delete</button>
    </div>
  );
}

export default TaskItem;