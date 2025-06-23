"use client"

import { useState } from "react"
// import axios from 'axios'; // COMMENTED OUT - Backend integration
// import toast from 'react-hot-toast'; // COMMENTED OUT - Backend integration
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration

function EditCategory({ category, goBack, onEdit }) {
  const [formFields, setFormFields] = useState(category.formFields || [])
  const [categoryName, setCategoryName] = useState(category.category || "")
  const [categoryLogo, setCategoryLogo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration

  // Simple form field management (since FormBuilder is commented out)
  const [fieldName, setFieldName] = useState("")
  const [fieldType, setFieldType] = useState("text")

  const validateForm = () => {
    const newErrors = {}

    if (!categoryName.trim()) {
      newErrors.categoryName = "Category name is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const addField = () => {
    if (!fieldName.trim()) {
      alert("Please enter a field name")
      return
    }
    const newField = {
      id: Date.now().toString(),
      name: fieldName.trim(),
      type: fieldType,
      label: fieldName.trim(),
      required: false,
    }
    setFormFields([...formFields, newField])
    setFieldName("")
    setFieldType("text")
  }

  const removeField = (index) => {
    const updatedFields = [...formFields]
    updatedFields.splice(index, 1)
    setFormFields(updatedFields)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const updatedCategory = {
        ...category,
        category: categoryName.trim(),
        formFields: formFields,
        logo: categoryLogo ? URL.createObjectURL(categoryLogo) : category.logo,
        updatedAt: new Date().toISOString(),
      }

      if (onEdit) {
        onEdit(updatedCategory)
      }

      setLoading(false)
      alert("Category updated successfully!")

      if (goBack) {
        goBack()
      }
    }, 1000)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const response = await axios.post(`/api/category/update`, {
        userId: currentuser.id,
        category: categoryName,
        categoryId: category._id,
        formFields
      });
      
      if (response.data.success) {
        toast.success('Category updated successfully');
        goBack();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
    */
  }

  const handleInputChange = (e) => {
    setCategoryName(e.target.value)
    if (errors.categoryName) {
      setErrors({ ...errors, categoryName: "" })
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setCategoryLogo(e.target.files[0])
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Category</h2>
        <p className="text-gray-600">Update category information and form fields</p>
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
            value={categoryName}
            onChange={handleInputChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.categoryName ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Enter category name"
            required
          />
          {errors.categoryName && <p className="mt-1 text-sm text-red-600">{errors.categoryName}</p>}
        </div>

        {/* Category Logo */}
        <div>
          <label htmlFor="categoryLogo" className="block text-sm font-medium text-gray-700 mb-2">
            Update Category Logo
          </label>
          <input
            type="file"
            id="categoryLogo"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            accept="image/*"
          />
          <p className="mt-1 text-xs text-gray-500">Leave empty to keep current logo</p>
        </div>

        {/* Current Logo Preview */}
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <img
            src={
              categoryLogo ? URL.createObjectURL(categoryLogo) : category.logo || "/placeholder.svg?height=48&width=48"
            }
            alt="Category logo"
            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
          />
          <div>
            <p className="text-sm font-medium text-gray-700">{categoryLogo ? "New Logo Selected" : "Current Logo"}</p>
            <p className="text-xs text-gray-500">{categoryLogo ? categoryLogo.name : "Upload a new file to change"}</p>
          </div>
        </div>

        {/* Simple Form Fields Management */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Form Fields</h3>

          {/* Add New Field */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h4 className="font-medium text-gray-700 mb-3">Add New Field</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Field name"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={fieldType}
                onChange={(e) => setFieldType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="number">Number</option>
                <option value="tel">Phone</option>
                <option value="select">Select</option>
                <option value="textarea">Textarea</option>
              </select>
              <button
                type="button"
                onClick={addField}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Field
              </button>
            </div>
          </div>

          {/* Existing Fields */}
          {formFields.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-700">Current Fields</h4>
              {formFields.map((field, index) => (
                <div
                  key={field.id || index}
                  className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="font-medium text-gray-700">{field.label || field.name}</span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{field.type}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="text-red-600 hover:text-red-800 p-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}

          {formFields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No form fields added yet. Add some fields above to get started.</p>
            </div>
          )}
        </div>

        {/* Form Builder Section - Commented out as requested */}
        {/* <div className="col-span-2">
          <FormBuilder setTemplate={setFormFields} template={formFields} />
        </div> */}

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={goBack}
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
                Updating...
              </div>
            ) : (
              "Update Category"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditCategory
