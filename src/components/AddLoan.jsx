import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactFlow, { addEdge, Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import { UserContext } from "../context/userContext";
import FormBuilder from "./FormBuilder";

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
  const [categoryFormFields, setCategoryFormFields] = useState(null);
  const [template, setTemplate] = useState({
    nodes: [],
    edges: [],
    fieldMappings: {}
  });

  // Updated handleCategoryChange to properly handle the category form fields
  const handleCategoryChange = async (categoryId) => {
    try {
      const { data } = await axios.post("/api/category/find", {
        id: categoryId
      });
      
      if (data.formFields) {
        setCategoryFormFields(data.formFields);
        // Initialize template with category form fields
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
  };

  // Updated handleFormSubmit to properly format the data
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!template || !template.nodes) {
      toast.error("Please configure the form flow");
      return;
    }

    const formDataObj = new FormData();
    
    // Append basic loan details
    Object.keys(formData).forEach(key => {
      if (key === 'imageOrSvg' && formData[key]) {
        formDataObj.append(key, formData[key]);
      } else if (formData[key] !== null) {
        formDataObj.append(key, formData[key]);
      }
    });

    // Append user ID
    formDataObj.append('userId', currentuser.id);

    // Format form fields with inherited fields marked and safe access to properties
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
        // Reset form or redirect
      } else {
        throw new Error(response.data.message || "Failed to create loan");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Error occurred during addition of loan");
    }
  };

  // Handle profile field mapping
  const handleFieldMapping = (fieldId, profileField) => {
    setTemplate(prev => ({
      ...prev,
      fieldMappings: {
        ...prev.fieldMappings,
        [fieldId]: {
          profileField,
          editable: true // Allow editing mapped fields
        }
      }
    }));
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
      <form className="w-full p-4 mx-auto grid grid-cols-2 gap-6" onSubmit={handleFormSubmit}>
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
            onChange={(e) => {
              handleInputChange(e);
              handleCategoryChange(e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>

        {categoryFormFields && (
          <div className="col-span-2 mt-4">
            <h3 className="text-lg font-semibold mb-4">Inherited Category Fields:</h3>
            <div className="bg-gray-50 p-4 rounded">
              {categoryFormFields.nodes.map(node => (
                <div key={node.id} className="mb-4">
                  <h4 className="font-medium">{node.label}</h4>
                  <div className="ml-4">
                    {node.fields.map(field => (
                      <div key={field._id} className="mb-2 flex items-center">
                        <span className="mr-2">•</span>
                        <span>{field.label}</span>
                        <span className="ml-2 text-sm text-gray-500">({field.type})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="col-span-2">
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
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Loan
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLoan;
