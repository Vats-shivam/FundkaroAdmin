import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactFlow, { addEdge, Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { UserContext } from "../context/userContext";
import FormBuilder from "./FormBuilder";
const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
];

function AddLoan() {
  const [formData, setFormData] = useState({
    code: 0,
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
  });

  const { currentuser } = useContext(UserContext);

  const [offers, setOffers] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [formFields, setFormFields] = useState([]);
  const [template,setTemplate] = useState();
  const [selectedNode, setSelectedNode] = useState(null);
  const [fieldName, setFieldName] = useState("");
  const [fieldType, setFieldType] = useState("text");

  const addField = () => {
    if (!fieldName.trim()) {
      alert("Please enter a field name");
      return;
    }
    const newField = {
      name: fieldName.trim(),
      type: fieldType,
    };
    setFormFields([...formFields, newField]);
    setFieldName("");
    setFieldType("text");
  };

  const removeField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // const request = new FormData();
    // Object.entries(formData).forEach(([key, value]) => {
    //   request.append(key, value);
    // });
  
    // request.append("userId", currentuser.id);
  
    // // Append the form structure
    // request.append("formFields", template);

    // request.forEach((value, key) => {
    //   console.log(`${key}: ${value}`);
    // });
    // console.log(request);
    let data=formData;
    data.userId=currentuser.id;
    data.formFields=template;
    try {
      const response = await axios.post('/api/loan/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.data.success) {
        toast.success("Loan created Successfully");
      } else {
        throw response;
      }
    } catch (err) {
      console.log(err);
      toast.error("Error occurred during addition of loan");
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "imageOrSvg") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const fetchAll = async () => {
    try {
      const data = await axios.post("/api/admin/getdetails", {
        userId: currentuser.id,
      });
      console.log(data.data);
      if (data.data.status) {
        setOffers(data.data.offers);
        setCategories(data.data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch Data");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);



  return (
    <div className="bg-gray-100 p-2 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Loan Details Form
      </h2>
      <form
        className="w-full p-4 mx-auto grid grid-cols-2 gap-6"
        onSubmit={handleFormSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="code"
            className="block text-gray-700 font-semibold mb-2"
          >
            code
          </label>
          <input
            type="Number"
            id="code"
            name="code"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageOrSvg"
            className="block text-gray-700 font-semibold mb-2"
          >
            Image or SVG:
          </label>
          <input
            type="file"
            id="imageOrSvg"
            name="imageOrSvg"
            accept="image/*,.svg"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="loanVendor"
            className="block text-gray-700 font-semibold mb-2"
          >
            Loan Vendor:
          </label>
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
          <label
            htmlFor="interestRateMin"
            className="block text-gray-700 font-semibold mb-2"
          >
            Interest Rate Min(%):
          </label>
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
          <label
            htmlFor="interestRateMax"
            className="block text-gray-700 font-semibold mb-2"
          >
            Interest Rate Max(%):
          </label>
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
          <label
            htmlFor="minCibilScore"
            className="block text-gray-700 font-semibold mb-2"
          >
            Minimum Cibil Score Required:
          </label>
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
          <label
            htmlFor="maxLoanAmount"
            className="block text-gray-700 font-semibold mb-2"
          >
            Maximum Loan Amount:
          </label>
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
          <label
            htmlFor="tenureMin"
            className="block text-gray-700 font-semibold mb-2"
          >
            Tenure Min(months):
          </label>
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
          <label
            htmlFor="tenureMin"
            className="block text-gray-700 font-semibold mb-2"
          >
            Tenure Max (months):
          </label>
          <input
            type="number"
            id="tenureMin"
            name="tenureMax"
            value={formData.tenureMax}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6 col-span-2">
          <label
            htmlFor="selectedOffer"
            className="block text-gray-700 font-semibold mb-2"
          >
            Select Offer:
          </label>
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
              <option key={index} value={offer._id}>
                {offer.offerMsg + "(" + offer.offerCode + ")"}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 col-span-2">
          <label
            htmlFor="category"
            className="block text-gray-700 font-semibold mb-2"
          >
            Category:
          </label>
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
              <option key={index} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
       <div className="col-span-2">
          <FormBuilder setTemplate={setTemplate} />
        </div>
        
        <div className="col-span-2 text-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-16 rounded-md transition-colors duration-300">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddLoan;
