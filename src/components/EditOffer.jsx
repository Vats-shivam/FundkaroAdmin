import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';

function EditOffer({ offer, goBack }) {
    const { currentuser } = useContext(UserContext);
    const [offerData, setOfferData] = useState({
        offerMsg: offer.offerMsg,
        offerCode: offer.offerCode,
        isValid: offer.isValid
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/offer/update', {
                userId: currentuser.id,
                offerId: offer._id,
                ...offerData
            });
            if (response.data.success) {
                toast.success("Offer updated successfully.");
                goBack();
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating offer:', error);
            toast.error("An error occurred while updating the offer.");
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setOfferData({
            ...offerData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    return (
        <div className='p-8 rounded-lg shadow-md bg-gray-100'>
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Offer</h2>
            <form onSubmit={handleSubmit} className='w-full max-w-lg mx-auto grid grid-cols-1 gap-6'>
                <div className="mb-4">
                    <label htmlFor="msg" className="block text-gray-700 font-semibold mb-2">Offer Message:</label>
                    <input
                        type="text"
                        id="msg"
                        name="offerMsg"
                        value={offerData.offerMsg}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="code" className="block text-gray-700 font-semibold mb-2">Offer Code:</label>
                    <input
                        type="text"
                        id="code"
                        name="offerCode"
                        value={offerData.offerCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isValid" className="block text-gray-700 font-semibold mb-2">Is Valid:</label>
                    <input
                        type="checkbox"
                        id="isValid"
                        name="isValid"
                        checked={offerData.isValid}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4 w-1/2 mx-auto'>Update</button>
            </form>
        </div>
    );
}

export default EditOffer;
