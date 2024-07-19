import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';

function AdminStaff() {
  const { currentuser } = useContext(UserContext);
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
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
  });
  const [editStaffId, setEditStaffId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllStaffs = async () => {
    try {
      const response = await axios.post('/api/admin/findallstaffs', { userId: currentuser.id });
      if (response.data.status) {
        setStaffs(response.data.data);
        setFilteredStaffs(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch staff data');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editStaffId) {
        const response = await axios.put(`/api/admin/updatestaff`, { staffId: editStaffId, ...formData, userId: currentuser.id });
        if (response.data.status) {
          toast.success("Staff updated successfully");
        }
      } else {
        const response = await axios.post('/api/admin/createstaff', { ...formData, userId: currentuser.id });
        if (response.data.status) {
          toast.success("Staff created successfully");
        }
      }
      fetchAllStaffs();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Error occurred during staff operation");
    }
  };

  const handleEdit = (staff) => {
    setFormData({
      email: staff.user.email || '',
      phoneNo: staff.user.phoneNo || '',
      fullName: staff.fullName || '',
      password: '',
      address: staff.address || { city: '', state: '', pincode: '' },
      panNo: staff.panNo || '',
      aadharNo: staff.aadharNo || '',
      isVerified: staff.user.isVerified || false,
      isProfileCompleted: staff.user.isProfileCompleted || false,
      isKYCVerified: staff.user.isKYCVerified || false,
      isSurveyCompleted: staff.user.isSurveyCompleted || false,
    });
    setEditStaffId(staff._id);
    setIsFormVisible(true);
  };

  const handleDelete = async (staffId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");
    if (confirmDelete) {
      try {
        const response = await axios.delete(`/api/admin/deletestaff`, { data: { staffId, userId: currentuser.id } });
        if (response.data.status) {
          toast.success("Staff deleted successfully");
          fetchAllStaffs();
        }
      } catch (error) {
        console.error(error);
        toast.error("Error occurred while deleting staff");
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
    });
    setEditStaffId(null);
    setIsFormVisible(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = staffs.filter(staff => {
      if (!staff.fullName && !staff.user.email) {
        return false;
      } else if (!staff.fullName && staff.user.email) {
        return staff.user.email.toLowerCase().includes(value.toLowerCase());
      } else if (staff.fullName && !staff.user.email) {
        return staff.fullName.toLowerCase().includes(value.toLowerCase());
      } else {
        return (
          staff.fullName.toLowerCase().includes(value.toLowerCase()) ||
          staff.user.email.toLowerCase().includes(value.toLowerCase())
        );
      }
    });
    setFilteredStaffs(filtered);
  };

  useEffect(() => {
    fetchAllStaffs();
  }, []);

  return (
    <div className="bg-[#fafafa] w-full h-full p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Staff Management</h2>

      <input
        type="text"
        placeholder="Search Staff"
        value={searchTerm}
        onChange={handleSearch}
        className="p-2 border rounded mb-4 w-full"
      />

      <button onClick={() => setIsFormVisible(!isFormVisible)} className="bg-lightPrimary p-2 rounded text-white mb-4">
        {isFormVisible ? 'Hide Form' : 'Create New Staff'}
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
            required={!editStaffId}
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
          <div className='flex flex-cols gap-x-2'>
            <label className="block mb-1">Is Verified:</label>
            <input
              type="checkbox"
              checked={formData.isVerified}
              onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
            />
          </div>
          <div className='flex flex-cols gap-x-2'>
            <label className="block mb-1">Is Profile Completed:</label>
            <input
              type="checkbox"
              checked={formData.isProfileCompleted}
              onChange={(e) => setFormData({ ...formData, isProfileCompleted: e.target.checked })}
            />
          </div>
          <div className='flex flex-cols gap-x-2'>
            <label className="block mb-1">Is KYC Verified:</label>
            <input
              type="checkbox"
              checked={formData.isKYCVerified}
              onChange={(e) => setFormData({ ...formData, isKYCVerified: e.target.checked })}
            />
          </div>
          <div className='flex flex-cols gap-x-2'>
            <label className="block mb-1">Is Survey Completed:</label>
            <input
              type="checkbox"
              checked={formData.isSurveyCompleted}
              onChange={(e) => setFormData({ ...formData, isSurveyCompleted: e.target.checked })}
            />
          </div>
          <button type="submit" className="bg-lightPrimary p-2 mt-2 rounded text-white">
            {editStaffId ? 'Update Staff' : 'Add Staff'}
          </button>
          <button type="button" onClick={resetForm} className="bg-gray-300 p-2 rounded text-black ml-2">
            Reset
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStaffs.map(staff => (
          <div key={staff._id} className="p-4 bg-white border rounded shadow">
            <img src={staff.user.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Profile" className="w-16 h-16 rounded-full mb-2" />
            <h3 className="text-lg font-bold">{staff.fullName || 'not set'}</h3>
            <p>Email: {staff.user.email || 'not set'}</p>
            <p>Phone: {staff.user.phoneNo || 'not set'}</p>
            <p>PAN: {staff.panNo || 'not set'}</p>
            <p>Aadhar: {staff.aadharNo || 'not set'}</p>
            <div className="flex gap-x-2">
              <button onClick={() => handleEdit(staff)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(staff._id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminStaff;