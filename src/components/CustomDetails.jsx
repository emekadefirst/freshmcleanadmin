/* eslint-disable no-unused-vars */
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
import { Link } from "react-router-dom";


function PendingPop() {

    const myCustomColor = "#FAFAFA";
    // const myCustomColor2 = "#019B23";
  
    // useEffect(() => {
    //     const disableScroll = () => {
    //       window.scrollTo(0, 0);
    //     };
    
    //     // Add event listener to disable scrolling
    //     window.addEventListener('scroll', disableScroll);
    
    //     // Cleanup the event listener when the component is unmounted
    //     return () => {
    //       window.removeEventListener('scroll', disableScroll);
    //     };
    //   }, []); // Empty dependency array ensures that this effect runs once on mount
    

      
  return (
    <>
      <div>
        <DashboardTemp 
          AltNav={true}
          Color5="#3DA5EC"
          tempColor5="black"
          ValueInText5={75}
          NavText="Customer support"
          showAdditionalDiv19={true}
        //   showAdditionalDiv4={true}
          COLOR="opacity-50"
        />
        {/* {showAdditionalDiv4 && ( */}
        <div className="w-1/3 h-screen-1 bg-white p-8 z-30 top-20 absolute left-1/3 rounded-lg">
          <div>
          <Link to="/ComplaintResolution">
          <FontAwesomeIcon
                icon={faXmark}
                className="border cursor-pointer border-black py-2 px-3  rounded-2xl font-semibold float-right"
              />
              </Link>
            {/* <p className="font-semibold text-xl">Cleaning details</p> */}
          </div>
          <div className="text-sm">
          <div
                  className="w-96 mt-14 rounded-lg border-2 p-5"
                  style={{ backgroundColor: myCustomColor }}
                >
                  <div>
                    <p className="font-semibold float-right">Samson james</p>
                    <p className="">Client name</p>
                  </div>

                  <div className="mt-5">
                  <p className="font-semibold float-right">#625379</p>
                    <p className="">Complaint ID</p>
                  </div>

                  <div className="mt-5">
                  <p className="font-semibold float-right">January 15, 2023.</p>
                    <p className="">Date</p>
                  </div>
                </div>
            <div className="mt-5">
            <p className="pb-2">Complaint description</p>
              <textarea  className="w-96 h-44 focus:outline-none rounded-lg border-2 p-5"
                  style={{ backgroundColor: myCustomColor }} placeholder="I hired your cleaning service for a deep clean of my apartment on January 10. Unfortunately, I noticed that some areas were not properly cleaned. The bathroom floors were still dirty, and the kitchen countertops were not wiped thoroughly. I was disappointed with the quality of the service provided."></textarea>
            <p className="pb-2 mt-3">Resolution</p>
              <textarea  className="w-96 h-44 focus:outline-none rounded-lg border-2 p-5"
                  style={{ backgroundColor: myCustomColor }} placeholder="Type in here"></textarea>
            </div>
            
          </div>
          <button className="px-32 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
            Resolve complaint
          </button>
        </div>
        {/* )} */}
        <div></div>
      </div>
    </>
  );
}

export default PendingPop;
