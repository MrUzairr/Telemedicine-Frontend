import React, { useState, useEffect } from 'react';
import './index.css'; // Import a CSS file for styling (create Task.css)

const Task = () => {
    const [tasks, setTasks] = useState([]); // Initialize tasks as an empty array
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const projectId = '1209047157633629'; // Example project ID

    // Fetch tasks from backend API
    const fetchTasks = async () => {
        try {
            const response = await fetch(`http://localhost:3005/asana/tasks/${projectId}`);
            const data = await response.json();
            if (response.ok) {
                setTasks(data.data || []);
            } else {
                console.error('Error fetching tasks:', data.message);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    // Create new task
    const createTask = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:3005/asana/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ projectId, name, notes }),
        });

        const data = await response.json();
        if (response.ok) {
            setName('');
            setNotes('');
            fetchTasks();
        } else {
            console.error('Error creating task:', data.message);
        }
    };

    // Update existing task
    const updateTask = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:3005/asana/tasks/${selectedTaskId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, notes }),
        });

        const data = await response.json();
        if (response.ok) {
            setName('');
            setNotes('');
            setSelectedTaskId(null);
            setIsEditing(false);
            fetchTasks();
        } else {
            console.error('Error updating task:', data.message);
        }
    };

    // Delete task
    const deleteTask = async (taskId) => {
        const response = await fetch(`http://localhost:3005/asana/tasks/${taskId}`, { method: 'DELETE' });
        if (response.ok) {
            fetchTasks();
        } else {
            console.error('Error deleting task.');
        }
    };

    // Set task for editing
    const startEditing = (task) => {
        setName(task.name);
        setNotes(task.notes);
        setSelectedTaskId(task.gid);
        setIsEditing(true);
    };

    // Fetch tasks when component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="task-container">
            <header className='task_header'>
                <h1 className='task_h1'>Task Management</h1>
            </header>

            <section className="task-form-section">
                <h2 className='task_h2'>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
                <form className="task-form" onSubmit={isEditing ? updateTask : createTask}>
                    <input
                        type="text"
                        placeholder="Task Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Task Notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        required
                    />
                    <button type="submit" className="task-submit-btn">
                        {isEditing ? 'Update Task' : 'Create Task'}
                    </button>
                </form>
            </section>

            <section className="task-list-section">
                <h2 className='task_h2'>Task List</h2>
                {tasks.length === 0 ? (
                    <p className="no-tasks-message">No tasks available.</p>
                ) : (
                    <ul className="task-list">
                        {tasks.map((task) => (
                            <li key={task.gid} className="task-item">
                                <div>
                                    <strong>{task.name}</strong>
                                    <p>{task.notes}</p>
                                </div>
                                <div className="task-actions">
                                    <button
                                        onClick={() => startEditing(task)}
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task.gid)}
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
};

export default Task;




// import React, { useState } from 'react';
// import CreateTask from './createTask';
// import UpdateTask from './updateTask';

// const Task = ({ projectId }) => {
//     const [tasks, setTasks] = useState([]);

//     // Handle new task creation and add it to tasks list
//     const handleTaskCreated = (newTask) => {
//         setTasks([...tasks, newTask]);
//     };

//     return (
//         <div>
//             <CreateTask projectId={projectId} onTaskCreated={handleTaskCreated} />
//             {tasks.length > 0 && <UpdateTask tasks={tasks} />}
//         </div>
//     );
// };

// export default Task;
