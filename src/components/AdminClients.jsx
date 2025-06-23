"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Download,
  Filter,
  Grid,
  List,
  Star,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Users,
  UserCheck,
  AlertCircle,
  EyeOff,
  EyeIcon,
} from "lucide-react"
import toast from "react-hot-toast"

// Dummy data for clients
const dummyClients = [
  {
    _id: "1",
    fullName: "Rajesh Kumar",
    user: {
      _id: "u1",
      email: "rajesh.kumar@email.com",
      phoneNo: "+91 9876543210",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: true,
      isSurveyCompleted: true,
    },
    address: {
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    panNo: "ABCDE1234F",
    aadharNo: "1234 5678 9012",
    internalRating: 4.5,
    creditScore: 750,
    totalLoans: 3,
    activeLoans: 1,
    lastActive: "2024-01-15",
    joinDate: "2023-06-15",
    loanHistory: "Excellent",
    riskLevel: "Low",
  },
  {
    _id: "2",
    fullName: "Priya Sharma",
    user: {
      _id: "u2",
      email: "priya.sharma@email.com",
      phoneNo: "+91 8765432109",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: false,
      isSurveyCompleted: true,
    },
    address: {
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    panNo: "FGHIJ5678K",
    aadharNo: "2345 6789 0123",
    internalRating: 4.2,
    creditScore: 720,
    totalLoans: 2,
    activeLoans: 0,
    lastActive: "2024-01-14",
    joinDate: "2023-08-20",
    loanHistory: "Good",
    riskLevel: "Medium",
  },
  {
    _id: "3",
    fullName: "Amit Patel",
    user: {
      _id: "u3",
      email: "amit.patel@email.com",
      phoneNo: "+91 7654321098",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isVerified: false,
      isProfileCompleted: false,
      isKYCVerified: false,
      isSurveyCompleted: false,
    },
    address: {
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380001",
    },
    panNo: "KLMNO9012P",
    aadharNo: "3456 7890 1234",
    internalRating: 3.8,
    creditScore: 680,
    totalLoans: 1,
    activeLoans: 1,
    lastActive: "2024-01-10",
    joinDate: "2023-11-05",
    loanHistory: "Average",
    riskLevel: "High",
  },
  {
    _id: "4",
    fullName: "Sneha Reddy",
    user: {
      _id: "u4",
      email: "sneha.reddy@email.com",
      phoneNo: "+91 6543210987",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: true,
      isSurveyCompleted: false,
    },
    address: {
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
    },
    panNo: "QRSTU3456V",
    aadharNo: "4567 8901 2345",
    internalRating: 4.7,
    creditScore: 780,
    totalLoans: 5,
    activeLoans: 2,
    lastActive: "2024-01-16",
    joinDate: "2023-04-10",
    loanHistory: "Excellent",
    riskLevel: "Low",
  },
  {
    _id: "5",
    fullName: "Vikram Singh",
    user: {
      _id: "u5",
      email: "vikram.singh@email.com",
      phoneNo: "+91 5432109876",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: false,
      isKYCVerified: true,
      isSurveyCompleted: true,
    },
    address: {
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
    },
    panNo: "WXYZ7890A",
    aadharNo: "5678 9012 3456",
    internalRating: 3.9,
    creditScore: 695,
    totalLoans: 2,
    activeLoans: 1,
    lastActive: "2024-01-12",
    joinDate: "2023-09-25",
    loanHistory: "Good",
    riskLevel: "Medium",
  },
  {
    _id: "6",
    fullName: "Kavya Nair",
    user: {
      _id: "u6",
      email: "kavya.nair@email.com",
      phoneNo: "+91 4321098765",
      profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: true,
      isSurveyCompleted: true,
    },
    address: {
      city: "Kochi",
      state: "Kerala",
      pincode: "682001",
    },
    panNo: "BCDEF1234G",
    aadharNo: "6789 0123 4567",
    internalRating: 4.3,
    creditScore: 735,
    totalLoans: 4,
    activeLoans: 1,
    lastActive: "2024-01-15",
    joinDate: "2023-07-08",
    loanHistory: "Good",
    riskLevel: "Low",
  },
]

function AdminClients() {
  // Commented out original context and API integration
  // const { currentuser } = useContext(UserContext);

  const [clients, setClients] = useState(dummyClients)
  const [filteredClients, setFilteredClients] = useState(dummyClients)
  const [formData, setFormData] = useState({
    email: "",
    phoneNo: "",
    fullName: "",
    password: "",
    address: {
      city: "",
      state: "",
      pincode: "",
    },
    panNo: "",
    aadharNo: "",
    isVerified: false,
    isProfileCompleted: false,
    isKYCVerified: false,
    isSurveyCompleted: false,
    internalRating: "",
  })
  const [editClientId, setEditClientId] = useState(null)
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Commented out original API call
  // const fetchAllClients = async () => {
  //   try {
  //     const response = await axios.post('/api/admin/findallusers', { userId: currentuser.id });
  //     if (response.data.status) {
  //       setClients(response.data.data);
  //       setFilteredClients(response.data.data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Failed to fetch client data');
  //   }
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (formData.panNo.length !== 10) {
      toast.error("PAN number must be 10 characters")
      return
    }
    if (formData.aadharNo.length !== 12) {
      toast.error("Aadhar number must be 12 digits")
      return
    }

    try {
      if (editClientId) {
        // Commented out API call
        // const response = await axios.put('/api/admin/updateuser', { Id: editClientId, ...formData, userId: currentuser.id });
        // if (response.data.status) {
        //   toast.success("Client updated successfully");
        // }

        // Simulate update with dummy data
        const updatedClients = clients.map((client) =>
          client._id === editClientId
            ? {
                ...client,
                fullName: formData.fullName,
                user: {
                  ...client.user,
                  email: formData.email,
                  phoneNo: formData.phoneNo,
                  isVerified: formData.isVerified,
                  isProfileCompleted: formData.isProfileCompleted,
                  isKYCVerified: formData.isKYCVerified,
                  isSurveyCompleted: formData.isSurveyCompleted,
                },
                address: formData.address,
                panNo: formData.panNo,
                aadharNo: formData.aadharNo,
                internalRating: Number.parseFloat(formData.internalRating),
              }
            : client,
        )
        setClients(updatedClients)
        setFilteredClients(updatedClients)
        toast.success("Client updated successfully")
      } else {
        // Commented out API call
        // const response = await axios.post('/api/admin/createuser', { ...formData, userId: currentuser.id });
        // if (response.data.status) {
        //   toast.success("Client created successfully");
        // }

        // Simulate create with dummy data
        const newClient = {
          _id: Date.now().toString(),
          fullName: formData.fullName,
          user: {
            _id: `u${Date.now()}`,
            email: formData.email,
            phoneNo: formData.phoneNo,
            profilePicture: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            isVerified: formData.isVerified,
            isProfileCompleted: formData.isProfileCompleted,
            isKYCVerified: formData.isKYCVerified,
            isSurveyCompleted: formData.isSurveyCompleted,
          },
          address: formData.address,
          panNo: formData.panNo,
          aadharNo: formData.aadharNo,
          internalRating: Number.parseFloat(formData.internalRating),
          creditScore: 650,
          totalLoans: 0,
          activeLoans: 0,
          lastActive: new Date().toISOString().split("T")[0],
          joinDate: new Date().toISOString().split("T")[0],
          loanHistory: "New",
          riskLevel: "Medium",
        }
        const updatedClients = [...clients, newClient]
        setClients(updatedClients)
        setFilteredClients(updatedClients)
        toast.success("Client created successfully")
      }
      resetForm()
    } catch (error) {
      console.error(error)
      toast.error("Error occurred during client operation")
    }
  }

  const handleEdit = (client) => {
    setFormData({
      email: client.user.email || "",
      phoneNo: client.user.phoneNo || "",
      fullName: client.fullName || "",
      password: "",
      address: client.address || { city: "", state: "", pincode: "" },
      panNo: client.panNo || "",
      aadharNo: client.aadharNo || "",
      isVerified: client.user.isVerified || false,
      isProfileCompleted: client.user.isProfileCompleted || false,
      isKYCVerified: client.user.isKYCVerified || false,
      isSurveyCompleted: client.user.isSurveyCompleted || false,
      internalRating: client.internalRating?.toString() || "",
    })
    setEditClientId(client._id)
    setIsFormVisible(true)
  }

  const handleDelete = async (clientId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this client?")
    if (confirmDelete) {
      try {
        // Commented out API call
        // const response = await axios.delete(`/api/admin/deleteuser`, { data: { clientId, userId: currentuser.id } });
        // if (response.data.status) {
        //   toast.success("Client deleted successfully");
        //   fetchAllClients();
        // }

        // Simulate delete with dummy data
        const updatedClients = clients.filter((client) => client._id !== clientId)
        setClients(updatedClients)
        setFilteredClients(updatedClients)
        toast.success("Client deleted successfully")
      } catch (error) {
        console.error(error)
        toast.error("Error occurred while deleting client")
      }
    }
  }

  const resetForm = () => {
    setFormData({
      email: "",
      phoneNo: "",
      fullName: "",
      password: "",
      address: {
        city: "",
        state: "",
        pincode: "",
      },
      panNo: "",
      aadharNo: "",
      isVerified: false,
      isProfileCompleted: false,
      isKYCVerified: false,
      isSurveyCompleted: false,
      internalRating: "",
    })
    setEditClientId(null)
    setIsFormVisible(false)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    applyFilters(value, filterStatus, sortBy, sortOrder)
  }

  const handleFilterChange = (status) => {
    setFilterStatus(status)
    applyFilters(searchTerm, status, sortBy, sortOrder)
  }

  const handleSort = (field) => {
    const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc"
    setSortBy(field)
    setSortOrder(newOrder)
    applyFilters(searchTerm, filterStatus, field, newOrder)
  }

  const applyFilters = (search, status, sort, order) => {
    let filtered = [...clients]

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (client) =>
          client.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          client.user.email?.toLowerCase().includes(search.toLowerCase()) ||
          client.user.phoneNo?.includes(search),
      )
    }

    // Status filter
    if (status !== "all") {
      switch (status) {
        case "verified":
          filtered = filtered.filter((client) => client.user.isVerified && client.user.isKYCVerified)
          break
        case "unverified":
          filtered = filtered.filter((client) => !client.user.isVerified || !client.user.isKYCVerified)
          break
        case "kyc-pending":
          filtered = filtered.filter((client) => !client.user.isKYCVerified)
          break
        case "profile-incomplete":
          filtered = filtered.filter((client) => !client.user.isProfileCompleted)
          break
      }
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue
      switch (sort) {
        case "name":
          aValue = a.fullName || ""
          bValue = b.fullName || ""
          break
        case "rating":
          aValue = a.internalRating || 0
          bValue = b.internalRating || 0
          break
        case "creditScore":
          aValue = a.creditScore || 0
          bValue = b.creditScore || 0
          break
        case "joinDate":
          aValue = new Date(a.joinDate || 0)
          bValue = new Date(b.joinDate || 0)
          break
        default:
          aValue = a.fullName || ""
          bValue = b.fullName || ""
      }

      if (order === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredClients(filtered)
  }

  const showProfile = (client) => {
    navigate(`/admin/clients/${client.user._id}`)
  }

  const exportToCSV = () => {
    const csvData = clients.map((client) => ({
      Name: client.fullName,
      Email: client.user.email,
      Phone: client.user.phoneNo,
      PAN: client.panNo,
      Aadhar: client.aadharNo,
      InternalRating: client.internalRating,
      CreditScore: client.creditScore,
      TotalLoans: client.totalLoans,
      ActiveLoans: client.activeLoans,
      RiskLevel: client.riskLevel,
      JoinDate: client.joinDate,
    }))

    // Simulate CSV export
    console.log("CSV Data:", csvData)
    toast.success("Clients exported to CSV successfully!")
  }

  const getStatusBadge = (client) => {
    if (client.user.isVerified && client.user.isKYCVerified && client.user.isProfileCompleted) {
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Verified</span>
    } else if (client.user.isVerified) {
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Partial</span>
    } else {
      return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Unverified</span>
    }
  }

  const getRiskBadge = (riskLevel) => {
    const colors = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800",
    }
    return <span className={`px-2 py-1 ${colors[riskLevel]} rounded-full text-xs font-medium`}>{riskLevel}</span>
  }

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  // Statistics calculations
  const totalClients = clients.length
  const verifiedClients = clients.filter((c) => c.user.isVerified && c.user.isKYCVerified).length
  const activeClients = clients.filter((c) => c.activeLoans > 0).length
  const averageRating = clients.reduce((sum, c) => sum + (c.internalRating || 0), 0) / totalClients

  useEffect(() => {
    // fetchAllClients(); // Commented out original API call
    applyFilters(searchTerm, filterStatus, sortBy, sortOrder)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Client Management</h1>
              <p className="text-gray-600 mt-1">Manage and monitor all client accounts</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {viewMode === "grid" ? <List className="w-4 h-4 mr-2" /> : <Grid className="w-4 h-4 mr-2" />}
                {viewMode === "grid" ? "Table View" : "Grid View"}
              </button>
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isFormVisible ? "Hide Form" : "Add Client"}
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{totalClients}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Verified Clients</p>
                  <p className="text-2xl font-bold text-gray-900">{verifiedClients}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Loans</p>
                  <p className="text-2xl font-bold text-gray-900">{activeClients}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search clients by name, email, or phone..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={filterStatus}
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="verified">Verified</option>
                    <option value="unverified">Unverified</option>
                    <option value="kyc-pending">KYC Pending</option>
                    <option value="profile-incomplete">Profile Incomplete</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => handleSort(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                    <option value="creditScore">Credit Score</option>
                    <option value="joinDate">Join Date</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form */}
        {isFormVisible && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editClientId ? "Edit Client" : "Add New Client"}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phoneNo}
                      onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required={!editClientId}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Internal Rating</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      step="0.1"
                      value={formData.internalRating}
                      onChange={(e) => setFormData({ ...formData, internalRating: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Address Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.address.city}
                      onChange={(e) =>
                        setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={formData.address.state}
                      onChange={(e) =>
                        setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={formData.address.pincode}
                      onChange={(e) =>
                        setFormData({ ...formData, address: { ...formData.address, pincode: e.target.value } })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                    <input
                      type="text"
                      value={formData.panNo}
                      onChange={(e) => setFormData({ ...formData, panNo: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="10"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
                    <input
                      type="text"
                      value={formData.aadharNo}
                      onChange={(e) => setFormData({ ...formData, aadharNo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength="12"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Status Checkboxes */}
              <div>
                <h4 className="text-md font-medium text-gray-700 mb-3">Status</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isVerified}
                      onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Verified</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isProfileCompleted}
                      onChange={(e) => setFormData({ ...formData, isProfileCompleted: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Profile Complete</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isKYCVerified}
                      onChange={(e) => setFormData({ ...formData, isKYCVerified: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">KYC Verified</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.isSurveyCompleted}
                      onChange={(e) => setFormData({ ...formData, isSurveyCompleted: e.target.checked })}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Survey Complete</span>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editClientId ? "Update Client" : "Add Client"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Clients Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div
                key={client._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        client.user.profilePicture ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt="Profile"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{client.fullName || "Name not set"}</h3>
                      {getStatusBadge(client)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleEdit(client)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Client"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => showProfile(client)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Profile"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(client._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Client"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.user.email || "Not set"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.user.phoneNo || "Not set"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {client.address ? `${client.address.city}, ${client.address.state}` : "Not set"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <CreditCard className="w-4 h-4 mr-2" />
                    PAN: {client.panNo || "Not set"}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="w-4 h-4 mr-2" />
                    Aadhar: {client.aadharNo ? `****${client.aadharNo.slice(-4)}` : "Not set"}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Rating:</span>
                    {renderStars(client.internalRating || 0)}
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Credit Score:</span>
                    <span className="text-sm font-medium text-gray-900">{client.creditScore}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Risk Level:</span>
                    {getRiskBadge(client.riskLevel)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Active Loans:</span>
                    <span className="text-sm font-medium text-gray-900">{client.activeLoans}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="flex items-center">
                      {client.user.isVerified ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={client.user.isVerified ? "text-green-700" : "text-red-700"}>Verified</span>
                    </div>
                    <div className="flex items-center">
                      {client.user.isKYCVerified ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={client.user.isKYCVerified ? "text-green-700" : "text-red-700"}>KYC</span>
                    </div>
                    <div className="flex items-center">
                      {client.user.isProfileCompleted ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 text-yellow-500 mr-1" />
                      )}
                      <span className={client.user.isProfileCompleted ? "text-green-700" : "text-yellow-700"}>
                        Profile
                      </span>
                    </div>
                    <div className="flex items-center">
                      {client.user.isSurveyCompleted ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <Clock className="w-3 h-3 text-yellow-500 mr-1" />
                      )}
                      <span className={client.user.isSurveyCompleted ? "text-green-700" : "text-yellow-700"}>
                        Survey
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Loans
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClients.map((client) => (
                    <tr key={client._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={
                              client.user.profilePicture ||
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{client.fullName || "Name not set"}</div>
                            <div className="text-sm text-gray-500">ID: {client._id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{client.user.email || "Not set"}</div>
                        <div className="text-sm text-gray-500">{client.user.phoneNo || "Not set"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">PAN: {client.panNo || "Not set"}</div>
                        <div className="text-sm text-gray-500">
                          Aadhar: {client.aadharNo ? `****${client.aadharNo.slice(-4)}` : "Not set"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{renderStars(client.internalRating || 0)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(client)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{getRiskBadge(client.riskLevel)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">Active: {client.activeLoans}</div>
                        <div className="text-sm text-gray-500">Total: {client.totalLoans}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(client)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => showProfile(client)}
                            className="text-green-600 hover:text-green-900"
                            title="View Profile"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(client._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminClients
