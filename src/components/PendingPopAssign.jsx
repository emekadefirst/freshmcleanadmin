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



function PendingPopAssign() {

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
      <div>
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
        {/* {showAdditionalDiv15 && ( */}
          <div className="w-1/3 h-screen-1 bg-white p-8 z-30 top-40 absolute left-1/3 rounded-lg">
            <div>
              <FontAwesomeIcon
                icon={faXmark}
                className="border py-2 px-3 cursor-pointer border-black  rounded-3xl font-semibold float-right"
              />
              <p className="font-semibold text-xl">Assign Job</p>
            </div>
            <label className="flex items-center px-3 py-4 bg-blue-100 rounded-lg border-2 border-blue-400 mt-5">
              <span className="ml-2">Forward job to all cleaners</span>
              <input
                type="radio"
                className="form-checkbox relative left-5 text-blue-500 h-5 w-5 rounded-2xl ml-28"
              />
            </label>
            <label className="flex items-center px-3 py-4 bg-blue-100 rounded-lg border-2 border-blue-400 mt-5">
              <span className="ml-2">Forward job to all cleaners</span>
              <input
                type="radio"
                className="form-checkbox relative left-5 text-blue-500 h-5 w-5 rounded-full ml-28"
              />
            </label>
            <button className="px-40 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
              Forward
            </button>
          </div>
        {/* )} */}
        <div></div>
      </div>
    </>
  );
}

export default PendingPopAssign;
