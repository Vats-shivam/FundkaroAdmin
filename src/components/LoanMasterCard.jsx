import Offer from "../assets/Offer.svg";
import DownArrow from "../assets/DownArrow.svg";
import UpArrow from "../assets/UpArrow.svg";
import { useState } from "react";

function LoanMasterCard(props) {
    return (
        <div className="rounded-[5px] border-[1.5px] border-[#4169E1] font-primaryFont">
            <div className="flex p-4 items-center">
                <div>
                    <input type="checkbox" checked={props.isSelected} onChange={props.onSelect} className="rounded-[100%]"></input>
                </div>
                <div className="w-full flex justify-around">
                    <div><img className="h-[50px] w-[50px]" src={props.bank.img}></img></div>
                    <div className="w-[90px]">{props.bank.name}</div>
                    <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                    <div>
                        <div>Rates</div>
                        <div>{`${props.bank.rates_min}-${props.bank.rates_max}%`}</div>
                    </div>
                    <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                    <div>
                        <div>Loan Tenure</div>
                        <div>{`${props.bank.tenure_min}-${props.bank.tenure_max} Years`}</div>
                    </div>
                    <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                    <div>
                        <div>Minimum CIBIL Score</div>
                        <div>{`>${props.bank.cibil}`}</div>
                    </div>
                    <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                    <div>
                        <div>Minimum Amount</div>
                        <div>{`₹ ${props.bank.min_amount}`}</div>
                    </div>
                    <div className="h-auto w-[1px] mx-2 bg-[#4169E1]"></div>
                    <div className="float-right my-auto h-fit cursor-pointer w-fit hover:bg-[#EAEAEA] px-2 border text-[14px] font-semibold rounded-[5px] border-black p-1" onClick={() => { }}><img className="inline-block pr-1" src={Offer}></img>Offers</div>
                </div>
            </div>
        </div>
    )
}

export default LoanMasterCard;