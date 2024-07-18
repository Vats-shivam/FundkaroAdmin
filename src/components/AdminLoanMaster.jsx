import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../context/userContext';
import AdminLoans from './AdminLoans';
import AdminCategory from './AdminCategory';
import AdminOffers from './AdminOffers';

function AdminLoanMaster() {
  const [loanModalVisible, setLoanModalVisible] = useState(true);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [offerModalVisible, setOfferModalVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loanVendors, setLoanVendors] = useState([]);
  const { currentuser } = useContext(UserContext);
  const [update, setUpdate] = useState(false);

  function updateData() {
    setUpdate(!update);
  }

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

  useEffect(() => {
    fetchAll();
  }, [update]);

  const showLoanModal = () => {
    setLoanModalVisible(true);
    setCategoryModalVisible(false);
    setOfferModalVisible(false);
  };
  const showCategoryModal = () => {
    setLoanModalVisible(false);
    setCategoryModalVisible(true);
    setOfferModalVisible(false);
  };
  const showOfferModal = () => {
    setLoanModalVisible(false);
    setCategoryModalVisible(false);
    setOfferModalVisible(true);
  };

  return (
    <div className='w-full h-full p-4 container relative'>
      <div className='flex justify-between mb-4'>
        <button className='bg-lightPrimary rounded-xl p-4 text-white' onClick={showLoanModal}>Loan Vendors</button>
        <button className='bg-lightPrimary rounded-xl p-4 text-white' onClick={showCategoryModal}>Loan Categories</button>
        <button className='bg-lightPrimary rounded-xl p-4 text-white' onClick={showOfferModal}>Offers</button>
      </div>
      {loanModalVisible && (
          <AdminLoans loanVendors={loanVendors} updateData={updateData} />
      )}
      {categoryModalVisible && (
          <AdminCategory categories={categories} updateData={updateData} />
      )}
      {offerModalVisible && (
        <AdminOffers offers={offers} updateData={updateData} />
      )}
    </div>
  );
}

export default AdminLoanMaster;