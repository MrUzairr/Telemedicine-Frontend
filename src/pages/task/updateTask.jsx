import React, { useState } from 'react';
import axios from 'axios';

const UpdateTask = ({ tasks }) => {
    const [selectedTaskId, setSelectedTaskId] = useState('');
    const [additionalData, setAdditionalData] = useState('');

    // Handle task update
    const handleUpdate = async () => {
        if (!selectedTaskId || !additionalData) {
            alert('Please select a task and enter additional data.');
            return;
        }

        const updateData = {
            taskId: selectedTaskId,
            additionalData: { notes: additionalData },
        };

        try {
            const response = await axios.post('http://localhost:3005/asana/update-task', updateData);
            alert('Task updated!');
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Error updating task');
        }
    };

    return (
        <div>
            <h3>Update Task</h3>
            <select onChange={(e) => setSelectedTaskId(e.target.value)}>
                <option value="">Select Task</option>
                {tasks.map((task) => (
                    <option key={task.gid} value={task.gid}>
                        {task.name}
                    </option>
                ))}
            </select>

            <textarea
                placeholder="Enter additional data"
                value={additionalData}
                onChange={(e) => setAdditionalData(e.target.value)}
            />

            <button onClick={handleUpdate}>Update Task</button>
        </div>
    );
};

export default UpdateTask;
