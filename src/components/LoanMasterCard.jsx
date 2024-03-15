import Offer from "../assets/Offer.svg";
import DownArrow from "../assets/DownArrow.svg";
import UpArrow from "../assets/UpArrow.svg";
import { useState } from "react";

function LoanMasterCard(props) {
    const [isopen, setIsOpen] = useState(false);
    const [details, SetDetials] = useState(<div>View More
        <img className="h-[6.6px] w-[12.5px] mx-auto" src={DownArrow}></img></div>)
    const [expanddata,SetExpandData] = useState(props.bank.features);
    const [selectedexpansion,SetSelectedExpansion]=useState("features");

    function HandleExpand() {
        setIsOpen(!isopen);
        if (!isopen) {
            SetDetials(<div>Hide Details
                <img className="h-[6.6px] w-[12.5px] mx-auto" src={UpArrow}></img></div>)
        } else {
            SetDetials(<div>View More
                <img className="h-[6.6px] w-[12.5px] mx-auto" src={DownArrow}></img></div>)
        }
    }

    function HandleExpansionData(e) {
        SetExpandData(props.bank[e.target.id]);
        SetSelectedExpansion(e.target.id);
    }
    return (
        <div className="rounded-[5px] border-[1.5px] border-[#4169E1] font-normal transition-all duration-1000 ease-in">
            <div className="flex flex-wrap gap-x-3 p-4 items-center">
                <div>
                    <input type="checkbox" checked={props.isSelected} onChange={props.onSelect} className="rounded-[100%]"></input>
                </div>
                <div className="flex flex-wrap gap-x-1 gap-y-4">
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
            {isopen && (<div>
                <div className="grid grid-cols-3 justify-items-center mx-auto font-semibold">
                    <div onClick={HandleExpansionData} id="features" className={selectedexpansion==="features"?"border-b-[2px] border-[#4169E1] px-3 pb-1 cursor-pointer":"cursor-pointer"}>Features</div>
                    <div onClick={HandleExpansionData} id="document" className={selectedexpansion==="document"?"border-b-[2px] border-[#4169E1] px-3 pb-1 cursor-pointer":"cursor-pointer"}>Eligibilty/Documents</div>
                    <div onClick={HandleExpansionData} id="fees" className={selectedexpansion==="fees"?"border-b-[2px] border-[#4169E1] px-3 pb-1 cursor-pointer":"cursor-pointer"}>Fees</div>
                </div>
                <div className="mt-2 w-[95%] h-[1px] mx-auto bg-[#C8DCF9]"></div>
                <div className="mt-3">
                    <table className="ml-5"><tbody>
                        {Object.entries(expanddata).map(([key, val]) => {
                            return (<tr>
                                <td className="px-2">{key}</td>
                                <td className="px-2 text-[#4169E1] font-semibold">{val}</td>
                            </tr>)
                        })}
                    </tbody>
                    </table>
                </div>
            </div>)}
            <div onClick={HandleExpand} className="pt-2 pb-3 cursor-pointer flex mx-auto flex-col justify-center items-center text-[14px] font-bold text-[#676767]">
                {details}
            </div>
        </div>
    )
}

export default LoanMasterCard;