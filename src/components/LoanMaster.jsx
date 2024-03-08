import React, { useState } from 'react';
import AddLoan from './AddLoan';
import AcceptedLoan from './AcceptedLoan';
import FormMaker from './FormMaker';

function LoanMaster() {
  const [step,setStep] = useState(1);
  const [loanData,setLoanData] = useState({});

  const nextStep = ()=>{
    setStep(step+1);
  }

  const prevStep = ()=>{
    setStep(step-1);
  }

  const handleInputData = (input)=>{
    setLoanData({...loanData,input})
  }

  switch(step){
    case 1: return <AddLoan
    nextStep={nextStep}
    handleInputData={handleInputData}
    formData={loanData}
    />
    case 2: return <AcceptedLoan
    nextStep={nextStep}
    prevStep={prevStep}
    handleInputData={handleInputData}
    formData={loanData}
    />
    case 3: return <FormMaker
    prevStep={prevStep}
    handleSubmit={handleSubmit}
    formData={loanData}
    />
    default: return null;
  }
}

export default LoanMaster;