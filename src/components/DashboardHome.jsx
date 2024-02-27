import EduLoan from '../assets/EduLoan.svg';
import HomeLoan from '../assets/HomeLoan.svg';
import PersonalLoan from '../assets/PersonalLoan.svg';
import InsurancePolicy from '../assets/InsurancePolicy.svg';
import EmiCalculator from './EmiCalculator';

function DashboardHome() {

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

  function SelectCategory(e) {
    return;
  }
  return (
    <div className='ml-2 mr-2'>
      <section id="d-home">
        Home
      </section>
      <section id="d-loanmaster">
        <div className='flex flex-col items-center flex-wrap pt-24'>
          <div className='text-2xl'>Evaluate rates from different lenders in a matter of minutes.</div>
          <div className='text-2l font-bold text-[#4169E1]'>Select a product to assess your customized rates.</div>
        </div>
        <div className='flex flex-wrap justify-center pt-8'>
          {items.map((item, index) => {
            return (<div key={index} onClick={SelectCategory} className='p-4 mb-4 ml-2 mr-2 rounded-md w-56 shadow-dashboardshadow cursor-pointer'><img src={item.img} className='h-12 w-12 pr-2 inline-block'></img>{item.label}</div>)
          })}
        </div>
      </section>

      <section id="d-tools">
        <EmiCalculator />
      </section>

      <section id="d-res">
        Resources
      </section>

      <section id="d-ref">
        Refferal
      </section>
    </div>
  )
}

export default DashboardHome;