import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

function AdminClients() {
    const { currentuser } = useContext(UserContext);
    const [clients, setClients] = useState([]);
    const [filteredClients, setFilteredClients] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        phoneNo: '',
        fullName: '',
        password: '',
        address: {
            city: '',
            state: '',
            pincode: '',
        },
        panNo: '',
        aadharNo: '',
        isVerified: false,
        isProfileCompleted: false,
        isKYCVerified: false,
        isSurveyCompleted: false,
        internalRating: '' // Added internal rating field
    });
    const [editClientId, setEditClientId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const fetchAllClients = async () => {
        try {
            const response = await axios.post('/api/admin/findallusers', { userId: currentuser.id });
            if (response.data.status) {
                setClients(response.data.data);
                setFilteredClients(response.data.data); // Initialize filteredClients
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch client data');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editClientId) {
                const response = await axios.put('/api/admin/updateuser', { Id: editClientId, ...formData, userId: currentuser.id });
                if (response.data.status) {
                    toast.success("Client updated successfully");
                }
            } else {
                const response = await axios.post('/api/admin/createuser', { ...formData, userId: currentuser.id });
                if (response.data.status) {
                    toast.success("Client created successfully");
                }
            }
            fetchAllClients();
            resetForm();
        } catch (error) {
            console.error(error);
            toast.error("Error occurred during client operation");
        }
    };

    const handleEdit = (client) => {
        setFormData({
            email: client.user.email || '',
            phoneNo: client.user.phoneNo || '',
            fullName: client.fullName || '',
            password: '',
            address: client.address || { city: '', state: '', pincode: '' },
            panNo: client.panNo || '',
            aadharNo: client.aadharNo || '',
            isVerified: client.user.isVerified || false,
            isProfileCompleted: client.user.isProfileCompleted || false,
            isKYCVerified: client.user.isKYCVerified || false,
            isSurveyCompleted: client.user.isSurveyCompleted || false,
            internalRating: client.internalRating || '' // Set internal rating for editing
        });
        setEditClientId(client._id);
        setIsFormVisible(true);
    };

    const handleDelete = async (clientId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this client?");
        if (confirmDelete) {
            try {
                const response = await axios.delete(`/api/admin/deleteuser`, { data: { clientId, userId: currentuser.id } });
                if (response.data.status) {
                    toast.success("Client deleted successfully");
                    fetchAllClients();
                }
            } catch (error) {
                console.error(error);
                toast.error("Error occurred while deleting client");
            }
        }
    };

    const resetForm = () => {
        setFormData({
            email: '',
            phoneNo: '',
            fullName: '',
            password: '',
            address: {
                city: '',
                state: '',
                pincode: '',
            },
            panNo: '',
            aadharNo: '',
            isVerified: false,
            isProfileCompleted: false,
            isKYCVerified: false,
            isSurveyCompleted: false,
            internalRating: '' // Reset internal rating
        });
        setEditClientId(null);
        setIsFormVisible(false);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        const filtered = clients.filter(client => {
            if (!client.fullName && !client.user.email) {
                return false;
            } else if (!client.fullName && client.user.email) {
                return client.user.email.toLowerCase().includes(value.toLowerCase());
            } else if (client.fullName && !client.user.email) {
                return client.fullName.toLowerCase().includes(value.toLowerCase());
            } else {
                return (
                    client.fullName.toLowerCase().includes(value.toLowerCase()) ||
                    client.user.email.toLowerCase().includes(value.toLowerCase())
                );
            }
        });
        setFilteredClients(filtered);
    };

    const showProfile = (client) => {
        navigate(`/admin/clients/${client.user._id}`); // Navigate to the UserProfile component with the client ID
    };

    useEffect(() => {
        fetchAllClients();
    }, []);

    return (
        <div className="bg-[#fafafa] w-full h-full p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Client Management</h2>

            <input
                type="text"
                placeholder="Search Client"
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 border rounded mb-4 w-full"
            />

            <button onClick={() => setIsFormVisible(!isFormVisible)} className="bg-lightPrimary p-2 rounded text-white mb-4">
                {isFormVisible ? 'Hide Form' : 'Create New Client'}
            </button>

            {isFormVisible && (
                <form onSubmit={handleFormSubmit} className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <label className="block mb-1">Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNo"
                        placeholder="Phone Number"
                        value={formData.phoneNo}
                        onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <label className="block mb-1">Full Name:</label>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <label className="block mb-1">Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required={!editClientId} // Only require password for new clients
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <label className="block mb-1">City:</label>
                    <input
                        type="text"
                        name="address.city"
                        placeholder="City"
                        value={formData.address.city}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <label className="block mb-1">State:</label>
                    <input
                        type="text"
                        name="address.state"
                        placeholder="State"
                        value={formData.address.state}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <label className="block mb-1">Pincode:</label>
                    <input
                        type="text"
                        name="address.pincode"
                        placeholder="Pincode"
                        value={formData.address.pincode}
                        onChange={(e) => setFormData({ ...formData, address: { ...formData.address, pincode: e.target.value } })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <label className="block mb-1">PAN Number:</label>
                    <input
                        type="text"
                        name="panNo"
                        placeholder="PAN Number"
                        value={formData.panNo}
                        onChange={(e) => setFormData({ ...formData, panNo: e.target.value })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <label className="block mb-1">Aadhar Number:</label>
                    <input
                        type="text"
                        name="aadharNo"
                        placeholder="Aadhar Number"
                        value={formData.aadharNo}
                        onChange={(e) => setFormData({ ...formData, aadharNo: e.target.value })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <div className='flex items-center mb-4'>
                        <input
                            type="checkbox"
                            checked={formData.isVerified}
                            onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                            className="mr-2"
                        />
                        <label className="block mb-1">Is Verified</label>
                    </div>
                    <div className='flex items-center mb-4'>
                        <input
                            type="checkbox"
                            checked={formData.isProfileCompleted}
                            onChange={(e) => setFormData({ ...formData, isProfileCompleted: e.target.checked })}
                            className="mr-2"
                        />
                        <label className="block mb-1">Is Profile Completed</label>
                    </div>
                    <div className='flex items-center mb-4'>
                        <input
                            type="checkbox"
                            checked={formData.isKYCVerified}
                            onChange={(e) => setFormData({ ...formData, isKYCVerified: e.target.checked })}
                            className="mr-2"
                        />
                        <label className="block mb-1">Is KYC Verified</label>
                    </div>
                    <div className='flex items-center mb-4'>
                        <input
                            type="checkbox"
                            checked={formData.isSurveyCompleted}
                            onChange={(e) => setFormData({ ...formData, isSurveyCompleted: e.target.checked })}
                            className="mr-2"
                        />
                        <label className="block mb-1">Is Survey Completed</label>
                    </div>
                    <label className="block mb-1">Internal Rating:</label>
                    <input
                        type="number"
                        name="internalRating"
                        placeholder="Internal Rating"
                        value={formData.internalRating}
                        onChange={(e) => setFormData({ ...formData, internalRating: e.target.value })}
                        required
                        className="p-2 border rounded mb-2 w-full"
                    />
                    <button type="submit" className="bg-lightPrimary p-2 rounded text-white">
                        {editClientId ? 'Update Client' : 'Add Client'}
                    </button>
                    <button type="button" onClick={resetForm} className="bg-gray-300 p-2 rounded text-black ml-2">
                        Reset
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClients.map(client => (
                    <div key={client._id} className="p-4 bg-white border rounded shadow-lg">
                        <img src={client.user.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Profile" className="w-16 h-16 rounded-full mb-2" />
                        <h3 className="text-lg font-bold">{client.fullName || 'Name is not set'}</h3>
                        <p>Email: {client.user.email || 'not set'}</p>
                        <p>Phone: {client.user.phoneNo || 'not set'}</p>
                        <p>PAN: {client.panNo || 'not set'}</p>
                        <p>Aadhar: {client.aadharNo || 'not set'}</p>
                        <p>Internal Rating: {client.internalRating || 'Not Set'}</p>
                        <div className="flex gap-x-2">
                            <button onClick={() => handleEdit(client)} className="text-blue-500">Edit</button>
                            <button onClick={() => handleDelete(client._id)} className="text-red-500">Delete</button>
                            <button onClick={() => showProfile(client)} className="text-green-500">Show Profile</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminClients;