// Fixed SideDashboard.js component
"use client"

import { useNavigate } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../context/userContext"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

function SideDashboard(props) {
  const navigate = useNavigate()
  const { currentuser, setCurrentUser } = useContext(UserContext)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Get responsive state from parent props
  const isResponsive = props.isResponsive || false

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768
      const isTablet = window.innerWidth <= 1024

      if (isMobile) {
        // On mobile, sidebar should be closed by default
        if (props.setOpen) props.setOpen(false)
        setIsCollapsed(false) // Reset collapse state on mobile
      } else if (isTablet) {
        // On tablet, allow manual control but suggest collapsed
        setIsCollapsed(true)
      } else {
        // On desktop, expand by default
        setIsCollapsed(false)
        if (props.setOpen) props.setOpen(true)
      }
    }

    handleResize() // Call once to set initial state
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [props.setOpen])

  const Logout = () => {
    // Show confirmation dialog
    if (window.confirm("Are you sure you want to sign out?")) {
      setCurrentUser({ email: "", profilePicture: "", role: "", refCode: "", id: "" })
      localStorage.removeItem("token")
      navigate("/login")
    }
  }

  const toggleCollapse = () => {
    const newCollapsedState = !isCollapsed
    setIsCollapsed(newCollapsedState)
    
    // Update parent's Open state based on collapse
    if (props.setOpen && !isResponsive) {
      props.setOpen(!newCollapsedState)
    }
  }

  const closeSidebar = () => {
    if (props.setOpen) {
      props.setOpen(false)
    }
  }

  // Calculate sidebar width based on state
  const getSidebarWidth = () => {
    if (isResponsive) {
      return props.Open ? "w-80" : "w-0"
    }
    // For desktop/tablet, use collapsed state to determine width
    return (isCollapsed || !props.Open) ? "w-16" : "w-80"
  }

  // Determine if content should be hidden (collapsed state)
  const shouldHideContent = () => {
    if (isResponsive) {
      return false // Never hide content on mobile when open
    }
    return isCollapsed || !props.Open
  }

  return (
    <>
      {/* Overlay for mobile */}
      {isResponsive && props.Open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-50 transition-all duration-300 ease-in-out
          ${getSidebarWidth()}
          ${isResponsive ? (props.Open ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
          overflow-hidden
        `}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 h-16">
          {!shouldHideContent() && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">LM</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">LoanMaster</h1>
                <p className="text-xs text-gray-500">Admin Portal</p>
              </div>
            </div>
          )}

          {/* Always show collapse/expand button on desktop, close button on mobile */}
          <div className="flex items-center space-x-2">
            {/* Collapse/Expand button for desktop */}
            {!isResponsive && (
              <button
                onClick={toggleCollapse}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title={shouldHideContent() ? "Expand sidebar" : "Collapse sidebar"}
              >
                {shouldHideContent() ? (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
                )}
              </button>
            )}

            {/* Close button for mobile */}
            {isResponsive && (
              <button
                onClick={closeSidebar}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                title="Close sidebar"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Content */}
        <div
          className={`flex-1 h-[calc(100vh-4rem)] transition-all duration-300 ${
            shouldHideContent() ? "opacity-0 pointer-events-none overflow-hidden" : "opacity-100"
          }`}
        >
          {props.children}
        </div>

        {/* Collapsed State Icon */}
        {shouldHideContent() && !isResponsive && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">LM</span>
              </div>
              <div className="flex flex-col space-y-1">
                <div className="w-8 h-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-2 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-2 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default SideDashboard