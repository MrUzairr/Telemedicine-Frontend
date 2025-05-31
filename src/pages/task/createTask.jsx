import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = ({ projectId, onTaskCreated }) => {
    const [taskName, setTaskName] = useState('');
    const [taskNotes, setTaskNotes] = useState('');

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const taskData = {
            projectId: projectId,
            name: taskName,
            notes: taskNotes,
        };

        try {
            const response = await axios.post('http://localhost:3005/asana/create-task', taskData);
            alert('Task created!');
            onTaskCreated(response.data.data); // Send task data to parent component
        } catch (error) {
            console.error('Error creating task:', error);
            alert('Error creating task');
        }
    };

    return (
        <div>
            <h3>Create Task</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Task Notes"
                    value={taskNotes}
                    onChange={(e) => setTaskNotes(e.target.value)}
                />
                <button type="submit">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
