"use client"

import { useState } from "react"
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration
// import toast from 'react-hot-toast'; // COMMENTED OUT - Backend integration
// import axios from 'axios'; // COMMENTED OUT - Backend integration

function AddCategory({ goback, onAdd }) {
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration
  const [category, setCategory] = useState("")
  const [categoryLogo, setCategoryLogo] = useState("")
  const [template, setTemplate] = useState({
    nodes: [],
    edges: [],
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!category.trim()) {
      newErrors.category = "Category name is required"
    }

    if (!categoryLogo) {
      newErrors.categoryLogo = "Category logo is required"
    }

    // Commented out template validation as FormBuilder is not implemented
    // if (!template.nodes.length) {
    //   newErrors.template = "Please add at least one form field"
    // }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const newCategory = {
        _id: Date.now().toString(),
        category: category.trim(),
        logo: categoryLogo ? URL.createObjectURL(categoryLogo) : "/placeholder.svg?height=64&width=64",
        formFields: template,
        status: "Active",
        createdAt: new Date().toISOString(),
        totalLoans: 0,
      }

      if (onAdd) {
        onAdd(newCategory)
      }

      setLoading(false)
      alert("Category added successfully!")

      // Reset form
      setCategory("")
      setCategoryLogo("")
      setTemplate({ nodes: [], edges: [] })

      if (goback) {
        goback()
      }
    }, 1000)

    /* COMMENTED OUT - BACKEND INTEGRATION
    console.log(template);
    if (!category || !categoryLogo || !template.nodes.length) {
      toast.error('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('logo', categoryLogo);
    formData.append('userId', currentuser.id);
    formData.append('category', category);
    formData.append('formFields', JSON.stringify(template));

    try {
      const response = await axios.post('/api/category/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        toast.success('Category added successfully');
        setCategory('');
        setCategoryLogo('');
        setTemplate({ nodes: [], edges: [] });
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to add new Category");
    }
    */
  }

  const handleInputChange = (e) => {
    setCategory(e.target.value)
    if (errors.category) {
      setErrors({ ...errors, category: "" })
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCategoryLogo(e.target.files[0])
      if (errors.categoryLogo) {
        setErrors({ ...errors, categoryLogo: "" })
      }
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Category</h2>
        <p className="text-gray-600">Create a new loan category with custom form fields</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Category Name *
          </label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.category ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter category name (e.g., Personal Loan, Home Loan)"
            required
          />
          {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
        </div>

        {/* Category Logo */}
        <div>
          <label htmlFor="categoryLogo" className="block text-sm font-medium text-gray-700 mb-2">
            Category Logo *
          </label>
          <input
            type="file"
            id="categoryLogo"
            onChange={handleFileChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.categoryLogo ? "border-red-300" : "border-gray-300"
            }`}
            accept="image/*"
            required
          />
          {errors.categoryLogo && <p className="mt-1 text-sm text-red-600">{errors.categoryLogo}</p>}
          <p className="mt-1 text-xs text-gray-500">Upload PNG, JPG, or SVG files (max 2MB)</p>
        </div>

        {/* Logo Preview */}
        {categoryLogo && (
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <img
              src={URL.createObjectURL(categoryLogo) || "/placeholder.svg"}
              alt="Category logo preview"
              className="w-12 h-12 object-cover rounded-lg border border-gray-200"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">{categoryLogo.name}</p>
              <p className="text-xs text-gray-500">{(categoryLogo.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        )}

        {/* Form Builder Section - Commented out as requested */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Custom Form Fields</h3>
          <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-gray-600 mb-2">Form Builder Coming Soon</p>
              <p className="text-sm text-gray-500">
                The visual form builder will allow you to create custom application forms for this category.
              </p>
            </div>
          </div>
          {/* <FormBuilder setTemplate={setTemplate} template={template} /> */}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={goback}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors duration-200"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </div>
            ) : (
              "Create Category"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddCategory
