/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import CleanersDbTemp from "./CleanersDbTemp";

import {
  // faChevronDown,
  // faBell,
  faXmark,
  // faMagnifyingGlass,
  // faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReviewPop() {
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
  //   }, []);


    


  return (
    <>
      <div >
        <CleanersDbTemp
          InitNav={true}
          Color3="#3DA5EC"
          tempColor3="white"
          ValueInText3={75}
          NavText="Piers morgan"
          WelcomeText="Welcome"
          showAdditionalDiv1={true}
          
        />
        <div className="overflow-scroll">
          <div className="w-[40%] h-screen-1 bg-white p-8 z-50 top-0 absolute left-[55%] ml-16 rounded-lg">
            <div className="">
              <FontAwesomeIcon
                icon={faXmark}
                className="border cursor-pointer border-black py-2 px-3  rounded-2xl font-semibold float-right"
              />
              {/* <p className="font-semibold text-xl">Cleaning details</p> */}
            </div>
            <p className="mb-24 text-center ml-40 relative top-12 py-2 w-36 rounded-3xl bg-blue-100 text-[#068EEB]">Samson James</p>
            <div className="text-center mb-10">
              <p className="font-semibold">Professionalism</p>
              <p className="text-sm">
                Howprofessionally did the customer interact during the service?
              </p>

              <div className="flex space-x-5 mt-1">
                <div className="relative -left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold ">Excellent</label>&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Good</label>{" "}
                  &nbsp;&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Average</label>
                  &nbsp;&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Below Expectation</label>
                </div>
              </div>
            </div>
            <div className="text-center mb-10">
              <p className="font-semibold">Communication</p>
              <p className="text-sm">
                Howprofessionally did the customer interact during the service?
              </p>

              <div className="flex space-x-5 mt-1">
                <div className="relative -left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold ">Excellent</label>&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Good</label>{" "}
                  &nbsp;&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Average</label>
                  &nbsp;&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Poor</label>
                </div>
              </div>
            </div>
            <div className="text-center mb-10">
              <p className="font-semibold">Hospitality</p>
              <p className="text-sm">
                Howprofessionally did the customer interact during the service?
              </p>

              <div className="flex space-x-5 mt-1">
                <div className="relative -left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold ">Excellent</label>&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Good</label>{" "}
                  &nbsp;&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Average</label>
                  &nbsp;&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Below Expectation</label>
                </div>
              </div>
            </div>
            <div className="text-center mb-10">
              <p className="font-semibold">Cooperation</p>
              <p className="text-sm">
                Howprofessionally did the customer interact during the service?
              </p>

              <div className="flex space-x-5 mt-1">
                <div className="relative -left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold ">Excellent</label>&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Good</label>{" "}
                  &nbsp;&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Average</label>
                  &nbsp;&nbsp;
                </div>
                <div className="relative left-1">
                  <input type="radio" className="" />
                  <label className="ml-2 font-semibold">Below Expectation</label>
                </div>
              </div>
              <div></div>
            </div>
            <div className="text-center">
              <p className="font-semibold">Additional notes(Optional)</p>
              <textarea className="focus:outline-none bg-gray-200 h-60 w-[100%] p-2 border rounded-md" />
            </div>
            <button className="px-[44.5%] py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewPop;
