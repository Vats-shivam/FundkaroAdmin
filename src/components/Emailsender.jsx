import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function EmailSender() {
    const { currentuser } = useContext(UserContext);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [email, setEmail] = useState({
        subject: '',
        body: ''
    });

    useEffect(() => {
        fetchRegisteredUsers();
    }, []);

    const fetchRegisteredUsers = async () => {
        try {
            const response = await axios.post('/api/admin/findallusers', { userId: currentuser.id });
            if (response.data.status) {
                setRegisteredUsers(response.data.data);
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
        if (email.body.trim() === '') {
            toast.error('Email body cannot be empty');
            return;
        }
        console.log(selectedUsers);
        try {
            const response = await axios.post('/api/email/send', {
                userId: currentuser.id,
                userIds: selectedUsers,
                subject: email.subject,
                body: email.body
            });
            console.log(response.data);
            if (response.data.status) {
                toast.success(`Emails sent successfully. Success: ${response.data.success}, Failed: ${response.data.failed}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send emails');
        }
    };

    const handleSendToAllUsers = async () => {
        if (email.body.trim() === '') {
            toast.error('Email body cannot be empty');
            return;
        }
        try {
            const response = await axios.post('/api/email/sendall', {
                userId: currentuser.id,
                subject: email.subject,
                body: email.body
            });
            if (response.data.status) {
                toast.success(`Emails sent successfully. Success: ${response.data.success}, Failed: ${response.data.failed}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send emails');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <label className="block mb-2 text-lg font-bold">Email Subject</label>
                <input
                    type="text"
                    value={email.subject}
                    onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                    placeholder="Enter email subject"
                    className="border rounded p-2 mb-4 w-full"
                />
                <label className="block mb-2 text-lg font-bold">Email Body</label>
                <ReactQuill
                    value={email.body}
                    onChange={(value) => setEmail({ ...email, body: value })}
                    placeholder="Compose your email..."
                    className="mb-4 h-64" // Adjust the height of the email body
                />
                <div className="grid mt-16 grid-cols-1 sm:grid-cols-2 gap-4">
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
                                <p><strong>Name:</strong> {user.fullName}</p>
                                <p><strong>Email:</strong> {user.user.email}</p>
                                <p><strong>Phone:</strong> {user.user.phoneNo}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={handleSendToSelectedUsers}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedUsers.length === 0 || email.body.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={selectedUsers.length === 0 || email.body.trim() === ''}
                    >
                        Send to Selected Users
                    </button>
                    <button
                        onClick={handleSendToAllUsers}
                        className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${email.body.trim() === '' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={email.body.trim() === ''}
                    >
                        Send to All Users
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmailSender;
