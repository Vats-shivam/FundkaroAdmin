import React, { useState } from 'react'
import EduLoan from '../assets/EduLoan.svg';
import HomeLoan from '../assets/HomeLoan.svg';
import PersonalLoan from '../assets/PersonalLoan.svg';
import InsurancePolicy from '../assets/InsurancePolicy.svg';
import LoanMaster from './LoanMaster';
function AdminLoanMaster() {
  const [modalVisible, setModalVisible] = useState(false);
  const items = [
    { label: "Education Loan", img: EduLoan },
    { label: "Home Loan", img: HomeLoan },
    { label: "Personal Loan", img: PersonalLoan },
    { label: "Insurance Policy", img: InsurancePolicy },
    { label: "Insurance Policy", img: InsurancePolicy },
    { label: "Insurance Policy", img: InsurancePolicy },
    { label: "Insurance Policy", img: InsurancePolicy },
    { label: "Insurance Policy", img: InsurancePolicy },
  ];
  const showModal = () => {
    setModalVisible(true);
  }
  function SelectCategory(e) {
    return;
  }
  return (
    <div className='w-full h-full p-4 container relative'>
      <>Search Bar</>
      <>Filter</>
      <button className='bg-lightPrimary rounded-xl p-4 absolute right-[10%]' onClick={showModal}>Add A Service</button>
      <div className='flex flex-col flex-wrap justify-center pt-8'>
        {items.map((item, index) => {
          return (<div key={index} onClick={SelectCategory} className='p-4 mb-4 ml-2 mr-2 rounded-md w-56 shadow-dashboardshadow cursor-pointer'><img src={item.img} className='h-12 w-12 pr-2 inline-block'></img>{item.label}</div>)
        })}
      </div>
      {modalVisible &&
        (
          <div className='absolute z-10 top-0 left-0 bottom-0 right-0 bg-blue-100'>
            <LoanMaster/>
            <button onClick={()=>{setModalVisible(false)}} className='p-4 absolute right-[10%] rounded-xl bg-darkPrimary'>close</button>
          </div>
        )}
    </div>
  )
}

export default AdminLoanMaster