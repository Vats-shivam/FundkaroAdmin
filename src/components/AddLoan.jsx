import React, { useContext, useState } from 'react'

function AddLoan() {
  const [formData, setFormData] = useState({
    loanVendor: '',
    interestRate: '',
    minCibilScore: '',
    maxLoanAmount: '',
    tenure: '',
    selectedOffer: '',
    category: '',
    imageOrSvg: null,
  });

  // Sample offers array
  const offers = ["Offer 1", "Offer 2", "Offer 3"];
  // const {category,setCategory} =useContext(Categor)
  // List of available categories
  const categories=["Category A", "Category B", "Category C"];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, you can send the data to your backend or do something else with it
    console.log(formData);
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'imageOrSvg') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };



  const handleCategoryChange = (e) => {
      setFormData({ ...formData, category: e.target.value });
  };


  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Loan Details Form</h2>
      <form className="w-full max-w-lg mx-auto grid grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="imageOrSvg" className="block text-gray-700 font-semibold mb-2">Image or SVG:</label>
          <input
            type="file"
            id="imageOrSvg"
            name="imageOrSvg"
            accept="image/*,.svg"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="loanVendor" className="block text-gray-700 font-semibold mb-2">Loan Vendor:</label>
          <input
            type="text"
            id="loanVendor"
            name="loanVendor"
            value={formData.loanVendor}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interestRate" className="block text-gray-700 font-semibold mb-2">Interest Rate (%):</label>
          <input
            type="number"
            id="interestRate"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="minCibilScore" className="block text-gray-700 font-semibold mb-2">Minimum Cibil Score Required:</label>
          <input
            type="number"
            id="minCibilScore"
            name="minCibilScore"
            value={formData.minCibilScore}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="maxLoanAmount" className="block text-gray-700 font-semibold mb-2">Maximum Loan Amount:</label>
          <input
            type="number"
            id="maxLoanAmount"
            name="maxLoanAmount"
            value={formData.maxLoanAmount}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tenure" className="block text-gray-700 font-semibold mb-2">Tenure (months):</label>
          <input
            type="number"
            id="tenure"
            name="tenure"
            value={formData.tenure}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6 col-span-2">
          <label htmlFor="selectedOffer" className="block text-gray-700 font-semibold mb-2">Select Offer:</label>
          <select
            id="selectedOffer"
            name="selectedOffer"
            value={formData.selectedOffer}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Offer --</option>
            {offers.map((offer, index) => (
              <option key={index} value={offer}>{offer}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 col-span-2">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Category --</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2 text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddLoan