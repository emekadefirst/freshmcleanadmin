import DashboardTemp from "./DashboardTemp";
import {
  faChevronDown,
  // faBell,
  faXmark,
  faMagnifyingGlass,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FirstFrame from "./Media/firstframe.png";
import SecondFrame from "./Media/secondframe.png";
import TwoMore from "./Media/twomore.png";
import { useEffect } from 'react';



function PendingPop() {

    useEffect(() => {
        const disableScroll = () => {
          window.scrollTo(0, 0);
        };
    
        // Add event listener to disable scrolling
        window.addEventListener('scroll', disableScroll);
    
        // Cleanup the event listener when the component is unmounted
        return () => {
          window.removeEventListener('scroll', disableScroll);
        };
      }, []); // Empty dependency array ensures that this effect runs once on mount
    


      
  return (
    <>
      <div >
        <DashboardTemp
          AltNav={true}
          Color1="#3DA5EC"
          tempColor1="black"
          ValueInText1={75}
          NavText="Cleaning Requests"
          showAdditionalDiv2={true}
          showAdditionalDiv4={true}
          COLOR="opacity-50"
          
        />
        {/* {showAdditionalDiv4 && ( */}
        <div className="w-1/3 h-screen-1 bg-white p-8 z-30 top-20 absolute left-1/3 rounded-lg">
          <div>
          <FontAwesomeIcon
                icon={faXmark}
                className="border cursor-pointer border-black py-2 px-3  rounded-2xl font-semibold float-right"
              />
            <p className="font-semibold text-xl">Cleaning details</p>
          </div>
          <div className="text-sm">
            <div className="mt-5">
              <p className="font-semibold float-right ">Home</p>
              <p>Cleaning location</p>{" "}
            </div>

            <div className="mt-5">
              <p className="font-semibold float-right ">Regular cleaning</p>
              <p className="">Cleaning type</p>
            </div>
            <div className="mt-5">
              <p className="font-semibold float-right ">26 of October 2023</p>
              <p className="">Date</p>
            </div>
            <div className="mt-5">
              <p className="font-semibold float-right ">123 Maple Street</p>
              <p className="">Address</p>
            </div>
            <div className="mt-5">
              <p className="font-semibold float-right ">10:00AM</p>
              <p className="">Time</p>
            </div>
            <div className="mt-5">
              <p className="font-semibold float-right ">
                Please focus on kitchen...{" "}
                <span className="text-gray-400">read more</span>
              </p>
              <p className="">Special instruction</p>
            </div>
            <div className="mt-5">
              <p className="font-semibold float-right ">Home</p>
              <p className="">Special request</p>
            </div>
            <div className="mt-5">
              <div className="flex space-x-2 float-right">
                <img src={FirstFrame} className="w-10" />
                <img src={SecondFrame} className="w-10" />
                <img src={TwoMore} className="w-10" />
              </div>
              <p className="">Uploaded photos</p>
            </div>
          </div>
          <button className="px-36 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
            Send Job alert
          </button>
        </div>
        {/* )} */}
        <div></div>
      </div>
    </>
  );
}

export default PendingPop;
