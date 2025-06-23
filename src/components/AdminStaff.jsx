"use client"

import { useEffect, useState } from "react"
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { UserContext } from '../context/userContext';
// import Papa from 'papaparse';
import {
  Search,
  Plus,
  Download,
  Edit,
  Trash2,
  Users,
  UserCheck,
  Shield,
  Eye,
  EyeOff,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Star,
} from "lucide-react"

// Dummy data for staff members
const dummyStaffs = [
  {
    _id: "1",
    fullName: "John Smith",
    user: {
      _id: "u1",
      email: "john.smith@company.com",
      phoneNo: "+1-555-0123",
      role: "Admin",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: true,
      isSurveyCompleted: true,
      createdAt: "2024-01-15",
    },
    panNo: "ABCDE1234F",
    aadharNo: "123456789012",
    address: {
      city: "New York",
      state: "NY",
      pincode: "10001",
    },
    specialization: "Financial Analysis",
    experience: "5 years",
    workload: 15,
    performance: 4.8,
    lastActive: "2024-01-20",
  },
  {
    _id: "2",
    fullName: "Sarah Johnson",
    user: {
      _id: "u2",
      email: "sarah.johnson@company.com",
      phoneNo: "+1-555-0124",
      role: "Verifier",
      profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: true,
      isSurveyCompleted: false,
      createdAt: "2024-01-10",
    },
    panNo: "FGHIJ5678K",
    aadharNo: "234567890123",
    address: {
      city: "Los Angeles",
      state: "CA",
      pincode: "90210",
    },
    specialization: "Document Verification",
    experience: "3 years",
    workload: 22,
    performance: 4.6,
    lastActive: "2024-01-19",
  },
  {
    _id: "3",
    fullName: "Michael Chen",
    user: {
      _id: "u3",
      email: "michael.chen@company.com",
      phoneNo: "+1-555-0125",
      role: "Preparer",
      profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: false,
      isKYCVerified: true,
      isSurveyCompleted: true,
      createdAt: "2024-01-05",
    },
    panNo: "KLMNO9012P",
    aadharNo: "345678901234",
    address: {
      city: "Chicago",
      state: "IL",
      pincode: "60601",
    },
    specialization: "Loan Processing",
    experience: "4 years",
    workload: 18,
    performance: 4.7,
    lastActive: "2024-01-18",
  },
  {
    _id: "4",
    fullName: "Emily Davis",
    user: {
      _id: "u4",
      email: "emily.davis@company.com",
      phoneNo: "+1-555-0126",
      role: "Verifier",
      profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      isVerified: false,
      isProfileCompleted: true,
      isKYCVerified: false,
      isSurveyCompleted: true,
      createdAt: "2024-01-12",
    },
    panNo: "QRSTU3456V",
    aadharNo: "456789012345",
    address: {
      city: "Houston",
      state: "TX",
      pincode: "77001",
    },
    specialization: "Risk Assessment",
    experience: "2 years",
    workload: 12,
    performance: 4.4,
    lastActive: "2024-01-17",
  },
  {
    _id: "5",
    fullName: "David Wilson",
    user: {
      _id: "u5",
      email: "david.wilson@company.com",
      phoneNo: "+1-555-0127",
      role: "Admin",
      profilePicture: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: true,
      isSurveyCompleted: true,
      createdAt: "2024-01-08",
    },
    panNo: "WXYZ7890A",
    aadharNo: "567890123456",
    address: {
      city: "Phoenix",
      state: "AZ",
      pincode: "85001",
    },
    specialization: "System Administration",
    experience: "6 years",
    workload: 8,
    performance: 4.9,
    lastActive: "2024-01-20",
  },
  {
    _id: "6",
    fullName: "Lisa Anderson",
    user: {
      _id: "u6",
      email: "lisa.anderson@company.com",
      phoneNo: "+1-555-0128",
      role: "Preparer",
      profilePicture: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: true,
      isSurveyCompleted: false,
      createdAt: "2024-01-03",
    },
    panNo: "BCDEF2345G",
    aadharNo: "678901234567",
    address: {
      city: "Philadelphia",
      state: "PA",
      pincode: "19101",
    },
    specialization: "Application Processing",
    experience: "3 years",
    workload: 20,
    performance: 4.5,
    lastActive: "2024-01-16",
  },
]

function AdminStaff() {
  // const { currentuser } = useContext(UserContext);
  const [staffs, setStaffs] = useState(dummyStaffs)
  const [filteredStaffs, setFilteredStaffs] = useState(dummyStaffs)
  const [selectedStaffs, setSelectedStaffs] = useState([])
  const [currentView, setCurrentView] = useState("grid") // 'grid' or 'table'
  const [activeTab, setActiveTab] = useState("all")
  const [showForm, setShowForm] = useState(false)
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
    role: "",
    specialization: "",
    experience: "",
  })
  const [editStaffId, setEditStaffId] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showPassword, setShowPassword] = useState(false)
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  // Commented out original backend functions
  /*
  const fetchAllStaffs = async () => {
    try {
      const response = await axios.post('/api/admin/findallstaffs', { userId: currentuser.id });
      if (response.data.status) {
        console.log(response.data.data);
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
    if(formData.panNo.length!=10) {
      toast.error('Invalid PAN Card')
      return;
    }
    if(formData.aadharNo.length!=12) {
      toast.error('Invalid Aadhar Card')
      return;
    }
    try {
      if (editStaffId) {
        const response = await axios.put(`/api/admin/updatestaff`, { staffId: editStaffId, ...formData, userId: currentuser.id });
        if (response.data.status) {
          toast.success("Staff updated successfully");
        }
      } else {
        const response = await axios.post('/api/admin/createstaff', { ...formData, userId: currentuser.id });
        console.log(response.data);
        if (response.data.status) {
          toast.success("Staff created successfully");
        } else {
          toast.error(response.data.message);
        }
      }
      fetchAllStaffs();
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Error occurred during staff operation");
    }
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
  */

  // Dummy functions for demonstration
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (formData.panNo.length !== 10) {
      alert("Invalid PAN Card")
      return
    }
    if (formData.aadharNo.length !== 12) {
      alert("Invalid Aadhar Card")
      return
    }

    if (editStaffId) {
      // Update existing staff
      const updatedStaffs = staffs.map((staff) =>
        staff._id === editStaffId
          ? {
              ...staff,
              fullName: formData.fullName,
              user: {
                ...staff.user,
                email: formData.email,
                phoneNo: formData.phoneNo,
                role: formData.role,
                isVerified: formData.isVerified,
                isProfileCompleted: formData.isProfileCompleted,
                isKYCVerified: formData.isKYCVerified,
                isSurveyCompleted: formData.isSurveyCompleted,
              },
              panNo: formData.panNo,
              aadharNo: formData.aadharNo,
              address: formData.address,
              specialization: formData.specialization,
              experience: formData.experience,
            }
          : staff,
      )
      setStaffs(updatedStaffs)
      setFilteredStaffs(updatedStaffs)
      alert("Staff updated successfully")
    } else {
      // Create new staff
      const newStaff = {
        _id: Date.now().toString(),
        fullName: formData.fullName,
        user: {
          _id: "u" + Date.now(),
          email: formData.email,
          phoneNo: formData.phoneNo,
          role: formData.role,
          profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          isVerified: formData.isVerified,
          isProfileCompleted: formData.isProfileCompleted,
          isKYCVerified: formData.isKYCVerified,
          isSurveyCompleted: formData.isSurveyCompleted,
          createdAt: new Date().toISOString().split("T")[0],
        },
        panNo: formData.panNo,
        aadharNo: formData.aadharNo,
        address: formData.address,
        specialization: formData.specialization,
        experience: formData.experience,
        workload: 0,
        performance: 4.0,
        lastActive: new Date().toISOString().split("T")[0],
      }
      const updatedStaffs = [...staffs, newStaff]
      setStaffs(updatedStaffs)
      setFilteredStaffs(updatedStaffs)
      alert("Staff created successfully")
    }
    resetForm()
  }

  const handleDelete = (staffId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this staff member?")
    if (confirmDelete) {
      const updatedStaffs = staffs.filter((staff) => staff._id !== staffId)
      setStaffs(updatedStaffs)
      setFilteredStaffs(updatedStaffs)
      alert("Staff deleted successfully")
    }
  }

  const handleEdit = (staff) => {
    setFormData({
      email: staff.user.email || "",
      phoneNo: staff.user.phoneNo || "",
      fullName: staff.fullName || "",
      password: "",
      address: staff.address || { city: "", state: "", pincode: "" },
      panNo: staff.panNo || "",
      aadharNo: staff.aadharNo || "",
      isVerified: staff.user.isVerified || false,
      isProfileCompleted: staff.user.isProfileCompleted || false,
      isKYCVerified: staff.user.isKYCVerified || false,
      isSurveyCompleted: staff.user.isSurveyCompleted || false,
      role: staff.user.role || "",
      specialization: staff.specialization || "",
      experience: staff.experience || "",
    })
    setEditStaffId(staff._id)
    setShowForm(true)
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
      role: "",
      specialization: "",
      experience: "",
    })
    setEditStaffId(null)
    setShowForm(false)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    applyFilters(value, roleFilter, statusFilter)
  }

  const handleRoleFilter = (role) => {
    setRoleFilter(role)
    applyFilters(searchTerm, role, statusFilter)
  }

  const handleStatusFilter = (status) => {
    setStatusFilter(status)
    applyFilters(searchTerm, roleFilter, status)
  }

  const applyFilters = (search, role, status) => {
    const filtered = staffs.filter((staff) => {
      const matchesSearch =
        !search ||
        staff.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        staff.user.email?.toLowerCase().includes(search.toLowerCase()) ||
        staff.specialization?.toLowerCase().includes(search.toLowerCase())

      const matchesRole = role === "all" || staff.user.role === role

      const matchesStatus =
        status === "all" ||
        (status === "verified" && staff.user.isVerified) ||
        (status === "unverified" && !staff.user.isVerified) ||
        (status === "kyc-pending" && !staff.user.isKYCVerified)

      return matchesSearch && matchesRole && matchesStatus
    })

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue, bValue
      switch (sortBy) {
        case "name":
          aValue = a.fullName || ""
          bValue = b.fullName || ""
          break
        case "role":
          aValue = a.user.role || ""
          bValue = b.user.role || ""
          break
        case "performance":
          aValue = a.performance || 0
          bValue = b.performance || 0
          break
        case "workload":
          aValue = a.workload || 0
          bValue = b.workload || 0
          break
        default:
          aValue = a.fullName || ""
          bValue = b.fullName || ""
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredStaffs(filtered)
  }

  const exportToCSV = () => {
    const csvData = staffs.map((staff) => ({
      Name: staff.fullName,
      Email: staff.user.email,
      Phone: staff.user.phoneNo,
      Role: staff.user.role,
      PAN: staff.panNo,
      Aadhar: staff.aadharNo,
      City: staff.address.city,
      State: staff.address.state,
      Pincode: staff.address.pincode,
      Specialization: staff.specialization,
      Experience: staff.experience,
      Performance: staff.performance,
      Workload: staff.workload,
      Verified: staff.user.isVerified ? "Yes" : "No",
      "KYC Verified": staff.user.isKYCVerified ? "Yes" : "No",
      "Profile Completed": staff.user.isProfileCompleted ? "Yes" : "No",
      "Survey Completed": staff.user.isSurveyCompleted ? "Yes" : "No",
    }))

    // Simple CSV export without Papa Parse
    const headers = Object.keys(csvData[0])
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => headers.map((header) => `"${row[header]}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", "staff_members.csv")
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    alert("Staff data exported to CSV successfully!")
  }

  const getStatusBadge = (staff) => {
    if (staff.user.isVerified && staff.user.isKYCVerified && staff.user.isProfileCompleted) {
      return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Verified</span>
    } else if (!staff.user.isVerified) {
      return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Unverified</span>
    } else {
      return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
    }
  }

  const getRoleBadge = (role) => {
    const colors = {
      Admin: "bg-purple-100 text-purple-800",
      Verifier: "bg-blue-100 text-blue-800",
      Preparer: "bg-green-100 text-green-800",
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[role] || "bg-gray-100 text-gray-800"}`}>
        {role}
      </span>
    )
  }

  const getPerformanceStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
      />
    ))
  }

  const getStatsCards = () => {
    const totalStaff = staffs.length
    const verifiedStaff = staffs.filter((s) => s.user.isVerified).length
    const adminCount = staffs.filter((s) => s.user.role === "Admin").length
    const verifierCount = staffs.filter((s) => s.user.role === "Verifier").length
    const preparerCount = staffs.filter((s) => s.user.role === "Preparer").length

    return [
      { title: "Total Staff", value: totalStaff, icon: Users, color: "bg-blue-500" },
      { title: "Verified", value: verifiedStaff, icon: UserCheck, color: "bg-green-500" },
      { title: "Admins", value: adminCount, icon: Shield, color: "bg-purple-500" },
      { title: "Verifiers", value: verifierCount, icon: CheckCircle, color: "bg-indigo-500" },
      { title: "Preparers", value: preparerCount, icon: Edit, color: "bg-orange-500" },
    ]
  }

  useEffect(() => {
    applyFilters(searchTerm, roleFilter, statusFilter)
  }, [sortBy, sortOrder])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
              <p className="text-gray-600 mt-1">Manage your team members and their roles</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={exportToCSV}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                {showForm ? "Cancel" : "Add Staff"}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {getStatsCards().map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
                <div className="flex items-center">
                  <div className={`p-2 rounded-lg ${stat.color} text-white mr-3`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{editStaffId ? "Edit Staff Member" : "Add New Staff Member"}</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 border-b pb-2">Personal Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.phoneNo}
                      onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password {!editStaffId && "*"}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                        required={!editStaffId}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        ) : (
                          <Eye className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Address & Documents */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 border-b pb-2">Address & Documents</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number *</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number *</label>
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

                {/* Role & Status */}
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 border-b pb-2">Role & Status</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Admin">Admin</option>
                      <option value="Verifier">Verifier</option>
                      <option value="Preparer">Preparer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={formData.specialization}
                      onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Financial Analysis"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 3 years"
                    />
                  </div>

                  {/* Status Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isVerified"
                        checked={formData.isVerified}
                        onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isVerified" className="ml-2 block text-sm text-gray-700">
                        Is Verified
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isProfileCompleted"
                        checked={formData.isProfileCompleted}
                        onChange={(e) => setFormData({ ...formData, isProfileCompleted: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isProfileCompleted" className="ml-2 block text-sm text-gray-700">
                        Profile Completed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isKYCVerified"
                        checked={formData.isKYCVerified}
                        onChange={(e) => setFormData({ ...formData, isKYCVerified: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isKYCVerified" className="ml-2 block text-sm text-gray-700">
                        KYC Verified
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isSurveyCompleted"
                        checked={formData.isSurveyCompleted}
                        onChange={(e) => setFormData({ ...formData, isSurveyCompleted: e.target.checked })}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isSurveyCompleted" className="ml-2 block text-sm text-gray-700">
                        Survey Completed
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editStaffId ? "Update Staff" : "Add Staff"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search staff by name, email, or specialization..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4">
              {/* Role Filter */}
              <select
                value={roleFilter}
                onChange={(e) => handleRoleFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Verifier">Verifier</option>
                <option value="Preparer">Preparer</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
                <option value="kyc-pending">KYC Pending</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="role">Sort by Role</option>
                <option value="performance">Sort by Performance</option>
                <option value="workload">Sort by Workload</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </button>

              {/* View Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setCurrentView("grid")}
                  className={`px-3 py-2 ${currentView === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-600"} rounded-l-lg transition-colors`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setCurrentView("table")}
                  className={`px-3 py-2 ${currentView === "table" ? "bg-blue-100 text-blue-600" : "text-gray-600"} rounded-r-lg transition-colors`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Staff List */}
        {currentView === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStaffs.map((staff) => (
              <div key={staff._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Profile Header */}
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={
                        staff.user.profilePicture ||
                        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                      }
                      alt={staff.fullName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{staff.fullName || "Not Set"}</h3>
                      <div className="flex items-center space-x-2">
                        {getRoleBadge(staff.user.role)}
                        {getStatusBadge(staff)}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="truncate">{staff.user.email || "Not Set"}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{staff.user.phoneNo || "Not Set"}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="truncate">
                        {staff.address?.city && staff.address?.state
                          ? `${staff.address.city}, ${staff.address.state}`
                          : "Not Set"}
                      </span>
                    </div>
                  </div>

                  {/* Performance & Workload */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Performance</span>
                      <div className="flex items-center space-x-1">
                        {getPerformanceStars(staff.performance)}
                        <span className="text-gray-600 ml-1">{staff.performance}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Workload</span>
                      <span className="font-medium">{staff.workload} tasks</span>
                    </div>
                    {staff.specialization && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Specialization</span>
                        <span className="font-medium text-right">{staff.specialization}</span>
                      </div>
                    )}
                  </div>

                  {/* Documents */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">PAN</span>
                      <span className="font-mono">{staff.panNo || "Not Set"}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Aadhar</span>
                      <span className="font-mono">
                        {staff.aadharNo ? `****${staff.aadharNo.slice(-4)}` : "Not Set"}
                      </span>
                    </div>
                  </div>

                  {/* Status Indicators */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center text-xs">
                      {staff.user.isVerified ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={staff.user.isVerified ? "text-green-600" : "text-red-600"}>Verified</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {staff.user.isKYCVerified ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={staff.user.isKYCVerified ? "text-green-600" : "text-red-600"}>KYC</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {staff.user.isProfileCompleted ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={staff.user.isProfileCompleted ? "text-green-600" : "text-red-600"}>Profile</span>
                    </div>
                    <div className="flex items-center text-xs">
                      {staff.user.isSurveyCompleted ? (
                        <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <XCircle className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={staff.user.isSurveyCompleted ? "text-green-600" : "text-red-600"}>Survey</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-gray-500">Active: {staff.lastActive}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(staff)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Staff"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(staff._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Staff"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role & Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documents
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaffs.map((staff) => (
                    <tr key={staff._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={
                              staff.user.profilePicture ||
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                            }
                            alt={staff.fullName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{staff.fullName || "Not Set"}</div>
                            <div className="text-sm text-gray-500">{staff.specialization || "No specialization"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          {getRoleBadge(staff.user.role)}
                          {getStatusBadge(staff)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="space-y-1">
                          <div>{staff.user.email || "Not Set"}</div>
                          <div className="text-gray-500">{staff.user.phoneNo || "Not Set"}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-1">
                          <div className="flex items-center">
                            {getPerformanceStars(staff.performance)}
                            <span className="ml-2 text-sm text-gray-600">{staff.performance}</span>
                          </div>
                          <div className="text-sm text-gray-500">{staff.workload} tasks</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="space-y-1">
                          <div>PAN: {staff.panNo || "Not Set"}</div>
                          <div>Aadhar: {staff.aadharNo ? `****${staff.aadharNo.slice(-4)}` : "Not Set"}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="grid grid-cols-2 gap-1">
                          <div className="flex items-center text-xs">
                            {staff.user.isVerified ? (
                              <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 text-red-500 mr-1" />
                            )}
                            <span className={staff.user.isVerified ? "text-green-600" : "text-red-600"}>Verified</span>
                          </div>
                          <div className="flex items-center text-xs">
                            {staff.user.isKYCVerified ? (
                              <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 text-red-500 mr-1" />
                            )}
                            <span className={staff.user.isKYCVerified ? "text-green-600" : "text-red-600"}>KYC</span>
                          </div>
                          <div className="flex items-center text-xs">
                            {staff.user.isProfileCompleted ? (
                              <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 text-red-500 mr-1" />
                            )}
                            <span className={staff.user.isProfileCompleted ? "text-green-600" : "text-red-600"}>
                              Profile
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            {staff.user.isSurveyCompleted ? (
                              <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 text-red-500 mr-1" />
                            )}
                            <span className={staff.user.isSurveyCompleted ? "text-green-600" : "text-red-600"}>
                              Survey
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(staff)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Staff"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(staff._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Staff"
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

        {/* Empty State */}
        {filteredStaffs.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No staff members found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || roleFilter !== "all" || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first staff member"}
            </p>
            {!searchTerm && roleFilter === "all" && statusFilter === "all" && (
              <div className="mt-6">
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Staff Member
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminStaff
