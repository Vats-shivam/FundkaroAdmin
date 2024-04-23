import React, { useState } from 'react'
import AddCategory from './AddCategory';
import AddOffer from './AddOffer';
import AddLoan from './AddLoan';
function AdminLoanMaster() {
  const [loanModalVisible, setLoanModalVisible] = useState(true);
  const [CategoryModal, setCategoryModal] = useState(false);
  const [offerModal, setOfferModal] = useState(false);
  const showLoanModal = () => {
    setLoanModalVisible(true);
    setCategoryModal(false);
    setOfferModal(false);
  }
  const showCategoryModal = () => {
    setLoanModalVisible(false);
    setCategoryModal(true);
    setOfferModal(false);
  }
  const showOfferModal = () => {
    setLoanModalVisible(false);
    setCategoryModal(false);
    setOfferModal(true);
  }
  function SelectCategory(e) {
    return;
  }
  return (
    <div className='w-full h-full p-4 container relative'>
      <div className='flex justify-between mb-4'>
      <button className='bg-lightPrimary rounded-xl p-4 ' onClick={showLoanModal}>Add Service</button>
      <button className='bg-lightPrimary rounded-xl p-4 ' onClick={showCategoryModal}>Add Category</button>
      <button className='bg-lightPrimary rounded-xl p-4 ' onClick={showOfferModal}>Add Offer</button>
      </div>
      {loanModalVisible &&
        (
          <>
            <AddLoan />
          </>
        )}
      {CategoryModal &&
        (
          <>
            <AddCategory/>
          </>
        )
      }
      {offerModal &&
        (
            <>
            <AddOffer />
            </>
        )
      }
    </div>
  )
}

export default AdminLoanMaster