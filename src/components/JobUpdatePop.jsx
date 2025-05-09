import CleanersDbTemp from "./CleanersDbTemp";
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
import { useEffect } from "react";

function JobUpdatePop() {
  useEffect(() => {
    const disableScroll = () => {
      window.scrollTo(0, 0);
    };

    // Add event listener to disable scrolling
    window.addEventListener("scroll", disableScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", disableScroll);
    };
  }, []); // Empty dependency array ensures that this effect runs once on mount

  return (
    <>
      <div>
        <CleanersDbTemp
          AltNav={true}
          Color1="#3DA5EC"
          tempColor1="black"
          ValueInText1={75}
          NavText="Cleaning Requests"
          showAdditionalDiv2={true}
          //   showAdditionalDiv4={true}
          COLOR="opacity-50"
        />
        {/* {showAdditionalDiv4 && ( */}
        <div className="w-1/3 h-screen-1 bg-white p-8 z-30 top-20 absolute left-1/3 rounded-lg">
          <div>
            <FontAwesomeIcon
              icon={faXmark}
              className="border cursor-pointer border-black py-2 px-3  rounded-2xl font-semibold float-right"
            />
            <p className="font-semibold text-xl mb-10">Reason(s)</p>
          </div>
          <div className="text-sm">
            <label className="">Cause for declining the job offer</label>
            <br />
            <textarea className="w-96 h-40 mt-4 text-black placeholder:text-black bg-gray-50 focus:outline-none pl-5 pt-5 border rounded-md" placeholder="Unfortunately, my schedule is fully booked for the requested date and time, and I won't be able to accommodate this job without compromising the quality of service for existing commitments. Apologies for any inconvenience caused." />
          </div>
          <button className="px- w-[100%] py-2 text-white bg-blue-500 whitespace-nowrap mt-12 focus:outline-none rounded-lg">
            Submit{" "}
          </button>
        </div>
        {/* )} */}
        <div></div>
      </div>
    </>
  );
}

export default JobUpdatePop;
