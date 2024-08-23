import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';

function Notifications() {
    const { currentuser } = useContext(UserContext);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [message, setMessage] = useState({
        sound: 'default',
        title: 'Fundkaro',
        body: ''
    });

    useEffect(() => {
        fetchRegisteredUsers();
    }, []);

    const fetchRegisteredUsers = async () => {
        try {
            const response = await axios.post('/api/notification/find', { userId: currentuser.id });
            if (response.data.status) {
                setRegisteredUsers(response.data.users);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch registered users');
        }
    };

    const handleUserSelect = (userId) => {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter(id => id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleSendToSelectedUsers = async () => {
        if (selectedUsers.length === 0) {
            toast.error('Please select at least one user');
            return;
        }
        if (message.body.trim() === '') {
            toast.error('Message body cannot be empty');
            return;
        }

        const confirmation = window.confirm("Are you sure you want to send the notification to the selected users?");
        if (!confirmation) {
            return;
        }

        try {
            const response = await axios.post('/api/notification/sendusers', {
                userId: currentuser.id,
                usersId: selectedUsers,
                message: message
            });
            if (response.data.status) {
                toast.success(`Notifications sent successfully. Success: ${response.data.success}, Failed: ${response.data.failed}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send notifications');
        }
    };

    const handleSendToAllUsers = async () => {
        if (message.body.trim() === '') {
            toast.error('Message body cannot be empty');
            return;
        }

        const confirmation = window.confirm("Are you sure you want to send the notification to all users?");
        if (!confirmation) {
            return;
        }

        try {
            const response = await axios.post('/api/notification/sendall', {
                userId: currentuser.id,
                message: message
            });
            if (response.data.status) {
                toast.success(`Notifications sent successfully. Success: ${response.data.success}, Failed: ${response.data.failed}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send notifications');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <label className="block mb-2 text-lg font-bold">Enter Title</label>
                <input
                    type="text"
                    value={message.title}
                    onChange={(e) => setMessage({ ...message, title: e.target.value })}
                    placeholder="Enter message"
                    className="border rounded p-2 mb-4 w-full"
                />
                <label className="block mb-2 text-lg font-bold">Enter Message to send as Notification to users</label>
                <input
                    type="text"
                    value={message.body}
                    onChange={(e) => setMessage({ ...message, body: e.target.value })}
                    placeholder="Enter message"
                    className="border rounded p-2 mb-4 w-full"
                />
                <div className="flex flex-wrap gap-4">
                    {registeredUsers.map(user => (
                        <div key={user.user._id} className="border rounded p-4 bg-white shadow-sm flex items-center">
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.user._id)}
                                onChange={() => handleUserSelect(user.user._id)}
                                className="mr-2"
                            />
                            <img
                                src={user.user.profilePicture || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="w-16 h-16 rounded-full mr-4"
                            />
                            <div>
                                <p><strong>Email:</strong> {user.user.email}</p>
                                <p><strong>Phone:</strong> {user.user.phoneNo}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleSendToSelectedUsers}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedUsers.length === 0 || message.body.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={selectedUsers.length === 0 || message.body.trim() === ''}
                    >
                        Send to Selected Users
                    </button>
                    <button
                        onClick={handleSendToAllUsers}
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${message.body.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={message.body.trim() === ''}
                    >
                        Send to All Users
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Notifications;
