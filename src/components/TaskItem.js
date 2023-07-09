import React, { useState } from 'react';

const TaskItem = ({ task, updateTask, deleteTask }) => {
    const [editing, setEditing] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [updatedDescription, setUpdatedDescription] = useState(task.description);

    const handleUpdate = async () => {
        try {
            const updatedTask = {
                id: task.id,
                title: updatedTitle,
                description: updatedDescription,
                status: task.status
            };

            // Send PUT request to update the task
            const response = await fetch(`/api/tasks/${task.id}/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedTask)
            });

            if (response.ok) {
                // Update component state or perform any necessary actions
                updateTask(updatedTask);
                setEditing(false);
            } else {
                console.error('Error updating task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            // Send DELETE request to delete the task
            const response = await fetch(`/api/tasks/${task.id}/delete`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Update component state or perform any necessary actions
                deleteTask(task.id);
            } else {
                console.error('Error deleting task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <li>
            {editing ? (
                <>
                    <input
                        type="text"
                        value={updatedTitle}
                        onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        value={updatedDescription}
                        onChange={(e) => setUpdatedDescription(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <span>{task.title}</span>
                    <span>{task.description}</span>
                    <button onClick={() => setEditing(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </li>
    );
};

export default TaskItem;