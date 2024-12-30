import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:5000/tasks');
    setTasks(response.data);
  };

  const handleAddTask = async () => {
    if (newTask.trim()) {
      const response = await axios.post('http://localhost:5000/tasks', { description: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    }
  };

  const handleDeleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Enter a new task"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskTracker;
