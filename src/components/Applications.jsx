"use client"

import { useEffect, useState } from "react"
// import axios from 'axios'; // COMMENTED OUT - Backend integration
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration
// import toast from 'react-hot-toast'; // COMMENTED OUT - Backend integration
import { useNavigate } from "react-router-dom"
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  User,
  Phone,
  Mail,
  Calendar,
  Filter,
  Search,
  Eye,
  AlertCircle,
} from "lucide-react"

// Dummy applications data
const DUMMY_APPLICATIONS = [
  {
    _id: "1",
    categoryId: { category: "Personal Loan" },
    status: "Pending",
    userId: { email: "john.doe@example.com" },
    assignedAdmin: null,
    profilesId: [
      {
        _id: "p1",
        fullName: "John Doe",
        phoneNo: "+1-234-567-8901",
        email: "john.doe@example.com",
        loanAmount: 50000,
        monthlyIncome: 8000,
      },
    ],
    formFields: [
      {
        assignedStaff: null,
        fieldName: "Personal Information",
        status: "Pending",
      },
    ],
    createdAt: "2024-01-15T10:30:00Z",
    priority: "High",
  },
  {
    _id: "2",
    categoryId: { category: "Home Loan" },
    status: "Pending",
    userId: { email: "jane.smith@example.com" },
    assignedAdmin: "admin1",
    profilesId: [
      {
        _id: "p2",
        fullName: "Jane Smith",
        phoneNo: "+1-234-567-8902",
        email: "jane.smith@example.com",
        loanAmount: 500000,
        monthlyIncome: 15000,
      },
    ],
    formFields: [
      {
        assignedStaff: "verifier1",
        fieldName: "Property Information",
        status: "Under Review",
      },
    ],
    createdAt: "2024-01-14T14:20:00Z",
    priority: "Medium",
  },
  {
    _id: "3",
    categoryId: { category: "Car Loan" },
    status: "Verified",
    userId: { email: "mike.johnson@example.com" },
    assignedAdmin: "admin1",
    profilesId: [
      {
        _id: "p3",
        fullName: "Mike Johnson",
        phoneNo: "+1-234-567-8903",
        email: "mike.johnson@example.com",
        loanAmount: 75000,
        monthlyIncome: 12000,
      },
    ],
    formFields: [
      {
        assignedStaff: "verifier1",
        fieldName: "Vehicle Information",
        status: "Verified",
      },
    ],
    createdAt: "2024-01-13T09:15:00Z",
    priority: "Low",
  },
  {
    _id: "4",
    categoryId: { category: "Business Loan" },
    status: "Rejected",
    userId: { email: "sarah.wilson@example.com" },
    assignedAdmin: "admin2",
    profilesId: [
      {
        _id: "p4",
        fullName: "Sarah Wilson",
        phoneNo: "+1-234-567-8904",
        email: "sarah.wilson@example.com",
        loanAmount: 200000,
        monthlyIncome: 25000,
      },
    ],
    formFields: [
      {
        assignedStaff: "verifier2",
        fieldName: "Business Information",
        status: "Rejected",
      },
    ],
    createdAt: "2024-01-12T16:45:00Z",
    priority: "High",
    rejectionReason: "Insufficient business documentation",
  },
  {
    _id: "5",
    categoryId: { category: "Personal Loan" },
    status: "Applied",
    userId: { email: "david.brown@example.com" },
    assignedAdmin: "admin1",
    profilesId: [
      {
        _id: "p5",
        fullName: "David Brown",
        phoneNo: "+1-234-567-8905",
        email: "david.brown@example.com",
        loanAmount: 30000,
        monthlyIncome: 6000,
      },
    ],
    formFields: [
      {
        assignedStaff: "verifier1",
        fieldName: "Personal Information",
        status: "Applied",
      },
    ],
    createdAt: "2024-01-11T11:30:00Z",
    priority: "Medium",
    appliedDate: "2024-01-16T10:00:00Z",
  },
]

// Dummy current user context
const DUMMY_CURRENT_USER = {
  id: "admin1",
  role: "Admin", // Can be "Admin", "Preparer", or "Verifier"
  email: "admin@example.com",
}

function Applications() {
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration
  const currentuser = DUMMY_CURRENT_USER // Using dummy data
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [priorityFilter, setPriorityFilter] = useState("All")
  const navigate = useNavigate()

  const checkisApplicationAssigned = (application) => {
    for (const form of application.formFields) {
      if (form.assignedStaff && form.assignedStaff == currentuser.id) {
        return true
      }
    }
    return false
  }

  const fetchApplications = async () => {
    // Simulate API delay
    setTimeout(() => {
      let filterapplications = DUMMY_APPLICATIONS

      if (currentuser.role == "Preparer") {
        filterapplications = DUMMY_APPLICATIONS.filter(
          (app) => app.assignedAdmin && app.assignedAdmin === currentuser.id,
        )
      } else if (currentuser.role == "Verifier") {
        filterapplications = DUMMY_APPLICATIONS.filter((app) => checkisApplicationAssigned(app))
      }

      setApplications(filterapplications)
      setLoading(false)
    }, 1000)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const response = await axios.post('/api/application/find', {
        userId: currentuser.id
      });
      if (response.data.status) {
        let filterapplications = response.data.applications;
        if(currentuser.role == "Preparer") {
          filterapplications = response.data.applications.filter(app => app.assignedAdmin && app.assignedAdmin === currentuser.id)
        } else if(currentuser.role == "Verifier") {
          filterapplications = response.data.applications.filter(app => checkisApplicationAssigned(app))
        }
        setApplications(filterapplications);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch applications');
    } finally {
      setLoading(false);
    }
    */
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  const categorizeApplications = () => {
    let filteredApps = applications

    // Apply search filter
    if (searchTerm) {
      filteredApps = filteredApps.filter(
        (app) =>
          app.userId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.categoryId.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.profilesId.some((profile) => profile.fullName.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filteredApps = filteredApps.filter((app) => app.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "All") {
      filteredApps = filteredApps.filter((app) => app.priority === priorityFilter)
    }

    const unassignedApplications = filteredApps.filter((app) => !app.assignedAdmin)
    const assignedNotVerifiedApplications = filteredApps.filter(
      (app) => app.assignedAdmin != null && app.status == "Pending",
    )
    const verifiedNotAppliedApplications = filteredApps.filter((app) => app.status == "Verified")
    const RejectedApplications = filteredApps.filter((app) => app.status == "Rejected")
    const appliedVerifiedApplications = filteredApps.filter((app) => app.status == "Applied")

    return {
      unassignedApplications,
      assignedNotVerifiedApplications,
      verifiedNotAppliedApplications,
      appliedVerifiedApplications,
      RejectedApplications,
    }
  }

  const {
    unassignedApplications,
    assignedNotVerifiedApplications,
    verifiedNotAppliedApplications,
    appliedVerifiedApplications,
    RejectedApplications,
  } = categorizeApplications()

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "Verified":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "Applied":
        return <Send className="w-5 h-5 text-blue-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium"
    switch (status) {
      case "Pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case "Verified":
        return `${baseClasses} bg-green-100 text-green-800`
      case "Rejected":
        return `${baseClasses} bg-red-100 text-red-800`
      case "Applied":
        return `${baseClasses} bg-blue-100 text-blue-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded text-xs font-medium"
    switch (priority) {
      case "High":
        return `${baseClasses} bg-red-100 text-red-700`
      case "Medium":
        return `${baseClasses} bg-yellow-100 text-yellow-700`
      case "Low":
        return `${baseClasses} bg-green-100 text-green-700`
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const ApplicationCard = ({ application, showAssignedInfo = false }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {getStatusIcon(application.status)}
          <div>
            <h3 className="font-semibold text-gray-800">{application.categoryId.category}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className={getStatusBadge(application.status)}>{application.status}</span>
              <span className={getPriorityBadge(application.priority)}>{application.priority}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(application.createdAt)}
          </div>
          {application.appliedDate && (
            <div className="text-xs text-blue-600">Applied: {formatDate(application.appliedDate)}</div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="mb-4">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <Mail className="w-4 h-4 mr-2" />
          <span className="font-medium">Applicant:</span>
          <span className="ml-1">{application.userId.email}</span>
        </div>
        {showAssignedInfo && application.assignedAdmin && (
          <div className="text-xs text-gray-500">Assigned to: {application.assignedAdmin}</div>
        )}
      </div>

      {/* Profiles */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
          <User className="w-4 h-4 mr-1" />
          Applied Profiles ({application.profilesId.length})
        </h4>
        <div className="space-y-2">
          {application.profilesId.length > 0 ? (
            application.profilesId.map((profile) => (
              <div key={profile._id} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <User className="w-3 h-3 mr-1 text-gray-400" />
                    <span className="font-medium">{profile.fullName}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-3 h-3 mr-1 text-gray-400" />
                    <span>{profile.phoneNo}</span>
                  </div>
                  {profile.loanAmount && (
                    <div className="text-xs text-gray-600">Loan Amount: ${profile.loanAmount.toLocaleString()}</div>
                  )}
                  {profile.monthlyIncome && (
                    <div className="text-xs text-gray-600">
                      Monthly Income: ${profile.monthlyIncome.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 italic">No profiles applied for this application.</p>
          )}
        </div>
      </div>

      {/* Rejection Reason */}
      {application.status === "Rejected" && application.rejectionReason && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center text-sm text-red-700">
            <AlertCircle className="w-4 h-4 mr-2" />
            <span className="font-medium">Rejection Reason:</span>
          </div>
          <p className="text-sm text-red-600 mt-1">{application.rejectionReason}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">ID: {application._id}</div>
        <button
          onClick={() => navigate(`/admin/application/${application._id}`)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
        >
          <Eye className="w-4 h-4 mr-2" />
          View Details
        </button>
      </div>
    </div>
  )

  const SectionHeader = ({ title, count, icon: Icon, color = "blue" }) => (
    <div className={`flex items-center justify-between p-4 bg-${color}-50 border border-${color}-200 rounded-lg mb-4`}>
      <div className="flex items-center space-x-3">
        <div className={`p-2 bg-${color}-100 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
        <div>
          <h3 className={`text-lg font-semibold text-${color}-800`}>{title}</h3>
          <p className={`text-sm text-${color}-600`}>{count} applications</p>
        </div>
      </div>
      <div className={`px-3 py-1 bg-${color}-100 text-${color}-800 rounded-full text-sm font-medium`}>{count}</div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg">Loading applications...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Applications Management</h1>
          <p className="text-gray-600">
            Manage and track loan applications across different stages - Role: {currentuser.role}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
              <option value="Applied">Applied</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
            <div className="flex items-center text-sm text-gray-600">
              <Filter className="w-4 h-4 mr-2" />
              Total: {applications.length} applications
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Unassigned</p>
                <p className="text-xl font-bold text-gray-800">{unassignedApplications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-xl font-bold text-gray-800">{assignedNotVerifiedApplications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Verified</p>
                <p className="text-xl font-bold text-gray-800">{verifiedNotAppliedApplications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-xl font-bold text-gray-800">{RejectedApplications.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Send className="w-5 h-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Applied</p>
                <p className="text-xl font-bold text-gray-800">{appliedVerifiedApplications.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Unassigned Applications */}
        <div className="mb-8">
          <SectionHeader
            title="Unassigned Applications"
            count={unassignedApplications.length}
            icon={FileText}
            color="gray"
          />
          {unassignedApplications.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {unassignedApplications.map((application) => (
                <ApplicationCard key={application._id} application={application} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No unassigned applications found.</p>
            </div>
          )}
        </div>

        {/* Assigned and Not Verified Applications */}
        <div className="mb-8">
          <SectionHeader
            title="Assigned & Pending Verification"
            count={assignedNotVerifiedApplications.length}
            icon={Clock}
            color="yellow"
          />
          {assignedNotVerifiedApplications.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {assignedNotVerifiedApplications.map((application) => (
                <ApplicationCard key={application._id} application={application} showAssignedInfo={true} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No assigned and pending applications found.</p>
            </div>
          )}
        </div>

        {/* Verified and Not Applied Applications */}
        <div className="mb-8">
          <SectionHeader
            title="Verified & Ready to Apply"
            count={verifiedNotAppliedApplications.length}
            icon={CheckCircle}
            color="green"
          />
          {verifiedNotAppliedApplications.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {verifiedNotAppliedApplications.map((application) => (
                <ApplicationCard key={application._id} application={application} showAssignedInfo={true} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
              <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No verified applications ready to apply found.</p>
            </div>
          )}
        </div>

        {/* Rejected Applications */}
        <div className="mb-8">
          <SectionHeader title="Rejected Applications" count={RejectedApplications.length} icon={XCircle} color="red" />
          {RejectedApplications.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {RejectedApplications.map((application) => (
                <ApplicationCard key={application._id} application={application} showAssignedInfo={true} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
              <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No rejected applications found.</p>
            </div>
          )}
        </div>

        {/* Applied Applications */}
        <div className="mb-8">
          <SectionHeader
            title="Successfully Applied"
            count={appliedVerifiedApplications.length}
            icon={Send}
            color="blue"
          />
          {appliedVerifiedApplications.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {appliedVerifiedApplications.map((application) => (
                <ApplicationCard key={application._id} application={application} showAssignedInfo={true} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-8 text-center border border-gray-200">
              <Send className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No successfully applied applications found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Applications
