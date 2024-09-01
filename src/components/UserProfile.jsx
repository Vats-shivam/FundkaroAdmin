import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

function UserProfile() {
    const { userId } = useParams(); // Get user ID from URL parameters
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentuser } = useContext(UserContext);
    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        try {
            const response = await axios.post('/api/admin/finduser', { Id: userId, userId: currentuser.id });
            console.log(response.data.data);
            if (response.data.status) {
                setUserDetails(response.data.data);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to fetch user details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [userId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500 text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
                <div className="flex justify-between items-center mb-4">
                    <img src={userDetails.user.profilePicture || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Profile" className="w-24 h-24 rounded-full shadow-md" />
                    <button onClick={() => navigate(-1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                        Back
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <p><strong>Name:</strong> {userDetails.userdetail.fullName || 'Not Set'}</p>
                    <p><strong>Email:</strong> {userDetails.user.email || 'Not Set'}</p>
                    <p><strong>Phone:</strong> {userDetails.user.phoneNo || 'Not Set'}</p>
                    <p><strong>PAN:</strong> {userDetails.userdetail.panNo || 'Not Set'}</p>
                    <p><strong>Aadhar:</strong> {userDetails.userdetail.aadharNo || 'Not Set'}</p>
                    <p><strong>Address: </strong>
                        {userDetails.userdetail.address ? (
                            <span>
                                {userDetails.userdetail.address.city}, {userDetails.userdetail.address.state}, {userDetails.userdetail.address.pincode}
                            </span>
                        ) : 'Not Set'}
                    </p>
                </div>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <p><strong>Is Verified:</strong> {userDetails.user.isVerified ? 'Yes' : 'No'}</p>
                    <p><strong>Is Profile Completed:</strong> {userDetails.user.isProfileCompleted ? 'Yes' : 'No'}</p>
                    <p><strong>Is KYC Verified:</strong> {userDetails.user.isKYCVerified ? 'Yes' : 'No'}</p>
                    <p><strong>Is Survey Completed:</strong> {userDetails.user.isSurveyCompleted ? 'Yes' : 'No'}</p>
                </div>

                <h3 className="text-l font-bold mt-2 mb-2">Internal Rating: {userDetails.userdetail.internalRating || 'Not Available'}</h3>

                <h3 className="text-xl font-bold mt-8 mb-4">Applications</h3>
                {userDetails.applications.length > 0 ? (
                    userDetails.applications.map((application) => (
                        <div key={application._id} className="border rounded-lg shadow-md p-4 mb-4 bg-gray-50">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                <p><strong>Category:</strong> {application.categoryId ? application.categoryId.category : 'Not Available'}</p>
                                <p><strong>Status:</strong> {application.status}</p>
                            </div>

                            <h5 className="text-md font-bold mt-4 mb-2">Loans Applied</h5>
                            {application.loans.length > 0 ? (
                                application.loans.map((loan) => (
                                    <div key={loan.loan._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                                        <p><strong>Vendor:</strong> {loan.loan.vendor}</p>
                                        <p><strong>Min Loan Amount:</strong> {loan.loan.maxLoanAmount}</p>
                                        <p><strong>Max Loan Amount:</strong> {loan.loan.maxLoanAmount}</p>
                                        <p><strong>Rates:</strong> {loan.loan.ratesMin} - {loan.loan.ratesMax}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No loans applied for this application.</p>
                            )}

                            <h5 className="text-md font-bold mt-4 mb-2">Applied Form</h5>
                            <div className="grid grid-cols-2 gap-4">
                                {application.formFields.map((field, index) => (
                                    <div key={index}>
                                        <label htmlFor={field.name} className="block text-gray-700 font-semibold mb-2">{field.name}</label>
                                        {field.type === 'file' ?
                                            <div className='my-2'><a href={`https://fundkaro-webapp-bucket.s3.eu-north-1.amazonaws.com/${field.value}`} className='text-white bg-blue-500 p-1 mb-2 rounded-lg' >Download File</a></div>
                                            :
                                            <div>
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={field.value}
                                                    readOnly
                                                    className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                                                />
                                            </div>
                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No applications found for this user.</p>
                )}

                <h3 className="text-xl font-bold mt-8 mb-4">Aadhar Card Details</h3>
                {userDetails.adharCards.length > 0 ? (
                    userDetails.adharCards.map((card) => (
                        <div key={card._id} className="border rounded-lg shadow-md p-4 mb-4 bg-gray-50">
                            <img
                                src={card.profile_image ? `data:image/jpeg;base64,${card.profile_image}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}
                                alt="Aadhar Profile"
                                className="w-24 h-24 rounded-full shadow-md mb-4"
                            />
                            <p><strong>Aadhar Number:</strong> {card.aadhaar_number}</p>
                            <p><strong>Full Name:</strong> {card.full_name}</p>
                            <p><strong>Gender:</strong> {card.gender}</p>
                            <p><strong>Date of Birth:</strong> {new Date(card.dob).toLocaleDateString()}</p>
                            <p><strong>Address:</strong> {card.address.street}, {card.address.city}, {card.address.state}, {card.address.country}</p>
                        </div>
                    ))
                ) : (
                    <p>No Aadhar cards found for this user.</p>
                )}

                <h3 className="text-xl font-bold mt-8 mb-4">PAN Card Details</h3>
                {userDetails.panCards && userDetails.panCards.length > 0 ? (
                    userDetails.panCards.map((panCard) => (
                        <div key={panCard._id} className="border rounded-lg shadow-md p-4 mb-4 bg-gray-50">
                            <p><strong>PAN Number:</strong> {panCard.pan_number || 'Not Available'}</p>
                            <p><strong>Full Name:</strong> {panCard.full_name || 'Not Available'}</p>
                            <p><strong>category:</strong> {panCard.category || 'Not Available'}</p>
                        </div>
                    ))
                ) : (
                    <p>No PAN cards found for this user.</p>
                )}

                <h3 className="text-xl font-bold mt-8 mb-4">Survey Answers</h3>
                {userDetails.surveys ? (
                    <div className="border rounded-lg shadow-md p-4 bg-gray-50">
                        <ul className="list-disc pl-6">
                            {userDetails.surveys.surveyquestions.map((question, index) => (
                                <li key={index}>
                                    <strong>Question:</strong> {question.Question} <br />
                                    <strong>Answer:</strong> {question.Answer}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No surveys found for this user.</p>
                )}
            </div>
        </div >
    );
}

export default UserProfile;