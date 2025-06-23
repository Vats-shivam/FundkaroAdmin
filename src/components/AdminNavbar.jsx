"use client"

import { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { UserContext } from "../context/userContext"
import {
  Home,
  FileText,
  Users,
  UserCheck,
  Mail,
  Bell,
  CheckSquare,
  FileBarChart,
  Settings,
  ChevronDown,
  ChevronRight,
  Search,
  LogOut,
  User,
  Shield,
  Activity,
  MessageSquare,
  BarChart3,
  Briefcase,
  CreditCard,
  Eye,
  Edit3,
  RefreshCw,
} from "lucide-react"

function AdminNavbar() {
  const { currentuser } = useContext(UserContext)
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    management: true,
    communication: true,
    system: true,
  })

  // Enhanced navigation structure with categories and role-based access
  const navigationStructure = {
    Admin: {
      management: {
        title: "Management",
        icon: Briefcase,
        items: [
          { label: "Dashboard", link: "/admin", icon: Home, badge: null, description: "Overview and analytics" },
          {
            label: "Loan Master",
            link: "/admin/loanmaster",
            icon: CreditCard,
            badge: null,
            description: "Manage loan products",
          },
          {
            label: "Applications",
            link: "/admin/applications",
            icon: FileText,
            badge: "12",
            description: "Review loan applications",
          },
          {
            label: "Staff Management",
            link: "/admin/staff",
            icon: UserCheck,
            badge: null,
            description: "Manage team members",
          },
          {
            label: "Client Management",
            link: "/admin/clients",
            icon: Users,
            badge: "3",
            description: "Manage client accounts",
          },
        ],
      },
      communication: {
        title: "Communication",
        icon: MessageSquare,
        items: [
          { label: "Email Sender", link: "/admin/emails", icon: Mail, badge: "5", description: "Send bulk emails" },
          {
            label: "Notifications",
            link: "/admin/notifications",
            icon: Bell,
            badge: "8",
            description: "Device notifications",
          },
          { label: "Tasks", link: "/admin/tasks", icon: CheckSquare, badge: "4", description: "Task management" },
        ],
      },
      system: {
        title: "System & Reports",
        icon: Settings,
        items: [
          {
            label: "System Logs",
            link: "/admin/logs",
            icon: FileBarChart,
            badge: null,
            description: "View system logs",
          },
          {
            label: "Analytics",
            link: "/admin/analytics",
            icon: BarChart3,
            badge: null,
            description: "Performance metrics",
          },
          {
            label: "Settings",
            link: "/admin/settings",
            icon: Settings,
            badge: null,
            description: "System configuration",
          },
        ],
      },
    },
    Verifier: {
      workflow: {
        title: "Verification Workflow",
        icon: Eye,
        items: [
          {
            label: "My Tasks",
            link: "/admin/mytasks",
            icon: CheckSquare,
            badge: "6",
            description: "Pending verifications",
          },
          {
            label: "Applications",
            link: "/admin/applications",
            icon: FileText,
            badge: "12",
            description: "Applications to verify",
          },
          { label: "Clients", link: "/admin/clients", icon: Users, badge: null, description: "Client information" },
        ],
      },
    },
    Preparer: {
      workflow: {
        title: "Preparation Workflow",
        icon: Edit3,
        items: [
          {
            label: "My Tasks",
            link: "/admin/mytasks",
            icon: CheckSquare,
            badge: "4",
            description: "Documents to prepare",
          },
          {
            label: "Applications",
            link: "/admin/applications",
            icon: FileText,
            badge: "8",
            description: "Applications to process",
          },
          { label: "Clients", link: "/admin/clients", icon: Users, badge: null, description: "Client information" },
        ],
      },
    },
  }

  const currentNavigation = navigationStructure[currentuser?.role] || navigationStructure.Admin

  const toggleSection = (sectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }))
  }

  const isActiveLink = (link) => {
    return location.pathname === link
  }

  const getRoleIcon = (role) => {
    switch (role) {
      case "Admin":
        return Shield
      case "Verifier":
        return Eye
      case "Preparer":
        return Edit3
      default:
        return User
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "Verifier":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "Preparer":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status = "online") => {
    switch (status) {
      case "online":
        return "bg-green-400"
      case "away":
        return "bg-yellow-400"
      case "busy":
        return "bg-red-400"
      default:
        return "bg-gray-400"
    }
  }

  // Filter navigation items based on search
  const filterNavigation = (navigation) => {
    if (!searchTerm) return navigation

    const filtered = {}
    Object.keys(navigation).forEach((sectionKey) => {
      const section = navigation[sectionKey]
      const filteredItems = section.items.filter(
        (item) =>
          item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      if (filteredItems.length > 0) {
        filtered[sectionKey] = {
          ...section,
          items: filteredItems,
        }
      }
    })

    return filtered
  }

  const filteredNavigation = filterNavigation(currentNavigation)
  const RoleIcon = getRoleIcon(currentuser?.role)

  return (
    <div className="h-full bg-white border-r border-gray-200 flex flex-col  min-h-[calc(100vh-4rem)]">
      {/* User Profile Section */}
      <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {currentuser?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor("online")} rounded-full border-2 border-white`}
            ></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-semibold text-gray-900 truncate">{currentuser?.name || "Admin User"}</h3>
              <RoleIcon className="w-4 h-4 text-gray-500" />
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getRoleColor(currentuser?.role)}`}
              >
                {currentuser?.role || "Admin"}
              </span>
              <div className="flex items-center text-xs text-gray-500">
                <Activity className="w-3 h-3 mr-1" />
                Online
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Active Tasks</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentuser?.role === "Admin" ? "23" : currentuser?.role === "Verifier" ? "6" : "4"}
                </p>
              </div>
              <CheckSquare className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Notifications</p>
                <p className="text-lg font-semibold text-gray-900">
                  {currentuser?.role === "Admin" ? "17" : currentuser?.role === "Verifier" ? "5" : "3"}
                </p>
              </div>
              <Bell className="w-5 h-5 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search navigation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-scroll [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">

        <div className="p-2">
          {Object.keys(filteredNavigation).map((sectionKey) => {
            const section = filteredNavigation[sectionKey]
            const SectionIcon = section.icon
            const isExpanded = expandedSections[sectionKey]

            return (
              <div key={sectionKey} className="mb-4">
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(sectionKey)}
                  className="w-full flex items-center justify-between p-2 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center space-x-2">
                    <SectionIcon className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">{section.title}</span>
                    <span className="text-xs text-gray-400">({section.items.length})</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {/* Section Items */}
                {isExpanded && (
                  <div className="mt-1 space-y-1">
                    {section.items.map((item, index) => {
                      const ItemIcon = item.icon
                      const isActive = isActiveLink(item.link)

                      return (
                        <Link key={index} to={item.link}>
                          <div
                            className={`group relative flex items-center p-3 rounded-lg transition-all duration-200 ${
                              isActive
                                ? "bg-blue-50 border-l-4 border-blue-500 text-blue-700"
                                : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                            }`}
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <div
                                className={`p-1.5 rounded-md ${
                                  isActive
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                                }`}
                              >
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-sm font-medium truncate ${
                                      isActive ? "text-blue-700" : "text-gray-900"
                                    }`}
                                  >
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span
                                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                        isActive ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p
                                  className={`text-xs truncate mt-0.5 ${isActive ? "text-blue-600" : "text-gray-500"}`}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button className="flex items-center justify-center p-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors duration-200">
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </button>
          <button className="flex items-center justify-center p-2 text-xs text-gray-600 hover:text-gray-900 hover:bg-white rounded-lg transition-colors duration-200">
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </button>
        </div>

        {/* System Status */}
        <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-200 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-xs text-gray-600">System Status</span>
          </div>
          <span className="text-xs font-medium text-green-600">Operational</span>
        </div>

        {/* Logout Button */}
        <button className="w-full flex items-center justify-center p-2 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200 border border-red-200">
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </button>
      </div>
    </div>
  )
}

export default AdminNavbar
