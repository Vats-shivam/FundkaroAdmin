import React, { useState, useContext } from "react";
import axios from "axios";
import AddLoan from './AddLoan';
import EditLoan from './EditLoan';
import { UserContext } from '../context/userContext';

function AdminLoans({ loanVendors, updateData }) {
    const [addloan, SetAddLoan] = useState(false);
    const [editloan, setEditLoan] = useState(null);
    const { currentuser } = useContext(UserContext);

    function goback() {
        SetAddLoan(!addloan);
        setEditLoan(null);
        updateData();
    }

    const handleDelete = async (loanId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this loan vendor?");
        if (confirmDelete) {
            try {
                const response = await axios.post(`/api/loan/delete`,{userId:currentuser.id,loanId});
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
        }
    };

    return (
        <div className="bg-[#fafafa] w-full h-full p-4 rounded-lg">
            <div className="px-4 float-left font-xl">Total Loans: {loanVendors.length}</div>
            <button className='bg-lightPrimary float-right rounded-xl p-4 text-white' onClick={goback}>
                {addloan ? 'Back' : 'Add new Loan Vendor'}
            </button>
            {addloan ? (
                editloan ? (
                    <div className="mt-16">
                        <EditLoan loan={editloan} goback={goback} />
                    </div>
                ) : (
                    <div className="mt-16">
                        <AddLoan />
                    </div>
                )
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12 py-4'>
                    {loanVendors.map(loan => (
                        <div key={loan._id} className='p-4 bg-white border rounded shadow'>
                            <img src={loan.logo} alt={loan.vendor} className='w-16 h-16' />
                            <h3 className='text-lg font-bold'>{loan.vendor}</h3>
                            <p>Rate: {loan.ratesMin}% - {loan.ratesMax}%</p>
                            <div className='flex gap-x-2'>
                                <button
                                    onClick={() => {
                                        setEditLoan(loan);
                                        SetAddLoan(true);
                                    }}
                                    className='text-blue-500'
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(loan._id)}
                                    className='text-red-500'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AdminLoans;