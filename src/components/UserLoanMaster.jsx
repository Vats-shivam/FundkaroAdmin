import LoanMaster from "../assets/LoanMaster.svg"
import CBI from "../assets/CBI.svg"
import { useState } from "react";
import toast from "react-hot-toast";
import LoanMasterCard from './LoanMasterCard';

function UserLoanMaster() {
    const [preferredBanks, setPreferredBanks] = useState('');
    const [amount, setAmount] = useState('');
    const [minimumRate, setMinimumRate] = useState('');
    const [loanTenure, setLoanTenure] = useState('');
    const [selectedBanks, setSelectedBanks] = useState([]);
    const BankInfo = [
        { img: CBI, name: "State Bank of India", rates_min: 5, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 5000, offers: [], features: { "Approval Durations": "Upto 24 Hours", "Feature 2": "Feature", "Feature 3": "Feature" }, document: { "Approval Durations": "Upto 24 Hours", "Doc 2": "Doc", "Doc 3": "Doc" }, fees: { "Approval Durations": "Upto 24 Hours", "Fees 2": "Fees", "Fees 3": "Fees" } },
        { img: CBI, name: "Bank of Baroda", rates_min: 8.2, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 25000, offers: [], features: { "Approval Durations": "Upto 24 Hours", "Feature 2": "Feature", "Feature 3": "Feature" }, document: { "Approval Durations": "Upto 24 Hours", "Doc 2": "Doc", "Doc 3": "Doc" }, fees: { "Approval Durations": "Upto 24 Hours", "Fees 2": "Fees", "Fees 3": "Fees" } },
        { img: CBI, name: "UCO Bank", rates_min: 7, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 50000, offers: [], features: { "Approval Durations": "Upto 24 Hours", "Feature 2": "Feature", "Feature 3": "Feature" }, document: { "Approval Durations": "Upto 24 Hours", "Doc 2": "Doc", "Doc 3": "Doc" }, fees: { "Approval Durations": "Upto 24 Hours", "Fees 2": "Fees", "Fees 3": "Fees" } },
        { img: CBI, name: "Kotak Bank", rates_min: 2, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 500000, offers: [], features: { "Approval Durations": "Upto 24 Hours", "Feature 2": "Feature", "Feature 3": "Feature" }, document: { "Approval Durations": "Upto 24 Hours", "Doc 2": "Doc", "Doc 3": "Doc" }, fees: { "Approval Durations": "Upto 24 Hours", "Fees 2": "Fees", "Fees 3": "Fees" } },
    ]
    const [filteredBanks, setFilteredBanks] = useState(BankInfo);

    const previousData = {
        "BankInfo": { img: CBI, name: "State Bank of India", rates_min: 5, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 5000, offers: [], features: { "Approval Durations": "Upto 24 Hours", "Feature 2": "Feature", "Feature 3": "Feature" }, document: { "Approval Durations": "Upto 24 Hours", "Doc 2": "Doc", "Doc 3": "Doc" }, fees: { "Approval Durations": "Upto 24 Hours", "Fees 2": "Fees", "Fees 3": "Fees" } },
        "FormInfo": [
            { stage: 1, name: 'Stage 1', completed: true },
            { stage: 2, name: 'Stage 2', completed: true },
            { stage: 3, name: 'Stage 3', completed: false },
            { stage: 4, name: 'Stage 4', completed: false },
        ]
    }

    const handleFilter = () => {
        var filtered = BankInfo.filter(bank => {
            const amnt = amount != '' ? Number(amount) : 99999999999
            const rate = minimumRate != '' ? parseInt(minimumRate.replace('%', '')) : 0
            const yr = loanTenure != '' ? parseInt(loanTenure) : 99999999999999;
            return (bank.min_amount <= (amnt)) &&
                (bank.rates_min >= (rate)) && (bank.tenure_min <= yr)

        });
        if (filtered.length == 0) {
            setFilteredBanks(BankInfo);
            toast.error("No Banks meets Filtered Data");
            return;
        }
        console.log(filtered);
        setFilteredBanks(filtered);

    };

    const handleSelectBank = (bankName) => {
        setSelectedBanks((prevSelectedBanks) => {
            if (prevSelectedBanks.includes(bankName)) {
                return prevSelectedBanks.filter((name) => name !== bankName);
            } else {
                return [...prevSelectedBanks, bankName];
            }
        });
    };

    const HandleLoan = () => {
        if (selectedBanks.length == 0) {
            toast.error("No Banks Selected")
            return;
        }
        const bankdata = BankInfo.filter(bank => {
            return selectedBanks.includes(bank.name);
        })
        console.log(bankdata);
    }

    const clearFilters = () => {
        setPreferredBanks('');
        setAmount('');
        setMinimumRate('');
        setLoanTenure('');
        setFilteredBanks(BankInfo);
    };

    return (<div>
        <div className={"z-10 float-left -mt-8 h-[100%] pt-12 w-[362px] px-[31px] transition-all duration-1000 linear"}>
            <div className="flex flex-wrap">
                <img className="mr-2" src={LoanMaster}></img>
                <div className="text-[26px] bg-clip-text bg-gradient-to-r from-darkPrimary to-lightPrimary text-transparent">Loan Master</div>
            </div>
            <div className="pt-8 text-[16px] line-[19.2px] font-semibold pb-10 border-b-[1px] border-[#4169E1]">
                <div className="float-left">Filters</div>
                <div onClick={clearFilters} className="float-right text-[#4169E1] cursor-pointer">Clear All</div>
            </div>
            <div className="pt-4">
                <div className="flex flex-col my-2 font-semibold">
                    <label className="pl-[2px]">Preferred banks</label>
                    <input
                        type="text"
                        placeholder="Default (All)"
                        value={preferredBanks}
                        onChange={(e) => setPreferredBanks(e.target.value)}
                        className="px-3 py-2 w-full border border-blue-500 focus:border-primaryStart rounded-[5px] font-normal focus:outline-none"
                    />
                </div>
                <div className="flex flex-col my-2 font-semibold">
                    <label className="pl-[2px]">Amount (INR)</label>
                    <input
                        type="number"
                        placeholder="Eg. 100000"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="px-3 py-2 w-full border border-blue-500  focus:border-primaryStart rounded-[5px] font-normal focus:outline-none"
                    />
                </div>
                <div className="flex flex-col my-2 font-semibold">
                    <label className="pl-[2px]">Minimum Rate</label>
                    <input
                        type="text"
                        placeholder="Eg. 25%"
                        value={minimumRate}
                        onChange={(e) => setMinimumRate(e.target.value)}
                        className="px-3 py-2 w-full border border-blue-500  focus:border-primaryStart rounded-[5px] font-normal focus:outline-none"
                    />
                </div>
                <div className="flex flex-col my-2 font-semibold">
                    <label className="pl-[2px]">Loan Tenure (Months)</label>
                    <input
                        type="text"
                        placeholder="Eg. 12"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(e.target.value)}
                        className="px-3 py-2 w-full border border-blue-500  focus:border-primaryStart rounded-[5px] font-normal focus:outline-none"
                    />
                </div>
                <div onClick={handleFilter} className='mt-4 float-right w-fit text-white bg-[#4169E1] border-[1.5px] border-[#4169E1] cursor-pointer px-5 py-2 rounded'>Apply</div>
            </div>
        </div>
        <div className="pl-[380px] pr-5">
            {/* Previously Left off */}
            <div className="flex flex-col gap-y-4 font-semibold pl-6 pt-6">
                <div className="font-[22px]">Previously Left on</div>
                <div className="border-[1px] rounded-[5px] border-[#4169E1] p-4">
                    <div className="flex gap-x-2">
                        <img className="h-[36px] w-auto" src={previousData["BankInfo"].img}></img>
                        <div className="font-[28px] leading-[36px]">{previousData["BankInfo"].name}</div>
                    </div>
                    <div className="pl-6 font-normal">
                        <div className="pt-5 font-normal text-[18px]">
                            Process Overview
                        </div>
                        <div className="pt-3">
                            {previousData['FormInfo'].map((stage, index) => {
                                return (
                                    <div>
                                        {index > 0 ? <div className={"w-[4px] ml-[8.5px] h-5 bg-[#4169E1] " + (stage.completed ? "bg-[#4169E1]" : "bg-[#B1B1B1]")}></div> : ''}
                                        <div className="font-normal flex flex-wrap gap-x-2 leading-[18px]">
                                            <div className={"h-[21px] w-[21px] rounded-[50%] border " + (stage.completed ? " border-[#4169E1]" : "border-[#B1B1B1]")}>
                                                <div className={"mx-auto my-[4px] h-[11px] w-[11px] rounded-[50%] " + (stage.completed ? "bg-[#4169E1]" : "bg-[#B1B1B1]")}></div>
                                            </div>
                                            <div>{stage.name}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="py-3">
                            <div onClick={() => { }} className='mt-4 w-fit text-white bg-[#4169E1] border-[1.5px] border-[#4169E1] cursor-pointer px-5 py-1 rounded'>Continue</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Loans for you */}
            <div className="flex flex-col gap-y-3 font-semibold pl-6 pt-6 pb-6">
                <div>Loans For You</div>
                {filteredBanks.map((bank) => {
                    return (<LoanMasterCard bank={bank} isSelected={selectedBanks.includes(bank.name)}
                        onSelect={() => handleSelectBank(bank.name)} />)
                })
                }
            </div>
            <div className="float-right mb-3">
                <button onClick={HandleLoan} className='mt-4 w-fit text-white bg-[#4169E1] border-[1.5px] border-[#4169E1] cursor-pointer px-5 py-1 rounded'>Apply For Loan</button>
            </div>
        </div>
    </div>)
}

export default UserLoanMaster;