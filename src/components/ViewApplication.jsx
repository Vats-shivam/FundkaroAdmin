"use client"

import { useEffect, useState } from "react"
// import axios from 'axios'; // COMMENTED OUT - Backend integration
import { useParams, useNavigate } from "react-router-dom"
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration
// import toast from 'react-hot-toast'; // COMMENTED OUT - Backend integration
import {
  ArrowLeft,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Download,
  Send,
  Building2,
  DollarSign,
  Calendar,
  Shield,
  Users,
  MessageSquare,
  Eye,
  UserCheck,
  Settings,
} from "lucide-react"

// Dummy current user context
const DUMMY_CURRENT_USER = {
  id: "admin1",
  role: "Admin", // Can be "Admin", "Preparer", or "Verifier"
  email: "admin@example.com",
}

// Dummy application data
const DUMMY_APPLICATION = {
  _id: "app123",
  categoryId: {
    category: "Personal Loan",
    logo: "/placeholder.svg?height=64&width=64",
  },
  status: "Pending",
  userId: { email: "john.doe@example.com" },
  assignedAdmin: "admin1",
  isSelectionDone: false,
  message: "Application submitted for review. Please verify all documents.",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-16T14:20:00Z",
  priority: "High",
  profilesId: [
    {
      _id: "profile1",
      fullName: "John Doe",
      phoneNo: "+1-234-567-8901",
      email: "john.doe@example.com",
      aadharNo: "1234-5678-9012",
      panNo: "ABCDE1234F",
      address: {
        city: "New York",
        state: "NY",
        pincode: "10001",
        street: "123 Main Street",
      },
      monthlyIncome: 8000,
      employmentType: "Salaried",
      creditScore: 750,
    },
  ],
  loans: [
    {
      loan: {
        _id: "loan1",
        vendor: "ABC Bank",
        logo: "/placeholder.svg?height=64&width=64",
        minLoanAmount: 10000,
        maxLoanAmount: 500000,
        minScoreRequired: 650,
        tenureMin: 12,
        tenureMax: 60,
        interestRate: "10.5%",
      },
      isSelected: true,
      status: "Pending",
      appliedAmount: 50000,
      selectedTenure: 36,
    },
    {
      loan: {
        _id: "loan2",
        vendor: "XYZ Financial",
        logo: "/placeholder.svg?height=64&width=64",
        minLoanAmount: 5000,
        maxLoanAmount: 300000,
        minScoreRequired: 600,
        tenureMin: 6,
        tenureMax: 48,
        interestRate: "12.0%",
      },
      isSelected: false,
      status: "Rejected",
      appliedAmount: 0,
      selectedTenure: 0,
    },
  ],
  formFields: [
    {
      _id: "field1",
      name: "Personal Information",
      value: "John Doe, 30 years old, Software Engineer",
      type: "text",
      isVerified: "Pending",
      assignedStaff: "verifier1",
      verifiedAt: null,
      comments: "",
    },
    {
      _id: "field2",
      name: "Income Certificate",
      value: "income_certificate_john_doe.pdf",
      type: "file",
      isVerified: "Verified",
      assignedStaff: "verifier1",
      verifiedAt: "2024-01-16T10:00:00Z",
      comments: "Document verified successfully",
    },
    {
      _id: "field3",
      name: "Bank Statements",
      value: "bank_statements_6months.pdf",
      type: "file",
      isVerified: "Rejected",
      assignedStaff: "verifier2",
      verifiedAt: "2024-01-16T11:30:00Z",
      comments: "Statements are incomplete, missing last 2 months",
    },
  ],
}

// Dummy admins/preparers data
const DUMMY_ADMINS = [
  {
    _id: "admin1",
    fullName: "Alice Johnson",
    user: {
      _id: "admin1",
      email: "alice.johnson@company.com",
      phoneNo: "+1-234-567-8900",
      profilePicture: "/placeholder.svg?height=80&width=80",
    },
    department: "Loan Processing",
    experience: "5 years",
  },
  {
    _id: "admin2",
    fullName: "Bob Smith",
    user: {
      _id: "admin2",
      email: "bob.smith@company.com",
      phoneNo: "+1-234-567-8901",
      profilePicture: "/placeholder.svg?height=80&width=80",
    },
    department: "Risk Assessment",
    experience: "3 years",
  },
]

// Dummy staff/verifiers data
const DUMMY_STAFFS = [
  {
    _id: "verifier1",
    fullName: "Carol Williams",
    user: {
      _id: "verifier1",
      email: "carol.williams@company.com",
      phoneNo: "+1-234-567-8902",
      profilePicture: "/placeholder.svg?height=80&width=80",
    },
    specialization: "Document Verification",
    workload: "12 pending",
  },
  {
    _id: "verifier2",
    fullName: "David Brown",
    user: {
      _id: "verifier2",
      email: "david.brown@company.com",
      phoneNo: "+1-234-567-8903",
      profilePicture: "/placeholder.svg?height=80&width=80",
    },
    specialization: "Financial Analysis",
    workload: "8 pending",
  },
]

function ViewApplication() {
  const { applicationId } = useParams()
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration
  const currentuser = DUMMY_CURRENT_USER // Using dummy data
  const navigate = useNavigate()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [admins, setAdmins] = useState([])
  const [staffs, setStaffs] = useState([])
  const [selectedAdminId, setSelectedAdminId] = useState(null)
  const [selectedStaffIds, setSelectedStaffIds] = useState({})
  const [message, setMessage] = useState("")
  const [assignedAdmin, setAssignedAdmin] = useState(null)
  const [assignedStaffs, setAssignedStaffs] = useState({})
  const [activeTab, setActiveTab] = useState("overview")

  const fetchApplication = async () => {
    // Simulate API delay
    setTimeout(() => {
      setApplication(DUMMY_APPLICATION)
      const initialSelectedStaff = {}
      const assignedStaffsData = {}

      DUMMY_APPLICATION.formFields.forEach((field) => {
        initialSelectedStaff[field._id] = field.assignedStaff || null
        if (initialSelectedStaff[field._id]) {
          assignedStaffsData[field._id] = DUMMY_STAFFS.find((staff) => staff.user._id == field.assignedStaff)
        }
      })

      setAssignedStaffs(assignedStaffsData)
      const assignedAdminData = DUMMY_ADMINS.find((admin) => admin.user._id == DUMMY_APPLICATION.assignedAdmin)
      setAssignedAdmin(assignedAdminData)
      setSelectedStaffIds(initialSelectedStaff)
      setMessage(DUMMY_APPLICATION.message || "")
      setLoading(false)
    }, 1000)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const response = await axios.post('/api/application/findbyid', {
        userId: currentuser.id,
        applicationId: applicationId
      });
      if (response.data.status) {
        setApplication(response.data.application);
        const initialSelectedStaff = {};
        let assignedStaffs = {};
        response.data.application.formFields.forEach(field => {
          initialSelectedStaff[field._id] = field.assignedStaff || null;
          if (initialSelectedStaff[field._id]) {
            assignedStaffs[field._id] = staffs.find(staff => staff.user._id == field.assignedStaff);
          }
        });
        setAssignedStaffs(assignedStaffs);
        const assignedAdmin = admins.find(admin => admin.user._id == response.data.application.assignedAdmin);
        setAssignedAdmin(assignedAdmin);
        setSelectedStaffIds(initialSelectedStaff);
        setMessage(response.data.application.message || '');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch application details');
    } finally {
      setLoading(false);
    }
    */
  }

  const fetchAdmins = async () => {
    // Simulate API delay
    setTimeout(() => {
      setAdmins(DUMMY_ADMINS)
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const response = await axios.post('/api/admin/findusersbyrole', {
        userId: currentuser.id,
        role: 'Preparer'
      });
      if (response.data.status) {
        setAdmins(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch admin data');
    }
    */
  }

  const fetchStaffs = async () => {
    // Simulate API delay
    setTimeout(() => {
      setStaffs(DUMMY_STAFFS)
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const response = await axios.post('/api/admin/findusersbyrole', {
        userId: currentuser.id,
        role: 'Verifier'
      });
      if (response.data.status) {
        setStaffs(response.data.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch staff data');
    }
    */
  }

  useEffect(() => {
    fetchAdmins()
    fetchStaffs()
  }, [])

  useEffect(() => {
    if (admins.length > 0) {
      fetchApplication()
    }
  }, [admins, staffs])

  const handleStaffChange = (formFieldId, staffId) => {
    setSelectedStaffIds((prev) => ({
      ...prev,
      [formFieldId]: prev[formFieldId] === staffId ? null : staffId,
    }))
  }

  const handleAssignAdmin = async () => {
    if (!selectedAdminId) {
      alert("Please select an admin to assign")
      return
    }

    // Simulate API call
    setTimeout(() => {
      alert("Assigned Preparer updated successfully")
      fetchApplication()
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
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
    */
  }

  const handleAssignVerifier = async (formFieldId) => {
    const assignedStaffId = selectedStaffIds[formFieldId]
    if (!assignedStaffId) {
      alert("Please select a verifier to assign")
      return
    }

    // Simulate API call
    setTimeout(() => {
      alert("Verifier assigned successfully")
      fetchApplication()
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
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
    */
  }

  const handleUpdateFieldStatus = async (formFieldId, status) => {
    // Simulate API call
    setTimeout(() => {
      alert(`Form field marked as ${status}`)
      fetchApplication()
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const response = await axios.put('/api/application/updateform', {
        userId: currentuser.id,
        formFieldId: formFieldId,
        isVerified: status
      });
      if (response.data.status) {
        toast.success(`Form field marked as ${status}`);
        fetchApplication();
      }
    } catch (error) {
      console.error(error);
      toast.error(`Failed to mark form field as ${status}`);
    }
    */
  }

  const handleUpdateApplicationStatus = async (status) => {
    if (status == "Verified") {
      for (const field of application.formFields) {
        if (field.isVerified !== "Verified") {
          alert("All form fields must be verified to verify the form")
          return
        }
      }
    } else if (status == "Rejected" && application.isSelectionDone) {
      alert("You cannot Reject Application at current stage")
      return
    } else if (status == "Applied") {
      for (const field of application.loans) {
        if (field.isSelected && field.status != "Applied") {
          alert("All loans need to mentioned Applied to complete Application as applied")
          return
        }
      }
    }

    // Simulate API call
    setTimeout(() => {
      alert(`Application marked as ${status}`)
      fetchApplication()
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
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
    */
  }

  const handleDeleteApplication = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this application?")
    if (!confirmDelete) return

    // Simulate API call
    setTimeout(() => {
      alert("Application deleted successfully")
      navigate(-1)
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const response = await axios.post('/api/application/delete', { 
        userId: currentuser.id, 
        applicationId: applicationId 
      });
      if (response.data.status) {
        toast.success('Application deleted successfully');
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete application');
    }
    */
  }

  const handleUpdateLoanStatus = async (id, stats) => {
    // Simulate API call
    setTimeout(() => {
      alert(`Updated Loan status as ${stats}`)
      fetchApplication()
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
    var applicatn = application
    for (let i = 0; i < applicatn.loans.length; i++) {
      if (applicatn.loans[i].loan._id == id) {
        applicatn.loans[i].status = stats
        break;
      }
    }
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
    */
  }

  const handleUpdateMessage = async () => {
    // Simulate API call
    setTimeout(() => {
      alert("Message updated successfully")
      fetchApplication()
    }, 500)

    /* COMMENTED OUT - BACKEND INTEGRATION
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
    */
  }

  const checkformFieldPermission = (form) => {
    if (currentuser.role != "Verifier") {
      return true
    }
    if (form.assignedStaff == currentuser.id) {
      return true
    }
    return false
  }

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600 text-lg">Loading application details...</div>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Application Not Found</h2>
          <p className="text-gray-600 mb-4">The requested application could not be found.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Application Details</h1>
              <p className="text-gray-600">ID: {application._id}</p>
            </div>
          </div>
          {currentuser.role == "Admin" && (
            <button
              onClick={handleDeleteApplication}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Application
            </button>
          )}
        </div>

        {/* Status Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              {getStatusIcon(application.status)}
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <span className={getStatusBadge(application.status)}>{application.status}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-medium text-gray-800">{formatDate(application.createdAt)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Building2 className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium text-gray-800">{application.categoryId.category}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Selection Status</p>
                <p className="font-medium text-gray-800">{application.isSelectionDone ? "Completed" : "Pending"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: Eye },
                { id: "loans", label: "Loans", icon: DollarSign },
                { id: "profiles", label: "Profiles", icon: Users },
                { id: "documents", label: "Documents", icon: FileText },
                { id: "assignments", label: "Assignments", icon: UserCheck },
                { id: "messages", label: "Messages", icon: MessageSquare },
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Category Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    Loan Category
                  </h3>
                  <div className="flex items-center space-x-4">
                    <img
                      src={application.categoryId.logo || "/placeholder.svg"}
                      alt="Category Logo"
                      className="w-16 h-16 rounded-lg border border-gray-200"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{application.categoryId.category}</p>
                      <p className="text-sm text-gray-600">Loan category for this application</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-blue-600">Total Documents</p>
                        <p className="text-2xl font-bold text-blue-800">{application.formFields.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-green-600">Verified Documents</p>
                        <p className="text-2xl font-bold text-green-800">
                          {application.formFields.filter((f) => f.isVerified === "Verified").length}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-purple-600">Selected Loans</p>
                        <p className="text-2xl font-bold text-purple-800">
                          {application.loans.filter((l) => l.isSelected).length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loans Tab */}
            {activeTab === "loans" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">Applied Loans</h3>
                  <span className="text-sm text-gray-600">
                    Selection Status: {application.isSelectionDone ? "Completed" : "Pending"}
                  </span>
                </div>
                {application.loans.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {application.loans.map((loan) => (
                      <div
                        key={loan.loan._id}
                        className={`border rounded-lg p-6 ${
                          loan.isSelected ? "border-blue-200 bg-blue-50" : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={loan.loan.logo || "/placeholder.svg"}
                              alt="Loan Logo"
                              className="w-12 h-12 rounded-lg border border-gray-200"
                            />
                            <div>
                              <h4 className="font-semibold text-gray-800">{loan.loan.vendor}</h4>
                              <span className={getStatusBadge(loan.status)}>{loan.status}</span>
                            </div>
                          </div>
                          {loan.isSelected && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              Selected
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-gray-600">Loan Range</p>
                            <p className="font-medium">
                              ${loan.loan.minLoanAmount.toLocaleString()} - ${loan.loan.maxLoanAmount.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Interest Rate</p>
                            <p className="font-medium">{loan.loan.interestRate}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Min Credit Score</p>
                            <p className="font-medium">{loan.loan.minScoreRequired}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Tenure</p>
                            <p className="font-medium">
                              {loan.loan.tenureMin} - {loan.loan.tenureMax} months
                            </p>
                          </div>
                        </div>

                        {loan.isSelected && (
                          <div className="bg-white rounded-lg p-3 mb-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Applied Amount</p>
                                <p className="font-medium">${loan.appliedAmount.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-gray-600">Selected Tenure</p>
                                <p className="font-medium">{loan.selectedTenure} months</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {currentuser.role != "Verifier" && (
                          <div className="flex space-x-2">
                            {!application.isSelectionDone && (
                              <>
                                <button
                                  onClick={() => handleUpdateLoanStatus(loan.loan._id, "Verified")}
                                  className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                >
                                  Verify
                                </button>
                                <button
                                  onClick={() => handleUpdateLoanStatus(loan.loan._id, "Rejected")}
                                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                            {loan.isSelected && (
                              <button
                                onClick={() => handleUpdateLoanStatus(loan.loan._id, "Applied")}
                                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                              >
                                Mark as Applied
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No loans applied for this application.</p>
                  </div>
                )}
              </div>
            )}

            {/* Profiles Tab */}
            {activeTab === "profiles" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Applicant Profiles</h3>
                {application.profilesId.map((profile) => (
                  <div key={profile._id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Personal Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Full Name:</span>
                            <span className="ml-2 font-medium">{profile.fullName}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-gray-600">Email:</span>
                            <span className="ml-2 font-medium">{profile.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-3 h-3 mr-1 text-gray-400" />
                            <span className="text-gray-600">Phone:</span>
                            <span className="ml-2 font-medium">{profile.phoneNo}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Identity & Financial
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Aadhar:</span>
                            <span className="ml-2 font-medium font-mono">{profile.aadharNo}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">PAN:</span>
                            <span className="ml-2 font-medium font-mono">{profile.panNo}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Monthly Income:</span>
                            <span className="ml-2 font-medium">${profile.monthlyIncome.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Credit Score:</span>
                            <span className="ml-2 font-medium">{profile.creditScore}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-800 flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          Address & Employment
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-600">Address:</span>
                            <span className="ml-2 font-medium">
                              {profile.address.street}, {profile.address.city}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">State:</span>
                            <span className="ml-2 font-medium">
                              {profile.address.state} - {profile.address.pincode}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Employment:</span>
                            <span className="ml-2 font-medium">{profile.employmentType}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === "documents" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">Form Fields & Documents</h3>
                {application.formFields.map((field) => (
                  <div key={field._id}>
                    {checkformFieldPermission(field) && (
                      <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(field.isVerified)}
                            <div>
                              <h4 className="font-semibold text-gray-800">{field.name}</h4>
                              <span className={getStatusBadge(field.isVerified)}>{field.isVerified}</span>
                            </div>
                          </div>
                          {field.verifiedAt && (
                            <div className="text-right text-sm text-gray-500">
                              <p>Verified: {formatDate(field.verifiedAt)}</p>
                            </div>
                          )}
                        </div>

                        <div className="mb-4">
                          {field.type !== "file" ? (
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Value:</p>
                              <p className="font-medium text-gray-800">{field.value}</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm text-gray-600 mb-2">Document:</p>
                              <div className="flex items-center space-x-3">
                                <FileText className="w-8 h-8 text-blue-500" />
                                <div>
                                  <p className="font-medium text-gray-800">{field.value}</p>
                                  <button className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                                    <Download className="w-4 h-4 mr-1" />
                                    Download File
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {field.comments && (
                          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Comments:</p>
                            <p className="text-sm text-gray-800">{field.comments}</p>
                          </div>
                        )}

                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleUpdateFieldStatus(field._id, "Verified")}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                          >
                            Mark as Verified
                          </button>
                          <button
                            onClick={() => handleUpdateFieldStatus(field._id, "Rejected")}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            Mark as Rejected
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Assignments Tab */}
            {activeTab === "assignments" && (
              <div className="space-y-6">
                {/* Assigned Preparer */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2" />
                    Assigned Preparer
                  </h3>
                  {application.assignedAdmin && assignedAdmin ? (
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={assignedAdmin.user.profilePicture || "/placeholder.svg"}
                        alt="Preparer"
                        className="w-16 h-16 rounded-full border border-gray-200"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">{assignedAdmin.fullName}</p>
                        <p className="text-sm text-gray-600">{assignedAdmin.user.email}</p>
                        <p className="text-sm text-gray-600">{assignedAdmin.user.phoneNo}</p>
                        <p className="text-xs text-gray-500">
                          {assignedAdmin.department} • {assignedAdmin.experience}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 mb-4">No assigned preparer for this application.</p>
                  )}

                  {currentuser.role == "Admin" && (
                    <div className="flex space-x-3">
                      <select
                        onChange={(e) => setSelectedAdminId(e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Preparer</option>
                        {admins.map((admin) => (
                          <option key={admin._id} value={admin.user._id}>
                            {admin.fullName}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={handleAssignAdmin}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Assign Preparer
                      </button>
                    </div>
                  )}
                </div>

                {/* Field Assignments */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Verifier Assignments</h3>
                  <div className="space-y-4">
                    {application.formFields.map((field) => (
                      <div key={field._id} className="border border-gray-100 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-800">{field.name}</h4>
                          <span className={getStatusBadge(field.isVerified)}>{field.isVerified}</span>
                        </div>

                        {assignedStaffs[field._id] ? (
                          <div className="flex items-center space-x-3 mb-3">
                            <img
                              src={assignedStaffs[field._id].user.profilePicture || "/placeholder.svg"}
                              alt="Verifier"
                              className="w-10 h-10 rounded-full border border-gray-200"
                            />
                            <div>
                              <p className="font-medium text-gray-800">{assignedStaffs[field._id].fullName}</p>
                              <p className="text-sm text-gray-600">{assignedStaffs[field._id].user.email}</p>
                              <p className="text-xs text-gray-500">
                                {assignedStaffs[field._id].specialization} • {assignedStaffs[field._id].workload}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500 mb-3">No verifier assigned</p>
                        )}

                        {currentuser.role != "Verifier" && (
                          <div className="flex space-x-3">
                            <select
                              onChange={(e) => handleStaffChange(field._id, e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            >
                              <option value="">Select Verifier</option>
                              {staffs.map((staff) => (
                                <option key={staff._id} value={staff.user._id}>
                                  {staff.fullName}
                                </option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleAssignVerifier(field._id)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                              Assign
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === "messages" && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Application Message
                  </h3>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={6}
                    placeholder="Enter your message here..."
                  />
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleUpdateMessage}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Update Message
                    </button>
                  </div>
                </div>

                {/* Application Status Actions */}
                {currentuser.role != "Verifier" && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Application Status Management
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        onClick={() => handleUpdateApplicationStatus("Verified")}
                        className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Mark as Verified
                      </button>
                      <button
                        onClick={() => handleUpdateApplicationStatus("Rejected")}
                        className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        Mark as Rejected
                      </button>
                      <button
                        onClick={() => handleUpdateApplicationStatus("Applied")}
                        className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Send className="w-5 h-5 mr-2" />
                        Mark as Applied
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewApplication
