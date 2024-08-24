import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Applications() {
  const { currentuser } = useContext(UserContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkisApplicationAssigned = (application) => {
    for(let form of application.formFields) {
      if(form.assignedStaff && form.assignedStaff == currentuser.id) {
        console.log(form);
        return true;
      }
    }
    return false;
  }

  const fetchApplications = async () => {
    try {
      const response = await axios.post('/api/application/find', {
        userId: currentuser.id
      });
      if (response.data.status) {
        let filterapplications=response.data.applications;
        if(currentuser.role=="Preparer") {
          filterapplications=response.data.applications.filter(app => app.assignedAdmin && app.assignedAdmin === currentuser.id)
        } else if(currentuser.role=="Verifier") {
          filterapplications=response.data.applications.filter(app => checkisApplicationAssigned(app))
        }
        setApplications(filterapplications);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const categorizeApplications = () => {
    const unassignedApplications = applications.filter(app => !app.assignedAdmin);
    const assignedNotVerifiedApplications = applications.filter(app => app.assignedAdmin != null && app.status == 'Pending');
    const verifiedNotAppliedApplications = applications.filter(app => app.status == 'Verified');
    const RejectedApplications = applications.filter(app => app.status == 'Rejected');
    const appliedVerifiedApplications = applications.filter(app => app.status == 'Applied');

    return { unassignedApplications, assignedNotVerifiedApplications, verifiedNotAppliedApplications, appliedVerifiedApplications, RejectedApplications };
  };

  const { unassignedApplications, assignedNotVerifiedApplications, verifiedNotAppliedApplications, appliedVerifiedApplications, RejectedApplications } = categorizeApplications();

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
        <h2 className="text-2xl font-bold mb-4 text-center">Applications</h2>

        <h3 className="text-xl font-bold mt-8 mb-4">Unassigned Forms</h3>
        {unassignedApplications.length > 0 ? (
          unassignedApplications.map(application => (
            <div key={application._id} className="border rounded-lg shadow-md p-4 mb-1 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 mb-1">
                <p><strong>Category:</strong> {application.categoryId ? application.categoryId.category : 'Not Available'}</p>
                <p><strong>Status:</strong> {application.status}</p>
              </div>
              <h5 className="text-md font-bold">User: {application.userId.email}</h5><h5 className="text-md font-bold mb-2">Users Applied</h5>
              <div className='flex flex-cols flex-wrap gap-x-2'>
                {application.profilesId.length > 0 ? (
                  application.profilesId.map((profile) => (
                    <div key={profile._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                      <p><strong>Name:</strong> {profile.fullName}</p>
                      <p><strong>Phone:</strong> {profile.phoneNo}</p>
                    </div>
                  ))
                ) : (
                  <p>No users applied for this application.</p>
                )}
              </div>
              <button onClick={() => navigate(`/admin/application/${application._id}`)} className="mt-2 text-blue-500">
                Show Full Form
              </button>
            </div>
          ))
        ) : (
          <p>No unassigned applications found.</p>
        )}

        <h3 className="text-xl font-bold mt-8 mb-4">Assigned and Not Verified Applications</h3>
        {assignedNotVerifiedApplications.length > 0 ? (
          assignedNotVerifiedApplications.map(application => (
            <div key={application._id} className="border rounded-lg shadow-md p-4 mb-1 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 mb-1">
                <p><strong>Category:</strong> {application.categoryId ? application.categoryId.category : 'Not Available'}</p>
                <p><strong>Status:</strong> {application.status}</p>
              </div>
              <h5 className="text-md font-bold">User: {application.userId.email}</h5><h5 className="text-md font-bold mb-2">Users Applied</h5>
              <div className='flex flex-cols flex-wrap gap-x-2'>
                {application.profilesId.length > 0 ? (
                  application.profilesId.map((profile) => (
                    <div key={profile._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                      <p><strong>Name:</strong> {profile.fullName}</p>
                      <p><strong>Phone:</strong> {profile.phoneNo}</p>
                    </div>
                  ))
                ) : (
                  <p>No users applied for this application.</p>
                )}
              </div>
              <button onClick={() => navigate(`/admin/application/${application._id}`)} className="mt-2 text-blue-500">
                Show Full Form
              </button>
            </div>
          ))
        ) : (
          <p>No assigned and not verified applications found.</p>
        )}

        <h3 className="text-xl font-bold mt-8 mb-4">Verified and Not Applied Applications</h3>
        {verifiedNotAppliedApplications.length > 0 ? (
          verifiedNotAppliedApplications.map(application => (
            <div key={application._id} className="border rounded-lg shadow-md p-4 mb-1 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 mb-1">
                <p><strong>Category:</strong> {application.categoryId ? application.categoryId.category : 'Not Available'}</p>
                <p><strong>Status:</strong> {application.status}</p>
                
              </div>

              <h5 className="text-md font-bold">User: {application.userId.email}</h5><h5 className="text-md font-bold mb-2">Users Applied</h5>
              <div className='flex flex-cols flex-wrap gap-x-2'>
                {application.profilesId.length > 0 ? (
                  application.profilesId.map((profile) => (
                    <div key={profile._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                      <p><strong>Name:</strong> {profile.fullName}</p>
                      <p><strong>Phone:</strong> {profile.phoneNo}</p>
                    </div>
                  ))
                ) : (
                  <p>No users applied for this application.</p>
                )}
              </div>
              <button onClick={() => navigate(`/admin/application/${application._id}`)} className="mt-2 text-blue-500">
                Show Full Form
              </button>
            </div>
          ))
        ) : (
          <p>No verified and not applied applications found.</p>
        )}

        <h3 className="text-xl font-bold mt-8 mb-4">Rejected Forms</h3>
        {RejectedApplications.length > 0 ? (
          RejectedApplications.map(application => (
            <div key={application._id} className="border rounded-lg shadow-md p-4 mb-1 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 mb-1">
                <p><strong>Category:</strong> {application.categoryId ? application.categoryId.category : 'Not Available'}</p>
                <p><strong>Status:</strong> {application.status}</p>
                
              </div>

              <h5 className="text-md font-bold">User: {application.userId.email}</h5><h5 className="text-md font-bold mb-2">Users Applied</h5>
              <div className='flex flex-cols flex-wrap gap-x-2'>
                {application.profilesId.length > 0 ? (
                  application.profilesId.map((profile) => (
                    <div key={profile._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                      <p><strong>Name:</strong> {profile.fullName}</p>
                      <p><strong>Phone:</strong> {profile.phoneNo}</p>
                    </div>
                  ))
                ) : (
                  <p>No users applied for this application.</p>
                )}
              </div>
              <button onClick={() => navigate(`/admin/application/${application._id}`)} className="mt-2 text-blue-500">
                Show Full Form
              </button>
            </div>
          ))
        ) : (
          <p>No applied applications found.</p>
        )}

        <h3 className="text-xl font-bold mt-8 mb-4">Applied Forms</h3>
        {appliedVerifiedApplications.length > 0 ? (
          appliedVerifiedApplications.map(application => (
            <div key={application._id} className="border rounded-lg shadow-md p-4 mb-1 bg-gray-50">
              <div className="grid grid-cols-3 gap-4 mb-1">
                <p><strong>Category:</strong> {application.categoryId ? application.categoryId.category : 'Not Available'}</p>
                <p><strong>Status:</strong> {application.status}</p>
                
              </div>

              <h5 className="text-md font-bold">User: {application.userId.email}</h5><h5 className="text-md font-bold mb-2">Users Applied</h5>
              <div className='flex flex-cols flex-wrap gap-x-2'>
                {application.profilesId.length > 0 ? (
                  application.profilesId.map((profile) => (
                    <div key={profile._id} className="border rounded p-2 mb-2 bg-white shadow-sm">
                      <p><strong>Name:</strong> {profile.fullName}</p>
                      <p><strong>Phone:</strong> {profile.phoneNo}</p>
                    </div>
                  ))
                ) : (
                  <p>No users applied for this application.</p>
                )}
              </div>
              <button onClick={() => navigate(`/admin/application/${application._id}`)} className="mt-2 text-blue-500">
                Show Full Form
              </button>
            </div>
          ))
        ) : (
          <p>No applied applications found.</p>
        )}
      </div>
    </div>
  );
}

export default Applications;