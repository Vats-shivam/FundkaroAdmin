"use client"

import { useState, useEffect, useContext } from "react"
// import axios from 'axios';
import { UserContext } from "../context/userContext"
import toast from "react-hot-toast"
import {
  Bell,
  Send,
  Users,
  MessageSquare,
  CheckCircle,
  Search,
  Clock,
  Target,
  BarChart3,
  Settings,
  Eye,
  Trash2,
  Copy,
  Smartphone,
} from "lucide-react"

function Notifications() {
  const { currentuser } = useContext(UserContext)
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [message, setMessage] = useState({
    sound: "default",
    title: "Fundkaro",
    body: "",
    type: "general",
    priority: "normal",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [activeTab, setActiveTab] = useState("compose")
  const [notificationHistory, setNotificationHistory] = useState([])
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)

  // Dummy data for registered users
  const dummyUsers = [
    {
      user: {
        _id: "1",
        email: "john.doe@email.com",
        phoneNo: "+91 9876543210",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        lastActive: "2024-01-15T10:30:00Z",
        deviceType: "Android",
        notificationEnabled: true,
      },
      fullName: "John Doe",
      location: "Mumbai, Maharashtra",
      joinDate: "2023-06-15",
    },
    {
      user: {
        _id: "2",
        email: "sarah.johnson@email.com",
        phoneNo: "+91 9876543211",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        lastActive: "2024-01-15T09:15:00Z",
        deviceType: "iOS",
        notificationEnabled: true,
      },
      fullName: "Sarah Johnson",
      location: "Delhi, Delhi",
      joinDate: "2023-07-20",
    },
    {
      user: {
        _id: "3",
        email: "mike.wilson@email.com",
        phoneNo: "+91 9876543212",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: false,
        lastActive: "2024-01-14T16:45:00Z",
        deviceType: "Android",
        notificationEnabled: true,
      },
      fullName: "Mike Wilson",
      location: "Bangalore, Karnataka",
      joinDate: "2023-08-10",
    },
    {
      user: {
        _id: "4",
        email: "emily.davis@email.com",
        phoneNo: "+91 9876543213",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        lastActive: "2024-01-15T11:20:00Z",
        deviceType: "iOS",
        notificationEnabled: false,
      },
      fullName: "Emily Davis",
      location: "Chennai, Tamil Nadu",
      joinDate: "2023-09-05",
    },
    {
      user: {
        _id: "5",
        email: "david.brown@email.com",
        phoneNo: "+91 9876543214",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        lastActive: "2024-01-15T08:30:00Z",
        deviceType: "Android",
        notificationEnabled: true,
      },
      fullName: "David Brown",
      location: "Pune, Maharashtra",
      joinDate: "2023-10-12",
    },
    {
      user: {
        _id: "6",
        email: "lisa.anderson@email.com",
        phoneNo: "+91 9876543215",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        lastActive: "2024-01-15T12:00:00Z",
        deviceType: "iOS",
        notificationEnabled: true,
      },
      fullName: "Lisa Anderson",
      location: "Hyderabad, Telangana",
      joinDate: "2023-11-18",
    },
  ]

  // Dummy notification history
  const dummyHistory = [
    {
      _id: "h1",
      title: "Loan Application Update",
      body: "Your loan application has been approved! Check your dashboard for details.",
      sentTo: 156,
      delivered: 152,
      opened: 89,
      clicked: 34,
      sentAt: "2024-01-15T10:00:00Z",
      type: "loan_update",
      priority: "high",
      status: "delivered",
    },
    {
      _id: "h2",
      title: "New Offers Available",
      body: "Exciting new loan offers are now available. Apply today!",
      sentTo: 234,
      delivered: 230,
      opened: 145,
      clicked: 67,
      sentAt: "2024-01-14T15:30:00Z",
      type: "promotional",
      priority: "normal",
      status: "delivered",
    },
    {
      _id: "h3",
      title: "Document Verification Required",
      body: "Please upload the required documents to complete your application.",
      sentTo: 45,
      delivered: 43,
      opened: 38,
      clicked: 28,
      sentAt: "2024-01-13T09:15:00Z",
      type: "verification",
      priority: "high",
      status: "delivered",
    },
  ]

  // Dummy templates
  const dummyTemplates = [
    {
      _id: "t1",
      name: "Loan Approval",
      title: "Loan Application Approved",
      body: "Congratulations! Your loan application has been approved. Check your dashboard for next steps.",
      type: "loan_update",
    },
    {
      _id: "t2",
      name: "Document Required",
      title: "Document Verification Required",
      body: "Please upload the required documents to complete your application process.",
      type: "verification",
    },
    {
      _id: "t3",
      name: "New Offers",
      title: "New Loan Offers Available",
      body: "Exciting new loan offers are now available. Apply today and get the best rates!",
      type: "promotional",
    },
    {
      _id: "t4",
      name: "Payment Reminder",
      title: "Payment Due Reminder",
      body: "Your loan payment is due soon. Please make the payment to avoid late fees.",
      type: "reminder",
    },
  ]

  useEffect(() => {
    // fetchRegisteredUsers();
    // Using dummy data instead
    setRegisteredUsers(dummyUsers)
    setNotificationHistory(dummyHistory)
    setTemplates(dummyTemplates)
  }, [])

  // Commented out API functions - preserved for backend integration
  /*
    const fetchRegisteredUsers = async () => {
        try {
            const response = await axios.post('/api/notification/find', { userId: currentuser.id });
            if (response.data.status) {
                setRegisteredUsers(response.data.users);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch registered users');
        }
    };

    const handleSendToSelectedUsers = async () => {
        if (selectedUsers.length === 0) {
            toast.error('Please select at least one user');
            return;
        }
        if (message.body.trim() === '') {
            toast.error('Message body cannot be empty');
            return;
        }

        const confirmation = window.confirm("Are you sure you want to send the notification to the selected users?");
        if (!confirmation) {
            return;
        }

        try {
            const response = await axios.post('/api/notification/sendusers', {
                userId: currentuser.id,
                usersId: selectedUsers,
                message: message
            });
            if (response.data.status) {
                toast.success(`Notifications sent successfully. Success: ${response.data.success}, Failed: ${response.data.failed}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send notifications');
        }
    };

    const handleSendToAllUsers = async () => {
        if (message.body.trim() === '') {
            toast.error('Message body cannot be empty');
            return;
        }

        const confirmation = window.confirm("Are you sure you want to send the notification to all users?");
        if (!confirmation) {
            return;
        }

        try {
            const response = await axios.post('/api/notification/sendall', {
                userId: currentuser.id,
                message: message
            });
            if (response.data.status) {
                toast.success(`Notifications sent successfully. Success: ${response.data.success}, Failed: ${response.data.failed}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send notifications');
        }
    };
    */

  // Dummy implementations for demo
  const handleSendToSelectedUsers = () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user")
      return
    }
    if (message.body.trim() === "") {
      toast.error("Message body cannot be empty")
      return
    }

    const confirmation = window.confirm("Are you sure you want to send the notification to the selected users?")
    if (!confirmation) {
      return
    }

    // Simulate API call
    setTimeout(() => {
      const success = selectedUsers.length
      const failed = 0
      toast.success(`Notifications sent successfully. Success: ${success}, Failed: ${failed}`)

      // Add to history
      const newNotification = {
        _id: Date.now().toString(),
        title: message.title,
        body: message.body,
        sentTo: selectedUsers.length,
        delivered: selectedUsers.length,
        opened: 0,
        clicked: 0,
        sentAt: new Date().toISOString(),
        type: message.type,
        priority: message.priority,
        status: "delivered",
      }
      setNotificationHistory([newNotification, ...notificationHistory])

      // Reset form
      setSelectedUsers([])
      setMessage({ ...message, body: "" })
    }, 1000)
  }

  const handleSendToAllUsers = () => {
    if (message.body.trim() === "") {
      toast.error("Message body cannot be empty")
      return
    }

    const confirmation = window.confirm("Are you sure you want to send the notification to all users?")
    if (!confirmation) {
      return
    }

    // Simulate API call
    setTimeout(() => {
      const eligibleUsers = registeredUsers.filter((user) => user.user.notificationEnabled)
      const success = eligibleUsers.length
      const failed = registeredUsers.length - eligibleUsers.length
      toast.success(`Notifications sent successfully. Success: ${success}, Failed: ${failed}`)

      // Add to history
      const newNotification = {
        _id: Date.now().toString(),
        title: message.title,
        body: message.body,
        sentTo: registeredUsers.length,
        delivered: success,
        opened: 0,
        clicked: 0,
        sentAt: new Date().toISOString(),
        type: message.type,
        priority: message.priority,
        status: "delivered",
      }
      setNotificationHistory([newNotification, ...notificationHistory])

      // Reset form
      setMessage({ ...message, body: "" })
    }, 1000)
  }

  const handleUserSelect = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    } else {
      setSelectedUsers([...selectedUsers, userId])
    }
  }

  const handleSelectAll = () => {
    const eligibleUsers = filteredUsers.filter((user) => user.user.notificationEnabled)
    if (selectedUsers.length === eligibleUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(eligibleUsers.map((user) => user.user._id))
    }
  }

  const handleTemplateSelect = (templateId) => {
    const template = templates.find((t) => t._id === templateId)
    if (template) {
      setMessage({
        ...message,
        title: template.title,
        body: template.body,
        type: template.type,
      })
      setSelectedTemplate(templateId)
    }
  }

  // Filter users based on search and filter criteria
  const filteredUsers = registeredUsers.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user.phoneNo.includes(searchTerm)

    const matchesFilter =
      filterType === "All" ||
      (filterType === "Verified" && user.user.isVerified) ||
      (filterType === "Unverified" && !user.user.isVerified) ||
      (filterType === "Notifications Enabled" && user.user.notificationEnabled) ||
      (filterType === "Notifications Disabled" && !user.user.notificationEnabled)

    return matchesSearch && matchesFilter
  })

  // Statistics
  const totalUsers = registeredUsers.length
  const verifiedUsers = registeredUsers.filter((user) => user.user.isVerified).length
  const notificationEnabledUsers = registeredUsers.filter((user) => user.user.notificationEnabled).length
  const selectedCount = selectedUsers.length

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getDeviceIcon = (deviceType) => {
    return deviceType === "iOS" ? "📱" : "🤖"
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100"
      case "normal":
        return "text-blue-600 bg-blue-100"
      case "low":
        return "text-gray-600 bg-gray-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "loan_update":
        return "text-green-600 bg-green-100"
      case "promotional":
        return "text-purple-600 bg-purple-100"
      case "verification":
        return "text-orange-600 bg-orange-100"
      case "reminder":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Center</h1>
              <p className="text-gray-600">Send targeted notifications to your users</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <button className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified Users</p>
                <p className="text-3xl font-bold text-green-600">{verifiedUsers}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notifications Enabled</p>
                <p className="text-3xl font-bold text-blue-600">{notificationEnabledUsers}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selected Users</p>
                <p className="text-3xl font-bold text-purple-600">{selectedCount}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("compose")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "compose"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Compose
              </button>
              <button
                onClick={() => setActiveTab("history")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "history"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Clock className="w-4 h-4 inline mr-2" />
                History
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "analytics"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Analytics
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "compose" && (
              <div className="space-y-6">
                {/* Message Composition */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose Notification</h3>

                      {/* Template Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Use Template</label>
                        <select
                          value={selectedTemplate}
                          onChange={(e) => handleTemplateSelect(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Select a template...</option>
                          {templates.map((template) => (
                            <option key={template._id} value={template._id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Message Form */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                          <input
                            type="text"
                            value={message.title}
                            onChange={(e) => setMessage({ ...message, title: e.target.value })}
                            placeholder="Enter notification title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                          <textarea
                            value={message.body}
                            onChange={(e) => setMessage({ ...message, body: e.target.value })}
                            placeholder="Enter notification message"
                            rows={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <p className="text-sm text-gray-500 mt-1">{message.body.length}/500 characters</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select
                              value={message.type}
                              onChange={(e) => setMessage({ ...message, type: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="general">General</option>
                              <option value="loan_update">Loan Update</option>
                              <option value="promotional">Promotional</option>
                              <option value="verification">Verification</option>
                              <option value="reminder">Reminder</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                              value={message.priority}
                              onChange={(e) => setMessage({ ...message, priority: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="low">Low</option>
                              <option value="normal">Normal</option>
                              <option value="high">High</option>
                            </select>
                          </div>
                        </div>

                        {/* Scheduling */}
                        <div>
                          <div className="flex items-center mb-3">
                            <input
                              type="checkbox"
                              id="schedule"
                              checked={isScheduled}
                              onChange={(e) => setIsScheduled(e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor="schedule" className="text-sm font-medium text-gray-700">
                              Schedule for later
                            </label>
                          </div>

                          {isScheduled && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                                <input
                                  type="date"
                                  value={scheduleDate}
                                  onChange={(e) => setScheduleDate(e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                                <input
                                  type="time"
                                  value={scheduleTime}
                                  onChange={(e) => setScheduleTime(e.target.value)}
                                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Send Buttons */}
                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleSendToSelectedUsers}
                          disabled={selectedUsers.length === 0 || message.body.trim() === ""}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send to Selected ({selectedCount})
                        </button>
                        <button
                          onClick={handleSendToAllUsers}
                          disabled={message.body.trim() === ""}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Send to All
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="flex items-center mb-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                            <Bell className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{message.title || "Notification Title"}</p>
                            <p className="text-xs text-gray-500">Fundkaro • now</p>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">
                          {message.body || "Your notification message will appear here..."}
                        </p>
                        <div className="flex gap-2 mt-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(message.type)}`}>
                            {message.type.replace("_", " ").toUpperCase()}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(message.priority)}`}
                          >
                            {message.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Selection */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Select Recipients</h3>
                    <div className="mt-2 sm:mt-0 flex gap-3">
                      <button
                        onClick={handleSelectAll}
                        className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {selectedUsers.length === filteredUsers.filter((u) => u.user.notificationEnabled).length
                          ? "Deselect All"
                          : "Select All"}
                      </button>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                      />
                    </div>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="All">All Users</option>
                      <option value="Verified">Verified Only</option>
                      <option value="Unverified">Unverified Only</option>
                      <option value="Notifications Enabled">Notifications Enabled</option>
                      <option value="Notifications Disabled">Notifications Disabled</option>
                    </select>
                  </div>

                  {/* User Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers.map((user) => (
                      <div
                        key={user.user._id}
                        className={`border rounded-lg p-4 transition-all ${
                          selectedUsers.includes(user.user._id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        } ${!user.user.notificationEnabled ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.user._id)}
                            onChange={() => handleUserSelect(user.user._id)}
                            disabled={!user.user.notificationEnabled}
                            className="mr-3 mt-1"
                          />
                          <img
                            src={user.user.profilePicture || "/placeholder.svg"}
                            alt="Profile"
                            className="w-12 h-12 rounded-full mr-3"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-900 truncate">{user.fullName}</p>
                              {user.user.isVerified && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                              <span className="text-sm">{getDeviceIcon(user.user.deviceType)}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{user.user.email}</p>
                            <p className="text-sm text-gray-500">{user.user.phoneNo}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">{user.location}</span>
                              {!user.user.notificationEnabled && (
                                <span className="text-xs text-red-600 font-medium">Notifications Off</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                      <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification History</h3>
                <div className="space-y-4">
                  {notificationHistory.map((notification) => (
                    <div key={notification._id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}
                            >
                              {notification.type.replace("_", " ").toUpperCase()}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}
                            >
                              {notification.priority.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-700 mb-3">{notification.body}</p>
                          <p className="text-sm text-gray-500">Sent on {formatDate(notification.sentAt)}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{notification.sentTo}</p>
                          <p className="text-sm text-gray-600">Sent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{notification.delivered}</p>
                          <p className="text-sm text-gray-600">Delivered</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{notification.opened}</p>
                          <p className="text-sm text-gray-600">Opened</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{notification.clicked}</p>
                          <p className="text-sm text-gray-600">Clicked</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {notificationHistory.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications sent yet</h3>
                    <p className="text-gray-600">Your notification history will appear here</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Total Sent</h4>
                      <Send className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">1,247</p>
                    <p className="text-sm text-green-600">+12% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Delivery Rate</h4>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">94.2%</p>
                    <p className="text-sm text-green-600">+2.1% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Open Rate</h4>
                      <Eye className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">67.8%</p>
                    <p className="text-sm text-red-600">-1.3% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Click Rate</h4>
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">23.4%</p>
                    <p className="text-sm text-green-600">+3.2% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Best Time</h4>
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">10:00 AM</p>
                    <p className="text-sm text-gray-600">Highest engagement</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Top Device</h4>
                      <Smartphone className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">Android</p>
                    <p className="text-sm text-gray-600">68% of users</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notifications
