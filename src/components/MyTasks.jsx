"use client"

import { useState, useEffect, useContext } from "react"
// import axios from 'axios';
import { UserContext } from "../context/userContext"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  Search,
  Eye,
  MoreHorizontal,
  FileText,
  Phone,
  UserCheck,
  DollarSign,
  AlertCircle,
  TrendingUp,
  X,
} from "lucide-react"

function MyTasks() {
  const { currentuser } = useContext(UserContext)
  const navigate = useNavigate()
  const [completedTasks, setCompletedTasks] = useState([])
  const [incompleteTasks, setIncompleteTasks] = useState([])
  const [allTasks, setAllTasks] = useState([])
  const [filteredTasks, setFilteredTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")
  const [selectedTask, setSelectedTask] = useState(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Comprehensive dummy data
  const dummyTasks = [
    {
      _id: "1",
      taskTitle: "Review Loan Application #LA001",
      description:
        "Complete verification of documents and financial information for personal loan application. Check credit score, employment verification, and income statements.",
      assignerUserId: { email: "admin@company.com", name: "John Admin" },
      applicationId: { _id: "app001" },
      completed: false,
      priority: "High",
      category: "Loan Processing",
      dueDate: "2024-01-25",
      createdAt: "2024-01-20",
      progress: 75,
      estimatedHours: 3,
      actualHours: 2.5,
      tags: ["Urgent", "Personal Loan"],
      clientName: "Sarah Johnson",
      loanAmount: 25000,
    },
    {
      _id: "2",
      taskTitle: "Document Verification - Business Loan",
      description:
        "Verify business registration documents, tax returns, and financial statements for business loan application.",
      assignerUserId: { email: "manager@company.com", name: "Mike Manager" },
      applicationId: { _id: "app002" },
      completed: true,
      priority: "Medium",
      category: "Document Review",
      dueDate: "2024-01-22",
      createdAt: "2024-01-18",
      completedAt: "2024-01-21",
      progress: 100,
      estimatedHours: 4,
      actualHours: 3.5,
      tags: ["Business Loan", "Verification"],
      clientName: "Tech Solutions Inc.",
      loanAmount: 150000,
    },
    {
      _id: "3",
      taskTitle: "Client Follow-up Call",
      description:
        "Contact client regarding missing documents for mortgage application. Discuss timeline and next steps.",
      assignerUserId: { email: "supervisor@company.com", name: "Lisa Supervisor" },
      applicationId: { _id: "app003" },
      completed: false,
      priority: "Critical",
      category: "Client Communication",
      dueDate: "2024-01-24",
      createdAt: "2024-01-19",
      progress: 25,
      estimatedHours: 1,
      actualHours: 0.5,
      tags: ["Urgent", "Mortgage", "Follow-up"],
      clientName: "Robert Davis",
      loanAmount: 350000,
    },
    {
      _id: "4",
      taskTitle: "Credit Score Analysis",
      description: "Analyze credit report and score for auto loan application. Prepare risk assessment report.",
      assignerUserId: { email: "analyst@company.com", name: "Emma Analyst" },
      applicationId: { _id: "app004" },
      completed: true,
      priority: "Medium",
      category: "Risk Assessment",
      dueDate: "2024-01-20",
      createdAt: "2024-01-15",
      completedAt: "2024-01-19",
      progress: 100,
      estimatedHours: 2,
      actualHours: 2.2,
      tags: ["Auto Loan", "Credit Analysis"],
      clientName: "Maria Garcia",
      loanAmount: 45000,
    },
    {
      _id: "5",
      taskTitle: "Property Valuation Review",
      description:
        "Review property valuation report for home equity loan. Verify market comparisons and property condition.",
      assignerUserId: { email: "valuer@company.com", name: "David Valuer" },
      applicationId: { _id: "app005" },
      completed: false,
      priority: "High",
      category: "Property Assessment",
      dueDate: "2024-01-28",
      createdAt: "2024-01-22",
      progress: 40,
      estimatedHours: 5,
      actualHours: 2,
      tags: ["Home Equity", "Property"],
      clientName: "James Wilson",
      loanAmount: 80000,
    },
    {
      _id: "6",
      taskTitle: "Insurance Verification",
      description:
        "Verify insurance coverage for collateral property. Ensure adequate coverage and beneficiary details.",
      assignerUserId: { email: "insurance@company.com", name: "Anna Insurance" },
      applicationId: null,
      completed: false,
      priority: "Low",
      category: "Insurance Review",
      dueDate: "2024-01-30",
      createdAt: "2024-01-23",
      progress: 10,
      estimatedHours: 2,
      actualHours: 0.2,
      tags: ["Insurance", "Collateral"],
      clientName: "Jennifer Brown",
      loanAmount: 120000,
    },
    {
      _id: "7",
      taskTitle: "Final Approval Documentation",
      description: "Prepare final approval documents and coordinate with legal team for loan disbursement.",
      assignerUserId: { email: "legal@company.com", name: "Tom Legal" },
      applicationId: { _id: "app007" },
      completed: true,
      priority: "Critical",
      category: "Legal Review",
      dueDate: "2024-01-21",
      createdAt: "2024-01-16",
      completedAt: "2024-01-20",
      progress: 100,
      estimatedHours: 3,
      actualHours: 3.5,
      tags: ["Final Approval", "Legal"],
      clientName: "Michael Taylor",
      loanAmount: 200000,
    },
    {
      _id: "8",
      taskTitle: "Income Verification - Freelancer",
      description:
        "Verify income for freelancer client using bank statements and tax returns. Calculate average monthly income.",
      assignerUserId: { email: "underwriter@company.com", name: "Rachel Underwriter" },
      applicationId: { _id: "app008" },
      completed: false,
      priority: "Medium",
      category: "Income Verification",
      dueDate: "2024-01-26",
      createdAt: "2024-01-21",
      progress: 60,
      estimatedHours: 4,
      actualHours: 2.4,
      tags: ["Freelancer", "Income"],
      clientName: "Alex Thompson",
      loanAmount: 75000,
    },
  ]

  useEffect(() => {
    // Simulate API call with dummy data
    setIsLoading(true)
    setTimeout(() => {
      setAllTasks(dummyTasks)
      const completed = dummyTasks.filter((task) => task.completed)
      const incomplete = dummyTasks.filter((task) => !task.completed)
      setCompletedTasks(completed)
      setIncompleteTasks(incomplete)
      setFilteredTasks(dummyTasks)
      setIsLoading(false)
    }, 1000)
  }, [])

  // Original API calls (commented out)
  /*
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.post('/api/task/findbyid', {
                userId: currentuser.id,
            });
            console.log(response.data);
            if (response.data.status) {
                const tasks = response.data.tasks;
                const completed = tasks.filter(task => task.completed);
                const incomplete = tasks.filter(task => !task.completed);
                setCompletedTasks(completed);
                setIncompleteTasks(incomplete);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch tasks');
        }
    };

    const handleMarkComplete = async (taskId) => {
        try {
            const response = await axios.post('/api/task/update', {
                userId: currentuser.id,
                id: taskId,
                completed: true
            });
            if (response.data.status) {
                toast.success('Task marked as completed');
                fetchTasks(); 
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to mark task as completed');
        }
    };

    const handleMarkIncomplete = async (taskId) => {
        try {
            const response = await axios.post('/api/task/update', {
                userId: currentuser.id,
                id: taskId,
                completed: false
            });
            if (response.data.status) {
                toast.success('Task marked as incomplete');
                fetchTasks(); 
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to mark task as incomplete');
        }
    };
    */

  // Enhanced functions with dummy data
  const handleMarkComplete = (taskId) => {
    setAllTasks((prev) =>
      prev.map((task) =>
        task._id === taskId ? { ...task, completed: true, completedAt: new Date().toISOString(), progress: 100 } : task,
      ),
    )
    const updatedTasks = allTasks.map((task) =>
      task._id === taskId ? { ...task, completed: true, completedAt: new Date().toISOString(), progress: 100 } : task,
    )
    const completed = updatedTasks.filter((task) => task.completed)
    const incomplete = updatedTasks.filter((task) => !task.completed)
    setCompletedTasks(completed)
    setIncompleteTasks(incomplete)
    applyFilters(updatedTasks)
    toast.success("Task marked as completed")
  }

  const handleMarkIncomplete = (taskId) => {
    setAllTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? { ...task, completed: false, completedAt: null, progress: Math.max(0, task.progress - 20) }
          : task,
      ),
    )
    const updatedTasks = allTasks.map((task) =>
      task._id === taskId
        ? { ...task, completed: false, completedAt: null, progress: Math.max(0, task.progress - 20) }
        : task,
    )
    const completed = updatedTasks.filter((task) => task.completed)
    const incomplete = updatedTasks.filter((task) => !task.completed)
    setCompletedTasks(completed)
    setIncompleteTasks(incomplete)
    applyFilters(updatedTasks)
    toast.success("Task marked as incomplete")
  }

  const handleNavigateToApplication = (applicationId) => {
    navigate(`/admin/application/${applicationId._id}`)
  }

  // Enhanced filtering and search
  const applyFilters = (tasks = allTasks) => {
    let filtered = [...tasks]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.assignerUserId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.clientName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      if (statusFilter === "completed") {
        filtered = filtered.filter((task) => task.completed)
      } else if (statusFilter === "pending") {
        filtered = filtered.filter((task) => !task.completed)
      } else if (statusFilter === "overdue") {
        filtered = filtered.filter((task) => !task.completed && new Date(task.dueDate) < new Date())
      }
    }

    // Priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority.toLowerCase() === priorityFilter.toLowerCase())
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((task) => task.category === categoryFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate)
        case "priority":
          const priorityOrder = { Critical: 4, High: 3, Medium: 2, Low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case "title":
          return a.taskTitle.localeCompare(b.taskTitle)
        case "created":
          return new Date(b.createdAt) - new Date(a.createdAt)
        default:
          return 0
      }
    })

    setFilteredTasks(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [searchTerm, statusFilter, priorityFilter, categoryFilter, sortBy, allTasks])

  // Get priority color and icon
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "Critical":
        return { color: "bg-purple-100 text-purple-800 border-purple-200", icon: AlertCircle }
      case "High":
        return { color: "bg-red-100 text-red-800 border-red-200", icon: AlertTriangle }
      case "Medium":
        return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: Clock }
      case "Low":
        return { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle }
      default:
        return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: Clock }
    }
  }

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Loan Processing":
        return DollarSign
      case "Document Review":
        return FileText
      case "Client Communication":
        return Phone
      case "Risk Assessment":
        return TrendingUp
      case "Property Assessment":
        return FileText
      case "Insurance Review":
        return CheckCircle
      case "Legal Review":
        return FileText
      case "Income Verification":
        return UserCheck
      default:
        return FileText
    }
  }

  // Calculate statistics
  const stats = {
    total: allTasks.length,
    completed: completedTasks.length,
    pending: incompleteTasks.length,
    overdue: allTasks.filter((task) => !task.completed && new Date(task.dueDate) < new Date()).length,
    highPriority: allTasks.filter((task) => task.priority === "High" || task.priority === "Critical").length,
  }

  const clearFilters = () => {
    setSearchTerm("")
    setStatusFilter("all")
    setPriorityFilter("all")
    setCategoryFilter("all")
    setSortBy("dueDate")
  }

  const isOverdue = (task) => {
    return !task.completed && new Date(task.dueDate) < new Date()
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const TaskModal = ({ task, onClose }) => {
    if (!task) return null

    const priorityStyle = getPriorityStyle(task.priority)
    const CategoryIcon = getCategoryIcon(task.category)
    const PriorityIcon = priorityStyle.icon

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{task.taskTitle}</h2>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityStyle.color} flex items-center gap-1`}
                  >
                    <PriorityIcon className="w-4 h-4" />
                    {task.priority}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                    <CategoryIcon className="w-4 h-4" />
                    {task.category}
                  </span>
                  {task.completed ? (
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200">
                      Completed
                    </span>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${isOverdue(task) ? "bg-red-100 text-red-800 border-red-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"}`}
                    >
                      {isOverdue(task) ? "Overdue" : "Pending"}
                    </span>
                  )}
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{task.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Task Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Assigned by:</span>
                      <span className="text-sm font-medium text-gray-900">{task.assignerUserId.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Due Date:</span>
                      <span className={`text-sm font-medium ${isOverdue(task) ? "text-red-600" : "text-gray-900"}`}>
                        {formatDate(task.dueDate)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Created:</span>
                      <span className="text-sm font-medium text-gray-900">{formatDate(task.createdAt)}</span>
                    </div>
                    {task.completedAt && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-600">Completed:</span>
                        <span className="text-sm font-medium text-gray-900">{formatDate(task.completedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Progress & Time</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Estimated:</span>
                      <span className="text-sm font-medium text-gray-900">{task.estimatedHours}h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Actual:</span>
                      <span className="text-sm font-medium text-gray-900">{task.actualHours}h</span>
                    </div>
                  </div>
                </div>
              </div>

              {task.clientName && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Client Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Client Name:</span>
                        <p className="font-medium text-gray-900">{task.clientName}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Loan Amount:</span>
                        <p className="font-medium text-gray-900">${task.loanAmount?.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {task.tags && task.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {task.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-6 border-t">
              {task.applicationId && (
                <button
                  onClick={() => {
                    handleNavigateToApplication(task.applicationId)
                    onClose()
                  }}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Eye className="w-4 h-4" />
                  View Application
                </button>
              )}
              {task.completed ? (
                <button
                  onClick={() => {
                    handleMarkIncomplete(task._id)
                    onClose()
                  }}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                  Mark Incomplete
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleMarkComplete(task._id)
                    onClose()
                  }}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark Complete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Loading Tasks</h2>
          <p className="text-gray-600">Fetching your assigned tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">Manage and track your assigned tasks</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-purple-600">{stats.highPriority}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tasks, clients, or assigners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Loan Processing">Loan Processing</option>
                <option value="Document Review">Document Review</option>
                <option value="Client Communication">Client Communication</option>
                <option value="Risk Assessment">Risk Assessment</option>
                <option value="Property Assessment">Property Assessment</option>
                <option value="Insurance Review">Insurance Review</option>
                <option value="Legal Review">Legal Review</option>
                <option value="Income Verification">Income Verification</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="title">Sort by Title</option>
                <option value="created">Sort by Created</option>
              </select>

              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Tasks Found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== "all" || priorityFilter !== "all" || categoryFilter !== "all"
                  ? "No tasks match your current filters. Try adjusting your search criteria."
                  : "You don't have any tasks assigned yet."}
              </p>
              {(searchTerm || statusFilter !== "all" || priorityFilter !== "all" || categoryFilter !== "all") && (
                <button
                  onClick={clearFilters}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            filteredTasks.map((task) => {
              const priorityStyle = getPriorityStyle(task.priority)
              const CategoryIcon = getCategoryIcon(task.category)
              const PriorityIcon = priorityStyle.icon

              return (
                <div
                  key={task._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{task.taskTitle}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityStyle.color} flex items-center gap-1`}
                          >
                            <PriorityIcon className="w-4 h-4" />
                            {task.priority}
                          </span>
                          {isOverdue(task) && (
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200">
                              Overdue
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <CategoryIcon className="w-4 h-4" />
                            <span>{task.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{task.assignerUserId.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className={isOverdue(task) ? "text-red-600 font-medium" : ""}>
                              Due {formatDate(task.dueDate)}
                            </span>
                          </div>
                          {task.clientName && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{task.clientName}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={() => {
                            setSelectedTask(task)
                            setShowTaskModal(true)
                          }}
                          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-medium text-gray-900">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            task.completed ? "bg-green-500" : "bg-blue-600"
                          }`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Tags */}
                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {task.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        {task.applicationId && (
                          <button
                            onClick={() => handleNavigateToApplication(task.applicationId)}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                          >
                            <Eye className="w-4 h-4" />
                            View Application
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {task.completed ? (
                          <button
                            onClick={() => handleMarkIncomplete(task._id)}
                            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 text-sm"
                          >
                            <X className="w-4 h-4" />
                            Mark Incomplete
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMarkComplete(task._id)}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Mark Complete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Task Details Modal */}
      {showTaskModal && (
        <TaskModal
          task={selectedTask}
          onClose={() => {
            setShowTaskModal(false)
            setSelectedTask(null)
          }}
        />
      )}
    </div>
  )
}

export default MyTasks
