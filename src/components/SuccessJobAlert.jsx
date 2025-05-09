import DashboardTemp from "./DashboardTemp";
import {
  faChevronDown,
  // faBell,
  faXmark,
  faMagnifyingGlass,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Successcheck from "./Media/successcheck.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FirstFrame from "./Media/firstframe.png";
import SecondFrame from "./Media/secondframe.png";
import TwoMore from "./Media/twomore.png";
import { useEffect } from 'react';



function SuccessJobAlert() {

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
        {/* {showAdditionalDiv6 && ( */}
          <div className="w-1/3 h-screen-1 bg-white p-8 z-30 top-40 absolute left-1/3 rounded-lg">
            <div>
             
            </div>
            <img src={Successcheck} className="w-20 relative left-40 pb-3" />
            <h1 className="text-center font-semibold text-2xl">
              Job alert forwarded!
            </h1>
            <p className="w-96 text-center">
              All cleaners will receive immediate notifications upon the
              availablity of job openings
            </p>
            <button className="px-44 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
              Back
            </button>
          </div>
        {/* )} */}
        <div></div>
      </div>
    </>
  );
}

export default SuccessJobAlert;
