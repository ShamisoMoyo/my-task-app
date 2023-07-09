import React, { useState } from 'react';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/tasks/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title,
                    description,
                    status,
                }),
            });
            const data = await response.json();
            // Handle success response
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" value={title} onChange={handleTitleChange} />
            </div>
            <div>
                <label>Description:</label>
                <textarea value={description} onChange={handleDescriptionChange} />
            </div>
            <div>
                <label>Status:</label>
                <input type="text" value={status} onChange={handleStatusChange} />
            </div>
            <button type="submit">Create Task</button>
        </form>
    );
};

export default TaskForm;