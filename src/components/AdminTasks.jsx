"use client"

import { useState, useEffect, useContext } from "react"
// import axios from 'axios';
import { UserContext } from "../context/userContext"
import toast from "react-hot-toast"
import {
  Calendar,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Plus,
  Search,
  BarChart3,
  AlertCircle,
  Trash2,
  Edit3,
  Target,
} from "lucide-react"

function AdminTasks() {
  const { currentuser } = useContext(UserContext)
  const [tasks, setTasks] = useState([])
  const [taskTitle, setTaskTitle] = useState("")
  const [description, setDescription] = useState("")
  const [assignedUserId, setAssignedUserId] = useState("")
  const [priority, setPriority] = useState("Medium")
  const [dueDate, setDueDate] = useState("")
  const [role, setRole] = useState("Verifier")
  const [verifiers, setVerifiers] = useState([])
  const [preparers, setPreparers] = useState([])
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [filterStatus, setFilterStatus] = useState("All")
  const [filterPriority, setFilterPriority] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'

  // Dummy data for tasks
  const dummyTasks = [
    {
      _id: "1",
      taskTitle: "Verify Client Documents",
      description: "Review and verify KYC documents for new client applications",
      assignedUserId: { _id: "101", email: "verifier1@company.com", fullName: "John Smith" },
      assignerUserId: { _id: "201", email: "admin@company.com", fullName: "Admin User" },
      completed: false,
      priority: "High",
      dueDate: "2024-01-15",
      createdAt: "2024-01-10",
      category: "Verification",
      estimatedHours: 4,
      progress: 25,
    },
    {
      _id: "2",
      taskTitle: "Prepare Loan Documentation",
      description: "Prepare comprehensive loan documentation for approved applications",
      assignedUserId: { _id: "102", email: "preparer1@company.com", fullName: "Sarah Johnson" },
      assignerUserId: { _id: "201", email: "admin@company.com", fullName: "Admin User" },
      completed: true,
      priority: "Medium",
      dueDate: "2024-01-12",
      createdAt: "2024-01-08",
      category: "Documentation",
      estimatedHours: 6,
      progress: 100,
    },
    {
      _id: "3",
      taskTitle: "Client Risk Assessment",
      description: "Conduct thorough risk assessment for high-value loan applications",
      assignedUserId: { _id: "103", email: "verifier2@company.com", fullName: "Mike Wilson" },
      assignerUserId: { _id: "201", email: "admin@company.com", fullName: "Admin User" },
      completed: false,
      priority: "High",
      dueDate: "2024-01-18",
      createdAt: "2024-01-12",
      category: "Assessment",
      estimatedHours: 8,
      progress: 60,
    },
    {
      _id: "4",
      taskTitle: "Update Client Database",
      description: "Update client information and maintain database accuracy",
      assignedUserId: { _id: "104", email: "preparer2@company.com", fullName: "Emily Davis" },
      assignerUserId: { _id: "201", email: "admin@company.com", fullName: "Admin User" },
      completed: false,
      priority: "Low",
      dueDate: "2024-01-20",
      createdAt: "2024-01-13",
      category: "Data Management",
      estimatedHours: 3,
      progress: 10,
    },
    {
      _id: "5",
      taskTitle: "Monthly Report Generation",
      description: "Generate comprehensive monthly performance and analytics reports",
      assignedUserId: { _id: "105", email: "analyst@company.com", fullName: "David Brown" },
      assignerUserId: { _id: "201", email: "admin@company.com", fullName: "Admin User" },
      completed: true,
      priority: "Medium",
      dueDate: "2024-01-14",
      createdAt: "2024-01-09",
      category: "Reporting",
      estimatedHours: 5,
      progress: 100,
    },
  ]

  // Dummy data for users
  const dummyVerifiers = [
    { user: { _id: "101", email: "verifier1@company.com" }, fullName: "John Smith", workload: 5, rating: 4.8 },
    { user: { _id: "103", email: "verifier2@company.com" }, fullName: "Mike Wilson", workload: 3, rating: 4.6 },
    { user: { _id: "106", email: "verifier3@company.com" }, fullName: "Lisa Anderson", workload: 2, rating: 4.9 },
  ]

  const dummyPreparers = [
    { user: { _id: "102", email: "preparer1@company.com" }, fullName: "Sarah Johnson", workload: 4, rating: 4.7 },
    { user: { _id: "104", email: "preparer2@company.com" }, fullName: "Emily Davis", workload: 6, rating: 4.5 },
    { user: { _id: "107", email: "preparer3@company.com" }, fullName: "Robert Taylor", workload: 1, rating: 4.8 },
  ]

  useEffect(() => {
    // fetchTasks();
    // fetchUsersByRole('Verifier');
    // fetchUsersByRole('Preparer');

    // Using dummy data instead
    setTasks(dummyTasks)
    setVerifiers(dummyVerifiers)
    setPreparers(dummyPreparers)
  }, [])

  // Commented out API functions - preserved for backend integration
  /*
    const fetchTasks = async () => {
        try {
            const response = await axios.post('/api/task/find', { userId: currentuser.id });
            console.log(response.data);
            if (response.data.status) {
                setTasks(response.data.tasks);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch tasks');
        }
    };

    const fetchUsersByRole = async (role) => {
        try {
            const response = await axios.post('/api/admin/findusersbyrole', {
                userId: currentuser.id,
                role: role
            });
            if (response.data.status) {
                if (role === 'Verifier') {
                    setVerifiers(response.data.data);
                } else {
                    setPreparers(response.data.data);
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(`Failed to fetch ${role} users`);
        }
    };

    const handleCreateTask = async () => {
        if (!taskTitle || !description || !assignedUserId) {
            toast.error('Please fill in all fields');
            return;
        }
        try {
            const response = await axios.post('/api/task/create', {
                userId: currentuser.id,
                assignedUserId: assignedUserId,
                taskTitle: taskTitle,
                description: description
            });
            console.log(response.data);
            if (response.data.status) {
                toast.success('Task created successfully');
                fetchTasks();
                setTaskTitle('');
                setDescription('');
                setAssignedUserId('');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to create task');
        }
    };

    const handleUpdateTask = async (taskId, updatedData) => {
        try {
            const response = await axios.post('/api/task/update', {
                userId: currentuser.id,
                id: taskId,
                ...updatedData
            });
            if (response.data.status) {
                toast.success('Task updated successfully');
                fetchTasks();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await axios.post('/api/task/delete', { userId: currentuser.id, id: taskId });
            if (response.data.status) {
                toast.success('Task deleted successfully');
                fetchTasks();
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to delete task');
        }
    };
    */

  // Dummy implementations for demo
  const handleCreateTask = () => {
    if (!taskTitle || !description || !assignedUserId) {
      toast.error("Please fill in all fields")
      return
    }

    const newTask = {
      _id: Date.now().toString(),
      taskTitle,
      description,
      assignedUserId: getCurrentAssigneeData(),
      assignerUserId: { _id: currentuser?.id || "201", email: "admin@company.com", fullName: "Admin User" },
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString().split("T")[0],
      category: "General",
      estimatedHours: 4,
      progress: 0,
    }

    setTasks([...tasks, newTask])
    toast.success("Task created successfully")
    resetForm()
  }

  const handleUpdateTask = (taskId, updatedData) => {
    setTasks(tasks.map((task) => (task._id === taskId ? { ...task, ...updatedData } : task)))
    toast.success("Task updated successfully")
  }

  const handleDeleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((task) => task._id !== taskId))
      toast.success("Task deleted successfully")
    }
  }

  const getCurrentAssigneeData = () => {
    const allUsers = [...verifiers, ...preparers]
    const selectedUser = allUsers.find((user) => user.user._id === assignedUserId)
    return selectedUser
      ? {
          _id: selectedUser.user._id,
          email: selectedUser.user.email,
          fullName: selectedUser.fullName,
        }
      : null
  }

  const resetForm = () => {
    setTaskTitle("")
    setDescription("")
    setAssignedUserId("")
    setPriority("Medium")
    setDueDate("")
    setIsFormVisible(false)
    setEditingTask(null)
  }

  const handleEditTask = (task) => {
    setTaskTitle(task.taskTitle)
    setDescription(task.description)
    setAssignedUserId(task.assignedUserId?._id || "")
    setPriority(task.priority || "Medium")
    setDueDate(task.dueDate || "")
    setEditingTask(task._id)
    setIsFormVisible(true)
  }

  const handleUpdateEditedTask = () => {
    if (!taskTitle || !description || !assignedUserId) {
      toast.error("Please fill in all fields")
      return
    }

    const updatedTask = {
      taskTitle,
      description,
      assignedUserId: getCurrentAssigneeData(),
      priority,
      dueDate,
    }

    handleUpdateTask(editingTask, updatedTask)
    resetForm()
  }

  // Filter and search logic
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.taskTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.assignedUserId?.fullName || "").toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      filterStatus === "All" ||
      (filterStatus === "Completed" && task.completed) ||
      (filterStatus === "Pending" && !task.completed)

    const matchesPriority = filterPriority === "All" || task.priority === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = totalTasks - completedTasks
  const highPriorityTasks = tasks.filter((task) => task.priority === "High" && !task.completed).length

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-100"
      case "Medium":
        return "text-yellow-600 bg-yellow-100"
      case "Low":
        return "text-green-600 bg-green-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusColor = (completed) => {
    return completed ? "text-green-600 bg-green-100" : "text-orange-600 bg-orange-100"
  }

  const formatDate = (dateString) => {
    if (!dateString) return "No due date"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isOverdue = (dueDate, completed) => {
    if (!dueDate || completed) return false
    return new Date(dueDate) < new Date()
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
              <p className="text-gray-600">Manage and track team tasks efficiently</p>
            </div>
            <div className="mt-4 sm:mt-0 flex gap-3">
              <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isFormVisible ? "Cancel" : "New Task"}
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-3xl font-bold text-gray-900">{totalTasks}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{pendingTasks}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-3xl font-bold text-red-600">{highPriorityTasks}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Task Creation Form */}
        {isFormVisible && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter task description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role Type</label>
                <select
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value)
                    setAssignedUserId("") // Reset selection when role changes
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Verifier">Verifier</option>
                  <option value="Preparer">Preparer</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Assign to *</label>
                <select
                  value={assignedUserId}
                  onChange={(e) => setAssignedUserId(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select User</option>
                  {role === "Verifier" &&
                    verifiers.map((user) => (
                      <option key={user.user._id} value={user.user._id}>
                        {user.fullName} (Workload: {user.workload})
                      </option>
                    ))}
                  {role === "Preparer" &&
                    preparers.map((user) => (
                      <option key={user.user._id} value={user.user._id}>
                        {user.fullName} (Workload: {user.workload})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={editingTask ? handleUpdateEditedTask : handleCreateTask}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingTask ? "Update Task" : "Create Task"}
              </button>
              <button
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
              >
                <div className="w-4 h-4 flex flex-col gap-0.5">
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                  <div className="bg-current h-0.5 rounded"></div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{task.taskTitle}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <button
                      onClick={() => handleEditTask(task)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority} Priority
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.completed)}`}>
                      {task.completed ? "Completed" : "Pending"}
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span>{task.assignedUserId?.fullName || "Unassigned"}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className={isOverdue(task.dueDate, task.completed) ? "text-red-600 font-medium" : ""}>
                      {formatDate(task.dueDate)}
                      {isOverdue(task.dueDate, task.completed) && " (Overdue)"}
                    </span>
                  </div>

                  {task.progress !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 mt-4">
                  {!task.completed && (
                    <button
                      onClick={() => handleUpdateTask(task._id, { completed: true, progress: 100 })}
                      className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-1" />
                      Complete
                    </button>
                  )}
                  {task.completed && (
                    <button
                      onClick={() => handleUpdateTask(task._id, { completed: false, progress: 0 })}
                      className="flex-1 px-3 py-2 bg-orange-600 text-white text-sm rounded-lg hover:bg-orange-700 transition-colors"
                    >
                      <XCircle className="w-4 h-4 inline mr-1" />
                      Reopen
                    </button>
                  )}
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
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map((task) => (
                    <tr key={task._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{task.taskTitle}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{task.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {task.assignedUserId?.fullName || "Unassigned"}
                            </div>
                            <div className="text-sm text-gray-500">{task.assignedUserId?.email || ""}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.completed)}`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <span className={isOverdue(task.dueDate, task.completed) ? "text-red-600 font-medium" : ""}>
                          {formatDate(task.dueDate)}
                          {isOverdue(task.dueDate, task.completed) && (
                            <div className="text-xs text-red-600">Overdue</div>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {task.progress !== undefined && (
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${task.progress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{task.progress}%</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditTask(task)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          {!task.completed ? (
                            <button
                              onClick={() => handleUpdateTask(task._id, { completed: true, progress: 100 })}
                              className="text-green-600 hover:text-green-800 transition-colors"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateTask(task._id, { completed: false, progress: 0 })}
                              className="text-orange-600 hover:text-orange-800 transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="text-red-600 hover:text-red-800 transition-colors"
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

        {filteredTasks.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== "All" || filterPriority !== "All"
                ? "Try adjusting your filters or search terms"
                : "Get started by creating your first task"}
            </p>
            {!searchTerm && filterStatus === "All" && filterPriority === "All" && (
              <button
                onClick={() => setIsFormVisible(true)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create First Task
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminTasks
