"use client"

import { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
// import axios from 'axios';

function UserProfile() {
  const { userId } = useParams()
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [viewMode, setViewMode] = useState("detailed")
  const { currentuser } = useContext(UserContext)
  const navigate = useNavigate()

  // Comprehensive dummy data for user profile
  const dummyUserDetails = {
    user: {
      _id: userId || "507f1f77bcf86cd799439011",
      email: "john.doe@email.com",
      phoneNo: "+91 9876543210",
      profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isVerified: true,
      isProfileCompleted: true,
      isKYCVerified: true,
      isSurveyCompleted: true,
      createdAt: "2023-01-15T10:30:00Z",
      lastLogin: "2024-01-20T14:22:00Z",
      role: "Client",
    },
    userdetail: {
      fullName: "John Doe",
      panNo: "ABCDE1234F",
      aadharNo: "1234 5678 9012",
      internalRating: 4.2,
      creditScore: 720,
      riskLevel: "Low",
      totalLoans: 3,
      activeLoans: 1,
      address: {
        street: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
      },
      occupation: "Software Engineer",
      monthlyIncome: 85000,
      employmentType: "Salaried",
      workExperience: "5 years",
    },
    applications: [
      {
        _id: "app001",
        categoryId: {
          category: "Personal Loan",
          description: "Unsecured personal financing",
        },
        status: "Approved",
        appliedDate: "2024-01-10T09:00:00Z",
        approvedDate: "2024-01-15T16:30:00Z",
        loanAmount: 500000,
        interestRate: 12.5,
        tenure: 36,
        emi: 16680,
        loans: [
          {
            loan: {
              _id: "loan001",
              vendor: "HDFC Bank",
              minLoanAmount: 100000,
              maxLoanAmount: 2000000,
              ratesMin: 10.5,
              ratesMax: 18.0,
              processingFee: 2.5,
              tenure: "12-60 months",
            },
          },
          {
            loan: {
              _id: "loan002",
              vendor: "ICICI Bank",
              minLoanAmount: 50000,
              maxLoanAmount: 1500000,
              ratesMin: 11.0,
              ratesMax: 19.0,
              processingFee: 3.0,
              tenure: "12-48 months",
            },
          },
        ],
        formFields: [
          { name: "Loan Purpose", type: "text", value: "Home Renovation" },
          { name: "Monthly Income", type: "number", value: "85000" },
          { name: "Employment Type", type: "select", value: "Salaried" },
          { name: "Salary Certificate", type: "file", value: "salary_certificate_john_doe.pdf" },
          { name: "Bank Statement", type: "file", value: "bank_statement_6months.pdf" },
          { name: "Identity Proof", type: "file", value: "aadhar_card_copy.pdf" },
        ],
      },
      {
        _id: "app002",
        categoryId: {
          category: "Business Loan",
          description: "Small business financing",
        },
        status: "Under Review",
        appliedDate: "2024-01-18T11:15:00Z",
        loanAmount: 1000000,
        interestRate: 14.0,
        tenure: 60,
        loans: [
          {
            loan: {
              _id: "loan003",
              vendor: "SBI",
              minLoanAmount: 500000,
              maxLoanAmount: 5000000,
              ratesMin: 12.0,
              ratesMax: 16.5,
              processingFee: 1.5,
              tenure: "12-84 months",
            },
          },
        ],
        formFields: [
          { name: "Business Type", type: "text", value: "IT Services" },
          { name: "Business Vintage", type: "number", value: "3" },
          { name: "Annual Turnover", type: "number", value: "2500000" },
          { name: "GST Certificate", type: "file", value: "gst_certificate.pdf" },
          { name: "ITR Documents", type: "file", value: "itr_last_3years.pdf" },
        ],
      },
    ],
    adharCards: [
      {
        _id: "aadhar001",
        aadhaar_number: "1234 5678 9012",
        full_name: "John Doe",
        gender: "Male",
        dob: "1990-05-15T00:00:00Z",
        profile_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        address: {
          street: "123 Main Street",
          city: "Mumbai",
          state: "Maharashtra",
          country: "India",
          pincode: "400001",
        },
        verificationStatus: "Verified",
        verifiedDate: "2023-02-10T12:00:00Z",
      },
    ],
    panCards: [
      {
        _id: "pan001",
        pan_number: "ABCDE1234F",
        full_name: "John Doe",
        category: "Individual",
        verificationStatus: "Verified",
        verifiedDate: "2023-02-12T14:30:00Z",
      },
    ],
    surveys: {
      surveyquestions: [
        { Question: "What is your primary source of income?", Answer: "Salary from employment" },
        { Question: "Do you have any existing loans?", Answer: "Yes, one home loan" },
        { Question: "What is your preferred loan tenure?", Answer: "3-5 years" },
        { Question: "How did you hear about our services?", Answer: "Online search" },
        { Question: "What is your investment experience?", Answer: "Moderate - mutual funds and FDs" },
      ],
    },
    financialSummary: {
      totalLoanAmount: 1500000,
      totalEMI: 16680,
      creditUtilization: 35,
      paymentHistory: "Excellent",
      defaultHistory: "None",
    },
    documents: [
      { name: "Aadhar Card", status: "Verified", uploadDate: "2023-02-10" },
      { name: "PAN Card", status: "Verified", uploadDate: "2023-02-12" },
      { name: "Salary Certificate", status: "Verified", uploadDate: "2024-01-08" },
      { name: "Bank Statement", status: "Verified", uploadDate: "2024-01-08" },
      { name: "GST Certificate", status: "Pending", uploadDate: "2024-01-18" },
    ],
  }

  const fetchUserDetails = async () => {
    try {
      // Backend integration commented out - replace with actual API call
      /*
            const response = await axios.post('/api/admin/finduser', { 
                Id: userId, 
                userId: currentuser.id 
            });
            console.log(response.data.data);
            if (response.data.status) {
                setUserDetails(response.data.data);
            }
            */

      // Simulate API call delay
      setTimeout(() => {
        setUserDetails(dummyUserDetails)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error(error)
      // toast.error('Failed to fetch user details');
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      Approved: "bg-green-100 text-green-800 border-green-200",
      "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
      Rejected: "bg-red-100 text-red-800 border-red-200",
      Pending: "bg-blue-100 text-blue-800 border-blue-200",
      Verified: "bg-green-100 text-green-800 border-green-200",
    }
    return statusStyles[status] || "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getRiskBadge = (risk) => {
    const riskStyles = {
      Low: "bg-green-100 text-green-800",
      Medium: "bg-yellow-100 text-yellow-800",
      High: "bg-red-100 text-red-800",
    }
    return riskStyles[risk] || "bg-gray-100 text-gray-800"
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>,
      )
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>,
      )
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(
        <span key={i} className="text-gray-300">
          ☆
        </span>,
      )
    }
    return stars
  }

  useEffect(() => {
    fetchUserDetails()
  }, [userId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading user profile...</p>
        </div>
      </div>
    )
  }

  if (!userDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">The requested user profile could not be loaded.</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={
                    userDetails.user.profilePicture ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{userDetails.userdetail.fullName || "Not Set"}</h1>
                  <p className="text-gray-600 text-lg">{userDetails.userdetail.occupation || "Not Specified"}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-500 mr-4">
                      Member since {formatDate(userDetails.user.createdAt)}
                    </span>
                    <span className="text-sm text-gray-500">Last login: {formatDate(userDetails.user.lastLogin)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-right mr-4">
                  <div className="flex items-center justify-end mb-1">
                    {renderStars(userDetails.userdetail.internalRating)}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {userDetails.userdetail.internalRating}/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Internal Rating</p>
                </div>
                <button
                  onClick={() => navigate(-1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center"
                >
                  ← Back
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{userDetails.userdetail.creditScore}</div>
                <div className="text-sm text-blue-700">Credit Score</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-2xl font-bold text-green-600">{userDetails.userdetail.totalLoans}</div>
                <div className="text-sm text-green-700">Total Loans</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">{userDetails.userdetail.activeLoans}</div>
                <div className="text-sm text-purple-700">Active Loans</div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                <div
                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getRiskBadge(userDetails.userdetail.riskLevel)}`}
                >
                  {userDetails.userdetail.riskLevel} Risk
                </div>
                <div className="text-sm text-orange-700 mt-1">Risk Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: "👤" },
                { id: "applications", label: "Applications", icon: "📋" },
                { id: "documents", label: "Documents", icon: "📄" },
                { id: "financial", label: "Financial", icon: "💰" },
                { id: "survey", label: "Survey", icon: "📊" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">👤</span>
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Full Name</span>
                    <span className="font-medium">{userDetails.userdetail.fullName || "Not Set"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Email</span>
                    <span className="font-medium">{userDetails.user.email || "Not Set"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-medium">{userDetails.user.phoneNo || "Not Set"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">PAN</span>
                    <span className="font-medium font-mono">{userDetails.userdetail.panNo || "Not Set"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Aadhar</span>
                    <span className="font-medium font-mono">
                      ****{userDetails.userdetail.aadharNo?.slice(-4) || "Not Set"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Address</span>
                    <span className="font-medium text-right">
                      {userDetails.userdetail.address ? (
                        <>
                          {userDetails.userdetail.address.street}
                          <br />
                          {userDetails.userdetail.address.city}, {userDetails.userdetail.address.state}
                          <br />
                          {userDetails.userdetail.address.pincode}
                        </>
                      ) : (
                        "Not Set"
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">✅</span>
                  Verification Status
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Email Verified", status: userDetails.user.isVerified },
                    { label: "Profile Completed", status: userDetails.user.isProfileCompleted },
                    { label: "KYC Verified", status: userDetails.user.isKYCVerified },
                    { label: "Survey Completed", status: userDetails.user.isSurveyCompleted },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{item.label}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          item.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.status ? "✓ Yes" : "✗ No"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employment Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💼</span>
                  Employment Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Occupation</span>
                    <span className="font-medium">{userDetails.userdetail.occupation || "Not Set"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Employment Type</span>
                    <span className="font-medium">{userDetails.userdetail.employmentType || "Not Set"}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Work Experience</span>
                    <span className="font-medium">{userDetails.userdetail.workExperience || "Not Set"}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Monthly Income</span>
                    <span className="font-medium text-green-600">
                      {userDetails.userdetail.monthlyIncome
                        ? formatCurrency(userDetails.userdetail.monthlyIncome)
                        : "Not Set"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Financial Summary */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📈</span>
                  Financial Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Total Loan Amount</span>
                    <span className="font-medium text-blue-600">
                      {formatCurrency(userDetails.financialSummary.totalLoanAmount)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Monthly EMI</span>
                    <span className="font-medium text-orange-600">
                      {formatCurrency(userDetails.financialSummary.totalEMI)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Credit Utilization</span>
                    <span className="font-medium">{userDetails.financialSummary.creditUtilization}%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Payment History</span>
                    <span className="font-medium text-green-600">{userDetails.financialSummary.paymentHistory}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Default History</span>
                    <span className="font-medium text-green-600">{userDetails.financialSummary.defaultHistory}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📋</span>
                    Loan Applications ({userDetails.applications.length})
                  </h3>
                </div>

                {userDetails.applications.length > 0 ? (
                  <div className="space-y-6">
                    {userDetails.applications.map((application) => (
                      <div key={application._id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                        {/* Application Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">
                              {application.categoryId ? application.categoryId.category : "Not Available"}
                            </h4>
                            <p className="text-sm text-gray-600">{application.categoryId?.description}</p>
                          </div>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusBadge(application.status)}`}
                          >
                            {application.status}
                          </span>
                        </div>

                        {/* Application Details */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-sm text-gray-600">Applied Date</div>
                            <div className="font-medium">{formatDate(application.appliedDate)}</div>
                          </div>
                          {application.approvedDate && (
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-sm text-gray-600">Approved Date</div>
                              <div className="font-medium">{formatDate(application.approvedDate)}</div>
                            </div>
                          )}
                          <div className="bg-white p-3 rounded-lg">
                            <div className="text-sm text-gray-600">Loan Amount</div>
                            <div className="font-medium text-blue-600">{formatCurrency(application.loanAmount)}</div>
                          </div>
                          {application.emi && (
                            <div className="bg-white p-3 rounded-lg">
                              <div className="text-sm text-gray-600">Monthly EMI</div>
                              <div className="font-medium text-orange-600">{formatCurrency(application.emi)}</div>
                            </div>
                          )}
                        </div>

                        {/* Loans Applied */}
                        <div className="mb-6">
                          <h5 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="mr-2">🏦</span>
                            Lenders ({application.loans.length})
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {application.loans.map((loan, index) => (
                              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h6 className="font-semibold text-gray-900">{loan.loan.vendor}</h6>
                                  <span className="text-sm text-gray-500">{loan.loan.tenure}</span>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Loan Range</span>
                                    <span className="font-medium">
                                      {formatCurrency(loan.loan.minLoanAmount)} -{" "}
                                      {formatCurrency(loan.loan.maxLoanAmount)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Interest Rate</span>
                                    <span className="font-medium">
                                      {loan.loan.ratesMin}% - {loan.loan.ratesMax}%
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Processing Fee</span>
                                    <span className="font-medium">{loan.loan.processingFee}%</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Form Fields */}
                        <div>
                          <h5 className="text-md font-semibold text-gray-900 mb-3 flex items-center">
                            <span className="mr-2">📝</span>
                            Application Form
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {application.formFields.map((field, index) => (
                              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{field.name}</label>
                                {field.type === "file" ? (
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">📎 {field.value}</span>
                                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                      Download
                                    </button>
                                  </div>
                                ) : (
                                  <div className="text-sm font-medium text-gray-900">{field.value}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">📋</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
                    <p className="text-gray-600">This user hasn't submitted any loan applications yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "documents" && (
            <div className="space-y-6">
              {/* Document Status Overview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">📄</span>
                  Document Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userDetails.documents.map((doc, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(doc.status)}`}>
                          {doc.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Uploaded: {doc.uploadDate}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aadhar Card Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">🆔</span>
                  Aadhar Card Details
                </h3>
                {userDetails.adharCards.length > 0 ? (
                  <div className="space-y-4">
                    {userDetails.adharCards.map((card) => (
                      <div key={card._id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={
                              card.profile_image ||
                              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            }
                            alt="Aadhar Profile"
                            className="w-20 h-20 rounded-lg object-cover border-2 border-white shadow-md"
                          />
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="mb-2">
                                <span className="text-sm text-gray-600">Aadhar Number</span>
                                <div className="font-mono font-medium">****{card.aadhaar_number.slice(-4)}</div>
                              </div>
                              <div className="mb-2">
                                <span className="text-sm text-gray-600">Full Name</span>
                                <div className="font-medium">{card.full_name}</div>
                              </div>
                              <div className="mb-2">
                                <span className="text-sm text-gray-600">Gender</span>
                                <div className="font-medium">{card.gender}</div>
                              </div>
                            </div>
                            <div>
                              <div className="mb-2">
                                <span className="text-sm text-gray-600">Date of Birth</span>
                                <div className="font-medium">{formatDate(card.dob)}</div>
                              </div>
                              <div className="mb-2">
                                <span className="text-sm text-gray-600">Address</span>
                                <div className="font-medium text-sm">
                                  {card.address.street}, {card.address.city}
                                  <br />
                                  {card.address.state}, {card.address.country}
                                </div>
                              </div>
                              <div className="mb-2">
                                <span className="text-sm text-gray-600">Verification Status</span>
                                <div>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(card.verificationStatus)}`}
                                  >
                                    {card.verificationStatus}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-2">🆔</div>
                    <p className="text-gray-600">No Aadhar cards found for this user.</p>
                  </div>
                )}
              </div>

              {/* PAN Card Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="mr-2">💳</span>
                  PAN Card Details
                </h3>
                {userDetails.panCards && userDetails.panCards.length > 0 ? (
                  <div className="space-y-4">
                    {userDetails.panCards.map((panCard) => (
                      <div key={panCard._id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-sm text-gray-600">PAN Number</span>
                            <div className="font-mono font-medium text-lg">{panCard.pan_number || "Not Available"}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Full Name</span>
                            <div className="font-medium">{panCard.full_name || "Not Available"}</div>
                          </div>
                          <div>
                            <span className="text-sm text-gray-600">Category</span>
                            <div className="font-medium">{panCard.category || "Not Available"}</div>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-600">Verification Status</span>
                            <div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(panCard.verificationStatus)}`}
                              >
                                {panCard.verificationStatus}
                              </span>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600">Verified: {formatDate(panCard.verifiedDate)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-gray-400 text-4xl mb-2">💳</div>
                    <p className="text-gray-600">No PAN cards found for this user.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "financial" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <span className="mr-2">💰</span>
                  Financial Overview
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Credit Score Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-blue-900">Credit Score</h4>
                      <span className="text-2xl">📊</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{userDetails.userdetail.creditScore}</div>
                    <div className="text-sm text-blue-700">
                      {userDetails.userdetail.creditScore >= 750
                        ? "Excellent"
                        : userDetails.userdetail.creditScore >= 700
                          ? "Good"
                          : userDetails.userdetail.creditScore >= 650
                            ? "Fair"
                            : "Poor"}
                    </div>
                    <div className="mt-3 bg-blue-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(userDetails.userdetail.creditScore / 850) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Monthly Income Card */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-green-900">Monthly Income</h4>
                      <span className="text-2xl">💵</span>
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      {formatCurrency(userDetails.userdetail.monthlyIncome)}
                    </div>
                    <div className="text-sm text-green-700">{userDetails.userdetail.employmentType}</div>
                  </div>

                  {/* Risk Assessment Card */}
                  <div
                    className={`bg-gradient-to-br rounded-xl p-6 border ${
                      userDetails.userdetail.riskLevel === "Low"
                        ? "from-green-50 to-green-100 border-green-200"
                        : userDetails.userdetail.riskLevel === "Medium"
                          ? "from-yellow-50 to-yellow-100 border-yellow-200"
                          : "from-red-50 to-red-100 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4
                        className={`font-semibold ${
                          userDetails.userdetail.riskLevel === "Low"
                            ? "text-green-900"
                            : userDetails.userdetail.riskLevel === "Medium"
                              ? "text-yellow-900"
                              : "text-red-900"
                        }`}
                      >
                        Risk Level
                      </h4>
                      <span className="text-2xl">⚠️</span>
                    </div>
                    <div
                      className={`text-2xl font-bold mb-2 ${
                        userDetails.userdetail.riskLevel === "Low"
                          ? "text-green-600"
                          : userDetails.userdetail.riskLevel === "Medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {userDetails.userdetail.riskLevel}
                    </div>
                    <div
                      className={`text-sm ${
                        userDetails.userdetail.riskLevel === "Low"
                          ? "text-green-700"
                          : userDetails.userdetail.riskLevel === "Medium"
                            ? "text-yellow-700"
                            : "text-red-700"
                      }`}
                    >
                      Risk Assessment
                    </div>
                  </div>
                </div>

                {/* Detailed Financial Information */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Loan Portfolio</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Total Loan Amount</span>
                        <span className="font-medium text-blue-600">
                          {formatCurrency(userDetails.financialSummary.totalLoanAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Monthly EMI</span>
                        <span className="font-medium text-orange-600">
                          {formatCurrency(userDetails.financialSummary.totalEMI)}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Active Loans</span>
                        <span className="font-medium">{userDetails.userdetail.activeLoans}</span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Total Loans</span>
                        <span className="font-medium">{userDetails.userdetail.totalLoans}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Credit Profile</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Credit Utilization</span>
                        <span className="font-medium">{userDetails.financialSummary.creditUtilization}%</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Payment History</span>
                        <span className="font-medium text-green-600">
                          {userDetails.financialSummary.paymentHistory}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-600">Default History</span>
                        <span className="font-medium text-green-600">
                          {userDetails.financialSummary.defaultHistory}
                        </span>
                      </div>
                      <div className="flex justify-between py-2">
                        <span className="text-gray-600">Internal Rating</span>
                        <div className="flex items-center">
                          {renderStars(userDetails.userdetail.internalRating)}
                          <span className="ml-2 text-sm font-medium">{userDetails.userdetail.internalRating}/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "survey" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <span className="mr-2">📊</span>
                Survey Responses
              </h3>
              {userDetails.surveys ? (
                <div className="space-y-4">
                  {userDetails.surveys.surveyquestions.map((question, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <div className="mb-3">
                        <h4 className="font-medium text-gray-900 mb-2">Question {index + 1}</h4>
                        <p className="text-gray-700">{question.Question}</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <span className="text-sm text-gray-600 font-medium">Answer:</span>
                        <p className="text-gray-900 mt-1">{question.Answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📊</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Survey Data</h3>
                  <p className="text-gray-600">This user hasn't completed any surveys yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserProfile
