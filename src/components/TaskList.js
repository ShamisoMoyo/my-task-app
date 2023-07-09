import React, {useState, useEffect} from 'react';
import TaskForm from './TaskForm';

const TaskList = () => {
    const[tasks, setTasks] = useState([]);

    useEffect(()=>{
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try{
            const response = await fetch('http://localhost:4000/api/tasks');
            const data = await response.json();
            setTasks(data);

        }   catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>{task.title}</li>
                ))}
            </ul>
            <TaskForm />
        </div>
    );
};

export default TaskList;