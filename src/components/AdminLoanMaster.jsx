"use client"

import { useState, useEffect } from "react"
// import axios from 'axios'; // COMMENTED OUT - Backend integration
// import toast from 'react-hot-toast'; // COMMENTED OUT - Backend integration
// import { UserContext } from '../context/userContext'; // COMMENTED OUT - Backend integration
import AdminLoans from "./AdminLoans"
import AdminCategory from "./AdminCategory"
import AdminOffers from "./AdminOffers"
import { Building2, Tag, Gift } from "lucide-react"

// Dummy data for testing
const DUMMY_DATA = {
  categories: [
    {
      id: 1,
      name: "Personal Loan",
      description: "Unsecured personal loans for various needs",
      interestRate: "10.5%",
      maxAmount: 500000,
      tenure: "1-5 years",
      status: "Active",
    },
    {
      id: 2,
      name: "Home Loan",
      description: "Secured loans for purchasing or constructing homes",
      interestRate: "8.5%",
      maxAmount: 10000000,
      tenure: "5-30 years",
      status: "Active",
    },
    {
      id: 3,
      name: "Car Loan",
      description: "Auto loans for new and used vehicles",
      interestRate: "9.2%",
      maxAmount: 2000000,
      tenure: "1-7 years",
      status: "Active",
    },
    {
      id: 4,
      name: "Business Loan",
      description: "Loans for business expansion and working capital",
      interestRate: "12.0%",
      maxAmount: 5000000,
      tenure: "1-10 years",
      status: "Inactive",
    },
  ],
  offers: [
    {
      id: 1,
      title: "New Year Special",
      description: "Get 0.5% reduced interest rate on all loans",
      discount: "0.5%",
      validUntil: "2024-01-31",
      category: "All Categories",
      status: "Active",
      code: "NY2024",
    },
    {
      id: 2,
      title: "First Time Borrower",
      description: "Special rates for first-time loan applicants",
      discount: "1.0%",
      validUntil: "2024-12-31",
      category: "Personal Loan",
      status: "Active",
      code: "FIRST2024",
    },
    {
      id: 3,
      title: "Home Buyer Delight",
      description: "Reduced processing fee for home loans",
      discount: "Processing Fee Waived",
      validUntil: "2024-06-30",
      category: "Home Loan",
      status: "Active",
      code: "HOME2024",
    },
  ],
  loanVendors: [
    {
      id: 1,
      name: "ABC Bank",
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
      id: 2,
      name: "XYZ Financial Services",
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
      id: 3,
      name: "QuickLoan Corp",
      type: "Fintech",
      contactPerson: "Mike Davis",
      email: "mike.davis@quickloan.com",
      phone: "+1-234-567-8902",
      address: "789 Tech Hub, Innovation Center",
      status: "Inactive",
      partneredSince: "2022-07-10",
      totalLoansProcessed: 456,
    },
  ],
}

function AdminLoanMaster() {
  const [activeTab, setActiveTab] = useState("loans")
  const [categories, setCategories] = useState([])
  const [offers, setOffers] = useState([])
  const [loanVendors, setLoanVendors] = useState([])
  // const { currentuser } = useContext(UserContext); // COMMENTED OUT - Backend integration
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(true)

  function updateData() {
    setUpdate(!update)
  }

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setOffers(DUMMY_DATA.offers)
      setCategories(DUMMY_DATA.categories)
      setLoanVendors(DUMMY_DATA.loanVendors)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)

    /* COMMENTED OUT - BACKEND INTEGRATION
    const fetchAll = async () => {
      try {
        const data = await axios.post('/api/admin/getdetails', { userId: currentuser.id });
        if (data.data.status) {
          setOffers(data.data.offers);
          setCategories(data.data.categories);
          setLoanVendors(data.data.loans);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch Data');
      }
    };

    fetchAll();
    */
  }, [update])

  const tabs = [
    {
      id: "loans",
      label: "Loan Vendors",
      icon: Building2,
      count: loanVendors.length,
      color: "bg-blue-500",
    },
    {
      id: "categories",
      label: "Loan Categories",
      icon: Tag,
      count: categories.length,
      color: "bg-green-500",
    },
    {
      id: "offers",
      label: "Offers",
      icon: Gift,
      count: offers.length,
      color: "bg-purple-500",
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading loan management data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Loan Management</h1>
          <p className="text-gray-600">Manage loan vendors, categories, and offers</p>
        </div>
{/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-gray-900">
                  {loanVendors.filter((vendor) => vendor.status === "Active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <Tag className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Categories</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.filter((category) => category.status === "Active").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Gift className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Offers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {offers.filter((offer) => offer.status === "Active").length}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600 bg-blue-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-2 px-2 py-1 text-xs rounded-full text-white ${
                      activeTab === tab.id ? tab.color : "bg-gray-400"
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "loans" && <AdminLoans  updateData={updateData} />}
            {activeTab === "categories" && <AdminCategory  updateData={updateData} />}
            {activeTab === "offers" && <AdminOffers  updateData={updateData} />}
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default AdminLoanMaster
