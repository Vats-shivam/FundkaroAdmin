"use client"

import { useState } from "react"
// import axios from "axios"; // COMMENTED OUT - Backend integration
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration
import AddLoan from "./AddLoan"
import EditLoan from "./EditLoan"

// Dummy loan vendors data
const DUMMY_LOAN_VENDORS = [
  {
    _id: "1",
    vendor: "ABC Bank",
    logo: "/placeholder.svg?height=64&width=64",
    ratesMin: 8.5,
    ratesMax: 12.0,
    type: "Bank",
    contactPerson: "John Smith",
    email: "john.smith@abcbank.com",
    phone: "+1-234-567-8900",
    address: "123 Banking Street, Financial District",
    status: "Active",
    partneredSince: "2020-01-15",
    totalLoansProcessed: 1250,
  },
  {
    _id: "2",
    vendor: "XYZ Financial Services",
    logo: "/placeholder.svg?height=64&width=64",
    ratesMin: 9.0,
    ratesMax: 15.5,
    type: "NBFC",
    contactPerson: "Sarah Johnson",
    email: "sarah.j@xyzfinance.com",
    phone: "+1-234-567-8901",
    address: "456 Finance Avenue, Business Park",
    status: "Active",
    partneredSince: "2021-03-20",
    totalLoansProcessed: 890,
  },
  {
    _id: "3",
    vendor: "QuickLoan Corp",
    logo: "/placeholder.svg?height=64&width=64",
    ratesMin: 10.0,
    ratesMax: 18.0,
    type: "Fintech",
    contactPerson: "Mike Davis",
    email: "mike.davis@quickloan.com",
    phone: "+1-234-567-8902",
    address: "789 Tech Hub, Innovation Center",
    status: "Inactive",
    partneredSince: "2022-07-10",
    totalLoansProcessed: 456,
  },
  {
    _id: "4",
    vendor: "SecureCredit Bank",
    logo: "/placeholder.svg?height=64&width=64",
    ratesMin: 7.5,
    ratesMax: 11.5,
    type: "Bank",
    contactPerson: "Emily Wilson",
    email: "emily.wilson@securecredit.com",
    phone: "+1-234-567-8903",
    address: "321 Credit Lane, Banking District",
    status: "Active",
    partneredSince: "2019-08-12",
    totalLoansProcessed: 2100,
  },
  {
    _id: "5",
    vendor: "FastCash Solutions",
    logo: "/placeholder.svg?height=64&width=64",
    ratesMin: 12.0,
    ratesMax: 22.0,
    type: "Fintech",
    contactPerson: "Robert Brown",
    email: "robert.brown@fastcash.com",
    phone: "+1-234-567-8904",
    address: "654 Innovation Drive, Tech Park",
    status: "Active",
    partneredSince: "2023-02-28",
    totalLoansProcessed: 320,
  },
]

function AdminLoans({ loanVendors = DUMMY_LOAN_VENDORS, updateData }) {
  const [addloan, SetAddLoan] = useState(false)
  const [editloan, setEditLoan] = useState(null)
  const [vendors, setVendors] = useState(loanVendors)
  const [loading, setLoading] = useState(false)
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration

  function goback() {
    SetAddLoan(!addloan)
    setEditLoan(null)
    if (updateData) {
      updateData()
    }
  }

  const handleDelete = async (loanId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this loan vendor?")
    if (confirmDelete) {
      setLoading(true)

      // Simulate API delay
      setTimeout(() => {
        // Remove vendor from local state (dummy implementation)
        const updatedVendors = vendors.filter((vendor) => vendor._id !== loanId)
        setVendors(updatedVendors)
        setLoading(false)
        alert("Loan vendor deleted successfully.")
        if (updateData) {
          updateData()
        }
      }, 1000)

      /* COMMENTED OUT - BACKEND INTEGRATION
      try {
        const response = await axios.post(`/api/loan/delete`, {
          userId: currentuser.id,
          loanId
        });
        if (response.data.success) {
          alert("Loan vendor deleted successfully.");
          updateData();
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting loan vendor:", error);
        alert("An error occurred while deleting the loan vendor.");
      }
      */
    }
  }

  const handleAddVendor = (newVendor) => {
    const vendorWithId = {
      ...newVendor,
      _id: Date.now().toString(),
      partneredSince: new Date().toISOString().split("T")[0],
      totalLoansProcessed: 0,
    }
    setVendors([...vendors, vendorWithId])
  }

  const handleEditVendor = (updatedVendor) => {
    const updatedVendors = vendors.map((vendor) => (vendor._id === updatedVendor._id ? updatedVendor : vendor))
    setVendors(updatedVendors)
  }

  const getStatusBadge = (status) => {
    return status === "Active"
      ? "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium"
      : "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium"
  }

  const getVendorTypeColor = (type) => {
    switch (type) {
      case "Bank":
        return "bg-blue-100 text-blue-800"
      case "NBFC":
        return "bg-purple-100 text-purple-800"
      case "Fintech":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-gray-50 w-full h-full p-6 rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-800">Loan Vendors</h2>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Total: {vendors.length}
          </span>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-sm"
          onClick={goback}
          disabled={loading}
        >
          {addloan ? "← Back to List" : "+ Add New Vendor"}
        </button>
      </div>

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing...</p>
          </div>
        </div>
      )}

      {/* Content */}
      {addloan ? (
        editloan ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <EditLoan loan={editloan} goback={goback} onEdit={handleEditVendor} />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <AddLoan goback={goback} onAdd={handleAddVendor} />
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((loan) => (
            <div
              key={loan._id}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Vendor Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img
                    src={loan.logo || "/placeholder.svg"}
                    alt={loan.vendor}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{loan.vendor}</h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getVendorTypeColor(loan.type)}`}
                    >
                      {loan.type}
                    </span>
                  </div>
                </div>
                <span className={getStatusBadge(loan.status)}>{loan.status}</span>
              </div>

              {/* Vendor Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Interest Rate:</span>
                  <span className="font-semibold text-gray-800">
                    {loan.ratesMin+""}% - {loan.ratesMax}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Contact:</span>
                  <span className="text-sm text-gray-800">{loan.contactPerson}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Loans Processed:</span>
                  <span className="text-sm font-medium text-gray-800">{loan.totalLoansProcessed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Partner Since:</span>
                  <span className="text-sm text-gray-800">{new Date(loan.partneredSince).getFullYear()}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setEditLoan(loan)
                    SetAddLoan(true)
                  }}
                  className="flex-1 bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  disabled={loading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(loan._id)}
                  className="flex-1 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!addloan && vendors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No loan vendors found</h3>
          <p className="text-gray-600 mb-4">Get started by adding your first loan vendor.</p>
          <button
            onClick={() => SetAddLoan(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Add Vendor
          </button>
        </div>
      )}
    </div>
  )
}

export default AdminLoans
