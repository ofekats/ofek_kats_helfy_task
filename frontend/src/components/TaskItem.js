import { useState} from "react";

function TaskItem({ task, toggleTask, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  function handleSave() {
    updateTask({ ...task, title, description, priority });
    setIsEditing(false);
  }

  async function deleteThisTask(id){
        const confirmed = window.confirm("Are you sure you want to delete this task?");
        if (!confirmed){
            return;
        }
        await deleteTask(id); 
    }


  return (
    <div className={`TaskItem ${task.priority}`}>
      {isEditing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />
          <select value={priority} onChange={e => setPriority(e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <button onClick={() => toggleTask(task.id)}>{task.completed ? "Completed" : "Pending"}</button>
          <button onClick={() => deleteThisTask(task.id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default TaskItem;