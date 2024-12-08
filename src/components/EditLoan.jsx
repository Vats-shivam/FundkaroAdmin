import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import FormBuilder from "./FormBuilder";

function EditLoan({ loan, goback }) {
  const [formData, setFormData] = useState({
    loanId: loan._id,
    code: loan.code || 0,
    vendor: loan.vendor || '',
    ratesMin: loan.ratesMin || '',
    ratesMax: loan.ratesMax || '',
    minScoreRequired: loan.minScoreRequired || '',
    maxLoanAmount: loan.maxLoanAmount || '',
    tenureMin: loan.tenureMin || '',
    tenureMax: loan.tenureMax || '',
    offerId: loan.offer || '',
    categoryId: loan.category || '',
  });

  const { currentuser } = useContext(UserContext);

  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formFields, setFormFields] = useState(loan.formFields || []);
  // console.log(loan.formFields)
  const [template,setTemplate] = useState(loan.formFields);

 

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const request = new FormData();
    // if (formData.imageOrSvg) {
    //   request.append('image', formData.imageOrSvg);
    // }
    // Object.entries(formData).forEach(([key, value]) => {
    //   if (key !== 'imageOrSvg') {
    //     request.append(key, value);
    //   }
    // });

    // request.append("userId", currentuser.id);

    // formFields.forEach((field, index) => {
    //   Object.entries(field).forEach(([key, value]) => {
    //     request.append(`formFields[${index}][${key}]`, value);
    //   });
    // });

    let data = formData;
    data.userId = currentuser.id;
    data.formFields = formFields;
    // if (formData.imageOrSvg) {
    //   data.image = formData.imageOrSvg;
    //   delete data['imageOrSvg'];
    // }
    delete data['image'];
    // console.log(data);
    console.log(template);
    // try {
    //   const response = await axios.post(`/api/loan/update`, data, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   });
    //   if (response.data.success) {
    //     toast.success("Loan updated Successfully");
    //     goback();
    //   } else {
    //     throw response.data;
    //   }
    // } catch (err) {
    //   console.log(err);
    //   toast.error("Error occurred during update of loan");
    // }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'imageOrSvg') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

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
 
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="bg-gray-100 p-2 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Loan Details Form</h2>
      <form className="w-full p-4 mx-auto grid grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="code" className="block text-gray-700 font-semibold mb-2">Code</label>
          <input
            type="number"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
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
            name="vendor"
            value={formData.vendor}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interestRateMin" className="block text-gray-700 font-semibold mb-2">Interest Rate Min(%):</label>
          <input
            type="number"
            id="interestRateMin"
            name="ratesMin"
            value={formData.ratesMin}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interestRateMax" className="block text-gray-700 font-semibold mb-2">Interest Rate Max(%):</label>
          <input
            type="number"
            id="interestRateMax"
            name="ratesMax"
            value={formData.ratesMax}
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
            name="minScoreRequired"
            value={formData.minScoreRequired}
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
          <label htmlFor="tenureMin" className="block text-gray-700 font-semibold mb-2">Tenure Min(months):</label>
          <input
            type="number"
            id="tenureMin"
            name="tenureMin"
            value={formData.tenureMin}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tenureMax" className="block text-gray-700 font-semibold mb-2">Tenure Max (months):</label>
          <input
            type="number"
            id="tenureMax"
            name="tenureMax"
            value={formData.tenureMax}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6 col-span-2">
          <label htmlFor="selectedOffer" className="block text-gray-700 font-semibold mb-2">Select Offer:</label>
          <select
            id="selectedOffer"
            name="offerId"
            value={formData.offerId}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Select Offer --</option>
            {offers.map((offer, index) => (
              <option key={index} value={offer._id}>{offer.offerMsg + '(' + offer.offerCode + ')'}</option>
            ))}
          </select>
        </div>
        <div className="mb-4 col-span-2">
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">Category:</label>
          <select
            id="category"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">-- Select Category --</option>
            {categories.map((category, index) => (
              <option key={index} value={category._id} >{category.category}</option>
            ))}
          </select>
        </div>
        <div className="col-span-2">
          <FormBuilder template={template} setTemplate={setTemplate} />
        </div>
        <div className="col-span-2 text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-16 rounded-md transition-colors duration-300">Update</button>
        </div>
      </form>
    </div>
  );
}

export default EditLoan;