"use client"

import { useState, useEffect } from "react"
// import axios from 'axios'; // COMMENTED OUT - Backend integration
// import toast from 'react-hot-toast'; // COMMENTED OUT - Backend integration
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration

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

function EditLoan({ loan, goback, onEdit }) {
  const [formData, setFormData] = useState({
    loanId: loan._id,
    code: loan.code || 0,
    vendor: loan.vendor || "",
    ratesMin: loan.ratesMin || "",
    ratesMax: loan.ratesMax || "",
    minScoreRequired: loan.minScoreRequired || 650,
    maxLoanAmount: loan.maxLoanAmount || 1000000,
    tenureMin: loan.tenureMin || 12,
    tenureMax: loan.tenureMax || 60,
    offerId: loan.offer || "",
    categoryId: loan.category || "",
  })

  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration

  const [offers, setOffers] = useState([])
  const [categories, setCategories] = useState([])
  const [formFields, setFormFields] = useState(loan.formFields || [])
  const [template, setTemplate] = useState(loan.formFields)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

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

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API delay
    setTimeout(() => {
      const updatedLoan = {
        ...loan,
        ...formData,
        ratesMin: Number.parseFloat(formData.ratesMin),
        ratesMax: Number.parseFloat(formData.ratesMax),
        minScoreRequired: Number.parseInt(formData.minScoreRequired),
        maxLoanAmount: Number.parseInt(formData.maxLoanAmount),
        tenureMin: Number.parseInt(formData.tenureMin),
        tenureMax: Number.parseInt(formData.tenureMax),
        formFields: formFields,
      }

      if (onEdit) {
        onEdit(updatedLoan)
      }

      setLoading(false)
      alert("Loan updated successfully!")
      goback()
    }, 1000)

    /* COMMENTED OUT - BACKEND INTEGRATION
    let data = formData;
    data.userId = currentuser.id;
    data.formFields = formFields;
    delete data['image'];
    
    try {
      const response = await axios.post(`/api/loan/update`, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        toast.success("Loan updated Successfully");
        goback();
      } else {
        throw response.data;
      }
    } catch (err) {
      console.log(err);
      toast.error("Error occurred during update of loan");
    }
    */
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
        const data = await axios.post('/api/admin/getdetails', { userId: currentuser.id });
        if (data.data.status) {
          setOffers(data.data.offers);
          setCategories(data.data.categories);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch Data');
      }
    };
    
    fetchAll();
    */
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Edit Loan Details</h2>
        <p className="text-gray-600">Update the loan vendor information and settings</p>
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
              Logo/Image
            </label>
            <input
              type="file"
              id="imageOrSvg"
              name="imageOrSvg"
              accept="image/*,.svg"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              onChange={handleInputChange}
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

        {/* Form Builder Section - Commented out as requested */}
        {/* <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Custom Form Fields</h3>
          <FormBuilder template={template} setTemplate={setTemplate} />
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
                Updating...
              </div>
            ) : (
              "Update Loan"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditLoan
