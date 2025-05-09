/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
// import React from 'react'
// import Logo from "./Media/KleanUp.png";
// import Profile from "./Media/profile.png";
// import Notification from "./Media/notification.png";
// import Home from "./Media/home.png";
// import Avatar from "./Media/avatar.png";
// import Rating from "./Media/rating.png";
// import NotificationIcon from "./Media/notificationIcon.png";
// import Timetracking from "./Media/timetracking.png";
// import Review from "./Media/review.png";
// import Financial from "./Media/financial.png";
// import Customer from "./Media/customer.png";
// import Analytics from "./Media/analytics.png";
// import DropdownMenuAdmin from "./DropdownMenuAdmin";

import Logout from "./Media/logout.png";
import { Link } from "react-router-dom";
import Play from "./Media/play.png";
// import Planselector from "./Planselector";
// import Calender from "./Calender";

// import  from './Media/'
// import  from './Media/'
// import { Link } from 'react-router-dom';

import {
  faChevronDown,
  // faBell,
  faBars,
  faClose,
  faXmark,
  faMagnifyingGlass,
  faArrowLeft,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CleanersDbTemp({
  showAdditionalDiv,
  showAdditionalDiv1,
  showAdditionalDiv2,
  showAdditionalDiv3,
  showAdditionalDiv4,
  showAdditionalDiv5,
  showAdditionalDiv6,
  WelcomeText,
  NavText,
  AltNav,
  InitNav,
  Color,
  tempColor,
  Color1,
  tempColor1,
  Color2,
  tempColor2,
  Color3,
  tempColor3,
  Color4,
  tempColor4,
  Color5,
  tempColor5,
  Color6,
  tempColor6,
  Color7,
  tempColor7,
  ValueInText,
  ValueInText1,
  ValueInText2,
  ValueInText3,
  ValueInText4,
  ValueInText5,
  ValueInText6,
  ValueInText7,
  COLOR,
  opacityValue,
}) {
  const myCustomColor = "#FAFAFA";
  // const myCustomColor1 = "red";
  // const myCustomColor2 = "lightblue";
  const myCustomColor2 = "#019B23";
  const myCustomColor4 = "#3DA5EC";

  const [showScrollbar, setShowScrollbar] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the scrollbar after 5 seconds (adjust the time as needed)
    const timeoutId = setTimeout(() => {
      setShowScrollbar(false);
    }, 5000); // 5000 milliseconds = 5 seconds

    // Clear the timeout when the component unmounts or if needed in other cases
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

  const [openMenu, setOpenMenu] = useState(false);
  const [showCloseMenu, setShowCloseMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    setShowCloseMenu(!showCloseMenu);
  };

  const openMenuRef = useRef(null);
  // const menuIconRef = useRef(null);

  useEffect(() => {
    function clickOut(event) {
      if (openMenuRef.current && !openMenuRef.current.contains(event.target)) {
        setOpenMenu(false);
        setShowCloseMenu(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", clickOut);

    // Unbind the event listener on cleanup
    return () => {
      document.removeEventListener("mousedown", clickOut);
    };
  }, []);

  const [isInputVisible, setIsInputVisible] = useState(false);
  const inputRef = useRef();

  const toggleInputVisibility = () => {
    setIsInputVisible(!isInputVisible);
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsInputVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  return (
    <>
      <div className={`overflow-x-hidden ${COLOR} opacity-${opacityValue}`}>
        <div className="fixed lg:block hidden ">
          <div
            className="w-80 h-screen pb-20 absolute bg-white "
          >
            <img
              className="h-8 w-28 ml-14 mt-12 relative -top-5 object-contain"
              src={Logo}
            />

            <div
              className={`ml-10 h-screen mt-4  overflow-x-hidden ${
                showScrollbar ? "" : "overflow-hidden"
              }`}
            >
              <div className="text-gray-500">
                <Link to="/CleanersHome">
                  <img
                    src={Home}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText})`,
                    }}
                  />

                  <a
                    href=""
                    className="p-2 pl-12 px-48 py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color, color: tempColor }}
                  >
                    Home
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/TimeTracking">
                  <img
                    src={Timetracking}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText2})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-10 px-28 py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color2, color: tempColor2 }}
                  >
                    Time tracking
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/Reviews">
                  <img
                    src={Review}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText3})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-11 px-40 py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color3, color: tempColor3 }}
                  >
                    Review & Rating
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3 ">
                <Link to="/JobUpdates">
                  <img
                    src={NotificationIcon}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText4})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-11 px-32  py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color4, color: tempColor4 }}
                  >
                    Job updates{" "}
                    <span className="relative left-28 px-1 text-xs bg-red-600 rounded-xl text-white">
                      5
                    </span>
                  </a>
                </Link>
              </div>

              <div className="relative  -top-10 w-64 left-3 ">
                <Link to="/JobUpdates">
                  <img
                    src={Logout}
                    className="w-1/12 h- relative z-10 left-12 filter brightness-75 saturate-125"
                    style={{ top: "228px" }}
                  />
                  <a
                    href=""
                    className="p-2 pl-20 text-center font-semibold relative top-52 px-20 py-3 whitespace-nowrap rounded-xl"
                    style={{ backgroundColor: myCustomColor }}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <nav
          className="ml-1/3 z-50 bg-white lg:left-80 fixed lg:h-16 h-40 p-4 lg:p-7 lg:pt-3  w-screen "
        >
          <div className="relative lg:hidden z-40 ">
            {showCloseMenu ? (
              <FontAwesomeIcon
                className="text-black h-6 z-10"
                icon={faClose}
                onClick={toggleMenu}
              />
            ) : (
              <FontAwesomeIcon
                className="text-black h-6 z-20"
                icon={faBars}
                onClick={toggleMenu}
              />
            )}
            {openMenu && (
              <div
                className="fixed top-0 left-0 w-[100%] h-[100%] bg-black opacity-70   via-transparent from-gray-100 to-gray-100"
                onClick={toggleMenu}
              />
            )}
            <div className="z-10 absolute right-40 md:right-[70%]">
              {openMenu && <DropdownMenuAdmin />}
            </div>
          </div>
          {/* Toogle Menu end */}
          {InitNav && (
            <div className="relative lg:-top-1 top-10 right-4 ml-5">
              <p>{WelcomeText}</p>
              <h1 className="font-semibold text-lg">{NavText}</h1>
            </div>
          )}
          {AltNav && (
            <div className="relative lg:-top-1 top-20 right-4 ml-5">
              <p>{WelcomeText}</p>
              <h1 className="font-semibold text-lg mt-6 -top-6 -ml-1 lg:-ml-0 lg:-top-3 relative">
                {NavText}
              </h1>
            </div>
          )}
          <img
            className="lg:hidden h-8 w-20 ml-16 mt-12 relative md:ml-20 -top-32 right-9 object-contain"
            src={Logo}
          />

          <div className="flex relative -top-40 left-[25%] md:left-[65%] ml-10 lg:left-1/3 w-20 lg:-top-14 mt-2 ">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              onClick={toggleInputVisibility}
              className="lg:-mr-10  relative left-12 text-lg lg:text-sm lg:mt-3 z-50 text-gray-500"
            />
            {isInputVisible && (
             <div> <input
                placeholder="Search"
                
                type="search"
                className=" z-50  px-6 -mt-3 h-9  relative -left-5 rounded-md focus:outline-none "
                style={{ backgroundColor: myCustomColor }}
              /></div>
            )}
              <input
                placeholder="Search"
                type="search"
                className="lg:block hidden px-16 h-9 mr-10 pl-8 relative left-16 rounded-md focus:outline-none "
                style={{ backgroundColor: myCustomColor }}
              />

            <div className="flex w-96 space-x-2 justify-center items-center relative left-24 -top-2 ">
              <img src={Notification} className="h-5 w-1/2" />
              <sup className="bg-red-600 right-2 -top-3 text-white relative py-2 px-1 rounded-2xl">
                1
              </sup>
              <img
                src={Profile}
                className="lg:w-96 lg:h-3/4 w-9 relative left-"
              />
              <FontAwesomeIcon
                icon={faChevronDown}
                className="text-sm relative left-2 cursor-pointer"
              />
            </div>
          </div>
        </nav>

        {showAdditionalDiv && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative left-6 ">
              <p className="cursor-pointer text-white text-center bg-blue-600 float-right lg:-left-96 py-3 fixed lg:mt-0 -mt-32 z-50 left-48 md:left-[75%] lg:relative w-44 whitespace-nowrap font-semibold rounded-lg">
                Manage requests
              </p>
            </div>
            <div className="relative lg:top-52 top-32 left-5 lg:left-10 lg:flex lg:space-x-6 ">
              <div className="px-24 bg-white w-[88%] lg:w-[25.6%] rounded-xl py-8 ">
                <p className="whitespace-nowrap relative right-16 -top-2 text-xs">
                  Completed requests
                </p>
                <h1 className="text-blue-300 relative right-16 text-2xl font-semibold">
                  06
                </h1>
              </div>
              <div className="px-24 bg-white w-[88%] lg:w-[25.6%] rounded-xl py-8 lg:mt-0 mt-5">
                <p className="whitespace-nowrap relative right-16 -top-2 text-xs">
                  Pending requests
                </p>
                <h1 className="text-blue-300 relative right-16 text-2xl font-semibold">
                  08
                </h1>
              </div>
              <div className="px-24 lg:px-20 bg-white w-[88%] lg:w-[25.6%] rounded-xl py-8 lg:mt-0 mt-5">
                <p className="whitespace-nowrap text-xs right-16 relative -top-2">
                  Upcoming scheduled cleaning
                </p>
                <h1 className="text-blue-300 text-2xl right-16 relative font-semibold">
                  12
                </h1>
              </div>
            </div>
            <div className="bg-white overflow-scroll lg:overflow-visible lg:w-screen-3 left-5 lg:left-10 mr-7 lg:pl-4 pt-9 relative top-64 ">
              <h1 className="font-semibold text-lg">Cleaning History</h1>
              <div
                className="flex mt-9 space-x-32 relative font-semibold py-3 px-4 w-screen-4 lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap">Client Name</p>
                <p className="whitespace-nowrap relative -left-10">
                  Date of service
                </p>
                <p className="whitespace-nowrap relative right-20">Duration</p>
                <p className="whitespace-nowrap relative right-24">
                  Payment status
                </p>
                {/* <p className="relative -left-32 whitespace-nowrap">Address</p> */}
                <p className="relative right-28 whitespace-nowrap">Rating</p>
              </div>

              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-green-400 font-semibold px-2 bg-green-50 rounded-xl relative right-8">
                  Paid
                </p>
                <img src={Rating} className="w-24 h-5 relative left-8" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-red-600 font-semibold px-2 bg-red-50 rounded-xl relative right-8">
                  Cancelled
                </p>
                <img src={Rating} className="w-24 h-5 relative -left-2" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-blue-400 font-semibold px-2 bg-blue-50 rounded-xl relative right-8">
                  Pending
                </p>
                <img src={Rating} className="w-24 h-5 relative left-1" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-red-600 font-semibold px-2 bg-red-50 rounded-xl relative right-8">
                  Cancelled
                </p>
                <img src={Rating} className="w-24 h-5 relative -left-2" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-green-400 font-semibold px-2 bg-green-50 rounded-xl relative right-8">
                  Paid
                </p>
                <img src={Rating} className="w-24 h-5 relative left-8" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-blue-400 font-semibold px-2 bg-blue-50 rounded-xl relative right-8">
                  Pending
                </p>
                <img src={Rating} className="w-24 h-5 relative left-1" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-blue-400 font-semibold px-2 bg-blue-50 rounded-xl relative right-8">
                  Pending
                </p>
                <img src={Rating} className="w-24 h-5 relative left-1" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-red-600 font-semibold px-2 bg-red-50 rounded-xl relative right-8">
                  Cancelled
                </p>
                <img src={Rating} className="w-24 h-5 relative -left-2" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-blue-400 font-semibold px-2 bg-blue-50 rounded-xl relative right-8">
                  Pending
                </p>
                <img src={Rating} className="w-24 h-5 relative left-1" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-green-400 font-semibold px-2 bg-green-50 rounded-xl relative right-8">
                  Paid
                </p>
                <img src={Rating} className="w-24 h-5 relative left-8" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-red-600 font-semibold px-2 bg-red-50 rounded-xl relative right-8">
                  Cancelled
                </p>
                <img src={Rating} className="w-24 h-5 relative -left-2" />
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-9 whitespace-nowrap">21st July</p>
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative right-4 whitespace-nowrap">7AM - 3PM</p>
                <p className="text-green-400 font-semibold px-2 bg-green-50 rounded-xl relative right-8">
                  Paid
                </p>
                <img src={Rating} className="w-24 h-5 relative left-8" />
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv1 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm">
                <Link to="/Reviews">
                  <p className="cursor-pointer px-5 rounded-md py-2 relative -top-2 bg-white">
                    Rate client
                  </p>
                </Link>
                <Link to="/OwnRating">
                  <p className="cursor-pointer text-gray-400">
                    View own ratings
                  </p>
                </Link>
              </div>
            </div>
            <div className="bg-white h-screen-3 lg:w-screen-3 overflow-x-scroll left-5 mr-7 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Rate client</h1>
              <div
                className="flex mt-9 space-x-80 relative font-semibold py-3 px-4 w-screen-4 lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap">Client Name</p>
                {/* <p className="whitespace-nowrap relative -left-10">
                  Date of service
                </p> */}
                <p className="whitespace-nowrap relative right-20">
                  Service type
                </p>
                {/* <p className="whitespace-nowrap relative right-24">
                  Payment status
                </p> */}
                {/* <p className="relative -left-32 whitespace-nowrap">Address</p> */}
                <p className="relative right-28 whitespace-nowrap">Action</p>
              </div>

              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-28 whitespace-nowrap">
                  Regular cleaning<span className="text-white">.</span>
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-64 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-36 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-20 whitespace-nowrap">
                  Office cleaning{" "}
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-52 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-28 whitespace-nowrap">
                  Regular cleaning<span className="text-white">.</span>
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-64 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-28 whitespace-nowrap">
                  Regular cleaning<span className="text-white">.</span>
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-64 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-36 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-20 whitespace-nowrap">
                  Office cleaning{" "}
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-52 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-36 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-20 whitespace-nowrap">
                  Office cleaning{" "}
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-52 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-28 whitespace-nowrap">
                  Regular cleaning<span className="text-white">.</span>
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-64 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-28 whitespace-nowrap">
                  Regular cleaning<span className="text-white">.</span>
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-64 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-28 whitespace-nowrap">
                  Regular cleaning<span className="text-white">.</span>
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-64 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-36 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-20 whitespace-nowrap">
                  Office cleaning{" "}
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-52 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-28 whitespace-nowrap">
                  Regular cleaning<span className="text-white">.</span>
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-64 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
              <div className="flex mt-1 space-x-28 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                {/* <p className="relative right-9 whitespace-nowrap">21st July</p> */}
                {/* <p className="relative left-7">123 Maple Street...</p> */}
                <p className="relative left-28 whitespace-nowrap">
                  Regular cleaning<span className="text-white">.</span>
                </p>
                <p className="text-white font-semibold px-2 py-1 bg-blue-500 rounded-lg relative left-64 cursor-pointer">
                  Rate client
                </p>
                {/* <img src={Rating} className="w-24 h-5 relative left-8"/> */}
              </div>
            </div>
          </div>
        )}
        {showAdditionalDiv2 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 h-60 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm">
                <Link to="/JobUpdates">
                  <p className="cursor-pointer px-5 rounded-md py-2 relative -top-2 bg-white">
                    Inbox
                  </p>
                </Link>
                <Link to="/JobUpdates">
                  <p className="cursor-pointer text-gray-400">
                    Job Progress updates
                  </p>
                </Link>
              </div>
            </div>
            <div className=" w-screen-3 lg:left-10 pl-4 pt-9 relative -40">
              <div className="flex lg:flex-nowrap flex-wrap gap-5 lg:flex-col">
                <div className="flex lg:flex-nowrap flex-wrap relative left-[1%] lg:left-0 gap-6">
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4  bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap  text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                </div>

                <div className="flex lg:flex-nowrap flex-wrap gap-6">
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                </div>

                <div className="flex lg:flex-nowrap flex-wrap gap-6">
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                </div>

                <div className="flex lg:flex-nowrap flex-wrap gap-6">
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                  <div className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6">
                    <p className="font-semibold whitespace-nowrap text-lg">
                      New cleaning Request Received
                    </p>
                    <sup>2 hours ago</sup>
                    <p>Client: John Smith</p>
                    <p>Address: 123 Maple Street</p>
                    <p>Service: Full house Cleaning</p>
                    <p>Scheduled: Tomorrow, 10:00AM</p>

                    <button className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg">
                      View details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAdditionalDiv3 && (
          <div
            className="mb-12 z-30 relative left-80"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 h-60 relative left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm">
                <Link to="/Reviews">
                  <p className="cursor-pointer text-gray-400">Rate client</p>
                </Link>
                <Link to="/OwnRating">
                  <p className="cursor-pointer px-5 rounded-md py-2 relative -top-2 bg-white">
                    View own ratings
                  </p>
                </Link>
              </div>
            </div>
            <div className=" w-screen-3 left-10 pl-4 pt-9 relative -40">
              <div className="bg-white p-4 pl-6 w-[104%] right-7 relative">
                <div className="flex space-x-4">
                  <img className="w-12" src={Avatar} />
                  <div>
                    <p className="font-semibold">Maryan clark</p>
                    <sup>21st July, 2023</sup>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-7 mt-9">
                    <div className="whitespace-nowrap">
                      <p className="font-semibold">Professionalism</p>
                      <p className="text-sm mt-1">
                        Rating for professionalism received
                      </p>
                      <img className="w-28 mt-2" src={Rating} />
                    </div>

                    <div className="whitespace-nowrap">
                      <p className="font-semibold">Professionalism</p>
                      <p className="text-sm mt-1">
                        Rating for professionalism received
                      </p>
                      <img className="w-28 mt-2" src={Rating} />
                    </div>

                    <div className="whitespace-nowrap">
                      <p className="font-semibold">Professionalism</p>
                      <p className="text-sm mt-1">
                        Rating for professionalism received
                      </p>
                      <img className="w-28 mt-2" src={Rating} />
                    </div>

                    <div className="whitespace-nowrap">
                      <p className="font-semibold">Professionalism</p>
                      <p className="text-sm mt-1">
                        Rating for professionalism received
                      </p>
                      <img className="w-28 mt-2" src={Rating} />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="font-semibold">Client comment(s)</p>
                    <p className="text-xs p-4 border border-gray-500 mt-3 rounded-xl">
                      Excellent service! The cleaner was very professional and
                      thorough in their work. Would highly recommend and will
                      definitely book again.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 pl-6 mt-5 right-7 relative w-[104%]">
                <div className="flex space-x-4">
                  <img className="w-12" src={Avatar} />
                  <div>
                    <p className="font-semibold">Maryan clark</p>
                    <sup>21st July, 2023</sup>
                  </div>
                </div>
                <div>
                  <div className="flex space-x-7 mt-9">
                    <div className="whitespace-nowrap">
                      <p className="font-semibold">Professionalism</p>
                      <p className="text-sm mt-1">
                        Rating for professionalism received
                      </p>
                      <img className="w-28 mt-2" src={Rating} />
                    </div>

                    <div className="whitespace-nowrap">
                      <p className="font-semibold">Professionalism</p>
                      <p className="text-sm mt-1">
                        Rating for professionalism received
                      </p>
                      <img className="w-28 mt-2" src={Rating} />
                    </div>

                    <div className="whitespace-nowrap">
                      <p className="font-semibold">Professionalism</p>
                      <p className="text-sm mt-1">
                        Rating for professionalism received
                      </p>
                      <img className="w-28 mt-2" src={Rating} />
                    </div>

                    <div className="whitespace-nowrap">
                      <p className="font-semibold">Professionalism</p>
                      <p className="text-sm mt-1">
                        Rating for professionalism received
                      </p>
                      <img className="w-28 mt-2" src={Rating} />
                    </div>
                  </div>
                  <div className="mt-8">
                    <p className="font-semibold">Client comment(s)</p>
                    <p className="text-xs p-4 border border-gray-500 mt-3 rounded-xl">
                      Excellent service! The cleaner was very professional and
                      thorough in their work. Would highly recommend and will
                      definitely book again.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv4 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm">
                {/* <Link to="/CleaningRequest">
                  <p className="cursor-pointer text-gray-400">
                    Completed requests
                  </p>
                </Link> */}
                {/* <Link to="/PendingRequest">
                  <p className="cursor-pointer text-gray-400">
                    Pending requests{" "}
                  </p>
                </Link> */}
                <Link to="/TimeTracking">
                  <p className="cursor-pointer px-5 bg-white py-2  rounded-md relative -top-2">
                    Timers
                  </p>
                </Link>
                <Link to="/TimeStamps">
                  <p className="cursor-pointer text-gray-400">Time stamps</p>
                </Link>
              </div>
            </div>
            <div className="bg-white h-screen-3 lg:w-screen-3 overflow-x-scroll left-5 mr-7 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Time tracking</h1>
              <div
                className="flex mt-9 space-x-24 relative font-semibold py-3 px-4 w-screen-4 lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap">Client Name</p>
                <p className="whitespace-nowrap relative -left-14">
                  Date of request
                </p>
                <p className="relative -left-28 whitespace-nowrap">Address</p>
                <p className="relative right-28 whitespace-nowrap">
                  Billing per Hour
                </p>
                <p className="whitespace-nowrap relative right-36">
                  Start to stop time
                </p>
                <p className="whitespace-nowrap relative right-44">Timer</p>
              </div>

              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-24 lg:left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv6 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm">
                {/* <Link to="/CleaningRequest">
                  <p className="cursor-pointer text-gray-400">
                    Completed requests
                  </p>
                </Link> */}
                {/* <Link to="/PendingRequest">
                  <p className="cursor-pointer text-gray-400">
                    Pending requests{" "}
                  </p>
                </Link> */}
                <Link to="/TimeTracking">
                  <p className="cursor-pointer text-gray-400">Timer</p>
                </Link>
                <Link to="/TimeStamps">
                  <p className="cursor-pointer px-5 bg-white py-2  rounded-md relative -top-2">
                    Time stamps
                  </p>
                </Link>
              </div>
            </div>
            <div className="bg-white h-screen-3 lg:w-screen-3 overflow-x-scroll left-5 mr-7 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Time stamps</h1>
              <div
                className="flex mt-9 space-x-24 relative font-semibold py-3 px-4 w-screen-4 lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap relative -left">Time stamps</p>
                <p className="whitespace-nowrap relative -left-[57px]">
                  Client Name
                </p>
                <p className="relative -left-28 whitespace-nowrap">Address</p>
                <p className="relative right-28 whitespace-nowrap">
                  Service type
                </p>
                <p className="whitespace-nowrap relative right-36">
                  Special instruction
                </p>
                <p className="whitespace-nowrap relative right-44">Status</p>
              </div>

              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap  text-sm">
                <p className="relative right-3 whitespace-nowrap">
                  11/5/2023 8:00.00
                </p>
                <p className="whitespace-nowrap relative -left-9">
                  Samson James
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
              <div className="flex mt-1 space-x-10 relative py-3 px-4 whitespace-nowrap">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-3 whitespace-nowrap">
                  21st July, 2023
                </p>
                <p className="relative -left-2">123 Maple Street...</p>
                <p className="relative -left-5 whitespace-nowrap">$30</p>
                <p className="relative left-24 whitespace-nowrap">3PM to 5PM</p>
                <p className="font-semibold px-3 w-24 rounded-xl py-1 relative left-36">
                  00:00:00
                </p>
                <img
                  className="w-3 h-3 relative left-[5.4pc] top-[11px]"
                  src={Play}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CleanersDbTemp;
