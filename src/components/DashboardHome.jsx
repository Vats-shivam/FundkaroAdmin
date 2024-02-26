import EduLoan from '../assets/EduLoan.svg';
import HomeLoan from '../assets/HomeLoan.svg';
import PersonalLoan from '../assets/PersonalLoan.svg';
import InsurancePolicy from '../assets/InsurancePolicy.svg';

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
    <div>
        <div className='text-center text-2xl'>Evaluate rates from different lenders in a matter of minutes.</div>
        <div className='text-center text-2l font-bold text-[#4169E1]'>Select a product to assess your customized rates.</div>
        <div className='grid grid-cols-4 items-center justify-center content-center justify-items-center pt-8'>
            {items.map((item) => {
                return (<div onClick={SelectCategory} className='p-4 mb-4 -ml-6 rounded-md w-56 shadow-dashboardshadow cursor-pointer'><img src={item.img} className='h-12 w-12 pr-2 inline-block'></img>{item.label}</div>)
            })}
        </div>
    </div>)
}

export default DashboardHome;