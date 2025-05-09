/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
// import React from 'react'
import Logo from "/assets/fresh-logo.png";
import Profile from "/assets/profile.png";
import Notification from "/assets/notification.png";
import Home from "/assets/home.png";
import Cleaning from "/assets/cleaning.png";
import User from "/assets/user.png";
import Play from "/assets/play.png";
import Schedule from "/assets/schedule.png";
import Financial from "/assets/financial.png";
import Customer from "/assets/customer.png";
import Analytics from "/assets/analytics.png";
import Account from "/assets/account.png";
import Logout from "/assets/logout.png";
import { Link } from "react-router-dom";
import Planselector from "./Planselector";
import Calender from "./Calender";
import DropdownMenu from "./DropdownMenu";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "./Modal";
import CategoryModal from "./CategoryModal";
import Dropdown from "./DropdownAssDuties";

// import  from './Media/'
// import  from './Media/'
// import { Link } from 'react-router-dom';

import {
  faChevronDown,
  faXmark,
  faBars,
  faClose,
  faMagnifyingGlass,
  faArrowLeft,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MiniLoader from "./preloader/mini-preloader";
import Signup from "./SignupPage";
import ServiceForm from "./ServiceForm";
import ServiceUploading from "./ServiceUploading";
import Application from "./Application";

function DashboardTemp({
  showAdditionalDiv,
  showAdditionalDiv1,
  showAdditionalDiv2,
  showAdditionalDiv3,
  showAdditionalDiv4,
  showAdditionalDiv5,
  showAdditionalDiv6,
  showAdditionalDiv7,
  showAdditionalDiv8,
  showAdditionalDiv9,
  showAdditionalDiv10,
  showAdditionalDiv11,
  showAdditionalDiv12,
  showAdditionalDiv13,
  showAdditionalDiv14,
  showAdditionalDiv15,
  showAdditionalDiv16,
  showAdditionalDiv17,
  showAdditionalDiv18,
  showAdditionalDiv19,
  showAdditionalDiv20,
  showAdditionalDiv21,
  showAdditionalDiv22,
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
  tempColor8,
  tempColor9,
  Color8,
  Color9,
  ValueInText,
  ValueInText1,
  ValueInText2,
  ValueInText3,
  ValueInText4,
  ValueInText5,
  ValueInText6,
  ValueInText7,
  ValueInText8,
  ValueInText9,
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
    }, 1000); // 5000 milliseconds = 5 seconds

    // Clear the timeout when the component unmounts or if needed in other cases
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once

  const [openMenu, setOpenMenu] = useState(false);
  const [showCloseMenu, setShowCloseMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState([]);
  const [statistics, setStatistics] = useState({
    completedOrders: 0,
    pendingOrders: 0,
    approvedOrders: 0,
    incompleteOrders: 0,
    totalSum: 0,
  });
  const [pricingData, setPricingData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "https://klean-up-server-hz1y.onrender.com/v1/api/orders",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();

    const fetchStatistics = async () => {
      try {
        const response = await axios.get(
          "https://klean-up-server-hz1y.onrender.com/v1/api/getOrderStatistics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching order statistics:", error);
      }
    };

    fetchStatistics();

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://klean-up-server-hz1y.onrender.com/v1/api/getAllPricings"
        );
        const data = await response.json();
        setPricingData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pricing data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  );
  // Filter pending orders
  const pendingOrders = orders.filter((order) => order.status === "incomplete");
  const approvedOrders = orders.filter((order) => order.status === "approved");
  const availableJobs = orders.filter((order) => order.status === "approved");

  // console.log(completedOrders);

  const [formData, setFormData] = useState({
    priceName: "",
    priceAmount: "",
    priceRange: "",
    priceItemName: "",
    priceItemPrice: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("priceName", formData.priceName);
    data.append("priceAmount", formData.priceAmount);
    data.append("priceRange", formData.priceRange);
    data.append("priceItemName", formData.priceItemName);
    data.append("priceItemPrice", formData.priceItemPrice);
    data.append("image", formData.image);

    try {
      const response = await fetch(
        "https://klean-up-server-hz1y.onrender.com/v1/api/createPricing",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();
      console.log(result);
      setLoading(false);

      if (response.ok) {
        toast.success("Pricing created successfully!");
      } else {
        toast.error("Failed to create pricing.");
      }
    } catch (error) {
      console.error("Error creating pricing:", error);
      setLoading(false);
      toast.error("An error occurred. Please try again.");
    }
  };
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

  const [customers, setCustomers] = useState([]);
  const [serviceCategories, setServiceCategories] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchServiceCategories();
    fetchService();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://klean-up-server-hz1y.onrender.com/v1/api/getAllCustomers"
      );
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchService = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://klean-up-server-hz1y.onrender.com/v1/api/services"
      );
      setServiceData(response.data.reverse());
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchServiceCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://klean-up-server-hz1y.onrender.com/v1/api/getAllServiceCategories"
      );
      setServiceCategories(response.data.reverse());
    } catch (error) {
      console.error("Error fetching service categories:", error);
    } finally {
      setLoading(false);
    }
  };
  const calculateTimeElapsed = (timestamp) => {
    const currentTime = new Date();
    const updatedTime = new Date(timestamp);
    const timeDifference = currentTime.getTime() - updatedTime.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hoursDifference} hours ago`;
  };

  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState({});

  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    // Save the updated info
    console.log("Updated Info:", userInfo);
    handleClose();
  };
  return (
    <>
      <ToastContainer />
      <div className={`overflow-x-hidden ${COLOR} opacity-${opacityValue}`}>
        <div className="fixed lg:block hidden">
          <div
            className="w-80 h-screen-3 pb-20 absolute   bg-white "
            // style={{ backgroundColor: myCustomColor1 }}
          >
            <img
              className="h-8 w-28 ml-14 mt-12 relative -top-5 object-contain"
              src={Logo}
            />

            <div
              className={`ml-10 mt-4 overflow-y-scroll overflow-x-hidden ${
                showScrollbar ? "" : "overflow-hidden"
              }`}
            >
              <div className="text-gray-500">
                <Link to="/WelcomeDashboard">
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
                <Link to="/CleaningRequest">
                  <img
                    src={Cleaning}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText1})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-11 px-20  py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color1, color: tempColor1 }}
                  >
                    Cleaning Requests{" "}
                    {/* <span className="relative left-16 px-1 text-xs bg-red-600 rounded-xl text-white">
                      5
                    </span> */}
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/UserManagement">
                  <img
                    src={User}
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
                    User management
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/Service">
                  <img
                    src={Cleaning}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText6})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-10 px-[65%] py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color6, color: tempColor6 }}
                  >
                    Services
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/ServiceCategory">
                  <img
                    src={Financial}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText8})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-10 px-28 py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color8, color: tempColor8 }}
                  >
                    Service Category
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/ScheduleOverview">
                  <img
                    src={Schedule}
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
                    Scheduling
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/FinancialManagement">
                  <img
                    src={Financial}
                    className="w-1/12 h- relative top-6 left-3 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText4})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-11 px-20 py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color4, color: tempColor4 }}
                  >
                    Financial management
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/CustomerSupport">
                  <img
                    src={Customer}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText5})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-11 px-28 py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color5, color: tempColor5 }}
                  >
                    Customer support
                  </a>
                </Link>
              </div>
              <div className="text-gray-500 pt-3">
                <Link to="/CleanerApplication">
                  <img
                    src={Analytics}
                    className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText9})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-11 px-28 py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color9, color: tempColor9 }}
                  >
                    Cleaner Application
                  </a>
                </Link>
              </div>
              {/* <div className="text-gray-500 pt-3">
                <Link to="/AnalyticsAndInsights">
                  <img
                    src={Analytics}
                    className="w-1/12 h- relative top-6 left-3 filter brightness-75 saturate-125"
                    style={{
                      filter: `saturate(1.25) brightness(${ValueInText6})`,
                    }}
                  />
                  <a
                    href=""
                    className="p-2 pl-9 px-24 py-3 whitespace-nowrap rounded-l-xl"
                    style={{ backgroundColor: Color6, color: tempColor6 }}
                  >
                    Analytics and insights
                  </a>
                </Link>
              </div> */}
              <div className="text-gray-500 pt-3">
                <img
                  src={Account}
                  className="w-1/12 h- relative top-6 left-4 filter brightness-75 saturate-125"
                  style={{
                    filter: `saturate(1.25) brightness(${ValueInText7})`,
                  }}
                />
                <a
                  href=""
                  className="p-2 pl-12 px-20 py-3 whitespace-nowrap rounded-l-xl"
                  style={{ backgroundColor: Color7, color: tempColor7 }}
                >
                  Account management
                </a>
              </div>

              <div className="relative -pb-10 top-10 w-64 left-3 ">
                <Link to="/LogoutConfirmation">
                  <img
                    src={Logout}
                    className="w-1/12 h- relative z-10 left-12 filter brightness-75 saturate-125"
                    style={{ top: "25px" }}
                  />
                  <a
                    href=""
                    className="p-2 pl-20 text-center font-semibold relative top-30 px-20 py-3 whitespace-nowrap rounded-xl"
                    style={{ backgroundColor: myCustomColor }}
                  >
                    Logout
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {!showModal && (
          <nav
            className="ml-1/3 z-50 bg-white lg:left-80 fixed lg:h-16 h-40 p-4 lg:p-7 lg:pt-3  w-screen "
            // style={{ backgroundColor: myCustomColor1 }}
          >
            {/* Toogle Menu start */}
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
                {openMenu && <DropdownMenu />}
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

            <div className="flex relative -top-40 left-[25%]  md:left-[65%] ml-10 lg:left-1/3 w-20 lg:-top-14 mt-2 ">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="lg:-mr-10 relative left-12 text-lg lg:text-sm lg:mt-3 z-10 text-gray-500"
              />
              <input
                placeholder="Search"
                type="search"
                className="lg:block hidden px-16 h-9 mr-10 pl-8 relative left-16 rounded-md focus:outline-none "
                style={{ backgroundColor: myCustomColor }}
              />
              <div className="flex w-96 space-x-2 justify-center items-center  relative left-24 -top-2 ">
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
        )}
        {showAdditionalDiv && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="relative top-24 left-6 lg:flex lg:space-x-4 ">
              <div className="lg:px-14 px-12 w-[88%] lg:w-52 lg:ml-0 -ml-1 bg-white rounded-xl py-8">
                <p className="whitespace-nowrap relative right-6 -top-2 text-xs">
                  Completed requests
                </p>
                <h1 className="text-blue-300 relative right-6 text-2xl font-semibold">
                  {statistics.completedOrders}
                </h1>
              </div>
              {/* <div className="lg:px-14 px-12 w-[88%] lg:w-52 lg:ml-0 lg:mt-0 mt-5 -ml-1 bg-white rounded-xl py-8">
        <p className="whitespace-nowrap relative right-6 -top-2 text-xs">Pending requests</p>
        <h1 className="text-blue-300 relative right-6 text-2xl font-semibold">{statistics.pendingOrders}</h1>
      </div> */}
              <div className="lg:px-8 px-6 w-[88%] lg:w-72 lg:ml-0 lg:mt-0 mt-5 -ml-1 bg-white rounded-xl py-8">
                <p className="whitespace-nowrap text-xs relative -top-2">
                  Approved requests
                </p>
                <h1 className="text-blue-300 text-2xl font-semibold">
                  {statistics.approvedOrders}
                </h1>
              </div>
              <div className="lg:px-8 px-6 w-[88%] lg:w-72 lg:ml-0 lg:mt-0 mt-5 -ml-1 bg-white rounded-xl py-8">
                <p className="whitespace-nowrap text-xs relative -top-2">
                  Incomplete requests
                </p>
                <h1 className="text-blue-300 text-2xl font-semibold">
                  {statistics.incompleteOrders}
                </h1>
              </div>
              <div className="lg:px-16 px-[16%] w-[88%] lg:w-52 md:px-[8%] lg:ml-0 lg:mt-0 mt-5 -ml-1 bg-white rounded-xl py-8">
                <p className="whitespace-nowrap relative right-9 -top-2 text-xs">
                  Total earnings
                </p>
                <h1 className="text-blue-300 relative right-9 text-2xl font-semibold">
                  €{statistics.totalSum.toLocaleString()}
                </h1>
              </div>
            </div>
            {/* <div className="bg-white h-screen-3 lg:w-screen-3 overflow-x-auto pl-4 pt-9 relative top-36">
              <h1 className="font-semibold text-lg mb-6">Request History</h1>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600 font-semibold">
                    <th className="py-3 px-4 w-1/5">Client Name</th>
                    <th className="py-3 px-4 w-1/5">Date of Request</th>
                    <th className="py-3 px-4 w-1/5">Address</th>
                    <th className="py-3 px-4 w-1/5">Service Type</th>
                    <th className="py-3 px-4 w-1/5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        {order.address.customerName}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        {order.address.streetName}
                      </td>
                      <td className="py-3 px-4">{order.orderType}</td>
                      <td
                        className={`py-3 px-4 font-semibold rounded-xl ${
                          order.status === "completed"
                            ? "text-green-400 bg-green-50"
                            : "text-blue-400 bg-blue-50"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
        )}
        {showAdditionalDiv1 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6 ">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/CleaningRequest">
                  <p className="cursor-pointer px-5 rounded-md py-2 relative -top-2 bg-white">
                    Completed requests
                  </p>
                </Link>
                <Link to="/PendingRequest">
                  <p className="cursor-pointer text-gray-400">
                    Incomplete requests
                    {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                      5
                    </span> */}
                  </p>
                </Link>
                <Link to="/UpcomingSchedule">
                  <p className="cursor-pointer text-gray-400">
                    Upcoming schedule cleaning
                  </p>
                </Link>
              </div>
            </div>
            {/* <div className="bg-white h-screen-3 lg:w-screen-3 overflow-x-scroll left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Completed requests</h1>
              <div className="flex mt-9 py-3 px-4 w-screen-4 md:w-screen-5 lg:w-screen-2 header-row">
                <p className="w-1/5">Client Name</p>
                <p className="w-1/5">Completed date</p>
                <p className="w-2/5">Address</p>
                <p className="w-1/5">Service type</p>
                <p className="w-1/5">Duration</p>
                <p className="w-1/5">Payment status</p>
              </div>

              {completedOrders.map((order) => (
                <div key={order._id} className="flex mt-1 py-3 px-4 data-row">
                  <p className="w-1/5">{order.address.customerName}</p>
                  <p className="w-1/5">
                    {new Date(order.desireDate).toLocaleDateString()}
                  </p>
                  <p className="w-2/5">
                    {order.address.streetName}, {order.address.city},{" "}
                    {order.address.postCode}
                  </p>
                  <p className="w-1/5">{order.orderType}</p>
                  <p className="w-1/5">{order.desireTime}</p>
                  <p
                    className={`w-1/5 font-semibold px-2 rounded-xl ${order.payment.isPayment ? "text-green-400 bg-green-50" : "text-red-500 bg-red-50"}`}
                  >
                    {order.payment.isPayment ? "Paid" : "Unpaid"}
                  </p>
                </div>
              ))}
            </div> */}

            {/* <div className="bg-white h-screen-3 lg:w-screen-3 overflow-x-auto pl-4 pt-9 relative top-36">
              <h1 className="font-semibold text-lg mb-6">Completed Requests</h1>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600 font-semibold">
                    <th className="py-3 px-4 w-1/5">Client Name</th>
                    <th className="py-3 px-4 w-1/5">Completed Date</th>
                    <th className="py-3 px-4 w-2/5">Address</th>
                    <th className="py-3 px-4 w-1/5">Service Type</th>
                    <th className="py-3 px-4 w-1/5">Duration</th>
                    <th className="py-3 px-4 w-1/5">Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {completedOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        {order.address.customerName}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(order.desireDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {order.address.streetName}, {order.address.city},{" "}
                        {order.address.postCode}
                      </td>
                      <td className="py-3 px-4">{order.orderType}</td>
                      <td className="py-3 px-4">{order.desireTime}</td>
                      <td className="py-3 px-4 font-semibold">
                        <span
                          className={`px-2 py-1 rounded-xl ${order.payment.isPayment ? "text-green-400 bg-green-50" : "text-red-500 bg-red-50"}`}
                        >
                          {order.payment.isPayment ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
        )}
        {showAdditionalDiv2 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6 ">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/CleaningRequest">
                  <p className="cursor-pointer text-gray-400">
                    Completed requests
                  </p>
                </Link>
                <p className="cursor-pointer px-5 bg-white py-2 rounded-md relative -top-2">
                  Incomplete requests{" "}
                  {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                    5
                  </span> */}
                </p>
                <Link to="/UpcomingSchedule">
                  <p className="cursor-pointer text-gray-400">
                    Upcoming schedule cleaning
                  </p>
                </Link>
              </div>
            </div>
            {/* Pending Orders Section */}
            <div className="bg-white h-screen-3 mr-7 lg:w-screen-3 overflow-x-auto pl-4 pt-9 relative top-36">
              <h1 className="font-semibold text-lg mb-6">
                Incomplete Requests
              </h1>
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-600 font-semibold">
                    <th className="py-3 px-4 w-1/5">Client Name</th>
                    <th className="py-3 px-4 w-1/5">Scheduled Date</th>
                    <th className="py-3 px-4 w-2/5">Address</th>
                    <th className="py-3 px-4 w-1/5">Service Type</th>
                    <th className="py-3 px-4 w-1/5">Special Instruction</th>
                    <th className="py-3 px-4 w-1/5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingOrders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        {order.address.customerName}
                      </td>
                      <td className="py-3 px-4">
                        {new Date(order.desireDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        {order.address.streetName}, {order.address.city},{" "}
                        {order.address.postCode}
                      </td>
                      <td className="py-3 px-4">{order.orderType}</td>
                      <td className="py-3 px-4">{order.specialInstructions}</td>
                      <td className="py-3 px-4">
                        <button
                          className="text-white font-semibold px-3 py-1 rounded-md"
                          style={{ backgroundColor: "yourCustomColor2" }}
                        >
                          View/Accept
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {showAdditionalDiv3 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4 " />
                Back
              </p>

              <div className="flex space-x-3 text-sm">
                <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                  Customer accounts
                </p>

                <Link to="/CleanersAccount">
                  <p className="cursor-pointer px-5  text-gray-400 ">
                    Cleaners accounts{" "}
                    {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                  
                </span> */}
                  </p>
                </Link>
                {/* <p className="cursor-pointer text-gray-400">
                Upcoming schedule cleaning
              </p> */}
                <p className="cursor-pointer text-white text-center bg-blue-600 lg:px-10 px-5 py-2 lg:py-3 lg:h-12 lg:relative fixed lg:-mt-5 -mt-36 z-50 lg:left-1/3 left-48 md:left-[75%] font-semibold rounded-lg">
                  Manage requests
                </p>
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7 lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Customer accounts</h1>
              <div
                className="flex mt-9 space-x-40 lg:space-x-52 relative font-semibold py-3 px-4 w-screen-4 md:w-screen-5 lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap w-1/4">Client Name</p>
                <p className="whitespace-nowrap w-1/4">Email</p>
                <p className="whitespace-nowrap w-1/4">Address</p>
                <p className="whitespace-nowrap w-1/4">Image</p>
              </div>

              {loading ? (
                <MiniLoader />
              ) : (
                customers.map((customer) => (
                  <div
                    key={customer._id}
                    className="flex mt-1 lg:space-x-24 relative py-3 px-4"
                  >
                    <p
                      className="whitespace-nowrap w-[60%] lg:w-[32%] truncate "
                      title={customer.name}
                    >
                      {customer.name}
                    </p>
                    <p
                      className="whitespace-nowrap lg:w-[34%] w-[60%] relative truncate left-[42%] lg:left-[-3.7%]"
                      title={customer.email}
                    >
                      {customer.email}
                    </p>
                    <p
                      className="whitespace-nowrapw-[60%] relative truncate lg:w-[44%] left-[84%] lg:left-[-2%]"
                      title={customer.address}
                    >
                      {customer.address}
                    </p>
                    {/* <p className="whitespace-nowrapw-[60%] relative truncate lg:w-[44%] left-[84%] lg:left-[-2%]">hbvh bfh nfj nfjvjfnvjfgnvjfg vfjgvhbvhgdbf</p> */}
                    <img
                      src={customer.picture}
                      alt="Customer Image"
                      className="h-10 w-10 rounded-full relative lg:left-[-3.5%] left-[170%]"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {showAdditionalDiv10 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4 " />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/UserManagement">
                  <p className="cursor-pointer px-5  text-gray-400 ">
                    Customer accounts{" "}
                    {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                  5
                </span> */}
                  </p>
                </Link>
                <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                  Cleaners account
                </p>
                <p className="cursor-pointer text-white text-center bg-blue-600 lg:px-10 px-5 py-2 lg:py-3 lg:h-12 lg:relative fixed lg:-mt-5 -mt-36 z-50 lg:left-1/3 left-48 md:left-[75%] font-semibold rounded-lg">
                  Approve
                </p>
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7   lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Cleaners accounts</h1>
              <div
                className="flex mt-9 space-x-40 relative font-semibold py-3 px-4 w-screen-4  md:w-screen-5  lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap">Client Name</p>
                <p className="whitespace-nowrap relative -left-24">Email</p>
                <p className="relative -left-28 ml-2 whitespace-nowrap">
                  Address
                </p>
                {/* <p className="relative right-28 whitespace-nowrap">
                  Service type
                </p> */}
                <p className="whitespace-nowrap relative right-44">
                  Availability(Working hours)
                </p>
                <p className="whitespace-nowrap relative right-72">Action</p>
              </div>

              <div className="flex mt-1 space-x-24 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  Samjam@gmail.com
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  123 Maple Street...
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p> */}
                <p className="relative right-44 whitespace-nowrap">
                  09:00AM - 17:00PM
                </p>
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-40"
                  style={{ backgroundColor: myCustomColor2 }}
                >
                  View/edit
                </p>
              </div>
              <div className="flex mt-1 space-x-24 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  Samjam@gmail.com
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  123 Maple Street...
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p> */}
                <p className="relative right-44 whitespace-nowrap">
                  09:00AM - 17:00PM
                </p>
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-40"
                  style={{ backgroundColor: myCustomColor2 }}
                >
                  View/edit
                </p>
              </div>
            </div>
          </div>
        )}
        {showAdditionalDiv11 && (
          <div className="w-2/5 h-screen-1 bg-white p-8 z-50 top-0 absolute left-1/2 ml-32 rounded-lg">
            <div>
              <FontAwesomeIcon
                icon={faXmark}
                className="border-2 py-1 cursor-pointer border-black px-2 rounded-2xl  font-semibold float-right"
              />
              <div className="relative top-20">
                <p className="absolute  bg-sky-100 px-4 py-1 rounded-2xl -top-10 -left-1">
                  Maryan clark
                </p>
                <p className="font-semibold text-2xl mb-10">
                  Personal information
                </p>
              </div>

              <div>
                <div className="mt-24">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Samson james"
                    className="border-gray-200 mt-11 -ml-11 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Samjam@gmail.com"
                    className="border-gray-200 mt-11 -ml-11 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="mt-10 top-5 relative whitespace-nowrap font-semibold">
                    Phone number
                  </label>
                  <input
                    type="number"
                    placeholder="+65 89274737383"
                    className="border-gray-200 mt-7 -ml- rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Maple Street..."
                    className="border-gray-200 mt-11 -ml-14 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Availability
                  </label>
                  <input
                    type="text"
                    placeholder="09:00AM to 5:00PM"
                    className="border-gray-200 mt-11 -ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div className="flex">
                <div>
                  <div className="mt-2">
                    <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                      From
                    </label>
                    <input
                      type="text"
                      placeholder="09:00AM"
                      className="border-gray-200 mt-11 -ml-10 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                      style={{ backgroundColor: myCustomColor }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mt-2">
                    <label className="-mt-10 -top-11 -ml-2 relative whitespace-nowrap font-semibold">
                      To
                    </label>
                    <input
                      type="text"
                      placeholder="5:00PM"
                      className="border-gray-200 mt-11 -ml-4 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                      style={{ backgroundColor: myCustomColor }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <p className="font-semibold text-xl">Services</p>

                <p className="mt-4 mb-2">Services offered</p>
                <div
                  className="w-10/12 rounded-lg border-2 p-5"
                  style={{ backgroundColor: myCustomColor }}
                >
                  <div>
                    <p className="font-semibold">Regular cleaning</p>
                  </div>

                  <div className="mt-5">
                    <p className="font-semibold">Office cleaning</p>
                  </div>

                  <div className="mt-5">
                    <p className="font-semibold">Deep cleaning</p>
                  </div>
                </div>

                <div className="flex relative right-14 top-2 w-">
                  <label className="mt-3 left-14 relative whitespace-nowrap font-semibold">
                    Start date
                  </label>
                  <input
                    type="date"
                    placeholder="Monthly plan"
                    className="border-gray-200 mt-11 -ml-3  rounded-md border-2 text-sm text-black w-screen px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />

                  <label className="mt-3 left-9 relative whitespace-nowrap font-semibold">
                    Renewal date
                  </label>
                  <input
                    type="date"
                    placeholder=""
                    className="border-gray-200 mt-11 -ml-10 relative -left-5 rounded-md border-2 text-sm text-black w-screen px-10 pl-6 py-3 focus:outline-none  "
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>

                <div className="mt-8">
                  <p className="font-semibold text-xl">
                    Schedules and assignments
                  </p>
                  <p className="mt-4 mb-2">Current jobs</p>
                  <div
                    className="w-10/12 h-64 rounded-lg border-2 p-5"
                    style={{ backgroundColor: myCustomColor }}
                  >
                    <div>
                      <p className="font-semibold float-right mt-4">
                        Regular cleaning
                      </p>
                      <p>Date</p>
                      <p className="font-semibold">21st July</p>
                      <p className="font-semibold text-blue-700 px-3 bg-blue-50 rounded-xl float-right">
                        Ongoing
                      </p>
                    </div>

                    <div className="mt-5">
                      <p className="font-semibold float-right mt-5 relative left-20 pl-2">
                        Office cleaning
                      </p>
                      <p>Date</p>
                      <p className="font-semibold">21st July</p>
                      <p className="font-semibold text-blue-700 px-3 bg-blue-50 rounded-xl float-right">
                        Ongoing
                      </p>
                    </div>

                    <div className="mt-5">
                      <p className="font-semibold float-right mt-5 relative left-20 pl-2">
                        Deep cleaning
                      </p>
                      <p>Date</p>
                      <p className="font-semibold">21st July</p>
                      <p className="font-semibold text-blue-700 px-3 bg-blue-50 rounded-xl float-right">
                        Ongoing
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <label className="-mt-10 top-2 relative whitespace-nowrap font-semibold">
                    Availability
                  </label>
                  <Calender />
                </div>

                <div className="space-x-14 mt-12">
                  <button className="px-7 py-2 bg-blue-500 rounded-lg text-white">
                    Assign new job
                  </button>
                  <button className="px-7 py-2 bg-red-600 rounded-lg relative -left-2 text-white">
                    Deactivate cleaner
                  </button>
                </div>
              </div>
            </div>
            <div className="flex space-x-12 mb-10"></div>
          </div>
        )}
        {showAdditionalDiv12 && (
          <div className="w-2/5 h-screen-1 bg-white p-8 z-50 top-0 absolute left-1/2 ml-32 rounded-lg">
            <div>
              <FontAwesomeIcon
                icon={faXmark}
                className="border-2 py-1 cursor-pointer border-black px-2 rounded-2xl  font-semibold float-right"
              />
              <div className="relative top-20">
                <p className="font-semibold text-2xl mb-10">
                  New cleaner approval
                </p>
              </div>

              <div>
                <div className="mt-24">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Samson james"
                    className="border-gray-200 mt-11 -ml-11 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Samjam@gmail.com"
                    className="border-gray-200 mt-11 -ml-11 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="mt-10 top-5 relative whitespace-nowrap font-semibold">
                    Phone number
                  </label>
                  <input
                    type="number"
                    placeholder="+65 89274737383"
                    className="border-gray-200 mt-7 -ml- rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Maple Street..."
                    className="border-gray-200 mt-11 -ml-14 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>

              <div className="mt-8">
                <div>
                  <div className="mt-2">
                    <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                      Availability
                    </label>
                    <input
                      type="text"
                      placeholder="09:00AM to 5:00PM"
                      className="border-gray-200 mt-11 -ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                      style={{ backgroundColor: myCustomColor }}
                    />
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <div className="mt-2">
                      <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                        From
                      </label>
                      <input
                        type="text"
                        placeholder="09:00AM"
                        className="border-gray-200 mt-11 -ml-10 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                        style={{ backgroundColor: myCustomColor }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mt-2">
                      <label className="-mt-10 -top-11 -ml-2 relative whitespace-nowrap font-semibold">
                        To
                      </label>
                      <input
                        type="text"
                        placeholder="5:00PM"
                        className="border-gray-200 mt-11 -ml-4 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                        style={{ backgroundColor: myCustomColor }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <p className="font-semibold text-xl">Services</p>

                  <p className="mt-4 mb-2">Services offered</p>
                  <div
                    className="w-10/12 rounded-lg border-2 p-5"
                    style={{ backgroundColor: myCustomColor }}
                  >
                    <div>
                      <p className="font-semibold">Regular cleaning</p>
                    </div>

                    <div className="mt-5">
                      <p className="font-semibold">Office cleaning</p>
                    </div>

                    <div className="mt-5">
                      <p className="font-semibold">Deep cleaning</p>
                    </div>
                  </div>
                </div>

                <div className="space-x-14 mt-12">
                  <button className="px-8 py-2 bg-blue-500 rounded-lg text-white">
                    Approve cleaner
                  </button>
                  <button className="px-8 py-2 bg-red-600 rounded-lg text-white">
                    Reject cleaner
                  </button>
                </div>
              </div>
            </div>
            <div className="flex space-x-12 mb-10"></div>
          </div>
        )}
        {showAdditionalDiv9 && (
          <div className="w-2/5 h-screen-1 bg-white p-8 z-50 top-0 absolute left-1/2 ml-32 rounded-lg">
            <div>
              <FontAwesomeIcon
                icon={faXmark}
                className="border-2 py-1 cursor-pointer border-black px-2 rounded-2xl  font-semibold float-right"
              />
              <div className="relative top-20">
                <p className="absolute  bg-sky-100 px-4 py-1 rounded-2xl -top-10 -left-1">
                  Samson James
                </p>
                <p className="font-semibold text-2xl mb-10">
                  Personal information
                </p>
              </div>

              <div>
                <div className="mt-24">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Samson james"
                    className="border-gray-200 mt-11 -ml-11 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="Samjam@gmail.com"
                    className="border-gray-200 mt-11 -ml-11 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="mt-10 top-5 relative whitespace-nowrap font-semibold">
                    Phone number
                  </label>
                  <input
                    type="number"
                    placeholder="+65 89274737383"
                    className="border-gray-200 mt-7 -ml- rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div>
                <div className="mt-2">
                  <label className="-mt-10 -top-11 relative whitespace-nowrap font-semibold">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Maple Street..."
                    className="border-gray-200 mt-11 -ml-14 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>
              </div>
              <div className="mt-8">
                <p className="font-semibold text-xl">Subscription</p>

                <Planselector />

                <div className="flex relative right-14 top-2 w-">
                  <label className="mt-3 left-14 relative whitespace-nowrap font-semibold">
                    Start date
                  </label>
                  <input
                    type="date"
                    placeholder="Monthly plan"
                    className="border-gray-200 mt-11 -ml-3  rounded-md border-2 text-sm text-black w-screen px-10 pl-6 py-3 focus:outline-none"
                    style={{ backgroundColor: myCustomColor }}
                  />

                  <label className="mt-3 left-9 relative whitespace-nowrap font-semibold">
                    Renewal date
                  </label>
                  <input
                    type="date"
                    placeholder=""
                    className="border-gray-200 mt-11 -ml-10 -left-5 rounded-md border-2 text-sm text-black w-screen px-10 pl-6 py-3 focus:outline-none relative "
                    style={{ backgroundColor: myCustomColor }}
                  />
                </div>

                <div className="mt-8">
                  <p className="font-semibold text-xl">Service history</p>
                  <p className="mt-4 mb-2">Service records</p>
                  <div
                    className="w-10/12 rounded-lg border-2 p-5"
                    style={{ backgroundColor: myCustomColor }}
                  >
                    <div>
                      <p className="font-semibold float-right mt-4">
                        Regular cleaning
                      </p>
                      <p>Date</p>
                      <p className="font-semibold">21st July</p>
                    </div>

                    <div className="mt-5">
                      <p className="font-semibold float-right mt-4">
                        Office cleaning
                      </p>
                      <p>Date</p>
                      <p className="font-semibold">21st July</p>
                    </div>

                    <div className="mt-5">
                      <p className="font-semibold float-right mt-4">
                        Deep cleaning
                      </p>
                      <p>Date</p>
                      <p className="font-semibold">21st July</p>
                    </div>
                  </div>
                </div>

                <div className="space-x-14 mt-12">
                  <button className="px-8 py-2 bg-blue-500 rounded-lg text-white">
                    Save changes
                  </button>
                  <button className="px-8 py-2 bg-red-600 rounded-lg text-white">
                    Delete customer
                  </button>
                </div>
              </div>
            </div>
            <div className="flex space-x-12 mb-10"></div>
          </div>
        )}

        {showAdditionalDiv7 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/CleaningRequest">
                  <p className="cursor-pointer text-gray-400">
                    Completed requests
                  </p>
                </Link>
                <Link to="/PendingRequest">
                  <p className="cursor-pointer text-gray-400">
                    Incomplete requests{" "}
                    {/* <span className="relative left-3 text-xs px-1 bg-red-600 rounded-xl text-white">
                      5
                    </span> */}
                  </p>
                </Link>
                <Link to="/UpcomingSchedule">
                  <p className="cursor-pointer px-5 bg-white py-2  rounded-md relative -top-2 lg:left-0 -left-3">
                    Upcoming schedule cleaning
                  </p>
                </Link>
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7 lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Approved requests</h1>
              <div className="flex mt-9 py-3 px-4 w-screen-4 md:w-screen-5 lg:w-screen-2 header-row">
                <p className="w-1/5">Client Name</p>
                <p className="w-1/5">Scheduled date</p>
                <p className="w-2/5">Address</p>
                <p className="w-1/5">Service type</p>
                {/* <p className="w-1/5">Special instruction</p> */}
                <p className="w-1/5">Status</p>
              </div>

              {/* {approvedOrders.map(order => (
        <div key={order._id} className="flex mt-1 py-3 px-4 data-row">
          <p className="w-1/5">{order.address.customerName}</p>
          <p className="w-1/5">{new Date(order.desireDate).toLocaleDateString()}</p>
          <p className="w-2/5">{order.address.streetName}, {order.address.city}, {order.address.postCode}</p>
          <p className="w-1/5">{order.orderType}</p>
          <p className="w-1/5">{order.specialInstructions}</p>
          <p className="w-1/5 text-white font-semibold px-2 rounded-md py-1" style={{ backgroundColor: 'green' }}>
            Approved
          </p>
        </div>
      ))} */}
            </div>
          </div>
        )}
        {showAdditionalDiv8 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <Link to="/CleaningRequest"></Link>
              <Link to="/PendingRequest"></Link>
              <Link to="/UpcomingSchedule"></Link>
              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/CleaningRequest">
                  <p className="cursor-pointer text-gray-400">
                    Completed requests
                  </p>
                </Link>
                <Link to="/PendingRequest">
                  <p className="cursor-pointer text-gray-400">
                    Pending requests{" "}
                    {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                      5
                    </span> */}
                  </p>
                </Link>
                <Link to="/UpcomingSchedule">
                  <p className="cursor-pointer text-gray-400">
                    Upcoming schedule cleaning
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv13 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4 " />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                  Overview
                  {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                  5
                </span> */}
                </p>
                <p className="cursor-pointer px-5  text-gray-400 ">
                  <Dropdown />
                </p>
                {/* <p className="cursor-pointer text-gray-400">
                Upcoming schedule cleaning
              </p> */}
                <p className="cursor-pointer text-gray-400 text-center  px-8 py-3 relative -mt-3 right-8 font-semibold rounded-lg">
                  Completed Duties
                </p>
              </div>
            </div>
            {/* availableJobs */}
            <div className="bg-white h-screen-3 mr-7 lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Available jobs</h1>
              <div
                className="flex mt-9 space-x-[10%] relative font-semibold py-3 px-4 w-screen-4  md:w-screen-5  lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="w-1/5">Job ID</p>
                <p className="w-1/5"> Client Name</p>
                <p className="w-2/5">Address</p>

                <p className="w-1/5">Service type</p>
                <p className="w-1/5">Scheduled date</p>
                <p className="w-1/5">Action</p>
              </div>
              <div className="text-sm relative -left-3">
                {availableJobs.map((order) => (
                  <div
                    key={order._id}
                    className="flex mt-1 space-x-20 relative py-3 px-4 "
                  >
                    <p className="w-1/5 truncate">#{order._id}</p>
                    {/* <p className="w-1/5 truncate" title={order.address.customerName}>
              {order.address.customerName}
            </p> */}
                    <p
                      className="w-2/5 truncate"
                      title={`${order.address.streetName}, ${order.address.city}, ${order.address.postCode}`}
                    >
                      {order.address.streetName}, {order.address.city},{" "}
                      {order.address.postCode}
                    </p>
                    <p className="w-1/5 truncate" title={order.orderType}>
                      {order.orderType}
                    </p>
                    <p
                      className="w-1/5 truncate"
                      title={new Date(order.desireDate).toLocaleDateString()}
                    >
                      {new Date(order.desireDate).toLocaleDateString()}
                    </p>
                    <p
                      className="text-white font-semibold px-2 rounded-md py-1 -ml-12 w-1/5"
                      style={{ backgroundColor: myCustomColor4 }}
                    >
                      Assign job
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv14 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6 ">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4 " />
                Back
              </p>

              <div className="flex space-x-3 ">
                <p className="cursor-pointer px-5  text-gray-400 ">
                  Assign Jobs
                </p>
                <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                  Monitor Job status
                  {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                  5
                </span> */}
                </p>
                {/* <p className="cursor-pointer text-gray-400">
                Upcoming schedule cleaning
              </p> */}
                {/* <p className="cursor-pointer text-gray-400 text-center  px-8 py-3 relative -mt-3 right-8 font-semibold rounded-lg">
                Invoices
              </p> */}
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7   lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Ongoing Jobs</h1>
              <div
                className="flex mt-9 space-x-24 relative font-semibold py-3 px-4 w-screen-4  md:w-screen-5  lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap">Job ID</p>
                <p className="whitespace-nowrap relative -left-3">
                  Client Name
                </p>
                <p className="whitespace-nowrap relative -left-16">Address</p>

                <p className="relative right-24 whitespace-nowrap">
                  Service type
                </p>
                <p className="relative -left-36 ml-2 whitespace-nowrap">
                  Assigned cleaner
                </p>
                <p className="whitespace-nowrap relative right-56">
                  Scheduled date
                </p>
                <p className="whitespace-nowrap relative right-1/3 ml-40">
                  Status
                </p>
              </div>
              <div className="text-sm relative -left-3">
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 whitespace-nowrap bg-blue-50"
                    style={{ color: myCustomColor4 }}
                  >
                    In progress
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 -ml-12 whitespace-nowrap bg-green-50"
                    style={{ color: myCustomColor2 }}
                  >
                    Completed
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 whitespace-nowrap bg-blue-50"
                    style={{ color: myCustomColor4 }}
                  >
                    In progress
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 whitespace-nowrap bg-blue-50"
                    style={{ color: myCustomColor4 }}
                  >
                    In progress
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 -ml-12 whitespace-nowrap bg-green-50"
                    style={{ color: myCustomColor2 }}
                  >
                    Completed
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 -ml-12 whitespace-nowrap bg-green-50"
                    style={{ color: myCustomColor2 }}
                  >
                    Completed
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 whitespace-nowrap bg-blue-50"
                    style={{ color: myCustomColor4 }}
                  >
                    In progress
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 -ml-12 whitespace-nowrap bg-green-50"
                    style={{ color: myCustomColor2 }}
                  >
                    Completed
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 -ml-12 whitespace-nowrap bg-green-50"
                    style={{ color: myCustomColor2 }}
                  >
                    Completed
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 whitespace-nowrap bg-blue-50"
                    style={{ color: myCustomColor4 }}
                  >
                    In progress
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 -ml-12 whitespace-nowrap bg-green-50"
                    style={{ color: myCustomColor2 }}
                  >
                    Completed
                  </p>
                </div>
                <div className="flex mt-1 space-x-20 relative -left-11 py-3 px-4 ">
                  <p className="whitespace-nowrap relative left-12">
                    #8384738920
                  </p>
                  <p className="whitespace-nowrap relative left-5">
                    Samson James
                  </p>
                  <p className="relative right-5 whitespace-nowrap">
                    123 Maple Street...
                  </p>

                  <p className="relative -left-20 whitespace-nowrap">
                    Regular cleaning
                  </p>
                  <p className="relative right-32 whitespace-nowrap">
                    Maryan Clark
                  </p>
                  <p className="relative right-40 whitespace-nowrap ">
                    Tomorrow, 10:00AM
                  </p>
                  <p
                    className="text-white font-semibold px-2 rounded-2xl py-1 relative -left-1/4 whitespace-nowrap bg-blue-50"
                    style={{ color: myCustomColor4 }}
                  >
                    In progress
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv15 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/FinancialManagement">
                  <p className="cursor-pointer px-5 rounded-md py-2 relative -top-2 bg-white">
                    Pricing
                  </p>
                </Link>
                <Link to="/Invoices">
                  <p className="cursor-pointer text-gray-400">Add pricing</p>
                </Link>
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7   lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">All pricing</h1>

              <div
                className="flex mt-9 space-x-24 relative font-semibold py-3 px-4 w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <div className="w-screen-3 lg:left-10 pl-4 pt-9 relative -40">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {pricingData.map((pricing) => (
                      <div
                        key={pricing._id}
                        className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6"
                      >
                        <p className="font-semibold whitespace-nowrap text-lg">
                          {pricing.priceName}
                        </p>
                        <sup>{pricing.priceRange}</sup>
                        <img
                          src={pricing.priceImage}
                          alt="Price Image"
                          className="h-10 w-10"
                        />
                        <p>Price: ${pricing.priceAmount}</p>
                        <p>Range: {pricing.priceRange}</p>
                        <p>
                          Created On:{" "}
                          {new Date(pricing.createdAt).toLocaleDateString()}
                        </p>
                        <button
                          onClick={handleOpen}
                          className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg"
                        >
                          Update
                        </button>
                      </div>
                    ))}
                  </div>
                  <CategoryModal
                    show={showModal}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    service={currentService}
                    handleChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv6 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/Service">
                  <p className="cursor-pointer px-5 rounded-md py-2 relative -top-2 bg-white">
                    Services
                  </p>
                </Link>
                <Link to="/ServiceAdd">
                  <p className="cursor-pointer text-gray-400">Add Services</p>
                </Link>
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7   lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">All services</h1>

              <div
                className="flex mt-9 space-x-24 relative font-semibold py-3 px-4 w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <div className="w-screen-3 lg:left-10 pl-4 pt-9 relative -40">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {serviceData.map((service) => (
                      <div
                        key={service._id}
                        className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6"
                      >
                        <p className="font-semibold whitespace-nowrap text-lg">
                          {service.serviceName}
                        </p>
                        <sup>{service.priceRange}</sup>
                        <img
                          src={service.serviceImage}
                          alt="Price Image"
                          className="h-10 w-10"
                        />
                        <p>Price: ${service.servicePrice}</p>
                        <p>serviceType: {service.serviceType}</p>
                        <p>serviceDiscount: {service.serviceDiscount}</p>
                        <button
                          onClick={handleOpen}
                          className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg"
                        >
                          Update
                        </button>
                      </div>
                    ))}
                  </div>
                  <Modal
                    show={showModal}
                    handleClose={handleClose}
                    handleSave={handleSave}
                    service={currentService}
                    handleChange={handleChange}
                    className="z-50"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {showAdditionalDiv5 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/Service">
                  <p className="cursor-pointer px-5 rounded-md py-2 relative -top-2 bg-white">
                    Services
                  </p>
                </Link>
                <Link to="/ServiceAdd">
                  <p className="cursor-pointer text-gray-400">Add Services</p>
                </Link>
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7   lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">All services</h1>

              <div
                className="flex mt-9 space-x-24 relative font-semibold py-3 px-4 w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <ServiceUploading />
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv17 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6 ">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4" />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/FinancialManagement">
                  <p className="cursor-pointer text-gray-400">Pricing</p>
                </Link>
                <Link to="/Invoices">
                  <p className="cursor-pointer px-5 rounded-md py-2 relative -top-2 bg-white">
                    Add pricing{" "}
                  </p>
                </Link>
              </div>
            </div>

            <div className="bg-white h-screen-3 mr-7   lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Create new price </h1>
              <div className="container mx-auto mt-9">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col">
                    <label htmlFor="priceName" className="mb-1 font-semibold">
                      Price Name
                    </label>
                    <input
                      type="text"
                      id="priceName"
                      name="priceName"
                      value={formData.priceName}
                      onChange={handleChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="priceAmount" className="mb-1 font-semibold">
                      Price Amount
                    </label>
                    <input
                      type="number"
                      id="priceAmount"
                      name="priceAmount"
                      value={formData.priceAmount}
                      onChange={handleChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="priceRange" className="mb-1 font-semibold">
                      Price Range
                    </label>
                    <select
                      id="priceRange"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleChange}
                      className="p-2 border rounded"
                    >
                      <option value="oneTime">One Time</option>
                      <option value="OnceAweek">Once A Week</option>
                      <option value="TwiceAmonth">Twice A Month</option>
                      <option value="EveryMonth">Every Month</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="priceItemName"
                      className="mb-1 font-semibold"
                    >
                      Price Item Name
                    </label>
                    <input
                      type="text"
                      id="priceItemName"
                      name="priceItemName"
                      value={formData.priceItemName}
                      onChange={handleChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="priceItemPrice"
                      className="mb-1 font-semibold"
                    >
                      Price Item Price
                    </label>
                    <input
                      type="number"
                      id="priceItemPrice"
                      name="priceItemPrice"
                      value={formData.priceItemPrice}
                      onChange={handleChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="image" className="mb-1 font-semibold">
                      Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      onChange={handleFileChange}
                      className="p-2 border rounded"
                    />
                  </div>
                  <button
                    type="submit"
                    className={`py-2 px-4 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500"}`}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv18 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4 " />
                Back
              </p>

              <div className="flex space-x-3 text-sm">
                <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                  Customer inquiries
                </p>

                <Link to="/ComplaintResolution">
                  <p className="cursor-pointer px-5  text-gray-400 ">
                    Complaint resolution{" "}
                    {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                  5
                </span> */}
                  </p>
                </Link>
                {/* <p className="cursor-pointer text-gray-400">
                Upcoming schedule cleaning
              </p> */}
                {/* <p className="cursor-pointer text-white text-center bg-blue-600 px-10 py-3 relative left-1/3 font-semibold rounded-lg">
                  Manage requests
                </p> */}
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7   lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Customer inquiries</h1>
              <div
                className="flex mt-9 space-x-52 relative font-semibold py-3 px-4 w-screen-4  md:w-screen-5  lg:w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap">Client Name</p>
                <p className="whitespace-nowrap relative -left-20">
                  Inquiry ID
                </p>
                <p className="relative -left-44 whitespace-nowrap">
                  Date of inquiry
                </p>
                {/* <p className="relative right-28 whitespace-nowrap">
                  Service type
                </p>
                <p className="whitespace-nowrap relative right-36">
                  Special instruction
                </p> */}
                <p className="whitespace-nowrap relative right-44">Action</p>
              </div>

              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}

                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv19 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4 " />
                Back
              </p>

              <div className="flex space-x-3 relative left-4 text-sm lg:flex-nowrap flex-wrap gap-4">
                <Link to="/CustomerSupport">
                  <p className="cursor-pointer px-5  text-gray-400 ">
                    Customer inquiries
                  </p>
                </Link>

                <Link to="/CleanersAccount">
                  <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                    Complaint resolution{" "}
                    {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                  5
                </span> */}
                  </p>
                </Link>
                {/* <p className="cursor-pointer text-gray-400">
                Upcoming schedule cleaning
              </p> */}
                {/* <p className="cursor-pointer text-white text-center bg-blue-600 px-10 py-3 relative left-1/3 font-semibold rounded-lg">
                  Manage requests
                </p> */}
              </div>
            </div>
            <div className="bg-white h-screen-3 mr-7   lg:w-screen-3 overflow-x-scroll left-4 lg:left-6 pl-4 pt-9 relative top-36 whitespace-nowrap">
              <h1 className="font-semibold text-lg">Customer inquiries</h1>
              <div
                className="flex mt-9 space-x-52 relative font-semibold py-3 px-4 w-screen-2"
                style={{ backgroundColor: myCustomColor }}
              >
                <p className="whitespace-nowrap">Client Name</p>
                <p className="whitespace-nowrap relative -left-20">
                  Inquiry ID
                </p>
                <p className="relative -left-44 whitespace-nowrap">
                  Date of inquiry
                </p>
                {/* <p className="relative right-28 whitespace-nowrap">
                  Service type
                </p>
                <p className="whitespace-nowrap relative right-36">
                  Special instruction
                </p> */}
                <p className="whitespace-nowrap relative right-44">Action</p>
              </div>

              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}

                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor2 }}
                >
                  Resolved
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor2 }}
                >
                  Resolved
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <Link to="/CustomDetails" className="cursor-pointer">
                  <p
                    className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                    style={{ backgroundColor: myCustomColor4 }}
                  >
                    View details
                  </p>
                </Link>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor2 }}
                >
                  Resolved
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor2 }}
                >
                  Resolved
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor2 }}
                >
                  Resolved
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor2 }}
                >
                  Resolved
                </p>
              </div>
              <div className="flex mt-1 space-x-40 relative py-3 px-4">
                <p className="whitespace-nowrap">Samson James</p>
                <p className="relative right-12 whitespace-nowrap">
                  #8384738920
                </p>
                <p className="relative right-28 whitespace-nowrap">
                  Tomorrow, 10:00 AM
                </p>
                {/* <p className="relative left-6 whitespace-nowrap">
                  Regular cleaning
                </p>
                <p className="relative left-5 whitespace-nowrap">
                  Please focus on kitchen...
                </p> */}
                <p
                  className="text-white font-semibold px-2 rounded-md py-1 relative right-28 whitespace-nowrap"
                  style={{ backgroundColor: myCustomColor4 }}
                >
                  View details
                </p>
              </div>
            </div>
          </div>
        )}

        {showAdditionalDiv22 && (
          <div
            className="w- lg:h-screen-2 top-24 lg:top-0 lg:z-30 relative lg:left-80 whitespace-nowrap"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="top-32 relative lg:left-6">
              <p className="bg-white relative -top-10 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4 " />
                Back
              </p>

              <div className="flex space-x-3 text-sm">
                {/* <p  className="cursor-pointer px-5  text-gray-400 ">
                  Customer inquiries
                </p> */}

                <Link to="/AnalyticsAndInsights">
                  <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                    User Behavior Analysis{" "}
                    {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                  5
                </span> */}
                  </p>
                </Link>
                {/* <p className="cursor-pointer text-gray-400">
                Upcoming schedule cleaning
              </p> */}
                {/* <p className="cursor-pointer text-white text-center bg-blue-600 px-10 py-3 relative left-1/3 font-semibold rounded-lg">
                  Manage requests
                </p> */}
              </div>
            </div>
            <h1 className="font-semibold text-lg relative left-10 top-36">
              Overall company performance
            </h1>
            <div className="flex h-screen-3 space-x-4 flex-wrap w-screen-3  pl-4 pt-9 relative top-36">
              <div className="w-72 p-6 bg-white h-80 rounded-lg">
                <p className="font-semibold">Revenue trends</p>

                <p className="text-green-500 bg-green-50 mt-3 w-20 py-1 text-center px-1 font-semibold whitespace-nowrap rounded-2xl">
                  <FontAwesomeIcon icon={faArrowUp} className="w-5" />
                  12.5%
                </p>
              </div>
              <div className="w-72 p-6 bg-white h-80 rounded-lg">
                <p className="font-semibold">Customer retention rate</p>
                <p className="text-green-500 bg-green-50 mt-3 w-20 py-1 text-center font-semibold px-1 whitespace-nowrap rounded-2xl">
                  <FontAwesomeIcon icon={faArrowUp} className="w-5" />
                  12.5%
                </p>
              </div>
              <div className="w-72 p-6 bg-white h-80 rounded-lg">
                <p className="font-semibold">Customer satisfaction</p>
              </div>
              <div className="w-96 p-6 relative -top-16 right-4 h-96 bg-white rounded-lg">
                <p className="font-semibold">Service usage</p>

                <div
                  className="w-84 p-2 relative top-64 rounded-lg h-10 py-1"
                  style={{ backgroundColor: myCustomColor }}
                >
                  <p className="float-right font-semibold">Office cleaning</p>
                  <p>Most used service</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAdditionalDiv16 && (
          <div
            className="w-full top-24 lg:top-0 lg:z-30 relative lg:left-80"
            style={{ backgroundColor: myCustomColor }}
          >
            <div className="mt-24 relative lg:left-6">
              {/* <p className="bg-white relative top-6 pl-5 px-2 w-24 whitespace-nowrap py-2 rounded-lg left-4">
                <FontAwesomeIcon icon={faArrowLeft} className="pr-4 " />
                Back
              </p> */}

              <div className="flex space-x-3 text-sm">
                {/* <p  className="cursor-pointer px-5  text-gray-400 ">
                  Customer inquiries
                </p> */}

                <Link to="/CleanerApplication"></Link>
              </div>
            </div>
            <Application />
          </div>
        )}
        {showAdditionalDiv21 && (
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
                <Link to="/ServiceCategory">
                  <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                    service category{" "}
                    <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                      0
                    </span>
                  </p>
                </Link>
                <Link to="/NewService">
                  <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                    create new service category{" "}
                    {/* <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                  5
                </span> */}
                  </p>
                </Link>
              </div>
            </div>
            <div className="w-screen-3 lg:left-10 pl-4 pt-9 relative -40">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {loading ? (
                  <MiniLoader />
                ) : (
                  serviceCategories.map((category) => (
                    <div
                      key={category._id}
                      className="lg:w-72 w-80 pt-5 rounded-lg leading-9 pl-4 bg-white pb-6"
                    >
                      <p className="font-semibold whitespace-nowrap text-lg">
                        {category.name}
                      </p>
                      <sup>{calculateTimeElapsed(category.updatedAt)}</sup>
                      <img
                        src={category.image}
                        alt="Customer Image"
                        className="h-10 w-10"
                      />
                      <p>Price: {category.price}</p>
                      <p>Range: {category.range}</p>
                      <p>
                        created On:{" "}
                        {new Date(category.createdAt).toDateString()}
                      </p>
                      <button
                        onClick={handleOpen}
                        className="px-[32.5%] ml-0 py-1 text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg"
                      >
                        Update
                      </button>
                    </div>
                  ))
                )}
              </div>
              <CategoryModal
                show={showModal}
                handleClose={handleClose}
                handleSave={handleSave}
                service={currentService}
                handleChange={handleChange}
              />
            </div>
          </div>
        )}
        {showAdditionalDiv20 && (
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
                <Link to="/ServiceCategory">
                  <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                    service category{" "}
                    <span className="relative left-1 text-xs px-1 bg-red-600 rounded-xl text-white">
                      0
                    </span>
                  </p>
                </Link>
                <Link to="/NewService">
                  <p className="cursor-pointer bg-white py-3 px-4 left-4 rounded-md relative -top-3">
                    create new service category{" "}
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex mt-10">
              <ServiceForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardTemp;
