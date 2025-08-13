const API_URL = "http://localhost:4000/api/tasks";

export const getAllTasks = async () => {
    //Get all tasks
    const res = await fetch(API_URL);
    return await res.json();
};

export const addTask = async (task) => {
    //Create a new task
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return await res.json();
};

export const UpdateTask = async (task) => {
    //Update a task
    const res = await fetch(`${API_URL}/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return await res.json();
};

export const deleteTask = async (id) => {
    //Delete a task
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};

export const toggleTask = async (id) => {
    //Toggle task completion status
    const res = await fetch(`${API_URL}/${id}/toggle`, { method: "PATCH" });
    return await res.json();
};