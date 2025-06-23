"use client"

import { useState, useEffect, useContext } from "react"
// import axios from 'axios';
import { UserContext } from "../context/userContext"
import toast from "react-hot-toast"
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import {
  Mail,
  Send,
  Users,
  Search,
  Clock,
  Target,
  BarChart3,
  Settings,
  Eye,
  Trash2,
  Copy,
  FileText,
  CheckCircle,
  XCircle,
  TrendingUp,
  Monitor,
  Smartphone,
  Edit3,
  Plus,
} from "lucide-react"

function EmailSender() {
  const { currentuser } = useContext(UserContext)
  const [registeredUsers, setRegisteredUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [email, setEmail] = useState({
    subject: "",
    body: "",
    type: "general",
    priority: "normal",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("All")
  const [activeTab, setActiveTab] = useState("compose")
  const [emailHistory, setEmailHistory] = useState([])
  const [templates, setTemplates] = useState([])
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [previewMode, setPreviewMode] = useState("desktop")

  // Dummy data for registered users
  const dummyUsers = [
    {
      user: {
        _id: "1",
        email: "john.doe@email.com",
        phoneNo: "+91 9876543210",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        emailVerified: true,
        lastEmailOpened: "2024-01-15T10:30:00Z",
        emailPreferences: { marketing: true, transactional: true },
      },
      fullName: "John Doe",
      location: "Mumbai, Maharashtra",
      joinDate: "2023-06-15",
      engagementScore: 85,
    },
    {
      user: {
        _id: "2",
        email: "sarah.johnson@email.com",
        phoneNo: "+91 9876543211",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        emailVerified: true,
        lastEmailOpened: "2024-01-14T09:15:00Z",
        emailPreferences: { marketing: true, transactional: true },
      },
      fullName: "Sarah Johnson",
      location: "Delhi, Delhi",
      joinDate: "2023-07-20",
      engagementScore: 92,
    },
    {
      user: {
        _id: "3",
        email: "mike.wilson@email.com",
        phoneNo: "+91 9876543212",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: false,
        emailVerified: false,
        lastEmailOpened: "2024-01-10T16:45:00Z",
        emailPreferences: { marketing: false, transactional: true },
      },
      fullName: "Mike Wilson",
      location: "Bangalore, Karnataka",
      joinDate: "2023-08-10",
      engagementScore: 45,
    },
    {
      user: {
        _id: "4",
        email: "emily.davis@email.com",
        phoneNo: "+91 9876543213",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        emailVerified: true,
        lastEmailOpened: "2024-01-15T11:20:00Z",
        emailPreferences: { marketing: true, transactional: true },
      },
      fullName: "Emily Davis",
      location: "Chennai, Tamil Nadu",
      joinDate: "2023-09-05",
      engagementScore: 78,
    },
    {
      user: {
        _id: "5",
        email: "david.brown@email.com",
        phoneNo: "+91 9876543214",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        emailVerified: true,
        lastEmailOpened: "2024-01-13T08:30:00Z",
        emailPreferences: { marketing: false, transactional: true },
      },
      fullName: "David Brown",
      location: "Pune, Maharashtra",
      joinDate: "2023-10-12",
      engagementScore: 67,
    },
    {
      user: {
        _id: "6",
        email: "lisa.anderson@email.com",
        phoneNo: "+91 9876543215",
        profilePicture: "/placeholder.svg?height=64&width=64",
        isVerified: true,
        emailVerified: true,
        lastEmailOpened: "2024-01-15T12:00:00Z",
        emailPreferences: { marketing: true, transactional: true },
      },
      fullName: "Lisa Anderson",
      location: "Hyderabad, Telangana",
      joinDate: "2023-11-18",
      engagementScore: 89,
    },
  ]

  // Dummy email history
  const dummyHistory = [
    {
      _id: "e1",
      subject: "Your Loan Application Has Been Approved!",
      body: "<h2>Congratulations!</h2><p>Your loan application has been approved. Please check your dashboard for next steps.</p>",
      sentTo: 156,
      delivered: 152,
      opened: 89,
      clicked: 34,
      bounced: 4,
      sentAt: "2024-01-15T10:00:00Z",
      type: "transactional",
      priority: "high",
      status: "delivered",
    },
    {
      _id: "e2",
      subject: "New Loan Offers Available - Limited Time!",
      body: "<h2>Exciting New Offers</h2><p>Don't miss out on our latest loan offers with competitive rates. Apply today!</p>",
      sentTo: 234,
      delivered: 230,
      opened: 145,
      clicked: 67,
      bounced: 4,
      sentAt: "2024-01-14T15:30:00Z",
      type: "promotional",
      priority: "normal",
      status: "delivered",
    },
    {
      _id: "e3",
      subject: "Document Verification Required",
      body: "<h2>Action Required</h2><p>Please upload the required documents to complete your application process.</p>",
      sentTo: 45,
      delivered: 43,
      opened: 38,
      clicked: 28,
      bounced: 2,
      sentAt: "2024-01-13T09:15:00Z",
      type: "transactional",
      priority: "high",
      status: "delivered",
    },
  ]

  // Dummy templates
  const dummyTemplates = [
    {
      _id: "t1",
      name: "Loan Approval",
      subject: "Your Loan Application Has Been Approved!",
      body: "<h2>Congratulations!</h2><p>Your loan application has been approved. Please check your dashboard for next steps.</p><p>Best regards,<br>The Fundkaro Team</p>",
      type: "transactional",
      category: "Loan Updates",
    },
    {
      _id: "t2",
      name: "Document Required",
      subject: "Document Verification Required",
      body: "<h2>Action Required</h2><p>Please upload the required documents to complete your application process.</p><p>If you have any questions, please contact our support team.</p>",
      type: "transactional",
      category: "Verification",
    },
    {
      _id: "t3",
      name: "Welcome Email",
      subject: "Welcome to Fundkaro!",
      body: "<h2>Welcome to Fundkaro!</h2><p>Thank you for joining us. We're excited to help you with your financial needs.</p><p>Get started by exploring our loan options.</p>",
      type: "transactional",
      category: "Welcome",
    },
    {
      _id: "t4",
      name: "Promotional Offer",
      subject: "Special Loan Offers Just for You!",
      body: "<h2>Exclusive Offers</h2><p>We have special loan offers tailored just for you. Don't miss out on these limited-time deals!</p><p>Apply now and get the best rates.</p>",
      type: "promotional",
      category: "Promotions",
    },
    {
      _id: "t5",
      name: "Payment Reminder",
      subject: "Payment Due Reminder",
      body: "<h2>Payment Reminder</h2><p>Your loan payment is due soon. Please make the payment to avoid late fees.</p><p>You can make payments through your dashboard.</p>",
      type: "transactional",
      category: "Reminders",
    },
  ]

  useEffect(() => {
    // fetchRegisteredUsers();
    // Using dummy data instead
    setRegisteredUsers(dummyUsers)
    setEmailHistory(dummyHistory)
    setTemplates(dummyTemplates)
  }, [])

  // Commented out API functions - preserved for backend integration
  /*
    const fetchRegisteredUsers = async () => {
        try {
            const response = await axios.post('/api/admin/findallusers', { userId: currentuser.id });
            if (response.data.status) {
                setRegisteredUsers(response.data.data);
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
        if (email.body.trim() === '') {
            toast.error('Email body cannot be empty');
            return;
        }
        console.log(selectedUsers);
        try {
            const response = await axios.post('/api/email/send', {
                userId: currentuser.id,
                userIds: selectedUsers,
                subject: email.subject,
                body: email.body
            });
            console.log(response.data);
            if (response.data.status) {
                toast.success(`Emails sent successfully. Success: ${response.data.success}, Failed: ${response.data.failed}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send emails');
        }
    };

    const handleSendToAllUsers = async () => {
        if (email.body.trim() === '') {
            toast.error('Email body cannot be empty');
            return;
        }
        try {
            const response = await axios.post('/api/email/sendall', {
                userId: currentuser.id,
                subject: email.subject,
                body: email.body
            });
            if (response.data.status) {
                toast.success(`Emails sent successfully. Success: ${response.data.success}, Failed: ${response.data.failed}`);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to send emails');
        }
    };
    */

  // Dummy implementations for demo
  const handleSendToSelectedUsers = () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user")
      return
    }
    if (email.body.trim() === "") {
      toast.error("Email body cannot be empty")
      return
    }

    const confirmation = window.confirm("Are you sure you want to send the email to the selected users?")
    if (!confirmation) {
      return
    }

    // Simulate API call
    setTimeout(() => {
      const success = selectedUsers.length
      const failed = 0
      toast.success(`Emails sent successfully. Success: ${success}, Failed: ${failed}`)

      // Add to history
      const newEmail = {
        _id: Date.now().toString(),
        subject: email.subject,
        body: email.body,
        sentTo: selectedUsers.length,
        delivered: selectedUsers.length,
        opened: 0,
        clicked: 0,
        bounced: 0,
        sentAt: new Date().toISOString(),
        type: email.type,
        priority: email.priority,
        status: "delivered",
      }
      setEmailHistory([newEmail, ...emailHistory])

      // Reset form
      setSelectedUsers([])
      setEmail({ ...email, body: "", subject: "" })
    }, 1000)
  }

  const handleSendToAllUsers = () => {
    if (email.body.trim() === "") {
      toast.error("Email body cannot be empty")
      return
    }

    const confirmation = window.confirm("Are you sure you want to send the email to all users?")
    if (!confirmation) {
      return
    }

    // Simulate API call
    setTimeout(() => {
      const eligibleUsers = registeredUsers.filter((user) => user.user.emailVerified)
      const success = eligibleUsers.length
      const failed = registeredUsers.length - eligibleUsers.length
      toast.success(`Emails sent successfully. Success: ${success}, Failed: ${failed}`)

      // Add to history
      const newEmail = {
        _id: Date.now().toString(),
        subject: email.subject,
        body: email.body,
        sentTo: registeredUsers.length,
        delivered: success,
        opened: 0,
        clicked: 0,
        bounced: failed,
        sentAt: new Date().toISOString(),
        type: email.type,
        priority: email.priority,
        status: "delivered",
      }
      setEmailHistory([newEmail, ...emailHistory])

      // Reset form
      setEmail({ ...email, body: "", subject: "" })
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
    const eligibleUsers = filteredUsers.filter((user) => user.user.emailVerified)
    if (selectedUsers.length === eligibleUsers.length) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(eligibleUsers.map((user) => user.user._id))
    }
  }

  const handleTemplateSelect = (templateId) => {
    const template = templates.find((t) => t._id === templateId)
    if (template) {
      setEmail({
        ...email,
        subject: template.subject,
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
      (filterType === "Email Verified" && user.user.emailVerified) ||
      (filterType === "Marketing Enabled" && user.user.emailPreferences?.marketing)

    return matchesSearch && matchesFilter
  })

  // Statistics
  const totalUsers = registeredUsers.length
  const verifiedEmails = registeredUsers.filter((user) => user.user.emailVerified).length
  const marketingEnabled = registeredUsers.filter((user) => user.user.emailPreferences?.marketing).length
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
      case "transactional":
        return "text-green-600 bg-green-100"
      case "promotional":
        return "text-purple-600 bg-purple-100"
      case "newsletter":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getEngagementColor = (score) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  // Simple rich text editor component (replacing ReactQuill for demo)
  const SimpleRichTextEditor = ({ value, onChange, placeholder }) => {
    return (
      <div className="border border-gray-300 rounded-lg">
        <div className="border-b border-gray-300 p-2 bg-gray-50 flex gap-2">
          <button
            type="button"
            onClick={() => {
              const selection = window.getSelection()
              if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0)
                const bold = document.createElement("strong")
                try {
                  range.surroundContents(bold)
                } catch (e) {
                  bold.appendChild(range.extractContents())
                  range.insertNode(bold)
                }
              }
            }}
            className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => {
              const selection = window.getSelection()
              if (selection.rangeCount > 0) {
                const range = selection.getRangeAt(0)
                const italic = document.createElement("em")
                try {
                  range.surroundContents(italic)
                } catch (e) {
                  italic.appendChild(range.extractContents())
                  range.insertNode(italic)
                }
              }
            }}
            className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
          >
            <em>I</em>
          </button>
        </div>
        <div
          contentEditable
          className="p-4 min-h-[200px] focus:outline-none"
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={(e) => onChange(e.target.innerHTML)}
          style={{ minHeight: "200px" }}
        />
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Campaign Center</h1>
              <p className="text-gray-600">Create and send targeted email campaigns to your users</p>
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
                <p className="text-sm font-medium text-gray-600">Verified Emails</p>
                <p className="text-3xl font-bold text-green-600">{verifiedEmails}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Marketing Enabled</p>
                <p className="text-3xl font-bold text-blue-600">{marketingEnabled}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Mail className="w-6 h-6 text-blue-600" />
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
                <Edit3 className="w-4 h-4 inline mr-2" />
                Compose
              </button>
              <button
                onClick={() => setActiveTab("templates")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "templates"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <FileText className="w-4 h-4 inline mr-2" />
                Templates
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
                {/* Email Composition */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compose Email</h3>

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
                              {template.name} ({template.category})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Email Form */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                          <input
                            type="text"
                            value={email.subject}
                            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                            placeholder="Enter email subject"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <p className="text-sm text-gray-500 mt-1">{email.subject.length}/100 characters</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Body *</label>
                          <SimpleRichTextEditor
                            value={email.body}
                            onChange={(value) => setEmail({ ...email, body: value })}
                            placeholder="Compose your email..."
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                            <select
                              value={email.type}
                              onChange={(e) => setEmail({ ...email, type: e.target.value })}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="general">General</option>
                              <option value="transactional">Transactional</option>
                              <option value="promotional">Promotional</option>
                              <option value="newsletter">Newsletter</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                              value={email.priority}
                              onChange={(e) => setEmail({ ...email, priority: e.target.value })}
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
                          disabled={selectedUsers.length === 0 || email.body.trim() === ""}
                          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Send to Selected ({selectedCount})
                        </button>
                        <button
                          onClick={handleSendToAllUsers}
                          disabled={email.body.trim() === ""}
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
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setPreviewMode("desktop")}
                          className={`p-2 rounded ${previewMode === "desktop" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                        >
                          <Monitor className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPreviewMode("mobile")}
                          className={`p-2 rounded ${previewMode === "mobile" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                        >
                          <Smartphone className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className={`bg-gray-100 rounded-lg p-4 ${previewMode === "mobile" ? "max-w-sm mx-auto" : ""}`}>
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                        <div className="border-b border-gray-200 pb-4 mb-4">
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                              <Mail className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Fundkaro</p>
                              <p className="text-xs text-gray-500">noreply@fundkaro.com</p>
                            </div>
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900">{email.subject || "Email Subject"}</h2>
                        </div>
                        <div
                          className="prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: email.body || "<p>Your email content will appear here...</p>",
                          }}
                        />
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(email.type)}`}>
                            {email.type.toUpperCase()}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(email.priority)}`}
                          >
                            {email.priority.toUpperCase()}
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
                        {selectedUsers.length === filteredUsers.filter((u) => u.user.emailVerified).length
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
                      <option value="Email Verified">Email Verified</option>
                      <option value="Marketing Enabled">Marketing Enabled</option>
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
                        } ${!user.user.emailVerified ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.user._id)}
                            onChange={() => handleUserSelect(user.user._id)}
                            disabled={!user.user.emailVerified}
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
                              {user.user.emailVerified && <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{user.user.email}</p>
                            <p className="text-sm text-gray-500">{user.user.phoneNo}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">{user.location}</span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getEngagementColor(user.engagementScore)}`}
                              >
                                {user.engagementScore}% engaged
                              </span>
                            </div>
                            {!user.user.emailVerified && (
                              <span className="text-xs text-red-600 font-medium">Email not verified</span>
                            )}
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

            {activeTab === "templates" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Email Templates</h3>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4 mr-2" />
                    New Template
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <div key={template._id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{template.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{template.category}</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                            {template.type.toUpperCase()}
                          </span>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleTemplateSelect(template._id)}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Use Template"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="Edit">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-700 mb-1">Subject:</p>
                        <p className="text-sm text-gray-600">{template.subject}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
                        <div
                          className="text-sm text-gray-600 line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: template.body }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Email History</h3>
                <div className="space-y-4">
                  {emailHistory.map((email) => (
                    <div key={email._id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{email.subject}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(email.type)}`}>
                              {email.type.toUpperCase()}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(email.priority)}`}
                            >
                              {email.priority.toUpperCase()}
                            </span>
                          </div>
                          <div
                            className="text-gray-700 mb-3 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: email.body }}
                          />
                          <p className="text-sm text-gray-500">Sent on {formatDate(email.sentAt)}</p>
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

                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{email.sentTo}</p>
                          <p className="text-sm text-gray-600">Sent</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{email.delivered}</p>
                          <p className="text-sm text-gray-600">Delivered</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-orange-600">{email.opened}</p>
                          <p className="text-sm text-gray-600">Opened</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-purple-600">{email.clicked}</p>
                          <p className="text-sm text-gray-600">Clicked</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-red-600">{email.bounced}</p>
                          <p className="text-sm text-gray-600">Bounced</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {emailHistory.length === 0 && (
                  <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No emails sent yet</h3>
                    <p className="text-gray-600">Your email history will appear here</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Analytics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Total Sent</h4>
                      <Send className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">2,847</p>
                    <p className="text-sm text-green-600">+18% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Delivery Rate</h4>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">96.8%</p>
                    <p className="text-sm text-green-600">+1.2% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Open Rate</h4>
                      <Eye className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">24.3%</p>
                    <p className="text-sm text-red-600">-2.1% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Click Rate</h4>
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">8.7%</p>
                    <p className="text-sm text-green-600">+1.8% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Bounce Rate</h4>
                      <XCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">3.2%</p>
                    <p className="text-sm text-green-600">-0.8% from last month</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Best Time</h4>
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">2:00 PM</p>
                    <p className="text-sm text-gray-600">Highest open rate</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Top Device</h4>
                      <Smartphone className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-xl font-bold text-gray-900">Mobile</p>
                    <p className="text-sm text-gray-600">72% of opens</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Growth Rate</h4>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">+12.4%</p>
                    <p className="text-sm text-green-600">Subscriber growth</p>
                  </div>

                  <div className="bg-white rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Avg. Engagement</h4>
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">76.2%</p>
                    <p className="text-sm text-green-600">+4.3% from last month</p>
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

export default EmailSender
