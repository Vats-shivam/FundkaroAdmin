"use client"

import { useState } from "react"
// import axios from 'axios'; // COMMENTED OUT - Backend integration
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration
// import toast from 'react-hot-toast'; // COMMENTED OUT - Backend integration

function AddOffer({ goBack, onAdd }) {
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration
  const [offer, setOffer] = useState({
    offerMsg: "",
    offerCode: "",
    discount: "",
    validUntil: "",
    category: "All Categories",
    maxUsage: 100,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!offer.offerMsg.trim()) {
      newErrors.offerMsg = "Offer message is required"
    }

    if (!offer.offerCode.trim()) {
      newErrors.offerCode = "Offer code is required"
    }

    if (!offer.discount.trim()) {
      newErrors.discount = "Discount value is required"
    }

    if (!offer.validUntil) {
      newErrors.validUntil = "Valid until date is required"
    } else if (new Date(offer.validUntil) <= new Date()) {
      newErrors.validUntil = "Valid until date must be in the future"
    }

    if (!offer.maxUsage || offer.maxUsage < 1) {
      newErrors.maxUsage = "Maximum usage must be at least 1"
    }

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
      const newOffer = {
        _id: Date.now().toString(),
        ...offer,
        isValid: true,
        usageCount: 0,
        createdAt: new Date().toISOString(),
      }

      if (onAdd) {
        onAdd(newOffer)
      }

      setLoading(false)
      alert("Offer created successfully!")

      // Reset form
      setOffer({
        offerMsg: "",
        offerCode: "",
        discount: "",
        validUntil: "",
        category: "All Categories",
        maxUsage: 100,
      })

      if (goBack) {
        goBack()
      }
    }, 1000)

    /* COMMENTED OUT - BACKEND INTEGRATION
    try {
      const response = await axios.post('/api/offer/create', {
        userId: currentuser.id,
        ...offer
      });
      if (response.data.success) {
        toast.success("Offer Created");
        setOffer({ offerMsg: '', offerCode: '' });
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while adding Offer");
    }
    */
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setOffer((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Offer</h2>
        <p className="text-gray-600">Create a promotional offer for loan products</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Offer Message */}
          <div className="md:col-span-2">
            <label htmlFor="offerMsg" className="block text-sm font-medium text-gray-700 mb-2">
              Offer Message *
            </label>
            <textarea
              id="offerMsg"
              name="offerMsg"
              value={offer.offerMsg}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.offerMsg ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Enter a compelling offer message..."
              required
            />
            {errors.offerMsg && <p className="mt-1 text-sm text-red-600">{errors.offerMsg}</p>}
          </div>

          {/* Offer Code */}
          <div>
            <label htmlFor="offerCode" className="block text-sm font-medium text-gray-700 mb-2">
              Offer Code *
            </label>
            <input
              type="text"
              id="offerCode"
              name="offerCode"
              value={offer.offerCode}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono ${
                errors.offerCode ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="e.g., SAVE2024"
              required
            />
            {errors.offerCode && <p className="mt-1 text-sm text-red-600">{errors.offerCode}</p>}
          </div>

          {/* Discount */}
          <div>
            <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-2">
              Discount Value *
            </label>
            <input
              type="text"
              id="discount"
              name="discount"
              value={offer.discount}
              onChange={handleInputChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.discount ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="e.g., 0.5%, Processing Fee Waived"
              required
            />
            {errors.discount && <p className="mt-1 text-sm text-red-600">{errors.discount}</p>}
          </div>

          {/* Valid Until */}
          <div>
            <label htmlFor="validUntil" className="block text-sm font-medium text-gray-700 mb-2">
              Valid Until *
            </label>
            <input
              type="date"
              id="validUntil"
              name="validUntil"
              value={offer.validUntil}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.validUntil ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.validUntil && <p className="mt-1 text-sm text-red-600">{errors.validUntil}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Applicable Category
            </label>
            <select
              id="category"
              name="category"
              value={offer.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="All Categories">All Categories</option>
              <option value="Personal Loan">Personal Loan</option>
              <option value="Home Loan">Home Loan</option>
              <option value="Car Loan">Car Loan</option>
              <option value="Business Loan">Business Loan</option>
            </select>
          </div>

          {/* Max Usage */}
          <div>
            <label htmlFor="maxUsage" className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Usage *
            </label>
            <input
              type="number"
              id="maxUsage"
              name="maxUsage"
              value={offer.maxUsage}
              onChange={handleInputChange}
              min="1"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.maxUsage ? "border-red-300" : "border-gray-300"
              }`}
              required
            />
            {errors.maxUsage && <p className="mt-1 text-sm text-red-600">{errors.maxUsage}</p>}
            <p className="mt-1 text-xs text-gray-500">Maximum number of times this offer can be used</p>
          </div>
        </div>

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
            className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Creating...
              </div>
            ) : (
              "Create Offer"
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddOffer
