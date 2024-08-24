import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function MyTasks() {
    const { currentuser } = useContext(UserContext);
    const navigate = useNavigate();
    const [completedTasks, setCompletedTasks] = useState([]);
    const [incompleteTasks, setIncompleteTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.post('/api/task/findbyid', {
                userId: currentuser.id,
            });
            console.log(response.data);
            if (response.data.status) {
                const tasks = response.data.tasks;
                const completed = tasks.filter(task => task.completed);
                const incomplete = tasks.filter(task => !task.completed);
                setCompletedTasks(completed);
                setIncompleteTasks(incomplete);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch tasks');
        }
    };

    const handleMarkComplete = async (taskId) => {
        try {
            const response = await axios.post('/api/task/update', {
                userId: currentuser.id,
                id: taskId,
                completed: true
            });
            if (response.data.status) {
                toast.success('Task marked as completed');
                fetchTasks(); 
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to mark task as completed');
        }
    };

    const handleMarkIncomplete = async (taskId) => {
        try {
            const response = await axios.post('/api/task/update', {
                userId: currentuser.id,
                id: taskId,
                completed: false
            });
            if (response.data.status) {
                toast.success('Task marked as incomplete');
                fetchTasks(); 
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to mark task as incomplete');
        }
    };

    const handleNavigateToApplication = (applicationId) => {
        navigate(`/admin/application/${applicationId._id}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">My Tasks</h2>
                <h3 className="text-xl mt-5 font-bold mb-2">Incomplete Tasks</h3>
                {incompleteTasks.map(task => (
                    <div key={task._id} className="border rounded p-4 mb-2 bg-white shadow-sm">
                        <p><strong>Title:</strong> {task.taskTitle}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Assigned By:</strong> {task.assignerUserId.email}</p>
                        <div className="flex justify-between mt-2">
                            {task.applicationId &&
                                <button
                                    onClick={() => handleNavigateToApplication(task.applicationId)}
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    View Application
                                </button>}
                            <button
                                onClick={() => handleMarkComplete(task._id)}
                                className="bg-green-500 text-white p-2 rounded"
                            >
                                Mark as Complete
                            </button>
                        </div>
                    </div>
                ))}
                {incompleteTasks&&incompleteTasks.length==0&&<p>No Task found</p>}
                <h3 className="text-xl font-bold mt-5 mb-2">Completed Tasks</h3>
                {completedTasks.map(task => (
                    <div key={task._id} className="border rounded p-4 mb-2 bg-white shadow-sm">
                        <p><strong>Title:</strong> {task.taskTitle}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <p><strong>Assigned By:</strong> {task.assignerUserId.email}</p>
                        <div className="flex justify-between mt-2">
                            {task.applicationId &&
                                <button
                                    onClick={() => handleNavigateToApplication(task.applicationId)}
                                    className="bg-blue-500 text-white p-2 rounded"
                                >
                                    View Application
                                </button>}
                            <button
                                onClick={() => handleMarkIncomplete(task._id)}
                                className="bg-red-500 text-white p-2 rounded"
                            >
                                Mark as Incomplete
                            </button>
                        </div>
                    </div>
                ))}
                {completedTasks&&completedTasks.length==0&&<p>No Task found</p>}
            </div>
        </div>
    );
}

export default MyTasks;