// import MiniLoader from './preloader/mini-preloader';
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DashboardTemp from './DashboardTemp'
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import MiniLoader from './preloader/mini-preloader';
// import MiniLoaderName from './preloader/mini-preloader-name'; // Import the new mini-loader for the name

function WelcomeDashboard() {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);
  const [nameLoading, setNameLoading] = useState(true); // New state for name loading

  useEffect(() => {
    fetchCustomer()
  }, []);

  const fetchCustomer = async () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      axios.get(`https://klean-up-server-hz1y.onrender.com/v1/api/getAdmin/${userId}`)
        .then(response => {
          const customer = response.data.admin;
          setFullName(customer.name);
          setLoading(false);
          setNameLoading(false); // Stop the name loading
        })
        .catch(error => {
          console.error("Error fetching customer data:", error);
          setLoading(false);
          setNameLoading(false); // Stop the name loading in case of error
        });
    }
  }

  return (
    <>
      <div>
       
          <>
            <DashboardTemp 
              InitNav={true} 
              WelcomeText='Welcome' 
              Color='#3DA5EC' 
              tempColor='white' 
              ValueInText={75} 
              NavText={nameLoading ? <MiniLoader/> : fullName} // Conditional rendering for the name
              showAdditionalDiv={true} 
            />
          </>
       
      </div>
    </>
  )
}

export default WelcomeDashboard
