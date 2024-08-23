import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';

function ViewApplication() {
    const { applicationId } = useParams();
    const { currentuser } = useContext(UserContext);
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [admins, setAdmins] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [selectedAdminId, setSelectedAdminId] = useState(null);
    const [selectedStaffIds, setSelectedStaffIds] = useState({}); // Track selected staff for each form field
    const [message, setMessage] = useState('');
    const [assignedAdmin, setAssignedAdmin] = useState(null);
    const [assignedStaffs, setAssignedStaffs] = useState({});

    const fetchApplication = async () => {
        try {
            const response = await axios.post('/api/application/findbyid', {
                userId: currentuser.id,
                applicationId: applicationId
            });
            if (response.data.status) {
                setApplication(response.data.application);
                const initialSelectedStaff = {};
                let assignedStaffs = {};
                console.log(staffs);
                response.data.application.formFields.forEach(field => {
                    initialSelectedStaff[field._id] = field.assignedStaff || null;
                    if (initialSelectedStaff[field._id]) {
                        assignedStaffs[field._id] = staffs.find(staff => staff.user._id == field.assignedStaff);
                    }
                });
                console.log(assignedStaffs);
                setAssignedStaffs(assignedStaffs);
                console.log(response.data.application);
                const assignedAdmin = admins.find(admin => admin.user._id == response.data.application.assignedAdmin);
                setAssignedAdmin(assignedAdmin);
                setSelectedStaffIds(initialSelectedStaff);
                setMessage(response.data.application.message || ''); // Set the initial message
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch application details');
        } finally {
            setLoading(false);
        }
    };

    const fetchAdmins = async () => {
        try {
            const response = await axios.post('/api/admin/findusersbyrole', {
                userId: currentuser.id,
                role: 'Preparer' // Fetch Admins
            });
            console.log('----------------')
            console.log(response.data);
            if (response.data.status) {
                setAdmins(response.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch admin data');
        }
    };

    const fetchStaffs = async () => {
        try {
            const response = await axios.post('/api/admin/findusersbyrole', {
                userId: currentuser.id,
                role: 'Verifier' // Fetch Staff Verifiers
            });
            if (response.data.status) {
                setStaffs(response.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch staff data');
        }
    };

    useEffect(() => {
        fetchAdmins();
        fetchStaffs();
    }, []);

    useEffect(() => {
        if (admins.length > 0) {
            fetchApplication();
        }
    }, [admins, staffs])

    const handleStaffChange = (formFieldId, staffId) => {
        setSelectedStaffIds(prev => ({
            ...prev,
            [formFieldId]: prev[formFieldId] === staffId ? null : staffId // Toggle selection
        }));
    };

    const handleAssignAdmin = async () => {
        if (!selectedAdminId) {
            toast.error('Please select an admin to assign');
            return;
        }
        try {
            const response = await axios.post('/api/application/update', {
                userId: currentuser.id,
                applicationId: applicationId,
                assignedAdmin: selectedAdminId
            });
            if (response.data.status) {
                toast.success('Assigned Preparer updated successfully');
                fetchApplication();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update assigned admin');
        }
    };

    const handleAssignVerifier = async (formFieldId) => {
        const assignedStaffId = selectedStaffIds[formFieldId];
        if (!assignedStaffId) {
            toast.error('Please select a verifier to assign');
            return;
        }
        try {
            const response = await axios.put('/api/application/updateform', {
                userId: currentuser.id,
                formFieldId: formFieldId,
                assignedStaffId: assignedStaffId
            });
            if (response.data.status) {
                toast.success('Verifier assigned successfully');
                fetchApplication();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to assign verifier');
        }
    };

    const handleUpdateFieldStatus = async (formFieldId, status) => {
        try {
            const response = await axios.put('/api/application/updateform', {
                userId: currentuser.id,
                formFieldId: formFieldId,
                isVerified: status
            });
            console.log(response.data);
            if (response.data.status) {
                toast.success(`Form field marked as ${status}`);
                fetchApplication();
            }
        } catch (error) {
            console.error(error);
            toast.error(`Failed to mark form field as ${status}`);
        }
    };

    const handleUpdateApplicationStatus = async (status) => {
        if (status == 'Verified') {
            for (let field of application.formFields) {
                if (field.status != 'Verified') {
                    toast.error('All form fields must be verified to verify the form');
                    return;
                }
            }
        } else if (status == 'Rejected' && application.isSelectionDone) {
            toast.error("You cannot Reject Application at current stage")
            return;
        } else if (status == 'Applied') {
            for (let field of application.loans) {
                if (field.isSelected && field.status != 'Applied') {
                    toast.error('All loans need to mentioned Applied to complete Application as applied');
                    return;
                }
            }

        }
        try {
            const response = await axios.post('/api/application/update', {
                userId: currentuser.id,
                applicationId: applicationId,
                status: status,
            });
            if (response.data.status) {
                toast.success(`Application marked as ${status}`);
                fetchApplication();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update application status');
        }
    };
    const handleDeleteApplication = async () => {
        try {
            const response = await axios.post('/api/application/delete', { userId: currentuser.id, applicationId: applicationId });
            if (response.data.status) {
                toast.success('Application deleted successfully');
                navigate(-1); // Go back to the previous page
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete application');
        }
    };

    const handleUpdateLoanStatus = async (id, stats) => {
        var applicatn = application
        for (let i = 0; i < applicatn.loans.length; i++) {
            if (applicatn.loans[i].loan._id == id) {
                applicatn.loans[i].status = stats
                console.log('Veriii');
                break;
            }
        }
        console.log(applicatn);
        setApplication(applicatn);
        try {
            const response = await axios.post('/api/application/update', {
                userId: currentuser.id,
                applicationId: applicationId,
                loans: application.loans
            });
            if (response.data.status) {
                toast.success(`Updated Loan status as ${stats}`);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update application status');
        }
    }

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleUpdateMessage = async () => {
        try {
            const response = await axios.post('/api/application/update', {
                userId: currentuser.id,
                applicationId: applicationId,
                message: message
            });
            if (response.data.status) {
                toast.success('Message updated successfully');
                fetchApplication();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update message');
        }
    };

    const checkformFieldPermission = (form) => {
        if (currentuser.role != "Verifier") {
            return true;
        }
        if (form.assignedStaff == currentuser.id) {
            return true;
        }
        return false;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 text-2xl">Loading...</div>
            </div>
        );
    }

    if (!application) {
        return <div>No application found.</div>;
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <div className='flex justify-between'>
                    <button onClick={() => navigate(-1)} className="bg-gray-300 text-black p-2 rounded mb-4">
                        Back
                    </button>

                    {currentuser.role=="Admin"&&<button onClick={handleDeleteApplication} className="bg-red-700 text-white p-2 rounded mb-4">
                        Delete
                    </button>}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-center">Application Details</h2>

                <h3 className="text-xl font-bold mt-4 mb-2 ">Assigned Preparer</h3>
                {application.assignedAdmin && (
                    <div className="flex flex-row border rounded p-2 mb-2 bg-white shadow-sm gap-x-4">
                        <img src={assignedAdmin.user.profilePicture} className='h-16 w-16 rounded-full'></img>
                        <div>
                            <p><strong>Full Name:</strong> {assignedAdmin.fullName}</p>
                            <p><strong>Email:</strong> {assignedAdmin.user.email}</p>
                            <p><strong>Phone:</strong> {assignedAdmin.user.phoneNo}</p>
                        </div>
                    </div>
                )}
                <div>
                    {!application.assignedAdmin && <p>No assigned Preparer for this application.</p>}
                    {currentuser.role == "Admin" &&
                        <div>
                            <select onChange={(e) => setSelectedAdminId(e.target.value)} className="border rounded p-2 mt-2 mr-2">
                                <option value="">Select Preparer</option>
                                {admins.map(admin => (
                                    <option key={admin._id} value={admin.user._id}>{admin.fullName}</option>
                                ))}
                            </select>
                            <button onClick={handleAssignAdmin} className="bg-blue-500 text-white p-2 rounded mt-2">
                                Assign Preparer
                            </button>
                        </div>}
                </div>

                <h3 className="text-xl font-bold mt-4 mb-2">Category</h3>
                <div className="flex flex-row gap-x-4 items-center border rounded p-2 mb-2 bg-white shadow-sm">
                    <img src={application.categoryId.logo} alt="Category Logo" className="inline-block h-16 w-16 rounded" />
                    <p><strong>Name:</strong> {application.categoryId.category}</p>
                </div>

                <h3 className="text-xl font-bold mt-4 mb-2">Loans Applied</h3>
                <p><strong>Loan Selection Status:</strong> {application.isSelectionDone ? 'Done' : 'Pending'}</p>
                {application.loans.length > 0 ? (
                    application.loans.map((loan) => (
                        <div key={loan.loan._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                            <img src={loan.loan.logo} alt="Loan Logo" className="inline-block h-16 w-16 rounded" />
                            <p><strong>Name:</strong> {loan.loan.vendor}</p>
                            <p><strong>Min Loan Amount:</strong> {loan.loan.minLoanAmount}</p>
                            <p><strong>Max Loan Amount:</strong> {loan.loan.maxLoanAmount}</p>
                            <p><strong>Min Cibil Score:</strong> {loan.loan.minScoreRequired}</p>
                            <p><strong>Is Selected:</strong> {loan.isSelected ? 'True' : 'False'}</p>
                            <p><strong>Tenure:</strong> {loan.loan.tenureMin} - {loan.loan.tenureMax} months</p>
                            {currentuser.role != 'Verifier' &&
                                <div className="flex justify-end mt-2">
                                    {!application.isSelectionDone &&
                                        <div>
                                            <button
                                                onClick={() => handleUpdateLoanStatus(loan.loan._id, 'Verified')}
                                                className="bg-green-500 text-white p-2 rounded mr-2"
                                            >
                                                Mark as Verified
                                            </button>
                                            <button
                                                onClick={() => handleUpdateLoanStatus(loan.loan._id, 'Rejected')}
                                                className="bg-red-500 text-white p-2 rounded mr-2"
                                            >
                                                Mark as Rejected
                                            </button>
                                        </div>}
                                    {loan.isSelected &&
                                        <button
                                            onClick={() => handleUpdateLoanStatus(loan.loan._id, 'Applied')}
                                            className="bg-blue-500 text-white p-2 rounded"
                                        >
                                            Mark as Applied
                                        </button>}
                                </div>}
                        </div>
                    ))
                ) : (
                    <p>No loans applied for this application.</p>
                )}

                <h3 className="text-xl font-bold mt-4 mb-2">Applied for Users</h3>
                {application.profilesId.map(profile => (
                    <div key={profile._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                        {/* <img src={user.profilePicture || 'https://via.placeholder.com/150'} alt="Profile" className="w-16 h-16 rounded-full" /> */}
                        <p><strong>Full Name:</strong> {profile.fullName}</p>
                        {/* <p><strong>Email:</strong> {user.email}</p> */}
                        <p><strong>Phone:</strong> {profile.phoneNo}</p>
                        {/* <p><strong>Address:</strong> {user.userDetail.address.city}, {user.userDetail.address.state}, {user.userDetail.address.pincode}</p> */}
                        {/* <p><strong>Internal Rating:</strong> {user.userDetail.internalRating}</p> */}
                        <p><strong>Aadhar:</strong> {profile.aadharNo}</p>
                        <p><strong>PAN:</strong> {profile.panNo}</p>
                    </div>
                ))}

                <h3 className="text-xl font-bold mt-4 mb-2">Form Fields</h3>
                {application.formFields.map(field => (
                    <div>
                        {checkformFieldPermission(field) && <div key={field._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                            <div className='flex justify-between'>
                                <div className='w-3/5'>
                                    <p><strong>Name:</strong> {field.name}</p>
                                    <p><strong>Value:</strong> {field.value}</p>
                                    <p><strong>Status:</strong> {field.isVerified}</p>
                                    {currentuser.role!="Verifier"&&<div className="flex justify-start">
                                        <select onChange={(e) => handleStaffChange(field._id, e.target.value)} className="border rounded p-2 mt-2 mr-2">
                                            <option value="">Select Verifier</option>
                                            {staffs.map(staff => (
                                                <option key={staff._id} value={staff.user._id}>{staff.fullName}</option>
                                            ))}
                                        </select>
                                        <button onClick={() => handleAssignVerifier(field._id)} className="bg-blue-500 text-white p-2 rounded mt-2 mr-2">
                                            Assign Verifier
                                        </button>
                                    </div>}
                                </div>
                                {currentuser.role != "Verifier" && (assignedStaffs[field._id] ? (
                                    <div className='w-2/5 flex justify-center flex-col'>
                                        <p className='text-center'><strong>Assigned to</strong></p>
                                        <div className="border rounded p-2 mt-2 mb-2 bg-white shadow-sm flex flex-row items-center">
                                            <img src={assignedStaffs[field._id].user.profilePicture} className='h-[80px] w-[80px] rounded-full pr-1'></img>
                                            <div>
                                                <p><strong>Full Name:</strong> {assignedStaffs[field._id].fullName}</p>
                                                <p><strong>Email:</strong> {assignedStaffs[field._id].user.email}</p>
                                                <p><strong>Phone:</strong> {assignedStaffs[field._id].user.phoneNo}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (<p><strong>Verfier: Not Assigned</strong> </p>))}
                            </div>
                            <div className='flex w-full mt-2 justify-center bg-gray-200 p-2 rounded-lg'>
                                <button
                                    onClick={() => handleUpdateFieldStatus(field._id, 'Verified')}
                                    className="bg-blue-500 text-white p-2 rounded  mr-2 max-h-[100px]"
                                >
                                    Mark as Verified
                                </button>
                                <button
                                    onClick={() => handleUpdateFieldStatus(field._id, 'Rejected')}
                                    className="bg-blue-500 text-white p-2 rounded max-h-[100px]"
                                >
                                    Mark as Rejected
                                </button>
                            </div>
                        </div>}
                    </div>
                ))}

                <h3 className="text-xl font-bold mt-4 mb-2">Message</h3>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border rounded p-2 mb-2 w-full"
                    placeholder="Enter your message here"
                />
                <button onClick={handleUpdateMessage} className="bg-blue-500 text-white p-2 rounded mb-4">
                    Update Message
                </button>

                {currentuser.role != "Verifier" && <div className='flex justify-center align-center gap-x-2 mt-4'>
                    <div className='border w-full rounded p-2 mb-2 bg-white shadow-sm mx-auto'>
                        <p className='text-center'><strong>Application Status Update</strong></p>
                        <div className='flex gap-x-2 items-center justify-center my-2'>

                            <button onClick={() => handleUpdateApplicationStatus('Verified')} className="bg-blue-500 text-white p-2 rounded">
                                Mark as Verified
                            </button>
                            <button onClick={() => handleUpdateApplicationStatus('Rejected')} className="bg-blue-500 text-white p-2 rounded">
                                Mark as Rejected
                            </button>
                            <button onClick={() => handleUpdateApplicationStatus('Applied')} className="bg-blue-500 text-white p-2 rounded">
                                Mark as Applied
                            </button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default ViewApplication;
