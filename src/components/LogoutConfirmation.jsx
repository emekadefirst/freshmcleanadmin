/* eslint-disable no-unused-vars */
import DashboardTemp from "./DashboardTemp";
import {
  faChevronDown,
  faXmark,
  faMagnifyingGlass,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import FirstFrame from "./Media/firstframe.png";
import SecondFrame from "./Media/secondframe.png";
import TwoMore from "./Media/twomore.png";
import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ConfirmLogout from './Media/confirmLogout.png'

function PendingPop() {
  const navigate = useNavigate();
  const myCustomColor = "#FAFAFA";

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/LoginMain');
  };

  return (
    <>
      <div>
        <DashboardTemp 
          InitNav={true} 
          WelcomeText='Welcome' 
          Color='#3DA5EC' 
          tempColor='white' 
          ValueInText={75} 
          NavText="Piers morgans" 
          showAdditionalDiv={true}
          COLOR="opacity-50"
        />
        <div className="w-1/3 space-x-7 h-screen-1 bg-white p-8 z-30 top-40 absolute left-1/3 rounded-lg">
          <div className="justify-center text-center">
            <img src={ConfirmLogout} className="h-20 relative left-36"/>
            <p className="font-semibold text-2xl">Log Out Confirmation</p>
            <p className="text-sm">Are you sure you want to log out?</p>
          </div>
          <div className="flex space-x-7 relative right-5">
            <Link to="/WelcomeDashboard">
              <button className="px-16 py-2 text-black bg-white border font-semibold whitespace-nowrap mt-12 rounded-lg">
                Back
              </button>
            </Link>
            <button 
              onClick={handleLogout} 
              className="px-16 py-2 text-white bg-blue-500 font-semibold whitespace-nowrap mt-12 rounded-lg"
            >
              LogOut
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PendingPop;
