"use client"

import { useEffect, useState } from "react"
// import axios from 'axios';

const Logs = () => {
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [logsPerPage] = useState(10)
  const [selectedLog, setSelectedLog] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Comprehensive dummy log data
  const dummyLogs = [
    {
      id: 1,
      timestamp: new Date("2024-01-15T10:30:00"),
      level: "INFO",
      category: "Authentication",
      message: "User admin@example.com successfully logged in",
      details: "Login successful from IP: 192.168.1.100, Browser: Chrome 120.0",
      userId: "admin@example.com",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 2,
      timestamp: new Date("2024-01-15T10:25:00"),
      level: "ERROR",
      category: "Database",
      message: "Failed to connect to database server",
      details: "Connection timeout after 30 seconds. Database server may be down.",
      userId: null,
      ipAddress: "localhost",
      userAgent: "System",
    },
    {
      id: 3,
      timestamp: new Date("2024-01-15T10:20:00"),
      level: "WARNING",
      category: "Security",
      message: "Multiple failed login attempts detected",
      details: "IP address 192.168.1.200 attempted to login 5 times with invalid credentials",
      userId: "unknown",
      ipAddress: "192.168.1.200",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 4,
      timestamp: new Date("2024-01-15T10:15:00"),
      level: "INFO",
      category: "Loan Management",
      message: "New loan application submitted",
      details: "Loan application #LA2024001 submitted by John Doe for $50,000",
      userId: "john.doe@email.com",
      ipAddress: "192.168.1.150",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
    {
      id: 5,
      timestamp: new Date("2024-01-15T10:10:00"),
      level: "DEBUG",
      category: "System",
      message: "Cache cleared successfully",
      details: "Application cache cleared. Memory usage reduced from 85% to 45%",
      userId: "system",
      ipAddress: "localhost",
      userAgent: "System",
    },
    {
      id: 6,
      timestamp: new Date("2024-01-15T10:05:00"),
      level: "ERROR",
      category: "Email Service",
      message: "Failed to send notification email",
      details: "SMTP server connection failed. Email to user@example.com could not be delivered",
      userId: "user@example.com",
      ipAddress: "localhost",
      userAgent: "System",
    },
    {
      id: 7,
      timestamp: new Date("2024-01-15T10:00:00"),
      level: "INFO",
      category: "User Management",
      message: "New user account created",
      details: "User account created for jane.smith@email.com with role: Client",
      userId: "admin@example.com",
      ipAddress: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 8,
      timestamp: new Date("2024-01-15T09:55:00"),
      level: "WARNING",
      category: "Performance",
      message: "High memory usage detected",
      details: "System memory usage at 92%. Consider optimizing queries or increasing server resources",
      userId: null,
      ipAddress: "localhost",
      userAgent: "System Monitor",
    },
    {
      id: 9,
      timestamp: new Date("2024-01-15T09:50:00"),
      level: "INFO",
      category: "Backup",
      message: "Daily backup completed successfully",
      details: "Database backup completed. File size: 2.3GB, Duration: 15 minutes",
      userId: "system",
      ipAddress: "localhost",
      userAgent: "Backup Service",
    },
    {
      id: 10,
      timestamp: new Date("2024-01-15T09:45:00"),
      level: "ERROR",
      category: "API",
      message: "External API request failed",
      details: "Credit score API request failed with status 503. Service temporarily unavailable",
      userId: null,
      ipAddress: "api.creditservice.com",
      userAgent: "System",
    },
    {
      id: 11,
      timestamp: new Date("2024-01-15T09:40:00"),
      level: "INFO",
      category: "Authentication",
      message: "User session expired",
      details: "Session for user client@example.com expired after 2 hours of inactivity",
      userId: "client@example.com",
      ipAddress: "192.168.1.175",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15",
    },
    {
      id: 12,
      timestamp: new Date("2024-01-15T09:35:00"),
      level: "DEBUG",
      category: "Database",
      message: "Query optimization completed",
      details: "Slow query optimized. Execution time reduced from 2.5s to 0.3s",
      userId: "system",
      ipAddress: "localhost",
      userAgent: "Database Optimizer",
    },
    {
      id: 13,
      timestamp: new Date("2024-01-15T09:30:00"),
      level: "WARNING",
      category: "Storage",
      message: "Disk space running low",
      details: "Available disk space: 15%. Consider cleaning up old files or expanding storage",
      userId: null,
      ipAddress: "localhost",
      userAgent: "System Monitor",
    },
    {
      id: 14,
      timestamp: new Date("2024-01-15T09:25:00"),
      level: "INFO",
      category: "Loan Management",
      message: "Loan application approved",
      details: "Loan application #LA2024001 approved by manager@example.com for $50,000",
      userId: "manager@example.com",
      ipAddress: "192.168.1.120",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    },
    {
      id: 15,
      timestamp: new Date("2024-01-15T09:20:00"),
      level: "ERROR",
      category: "Payment Processing",
      message: "Payment gateway connection failed",
      details: "Unable to process payment of $1,250.00. Gateway returned error code: 500",
      userId: "client@example.com",
      ipAddress: "192.168.1.180",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  ]

  useEffect(() => {
    fetchLogs()
  }, [])

  useEffect(() => {
    filterLogs()
  }, [logs, searchTerm, selectedLevel, selectedDateRange])

  const fetchLogs = async () => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      setTimeout(() => {
        setLogs(dummyLogs)
        setIsLoading(false)
      }, 1000)

      // Original API call (commented out)
      // const response = await axios.get('/api/admin/logs/find');
      // setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs", error)
      setIsLoading(false)
    }
  }

  const filterLogs = () => {
    let filtered = logs

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (log.userId && log.userId.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    }

    // Filter by log level
    if (selectedLevel !== "all") {
      filtered = filtered.filter((log) => log.level === selectedLevel)
    }

    // Filter by date range
    if (selectedDateRange !== "all") {
      const now = new Date()
      let startDate

      switch (selectedDateRange) {
        case "today":
          startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          break
        case "week":
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          break
        case "month":
          startDate = new Date(now.getFullYear(), now.getMonth(), 1)
          break
        default:
          startDate = null
      }

      if (startDate) {
        filtered = filtered.filter((log) => new Date(log.timestamp) >= startDate)
      }
    }

    setFilteredLogs(filtered)
    setCurrentPage(1)
  }

  const deleteAllLogs = async () => {
    if (window.confirm("Are you sure you want to delete all logs? This action cannot be undone.")) {
      setIsLoading(true)
      try {
        // Simulate API call delay
        setTimeout(() => {
          setLogs([])
          setFilteredLogs([])
          setIsLoading(false)
        }, 500)

        // Original API call (commented out)
        // await axios.delete('/api/admin/logs/delete');
        // setLogs([]);
      } catch (error) {
        console.error("Error deleting logs", error)
        setIsLoading(false)
      }
    }
  }

  const exportLogs = async () => {
    try {
      // Create CSV content
      const csvContent = [
        ["Timestamp", "Level", "Category", "Message", "User ID", "IP Address"].join(","),
        ...filteredLogs.map((log) =>
          [
            log.timestamp.toISOString(),
            log.level,
            log.category,
            `"${log.message}"`,
            log.userId || "",
            log.ipAddress || "",
          ].join(","),
        ),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `logs_${new Date().toISOString().split("T")[0]}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      // Original API call (commented out)
      // const response = await axios.get('/api/admin/logs/export', {
      //     responseType: 'blob',
      // });
      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'logs.txt');
      // document.body.appendChild(link);
      // link.click();
    } catch (error) {
      console.error("Error exporting logs", error)
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case "ERROR":
        return "bg-red-100 text-red-800 border-red-200"
      case "WARNING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "INFO":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "DEBUG":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getLevelIcon = (level) => {
    switch (level) {
      case "ERROR":
        return "❌"
      case "WARNING":
        return "⚠️"
      case "INFO":
        return "ℹ️"
      case "DEBUG":
        return "🔧"
      default:
        return "📝"
    }
  }

  const getLogStats = () => {
    const total = logs.length
    const errors = logs.filter((log) => log.level === "ERROR").length
    const warnings = logs.filter((log) => log.level === "WARNING").length
    const info = logs.filter((log) => log.level === "INFO").length
    const debug = logs.filter((log) => log.level === "DEBUG").length

    return { total, errors, warnings, info, debug }
  }

  const stats = getLogStats()

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage
  const indexOfFirstLog = indexOfLastLog - logsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog)
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const viewLogDetails = (log) => {
    setSelectedLog(log)
    setShowModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">System Logs</h1>
              <p className="text-gray-600">Monitor and manage system activity logs</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
              <button
                onClick={exportLogs}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                disabled={isLoading || filteredLogs.length === 0}
              >
                📊 Export Logs
              </button>
              <button
                onClick={deleteAllLogs}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                disabled={isLoading || logs.length === 0}
              >
                🗑️ Delete All
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Logs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="text-2xl">📝</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Errors</p>
                <p className="text-2xl font-bold text-red-600">{stats.errors}</p>
              </div>
              <div className="text-2xl">❌</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.warnings}</p>
              </div>
              <div className="text-2xl">⚠️</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Info</p>
                <p className="text-2xl font-bold text-blue-600">{stats.info}</p>
              </div>
              <div className="text-2xl">ℹ️</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Debug</p>
                <p className="text-2xl font-bold text-gray-600">{stats.debug}</p>
              </div>
              <div className="text-2xl">🔧</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Log Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="ERROR">Error</option>
                <option value="WARNING">Warning</option>
                <option value="INFO">Info</option>
                <option value="DEBUG">Debug</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedLevel("all")
                  setSelectedDateRange("all")
                }}
                className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading logs...</span>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No logs found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(log.level)}`}
                          >
                            <span className="mr-1">{getLevelIcon(log.level)}</span>
                            {log.level}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div>{log.timestamp.toLocaleDateString()}</div>
                          <div className="text-gray-500">{log.timestamp.toLocaleTimeString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {log.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 max-w-md">
                          <div className="truncate" title={log.message}>
                            {log.message}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.userId ? (
                            <div>
                              <div className="font-medium">{log.userId}</div>
                              <div className="text-gray-500 text-xs">{log.ipAddress}</div>
                            </div>
                          ) : (
                            <span className="text-gray-400">System</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => viewLogDetails(log)}
                            className="text-blue-600 hover:text-blue-900 transition-colors duration-150"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{indexOfFirstLog + 1}</span> to{" "}
                        <span className="font-medium">{Math.min(indexOfLastLog, filteredLogs.length)}</span> of{" "}
                        <span className="font-medium">{filteredLogs.length}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === index + 1
                                ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Next
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Log Details Modal */}
      {showModal && selectedLog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Log Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Level</label>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLevelColor(selectedLog.level)} mt-1`}
                    >
                      <span className="mr-1">{getLevelIcon(selectedLog.level)}</span>
                      {selectedLog.level}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Timestamp</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.timestamp.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.userId || "System"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IP Address</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedLog.ipAddress}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User Agent</label>
                    <p className="mt-1 text-sm text-gray-900 truncate" title={selectedLog.userAgent}>
                      {selectedLog.userAgent}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedLog.message}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Details</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedLog.details}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Logs
