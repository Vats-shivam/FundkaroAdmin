"use client"

import { useState, useEffect } from "react"
// import axios from "axios"; // COMMENTED OUT - Backend integration
// import toast from "react-hot-toast"; // COMMENTED OUT - Backend integration
// import ReactFlow, { addEdge, Background, Controls, MiniMap } from "reactflow"; // COMMENTED OUT - ReactFlow integration
// import "reactflow/dist/style.css"; // COMMENTED OUT - ReactFlow styles
// import { UserContext } from "../context/userContext"; // COMMENTED OUT - Backend integration

// Dummy data for offers and categories
const DUMMY_OFFERS = [
  {
    _id: "1",
    offerMsg: "New Year Special - 0.5% reduced rate",
    offerCode: "NY2024",
  },
  {
    _id: "2",
    offerMsg: "First Time Borrower - 1% discount",
    offerCode: "FIRST2024",
  },
  {
    _id: "3",
    offerMsg: "Home Buyer Delight - Processing fee waived",
    offerCode: "HOME2024",
  },
]

const DUMMY_CATEGORIES = [
  {
    _id: "1",
    category: "Personal Loan",
  },
  {
    _id: "2",
    category: "Home Loan",
  },
  {
    _id: "3",
    category: "Car Loan",
  },
  {
    _id: "4",
    category: "Business Loan",
  },
]

// Dummy category form fields
const DUMMY_CATEGORY_FORM_FIELDS = {
  1: {
    // Personal Loan
    nodes: [
      {
        id: "personal-info",
        label: "Personal Information",
        fields: [
          { _id: "f1", name: "fullName", label: "Full Name", type: "text", required: true },
          { _id: "f2", name: "email", label: "Email", type: "email", required: true },
          { _id: "f3", name: "phoneNo", label: "Phone Number", type: "tel", required: true },
          { _id: "f4", name: "monthlyIncome", label: "Monthly Income", type: "number", required: true },
        ],
      },
      {
        id: "employment-info",
        label: "Employment Information",
        fields: [
          {
            _id: "f5",
            name: "employmentType",
            label: "Employment Type",
            type: "select",
            required: true,
            options: ["Salaried", "Self-Employed", "Business"],
          },
          { _id: "f6", name: "companyName", label: "Company Name", type: "text", required: true },
          { _id: "f7", name: "workExperience", label: "Work Experience (years)", type: "number", required: true },
        ],
      },
    ],
    edges: [],
  },
  2: {
    // Home Loan
    nodes: [
      {
        id: "personal-info",
        label: "Personal Information",
        fields: [
          { _id: "f1", name: "fullName", label: "Full Name", type: "text", required: true },
          { _id: "f2", name: "email", label: "Email", type: "email", required: true },
          { _id: "f3", name: "phoneNo", label: "Phone Number", type: "tel", required: true },
        ],
      },
      {
        id: "property-info",
        label: "Property Information",
        fields: [
          {
            _id: "f8",
            name: "propertyType",
            label: "Property Type",
            type: "select",
            required: true,
            options: ["Apartment", "Villa", "Plot"],
          },
          { _id: "f9", name: "propertyValue", label: "Property Value", type: "number", required: true },
          { _id: "f10", name: "propertyLocation", label: "Property Location", type: "text", required: true },
        ],
      },
    ],
    edges: [],
  },
}

function AddLoan({ goback, onAdd }) {
  const [formData, setFormData] = useState({
    code: "",
    vendor: "",
    ratesMin: "",
    ratesMax: "",
    minScoreRequired: "",
    maxLoanAmount: "",
    tenureMin: "",
    tenureMax: "",
    offerId: "",
    categoryId: "",
    imageOrSvg: null,
  })

  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration

  const [offers, setOffers] = useState([])
  const [categories, setCategories] = useState([])
  const [categoryFormFields, setCategoryFormFields] = useState(null)
  const [template, setTemplate] = useState({
    nodes: [],
    edges: [],
    fieldMappings: {},
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!formData.code) {
      newErrors.code = "Loan code is required"
    }

    if (!formData.vendor.trim()) {
      newErrors.vendor = "Vendor name is required"
    }

    if (!formData.ratesMin || formData.ratesMin < 0) {
      newErrors.ratesMin = "Valid minimum rate is required"
    }

    if (!formData.ratesMax || formData.ratesMax < 0) {
      newErrors.ratesMax = "Valid maximum rate is required"
    }

    if (Number.parseFloat(formData.ratesMin) >= Number.parseFloat(formData.ratesMax)) {
      newErrors.ratesMax = "Maximum rate must be greater than minimum rate"
    }

    if (!formData.minScoreRequired || formData.minScoreRequired < 300 || formData.minScoreRequired > 900) {
      newErrors.minScoreRequired = "Credit score must be between 300-900"
    }

    if (!formData.maxLoanAmount || formData.maxLoanAmount <= 0) {
      newErrors.maxLoanAmount = "Valid maximum loan amount is required"
    }

    if (!formData.tenureMin || formData.tenureMin < 1) {
      newErrors.tenureMin = "Valid minimum tenure is required"
    }

    if (!formData.tenureMax || formData.tenureMax < 1) {
      newErrors.tenureMax = "Valid maximum tenure is required"
    }

    if (Number.parseInt(formData.tenureMin) >= Number.parseInt(formData.tenureMax)) {
      newErrors.tenureMax = "Maximum tenure must be greater than minimum tenure"
    }

    if (!formData.offerId) {
      newErrors.offerId = "Please select an offer"
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Please select a category"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle category change and load form fields
  const handleCategoryChange = async (categoryId) => {
    if (categoryId && DUMMY_CATEGORY_FORM_FIELDS[categoryId]) {
      setCategoryFormFields(DUMMY_CATEGORY_FORM_FIELDS[categoryId])

      // Initialize template with category form fields
      setTemplate({
        nodes: DUMMY_CATEGORY_FORM_FIELDS[categoryId].nodes.map((node) => ({
          id: node.id,
          label: node.label,
          fields: node.fields.map((field) => ({
            ...field,
            isInherited: true,
            originalId: field._id,
          })),
          nextNodes: node.nextNodes || [],
        })),
        edges: DUMMY_CATEGORY_FORM_FIELDS[categoryId].edges,
        fieldMappings: {},
      })
    } else {
      setCategoryFormFields(null)
      setTemplate({ nodes: [], edges: [], fieldMappings: {} })
    }

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const { data } = await axios.post("/api/category/find", {
        id: categoryId
      });
      
      if (data.formFields) {
        setCategoryFormFields(data.formFields);
        setTemplate({
          nodes: data.formFields.nodes.map(node => ({
            id: node.id,
            label: node.label,
            fields: node.fields.map(field => ({
              ...field,
              isInherited: true,
              originalId: field._id
            })),
            nextNodes: node.nextNodes || []
          })),
          edges: data.formFields.edges,
          fieldMappings: {}
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch category form fields");
    }
    */
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const newLoan = {
        _id: Date.now().toString(),
        ...formData,
        code: Number.parseInt(formData.code),
        ratesMin: Number.parseFloat(formData.ratesMin),
        ratesMax: Number.parseFloat(formData.ratesMax),
        minScoreRequired: Number.parseInt(formData.minScoreRequired),
        maxLoanAmount: Number.parseInt(formData.maxLoanAmount),
        tenureMin: Number.parseInt(formData.tenureMin),
        tenureMax: Number.parseInt(formData.tenureMax),
        formFields: template,
        status: "Active",
        createdAt: new Date().toISOString(),
      }

      if (onAdd) {
        onAdd(newLoan)
      }

      setLoading(false)
      alert("Loan created successfully!")
      if (goback) {
        goback()
      }
    }, 1000)

    /* COMMENTED OUT - BACKEND INTEGRATION
    if (!template || !template.nodes) {
      toast.error("Please configure the form flow");
      return;
    }

    const formDataObj = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key === 'imageOrSvg' && formData[key]) {
        formDataObj.append(key, formData[key]);
      } else if (formData[key] !== null) {
        formDataObj.append(key, formData[key]);
      }
    });

    formDataObj.append('userId', currentuser.id);

    const formattedTemplate = {
      nodes: template.nodes.map(node => ({
        id: node.id || '',
        label: node.label || '',
        fields: (node.fields || []).map(field => ({
          name: field?.name || '',
          label: field?.label || '',
          type: field?.type || 'text',
          required: field?.required || false,
          options: field?.options || [],
          isInherited: field?.isInherited || false,
          originalId: field?.originalId || null,
          profileMapping: template.fieldMappings?.[field?._id]?.profileField
        })),
        nextNodes: node.nextNodes || []
      })),
      edges: template.edges || []
    };

    formDataObj.append('formFields', JSON.stringify(formattedTemplate));

    try {
      const response = await axios.post('/api/loan/create', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        toast.success("Loan created successfully");
      } else {
        throw new Error(response.data.message || "Failed to create loan");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error occurred during addition of loan");
    }
    */
  }

  const handleFieldMapping = (fieldId, profileField) => {
    setTemplate((prev) => ({
      ...prev,
      fieldMappings: {
        ...prev.fieldMappings,
        [fieldId]: {
          profileField,
          editable: true,
        },
      },
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, imageOrSvg: e.target.files[0] })
    }
  }

  useEffect(() => {
    // Simulate loading delay for offers and categories
    const timer = setTimeout(() => {
      setOffers(DUMMY_OFFERS)
      setCategories(DUMMY_CATEGORIES)
    }, 500)

    return () => clearTimeout(timer)

    /* COMMENTED OUT - BACKEND INTEGRATION
    const fetchAll = async () => {
      try {
        const data = await axios.post("/api/admin/getdetails", {
          userId: currentuser.id,
        });
        if (data.data.status) {
          setOffers(data.data.offers);
          setCategories(data.data.categories);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch Data");
      }
    };

    fetchAll();
    */
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Loan Product</h2>
        <p className="text-gray-600">Add a new loan product with custom application form</p>
      </div>

      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Code */}
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
              Loan Code *
            </label>
            <input
              type="number"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.code ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code}</p>}
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageOrSvg" className="block text-sm font-medium text-gray-700 mb-2">
              Logo/Image *
            </label>
            <input
              type="file"
              id="imageOrSvg"
              name="imageOrSvg"
              accept="image/*,.svg"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <p className="mt-1 text-xs text-gray-500">Upload PNG, JPG, or SVG files</p>
          </div>

          {/* Vendor Name */}
          <div>
            <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-2">
              Loan Vendor *
            </label>
            <input
              type="text"
              id="vendor"
              name="vendor"
              value={formData.vendor}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.vendor ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.vendor && <p className="mt-1 text-sm text-red-600">{errors.vendor}</p>}
          </div>

          {/* Interest Rate Min */}
          <div>
            <label htmlFor="ratesMin" className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate Min (%) *
            </label>
            <input
              type="number"
              id="ratesMin"
              name="ratesMin"
              value={formData.ratesMin}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.ratesMin ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.ratesMin && <p className="mt-1 text-sm text-red-600">{errors.ratesMin}</p>}
          </div>

          {/* Interest Rate Max */}
          <div>
            <label htmlFor="ratesMax" className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate Max (%) *
            </label>
            <input
              type="number"
              id="ratesMax"
              name="ratesMax"
              value={formData.ratesMax}
              onChange={handleInputChange}
              step="0.1"
              min="0"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.ratesMax ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.ratesMax && <p className="mt-1 text-sm text-red-600">{errors.ratesMax}</p>}
          </div>

          {/* Min Credit Score */}
          <div>
            <label htmlFor="minScoreRequired" className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Credit Score *
            </label>
            <input
              type="number"
              id="minScoreRequired"
              name="minScoreRequired"
              value={formData.minScoreRequired}
              onChange={handleInputChange}
              min="300"
              max="900"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.minScoreRequired ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.minScoreRequired && <p className="mt-1 text-sm text-red-600">{errors.minScoreRequired}</p>}
          </div>

          {/* Max Loan Amount */}
          <div>
            <label htmlFor="maxLoanAmount" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Loan Amount *
            </label>
            <input
              type="number"
              id="maxLoanAmount"
              name="maxLoanAmount"
              value={formData.maxLoanAmount}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.maxLoanAmount ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.maxLoanAmount && <p className="mt-1 text-sm text-red-600">{errors.maxLoanAmount}</p>}
          </div>

          {/* Tenure Min */}
          <div>
            <label htmlFor="tenureMin" className="block text-sm font-medium text-gray-700 mb-2">
              Tenure Min (months) *
            </label>
            <input
              type="number"
              id="tenureMin"
              name="tenureMin"
              value={formData.tenureMin}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.tenureMin ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.tenureMin && <p className="mt-1 text-sm text-red-600">{errors.tenureMin}</p>}
          </div>

          {/* Tenure Max */}
          <div>
            <label htmlFor="tenureMax" className="block text-sm font-medium text-gray-700 mb-2">
              Tenure Max (months) *
            </label>
            <input
              type="number"
              id="tenureMax"
              name="tenureMax"
              value={formData.tenureMax}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.tenureMax ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.tenureMax && <p className="mt-1 text-sm text-red-600">{errors.tenureMax}</p>}
          </div>
        </div>

        {/* Full width fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Offer Selection */}
          <div>
            <label htmlFor="offerId" className="block text-sm font-medium text-gray-700 mb-2">
              Select Offer *
            </label>
            <select
              id="offerId"
              name="offerId"
              value={formData.offerId}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.offerId ? "border-red-300" : "border-gray-300"
              }`}
              required
            >
              <option value="">-- Select Offer --</option>
              {offers.map((offer) => (
                <option key={offer._id} value={offer._id}>
                  {offer.offerMsg} ({offer.offerCode})
                </option>
              ))}
            </select>
            {errors.offerId && <p className="mt-1 text-sm text-red-600">{errors.offerId}</p>}
          </div>

          {/* Category Selection */}
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={(e) => {
                handleInputChange(e)
                handleCategoryChange(e.target.value)
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.categoryId ? "border-red-300" : "border-gray-300"
              }`}
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="mt-1 text-sm text-red-600">{errors.categoryId}</p>}
          </div>
        </div>

        {/* Category Form Fields Preview */}
        {categoryFormFields && (
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Inherited Category Form Fields</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              {categoryFormFields.nodes.map((node) => (
                <div key={node.id} className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">{node.label}</h4>
                  <div className="ml-4 space-y-2">
                    {node.fields.map((field) => (
                      <div key={field._id} className="flex items-center space-x-3">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">{field.label}</span>
                        <span className="text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded">{field.type}</span>
                        {field.required && (
                          <span className="text-xs text-red-500 bg-red-100 px-2 py-1 rounded">Required</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Builder Section - Commented out as requested */}
        {/* <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Custom Form Builder</h3>
          <FormBuilder
            template={template}
            setTemplate={setTemplate}
            categoryFields={categoryFormFields}
            onFieldMapping={handleFieldMapping}
            availableProfileFields={[
              'fullName',
              'email',
              'phoneNo',
              'address',
              'panNo',
              'aadharNo'
            ]}
          />
        </div> */}

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
              "Create Loan"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddLoan
