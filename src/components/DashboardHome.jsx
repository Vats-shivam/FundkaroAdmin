import EduLoan from '../assets/EduLoan.svg';
import HomeLoan from '../assets/HomeLoan.svg';
import PersonalLoan from '../assets/PersonalLoan.svg';
import InsurancePolicy from '../assets/InsurancePolicy.svg';
import EmiCalculator from './EmiCalculator';
import DashboardBlogs from './DashboardBlogs';

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
    <div className='sm:ml-2 sm:mr-2 mr-6'>
      <section id="d-home">
      <h2 className="mt-4 mb-3 text-2xl bg-clip-text flex justify-center inline-block bg-gradient-to-r from-darkPrimary to-lightPrimary font-bold text-transparent">Home</h2>
      </section>
      <section id="d-loanmaster pt-24">
      <h2 className="flex mb-3 justify-center text-2xl bg-clip-text text-center inline-block bg-gradient-to-r from-darkPrimary to-lightPrimary font-bold text-transparent">Loan Master</h2>
        <div className='flex flex-col items-center flex-wrap'>
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
      <h2 className="flex mt-4 mb-3 justify-center text-2xl bg-clip-text text-center inline-block bg-gradient-to-r from-darkPrimary to-lightPrimary font-bold text-transparent">Tools</h2>
        <EmiCalculator />
      </section>

      <section id="d-res">
        <h2 className="flex mt-4 mb-3 justify-center text-2xl bg-clip-text text-center inline-block bg-gradient-to-r from-darkPrimary to-lightPrimary font-bold text-transparent">Resources</h2>
        <DashboardBlogs/>
      </section>

      <section id="d-ref">
      <h2 className="flex mt-4 mb-3 justify-center text-2xl bg-clip-text text-center inline-block bg-gradient-to-r from-darkPrimary to-lightPrimary font-bold text-transparent">Refferal</h2>
      </section>
    </div>
  )
}

export default DashboardHome;