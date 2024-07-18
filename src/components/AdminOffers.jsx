import React, { useState, useContext } from "react";
import AddOffer from './AddOffer';
import EditOffer from './EditOffer';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import toast from 'react-hot-toast';

function AdminOffers({ offers, updateData }) {
    const [addOffer, setAddOffer] = useState(false);
    const [editOffer, setEditOffer] = useState(null);
    const { currentuser } = useContext(UserContext);

    const handleEdit = (offer) => {
        setEditOffer(offer);
        setAddOffer(true);
    };

    const handleDelete = async (offerId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this offer?");
        if (confirmDelete) {
            try {
                const response = await axios.post(`/api/offer/delete`, { userId: currentuser.id, offerId });
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
        }
    };

    const goBack = () => {
        setAddOffer(!addOffer);
        setEditOffer(null);
        updateData();
    };

    return (
        <div className="bg-[#fafafa] w-full h-full p-4 rounded-lg">
            <div className="px-4 float-left font-xl">Total Offers: {offers.length}</div>
            <button className='bg-lightPrimary float-right rounded-xl p-4 text-white' onClick={goBack}>
                {addOffer ? 'Back' : 'Add new Offer'}
            </button>
            {addOffer == true ? (
                editOffer != null ? (
                    <div className="mt-16">
                        <EditOffer offer={editOffer} goBack={goBack} />
                    </div>
                ) : (
                    <div className="mt-16">
                        <AddOffer goBack={goBack} />
                    </div>
                )
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 py-4'>
                    {offers.map(offer => (
                        <div key={offer._id} className='p-4 bg-white border rounded shadow'>
                            <h3 className='text-lg font-bold'>{offer.offerMsg}</h3>
                            <p>Offer Code: {offer.offerCode}</p>
                            <p>Status: {offer.isValid ? 'Valid' : 'Invalid'}</p>
                            <div className='flex gap-x-2'>
                                <button onClick={() => handleEdit(offer)} className='text-blue-500'>Edit</button>
                                <button onClick={() => handleDelete(offer._id)} className='text-red-500'>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminOffers;
