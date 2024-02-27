import React, { useState } from 'react';

const EmiCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [tenure, setTenure] = useState(0);
  const [weeklyEmi, setweeklyEmi] = useState(0);
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [dailyEmi, setDailyEmi] = useState(0);
  const [anuallyEmi, setanuallyEmi] = useState(0);
  const [loantype, setLoantype] = useState("Home Loan");


  const calculateEmi = (updatedLoanAmount, updatedInterestRate, updatedTenure) => {
    if (updatedLoanAmount > 0 && updatedInterestRate > 0 && updatedTenure > 0) {
    console.log(loantype)
      const monthlyRate = updatedInterestRate / (100 * 12);
      const monthlyEmi = (updatedLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, updatedTenure)) / (Math.pow(1 + monthlyRate, updatedTenure) - 1);

      // Calculate other EMIs
      const weeklyEmi = monthlyEmi * 4.33; 
      const dailyEmi = monthlyEmi / 30; 
      const annuallyEmi = monthlyEmi * 12; 

      setMonthlyEmi(monthlyEmi.toFixed(2)); 
      setweeklyEmi(weeklyEmi.toFixed(2)); 
      setDailyEmi(dailyEmi.toFixed(2));         
      setanuallyEmi(annuallyEmi.toFixed(2)); 
    } else {
      setMonthlyEmi(0); 
      setweeklyEmi(0); 
      setDailyEmi(0);         
      setanuallyEmi(0); 
    }
  };

  function updateLoan(e) {
    setLoanAmount(prevValue => {
      const newValue = Number(e.target.value); 
      calculateEmi(newValue, interestRate, tenure); 
      return newValue;
    });
  }
  
  function updateinterestRate(e) {
    setInterestRate(prevValue => {
      const newValue = Number(e.target.value); 
      calculateEmi(loanAmount, newValue, tenure);
      return newValue;
    });
  }
  
  function updatetenure(e) {
    setTenure(prevValue => {
      const newValue = Number(e.target.value); 
      calculateEmi(loanAmount, interestRate, newValue); 
      return newValue;
    });
  }

  function updatetype(e) {
    setLoantype(e.target.value);
  }

  return (
    <div id="d-tools" className="flex justify-center container mx-auto mt-8 font-fontPrimary">
      <div className="bg-[#4169E1] max-w-[90%] shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className='flex flex-wrap bg-white rounded pt-2 pb-2 pl-4 pr-8'>
        <h2 className="text-2xl bg-clip-text inline-block bg-gradient-to-r from-darkPrimary to-lightPrimary font-bold text-transparent">EMI Calculator</h2>
        <div className='inline-block ml-auto text-l leading-8'>Select Type of Loan
            <select 
                value={loantype}
                onChange={updatetype}
                className='border rounded ml-2'
            >
                <option>Home Loan</option>
                <option>Personal Loan</option>
                <option>Bussiness Loan</option>
            </select>
        </div>
        </div>
        <div className="flex flex-cols flex-wrap gap-8 mt-4 items-center justify-center">
          <div>
            <label htmlFor="loanAmount" className="block text-white text-sm font-bold mb-1">
              Loan Amount (₹)
            </label>
            <input
              type="number"
              id="loanAmount"
              placeholder='12000'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={loanAmount}
              onChange={updateLoan}
            />
          </div>
          <div>
            <label htmlFor="interestRate" className="block text-white text-sm font-bold mb-1">
              Interest Rate (%)
            </label>
            <input
              type="number"
              id="interestRate"
              placeholder='Ex. 6.24'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={interestRate}
              onChange={updateinterestRate}
            />
          </div>
          <div>
            <label htmlFor="tenure" className="block text-white text-sm font-bold mb-1">
              Tenure (Months)
            </label>
            <input
              type="number"
              id="tenure"
              placeholder='12'
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={tenure}
              onChange={updatetenure}
            />
          </div>
        </div>
        <h2 className='text-center font-semibold text-white pt-4 text-xl'><u>Calculated EMI</u></h2>
        <div className='flex flex-cols flex-wrap gap-8 mt-4 items-center justify-center font-bold'>
          <div>
            <p className="text-white text-l mb-2">Daily</p>
            <p className="text-white text-xl">₹{dailyEmi}</p>
          </div>
          <div>
            <p className="text-white text-l mb-2">Weekly</p>
            <p className="text-white text-xl">₹{weeklyEmi}</p>
          </div>
          <div>
            <p className="text-white text-l mb-2">Monthly</p>
            <p className="text-white text-xl">₹{monthlyEmi}</p>
          </div>
          <div>
            <p className="text-white text-l mb-2">Anually</p>
            <p className="text-white text-xl">₹{anuallyEmi}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiCalculator;