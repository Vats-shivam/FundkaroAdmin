import LoanMaster from "../assets/LoanMaster.svg"
import CBI from "../assets/CBI.svg"
import Offer from "../assets/Offer.svg";
import DownArrow from "../assets/DownArrow.svg";
import { useState } from "react";
import toast from "react-hot-toast";

function UserLoanMaster() {
    const [preferredBanks, setPreferredBanks] = useState('');
    const [amount, setAmount] = useState('');
    const [minimumRate, setMinimumRate] = useState('');
    const [loanTenure, setLoanTenure] = useState('');
    const BankInfo = [
        { img: CBI, name: "State Bank of India", rates_min: 5, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 5000, offers: [] },
        { img: CBI, name: "Bank of Baroda", rates_min: 8.2, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 25000, offers: [] },
        { img: CBI, name: "UCO Bank", rates_min: 7, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 50000, offers: [] },
        { img: CBI, name: "Kotak Bank", rates_min: 2, rates_max: 9.25, tenure_min: 1, tenure_max: 2, cibil: 650, min_amount: 500000, offers: [] },
    ]
    const [filteredBanks, setFilteredBanks] = useState(BankInfo);

    const previousData = [
        { stage: 1, name: 'Stage 1', completed: true },
        { stage: 2, name: 'Stage 2', completed: true },
        { stage: 3, name: 'Stage 3', completed: false },
        { stage: 4, name: 'Stage 4', completed: false },
    ]
    const handleFilter = () => {
        var filtered = BankInfo.filter(bank => {
            const amnt = amount!=''?Number(amount):99999999999
            const rate = minimumRate!=''?parseInt(minimumRate.replace('%', '')):0
            const yr = loanTenure!=''?parseInt(loanTenure):99999999999999;
            return (bank.min_amount <= (amnt)) &&
            (bank.rates_min >= (rate)) && (bank.tenure_min <= yr)

        });
        if(filtered.length==0) {
            setFilteredBanks(BankInfo);
            toast.error("No Banks meets Filtered Data");
            return;
        }
        console.log(filtered);
        setFilteredBanks(filtered);
        
    };

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
                        <img className="h-[36px] w-auto" src={CBI}></img>
                        <div className="font-[28px] leading-[36px]">Central Bank of India</div>
                    </div>
                    <div className="pl-6 font-normal">
                        <div className="pt-5 font-normal text-[18px]">
                            Process Overview
                        </div>
                        <div className="pt-3">
                            {previousData.map((stage, index) => {
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
                        return (
                            <div className="rounded-[5px] border-[1.5px] border-[#4169E1] font-normal">
                                <div className="flex flex-wrap gap-x-3 p-4 items-center">
                                    <div>
                                        <input type="radio"></input>
                                    </div>
                                    <div className="flex flex-wrap gap-x-1 gap-y-4">
                                        <div><img className="h-[50px] w-[50px]" src={bank.img}></img></div>
                                        <div className="w-[90px]">{bank.name}</div>
                                        <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                                        <div>
                                            <div>Rates</div>
                                            <div>{`${bank.rates_min}-${bank.rates_max}%`}</div>
                                        </div>
                                        <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                                        <div>
                                            <div>Loan Tenure</div>
                                            <div>{`${bank.tenure_min}-${bank.tenure_max} Years`}</div>
                                        </div>
                                        <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                                        <div>
                                            <div>Minimum CIBIL Score</div>
                                            <div>{`>${bank.cibil}`}</div>
                                        </div>
                                        <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                                        <div>
                                            <div>Minimum Amount</div>
                                            <div>{`₹ ${bank.min_amount}`}</div>
                                        </div>
                                        <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                                        <div className="float-right my-auto h-fit cursor-pointer w-fit hover:bg-[#EAEAEA] px-2 border text-[14px] font-semibold rounded-[5px] border-black p-1" onClick={() => { }}><img className="inline-block pr-1" src={Offer}></img>Offers</div>
                                    </div>
                                </div>
                                <div className="pt-2 pb-3 flex flex-col justify-center items-center text-[14px] font-bold text-[#676767]">
                                    View More
                                    <img className="h-[6.6px] w-[12.5px]" src={DownArrow}></img>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>)
}

export default UserLoanMaster;