"use client"

import { useState } from "react"
import AddOffer from "./AddOffer"
import EditOffer from "./EditOffer"
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration
// import axios from 'axios'; // COMMENTED OUT - Backend integration
// import toast from 'react-hot-toast'; // COMMENTED OUT - Backend integration
import { Gift, Plus, Edit, Trash2, Calendar, Tag, Percent } from "lucide-react"

// Dummy offers data
const DUMMY_OFFERS = [
  {
    _id: "1",
    offerMsg: "New Year Special - 0.5% reduced interest rate",
    offerCode: "NY2024",
    isValid: true,
    discount: "0.5%",
    validUntil: "2024-12-31",
    category: "All Categories",
    usageCount: 45,
    maxUsage: 100,
    createdAt: "2024-01-01",
  },
  {
    _id: "2",
    offerMsg: "First Time Borrower - 1% discount on interest",
    offerCode: "FIRST2024",
    isValid: true,
    discount: "1.0%",
    validUntil: "2024-12-31",
    category: "Personal Loan",
    usageCount: 23,
    maxUsage: 50,
    createdAt: "2024-02-15",
  },
  {
    _id: "3",
    offerMsg: "Home Buyer Delight - Processing fee waived",
    offerCode: "HOME2024",
    isValid: true,
    discount: "Processing Fee Waived",
    validUntil: "2024-06-30",
    category: "Home Loan",
    usageCount: 12,
    maxUsage: 30,
    createdAt: "2024-03-01",
  },
  {
    _id: "4",
    offerMsg: "Summer Special - 0.25% rate reduction",
    offerCode: "SUMMER2024",
    isValid: false,
    discount: "0.25%",
    validUntil: "2024-08-31",
    category: "Car Loan",
    usageCount: 8,
    maxUsage: 25,
    createdAt: "2024-06-01",
  },
]

function AdminOffers({ offers = DUMMY_OFFERS, updateData }) {
  const [addOffer, setAddOffer] = useState(false)
  const [editOffer, setEditOffer] = useState(null)
  const [offerList, setOfferList] = useState(offers)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration

  const filteredOffers = offerList.filter((offer) => {
    const matchesSearch =
      offer.offerMsg.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.offerCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || (filterStatus === "Valid" ? offer.isValid : !offer.isValid)
    return matchesSearch && matchesStatus
  })

  const handleEdit = (offer) => {
    setEditOffer(offer)
    setAddOffer(true)
  }

  const handleDelete = async (offerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this offer?")
    if (confirmDelete) {
      setLoading(true)

      // Simulate API delay
      setTimeout(() => {
        // Remove offer from local state (dummy implementation)
        const updatedOffers = offerList.filter((offer) => offer._id !== offerId)
        setOfferList(updatedOffers)
        setLoading(false)
        alert("Offer deleted successfully.")
        if (updateData) {
          updateData()
        }
      }, 1000)

      /* COMMENTED OUT - BACKEND INTEGRATION
      try {
        const response = await axios.post(`/api/offer/delete`, { 
          userId: currentuser.id, 
          offerId 
        });
        if (response.data.status) {
          toast.success("Offer deleted successfully.");
          updateData();
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting offer:", error);
        toast.error("An error occurred while deleting the offer.");
      }
      */
    }
  }

  const handleAddOffer = (newOffer) => {
    setOfferList([...offerList, newOffer])
  }

  const handleEditOffer = (updatedOffer) => {
    const updatedOffers = offerList.map((offer) => (offer._id === updatedOffer._id ? updatedOffer : offer))
    setOfferList(updatedOffers)
  }

  const goBack = () => {
    setAddOffer(!addOffer)
    setEditOffer(null)
    if (updateData) {
      updateData()
    }
  }

  const getStatusBadge = (isValid) => {
    return isValid
      ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
  }

  const isOfferExpired = (validUntil) => {
    return new Date(validUntil) < new Date()
  }

  const getUsagePercentage = (usageCount, maxUsage) => {
    return Math.round((usageCount / maxUsage) * 100)
  }

  return (
    <div className="bg-gray-50 w-full h-full p-6 rounded-lg">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Offers</h2>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Total: {offerList.length}
          </span>
        </div>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm flex items-center"
          onClick={goBack}
          disabled={loading}
        >
          {addOffer ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to List
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add New Offer
            </>
          )}
        </button>
      </div>

      {/* Content */}
      {addOffer ? (
        editOffer ? (
          <div className="bg-white rounded-lg shadow-sm">
            <EditOffer offer={editOffer} goBack={goBack} onEdit={handleEditOffer} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <AddOffer goBack={goBack} onAdd={handleAddOffer} />
          </div>
        )
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search offers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Valid">Valid</option>
              <option value="Invalid">Invalid</option>
            </select>
          </div>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <div
                key={offer._id}
                className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Offer Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Gift className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 line-clamp-2">{offer.offerMsg}</h3>
                      <span className={getStatusBadge(offer.isValid)}>{offer.isValid ? "Valid" : "Invalid"}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(offer)}
                      className="p-1 text-gray-400 hover:text-purple-600"
                      disabled={loading}
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(offer._id)}
                      className="p-1 text-gray-400 hover:text-red-600"
                      disabled={loading}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Offer Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm">
                    <Tag className="w-4 h-4 mr-2 text-blue-500" />
                    <div>
                      <p className="text-gray-500">Offer Code</p>
                      <p className="font-semibold font-mono">{offer.offerCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Percent className="w-4 h-4 mr-2 text-green-500" />
                    <div>
                      <p className="text-gray-500">Discount</p>
                      <p className="font-semibold text-green-600">{offer.discount}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-orange-500" />
                    <div>
                      <p className="text-gray-500">Valid Until</p>
                      <p
                        className={`font-semibold ${
                          isOfferExpired(offer.validUntil) ? "text-red-600" : "text-gray-800"
                        }`}
                      >
                        {new Date(offer.validUntil).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Usage Statistics */}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Usage</span>
                    <span className="text-sm font-medium text-gray-800">
                      {offer.usageCount}/{offer.maxUsage}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${getUsagePercentage(offer.usageCount, offer.maxUsage)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">{offer.category}</span>
                    {isOfferExpired(offer.validUntil) && (
                      <span className="text-xs text-red-600 font-medium">Expired</span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4 border-t border-gray-200 mt-4">
                  <button
                    onClick={() => handleEdit(offer)}
                    className="flex-1 bg-purple-50 text-purple-600 hover:bg-purple-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                    disabled={loading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(offer._id)}
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
          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No offers found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterStatus !== "All"
                  ? "No offers match your search criteria."
                  : "Get started by adding your first promotional offer."}
              </p>
              {!searchTerm && filterStatus === "All" && (
                <button
                  onClick={() => setAddOffer(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Add Offer
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default AdminOffers
