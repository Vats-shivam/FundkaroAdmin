// Fixed Admin.js component
"use client"

import { useEffect, useState, useCallback } from "react"
import NameNavbar from "../components/NameNavbar"
import SideDashboard from "../components/SideDashboard"
import { Toaster } from "react-hot-toast"
import { useContext } from "react"
import { UserContext } from "../context/userContext"
import AdminNavbar from "../components/AdminNavbar"
import { useNavigate, useLocation } from "react-router-dom"
import { Loader2, AlertCircle, Shield } from "lucide-react"

function Admin(props) {
  const [Open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState(null)
  const [isResponsive, setIsResponsive] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(320) // Track actual sidebar width
  const navigate = useNavigate()
  const location = useLocation()
  const { currentuser } = useContext(UserContext)

  // Initialize sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768
      const isTablet = window.innerWidth <= 1024

      setIsResponsive(isMobile)

      // Set initial sidebar state based on screen size
      if (isMobile) {
        setOpen(false) // Closed on mobile
        setSidebarWidth(0)
      } else if (isTablet) {
        setOpen(true) // Open but can be collapsed on tablet
        setSidebarWidth(Open ? 320 : 64) // 80*4=320px for open, 16*4=64px for collapsed
      } else {
        setOpen(true) // Open on desktop
        setSidebarWidth(Open ? 320 : 64)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [Open]) // Add Open as dependency

  // Update sidebar width when Open state changes
  useEffect(() => {
    if (isResponsive) {
      setSidebarWidth(0) // Mobile always 0 margin
    } else {
      setSidebarWidth(Open ? 320 : 64) // Desktop/tablet: 320px open, 64px collapsed
    }
  }, [Open, isResponsive])

  // Enhanced authentication logic
  const checkAuthentication = useCallback(async () => {
    try {
      setIsLoading(true)
      setAuthError(null)

      // Check if user exists and has valid role
      if (!currentuser || !currentuser.role) {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("No authentication token found")
        }

        // If we have a token but no user context, we might need to refresh user data
        // This would typically involve an API call to verify the token
        throw new Error("User session expired")
      }

      // Check if user has admin privileges
      const allowedRoles = ["Admin", "Verifier", "Preparer"]
      if (!allowedRoles.includes(currentuser.role)) {
        throw new Error("Insufficient permissions")
      }

      // Additional role-based route protection
      const currentPath = location.pathname
      if (currentuser.role === "Verifier" || currentuser.role === "Preparer") {
        const restrictedPaths = ["/admin/staff", "/admin/settings", "/admin/logs"]
        if (restrictedPaths.some((path) => currentPath.startsWith(path))) {
          throw new Error("Access denied to this section")
        }
      }
    } catch (error) {
      console.error("Authentication error:", error)
      setAuthError(error.message)

      // Clear invalid session
      localStorage.removeItem("token")

      // Redirect to login after a short delay
      setTimeout(() => {
        navigate("/login", {
          state: {
            from: location.pathname,
            message: error.message,
          },
        })
      }, 2000)
    } finally {
      setIsLoading(false)
    }
  }, [currentuser, navigate, location])

  useEffect(() => {
    checkAuthentication()
  }, [checkAuthentication])

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Loading Admin Panel</h2>
          <p className="text-gray-600">Verifying your credentials...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (authError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">{authError}</p>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Go to Login
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname
    const titles = {
      "/admin": "Dashboard",
      "/admin/loanmaster": "Loan Master",
      "/admin/applications": "Applications",
      "/admin/staff": "Staff Management",
      "/admin/clients": "Client Management",
      "/admin/tasks": "Task Management",
      "/admin/mytasks": "My Tasks",
      "/admin/notifications": "Notifications",
      "/admin/emails": "Email Sender",
      "/admin/logs": "System Logs",
      "/admin/analytics": "Analytics",
      "/admin/settings": "Settings",
    }
    return titles[path] || "Admin Panel"
  }

  // Calculate content classes based on responsive state
  const getContentClasses = () => {
    const baseClasses = "min-h-screen bg-gray-50 transition-all duration-300 ease-in-out pt-16"

    if (isResponsive) {
      // On mobile, full width
      return baseClasses
    } else {
      return `${baseClasses} ml-${sidebarWidth === 320 ? '80' : '16'}` // Use proper Tailwind classes
    }
  }

  return (
    <div className=" bg-gray-50">
      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            color: "#374151",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #e5e7eb",
          },
        }}
      />

      {/* Top Navigation - FIXED POSITIONING */}
      <div
        className={`fixed top-0 z-20 transition-all duration-300 ease-in-out h-16 ${
          isResponsive 
            ? "left-0 w-full" 
            : Open 
              ? "left-80 w-[calc(100%-20rem)]" 
              : "left-16 w-[calc(100%-4rem)]"
        }`}
      >
        <NameNavbar
          Open={Open}
          setOpen={setOpen}
          ShowBackarrow={props.ShowBackarrow || false}
          currentPage={getPageTitle()}
        />
      </div>

      {/* Sidebar */}
      <SideDashboard 
        Open={Open} 
        setOpen={setOpen}
        isResponsive={isResponsive} // Pass responsive state to sidebar
      >
        <AdminNavbar />
      </SideDashboard>

      {/* Main Content Area - PROPER MARGIN CALCULATION */}
      <main 
        className={`min-h-screen bg-gray-50 transition-all duration-300 ease-in-out pt-16 ${
          isResponsive 
            ? "ml-0" 
            : Open 
              ? "ml-80" 
              : "ml-16"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
                <div className="flex items-center space-x-2 mt-1">
                  <Shield className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Logged in as {currentuser?.role} • {currentuser?.name || currentuser?.email}
                  </span>
                </div>
              </div>

              {/* Page Actions */}
              <div className="flex items-center space-x-3">
                {props.pageActions && <div className="flex items-center space-x-2">{props.pageActions}</div>}
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[calc(100vh-12rem)] w-full">
            <div className="p-6">{props.children}</div>
          </div>
        </div>
      </main>

      {/* Development Info (only in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white text-xs px-3 py-2 rounded-lg z-50">
          <div>Screen: {isResponsive ? "Mobile" : "Desktop"}</div>
          <div>Sidebar: {Open ? "Open" : "Closed"}</div>
          <div>Width: {sidebarWidth}px</div>
          <div>User: {currentuser?.role}</div>
          <div>Path: {location.pathname}</div>
        </div>
      )}
    </div>
  )
}

export default Admin