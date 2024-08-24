import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';

function AdminTasks() {
    const { currentuser } = useContext(UserContext);
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedUserId, setAssignedUserId] = useState('');
    const [role, setRole] = useState('Verifier');
    const [verifiers, setVerifiers] = useState([]);
    const [preparers, setPreparers] = useState([]);

    useEffect(() => {
        fetchTasks();
        fetchUsersByRole('Verifier');
        fetchUsersByRole('Preparer');
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.post('/api/task/find', { userId: currentuser.id });
            console.log(response.data);
            if (response.data.status) {
                setTasks(response.data.tasks);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch tasks');
        }
    };

    const fetchUsersByRole = async (role) => {
        try {
            const response = await axios.post('/api/admin/findusersbyrole', {
                userId: currentuser.id,
                role: role
            });
            if (response.data.status) {
                if (role === 'Verifier') {
                    setVerifiers(response.data.data);
                } else {
                    setPreparers(response.data.data);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(`Failed to fetch ${role} users`);
        }
    };

    const handleCreateTask = async () => {
        if (!taskTitle || !description || !assignedUserId) {
            toast.error('Please fill in all fields');
            return;
        }
        try {
            const response = await axios.post('/api/task/create', {
                userId: currentuser.id,
                assignedUserId: assignedUserId,
                taskTitle: taskTitle,
                description: description
            });
            console.log(response.data);
            if (response.data.status) {
                toast.success('Task created successfully');
                fetchTasks();
                setTaskTitle('');
                setDescription('');
                setAssignedUserId('');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to create task');
        }
    };

    const handleUpdateTask = async (taskId, updatedData) => {
        try {
            const response = await axios.post('/api/task/update', {
                userId: currentuser.id,
                id: taskId,
                ...updatedData
            });
            if (response.data.status) {
                toast.success('Task updated successfully');
                fetchTasks(); // Refresh task list
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await axios.post('/api/task/delete',  { userId: currentuser.id, id: taskId }
            );
            if (response.data.status) {
                toast.success('Task deleted successfully');
                fetchTasks();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete task');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Task Management</h2>
                
                <div className="mb-4">
                    <label className="block mb-2">Task Title</label>
                    <input
                        type="text"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        className="border rounded p-2 w-full"
                        placeholder="Enter task title"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded p-2 w-full"
                        placeholder="Enter task description"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Assign to</label>
                    <select
                        value={assignedUserId}
                        onChange={(e) => setAssignedUserId(e.target.value)}
                        className="border rounded p-2 w-full"
                    >
                        <option value="">Select User</option>
                        {role === 'Verifier' && verifiers.map(user => (
                            <option key={user.user._id} value={user.user._id}>{user.fullName}</option>
                        ))}
                        {role === 'Preparer' && preparers.map(user => (
                            <option key={user.user._id} value={user.user._id}>{user.fullName}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-between mb-4">
                    <button
                        onClick={handleCreateTask}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Task
                    </button>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border rounded p-2"
                    >
                        <option value="Verifier">Verifier</option>
                        <option value="Preparer">Preparer</option>
                    </select>
                </div>

                <h3 className="text-xl font-bold mb-2">Tasks List</h3>
                {tasks.map(task => (
                    <div key={task._id} className="border rounded p-4 mb-2 bg-white shadow-sm">
                        <p><strong>Title:</strong> {task.taskTitle}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Assigned To:</strong> {task.assignedUserId ? task.assignedUserId.email : 'Not Assigned'}</p>
                        <p><strong>Assigned By:</strong> {task.assignerUserId ? task.assignerUserId.email : 'None'}</p>
                        <p><strong>Completed:</strong> {task.completed ? "True" : 'False'}</p>
                        <div className="flex gap-x-2 mt-2">
                            <button
                                onClick={() => handleUpdateTask(task._id, { completed: true })}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Mark as Completed
                            </button>
                            <button
                                onClick={() => handleUpdateTask(task._id, { completed: false })}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Mark as InCompleted
                            </button>
                            <button
                                onClick={() => handleDeleteTask(task._id)}
                                className="bg-red-700 text-white p-2 rounded"
                            >
                                Delete Task
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminTasks;