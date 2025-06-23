"use client"

import { useState } from "react"
import AddCategory from "./AddCategory"
import EditCategory from "./EditCategory"
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration
// import axios from 'axios'; // COMMENTED OUT - Backend integration
import { Tag, Plus, Edit, Trash2, FileText } from "lucide-react"

// Dummy categories data
const DUMMY_CATEGORIES = [
  {
    _id: "1",
    category: "Personal Loan",
    logo: "/placeholder.svg?height=64&width=64",
    formFields: [
      { id: "f1", name: "fullName", label: "Full Name", type: "text", required: true },
      { id: "f2", name: "email", label: "Email", type: "email", required: true },
      { id: "f3", name: "monthlyIncome", label: "Monthly Income", type: "number", required: true },
    ],
    status: "Active",
    totalLoans: 15,
    createdAt: "2023-01-15",
  },
  {
    _id: "2",
    category: "Home Loan",
    logo: "/placeholder.svg?height=64&width=64",
    formFields: [
      { id: "f1", name: "fullName", label: "Full Name", type: "text", required: true },
      { id: "f2", name: "propertyValue", label: "Property Value", type: "number", required: true },
      { id: "f3", name: "propertyLocation", label: "Property Location", type: "text", required: true },
    ],
    status: "Active",
    totalLoans: 8,
    createdAt: "2023-02-20",
  },
  {
    _id: "3",
    category: "Car Loan",
    logo: "/placeholder.svg?height=64&width=64",
    formFields: [
      { id: "f1", name: "fullName", label: "Full Name", type: "text", required: true },
      { id: "f2", name: "vehicleModel", label: "Vehicle Model", type: "text", required: true },
      { id: "f3", name: "vehiclePrice", label: "Vehicle Price", type: "number", required: true },
    ],
    status: "Active",
    totalLoans: 12,
    createdAt: "2023-03-10",
  },
  {
    _id: "4",
    category: "Business Loan",
    logo: "/placeholder.svg?height=64&width=64",
    formFields: [
      { id: "f1", name: "businessName", label: "Business Name", type: "text", required: true },
      { id: "f2", name: "businessType", label: "Business Type", type: "select", required: true },
      { id: "f3", name: "annualRevenue", label: "Annual Revenue", type: "number", required: true },
    ],
    status: "Inactive",
    totalLoans: 5,
    createdAt: "2023-04-05",
  },
]

function AdminCategory({ categories = DUMMY_CATEGORIES, updateData }) {
  const [addCategory, setAddCategory] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [categoryList, setCategoryList] = useState(categories)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration

  const filteredCategories = categoryList.filter((category) => {
    const matchesSearch = category.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || category.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleEdit = (category) => {
    setEditCategory(category)
    setAddCategory(true)
  }

  const handleDelete = async (categoryId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Category?")
    if (confirmDelete) {
      setLoading(true)

      // Simulate API delay
      setTimeout(() => {
        // Remove category from local state (dummy implementation)
        const updatedCategories = categoryList.filter((category) => category._id !== categoryId)
        setCategoryList(updatedCategories)
        setLoading(false)
        alert("Category deleted successfully.")
        if (updateData) {
          updateData()
        }
      }, 1000)

      /* COMMENTED OUT - BACKEND INTEGRATION
      try {
        const response = await axios.post(`/api/category/delete`, {
          userId: currentuser.id,
          categoryId
        });
        if (response.data.success) {
          alert("Category deleted successfully.");
          updateData();
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting Category:", error);
        alert("An error occurred while deleting the category.");
      }
      */
    }
  }

  const handleAddCategory = (newCategory) => {
    setCategoryList([...categoryList, newCategory])
  }

  const handleEditCategory = (updatedCategory) => {
    const updatedCategories = categoryList.map((category) =>
      category._id === updatedCategory._id ? updatedCategory : category,
    )
    setCategoryList(updatedCategories)
  }

  const goBack = () => {
    setAddCategory(!addCategory)
    setEditCategory(null)
    if (updateData) {
      updateData()
    }
  }

  const getStatusBadge = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
  }

  return (
    <div className="bg-gray-50 w-full h-full p-6 rounded-lg">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Loan Categories</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Total: {categoryList.length}
          </span>
        </div>
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center"
          onClick={goBack}
          disabled={loading}
        >
          {addCategory ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to List
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add New Category
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {addCategory ? (
        editCategory ? (
          <div className="bg-white rounded-lg shadow-sm">
            <EditCategory category={editCategory} goBack={goBack} onEdit={handleEditCategory} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <AddCategory goback={goBack} onAdd={handleAddCategory} />
          </div>
        )
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Category Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={category.logo || "/placeholder.svg"}
                      alt={category.category}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{category.category}</h3>
                      <span className={getStatusBadge(category.status)}>{category.status}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="p-1 text-gray-400 hover:text-green-600"
                      disabled={loading}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Category Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Loans:</span>
                    <span className="font-semibold text-gray-800">{category.totalLoans}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Form Fields:</span>
                    <span className="text-sm font-medium text-gray-800">{category.formFields?.length || 0} fields</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Created:</span>
                    <span className="text-sm text-gray-800">{new Date(category.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Form Fields Preview */}
                {category.formFields && category.formFields.length > 0 && (
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex items-center mb-2">
                      <FileText className="w-4 h-4 text-gray-500 mr-2" />
                      <span className="text-sm font-medium text-gray-700">Form Fields</span>
                    </div>
                    <div className="space-y-1">
                      {category.formFields.slice(0, 3).map((field, index) => (
                        <div key={field.id || index} className="flex items-center text-xs text-gray-600">
                          <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                          <span>{field.label || field.name}</span>
                          <span className="ml-auto text-gray-400">({field.type})</span>
                        </div>
                      ))}
                      {category.formFields.length > 3 && (
                        <div className="text-xs text-gray-500">+{category.formFields.length - 3} more fields</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 bg-green-50 text-green-600 hover:bg-green-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    disabled={loading}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No categories found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "All"
                  ? "No categories match your search criteria."
                  : "Get started by adding your first loan category."}
              </p>
              {!searchTerm && filterStatus === "All" && (
                <button
                  onClick={() => setAddCategory(true)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Add Category
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminCategory
