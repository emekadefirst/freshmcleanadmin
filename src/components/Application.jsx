/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThreeDots } from "react-loader-spinner";

const Application = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(null); // Track loading state for buttons

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "https://klean-up-server-hz1y.onrender.com/v1/api/cleaners"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    setButtonLoading(id); // Set loading state for the button
    try {
      const response = await axios.put(
        `https://klean-up-server-hz1y.onrender.com/v1/api/cleaner/${id}/approve`
      );
      toast.success(response.data.message);
      fetchApplications();
    } catch (error) {
      console.error("Error approving application:", error);
      toast.error("Error approving application");
    } finally {
      setButtonLoading(null); // Reset loading state for the button
    }
  };

  const handleDisapprove = async (id) => {
    setButtonLoading(id); // Set loading state for the button
    try {
      const response = await axios.delete(
        `https://klean-up-server-hz1y.onrender.com/v1/api/cleaner/${id}/disaprove`
      );
      toast.success(response.data.message);
      fetchApplications();
    } catch (error) {
      console.error("Error disapproving application:", error);
      toast.error("Error disapproving application");
    } finally {
      setButtonLoading(null); // Reset loading state for the button
    }
  };

  const pendingApplications = applications.filter(
    (app) => app.status === "pending"
  );

  return (
    <div className="container p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-10 mt-10">
        Pending Cleaner Applications
      </h1>
      {loading ? (
        <div className="loader-container">
          <ThreeDots color="#00BFFF" height={60} width={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center mt-8">
          {pendingApplications.length > 0 ? (
            pendingApplications.map((app) => (
              <div
                key={app._id}
                className="bg-white border border-gray-300 rounded-lg p-6"
              >
                <h2 className="text-2xl font-bold mb-2 capitalize">
                  {app.fullname}
                </h2>
                <p className="text-gray-600 font-medium mb-1">
                  <strong>Email:</strong> {app.email}
                </p>
                {/* <p className="text-gray-600 font-medium mb-1">
                  <strong>Status:</strong> <span className="capitalize">{app.status}</span>
                </p> */}

                <div className="flex items-center space-x-2 mb-1">
                  <p className="text-gray-600 font-medium">Status:</p>
                  <span className="bg-amber-100 text-amber-600 font-medium px-2 py-1 rounded-lg text-sm capitalize">{app.status}</span>
                </div>

                <div className="space-y-2 flex flex-col my-4">
                  <a
                  href={app.identificationProof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 duration-150 underline font-medium"
                >
                  Identification Proof
                </a>
                <a
                  href={app.workAuthorization}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 duration-150 underline font-medium"
                >
                  Work Authorization
                </a>
                <a
                  href={app.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 duration-150 underline font-medium"
                >
                  Resume
                </a>
                </div>
                <div className="grid gap-3 grid-cols-2 mt-4">
                  <button
                    onClick={() => handleApprove(app._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    disabled={buttonLoading === app._id}
                  >
                    {buttonLoading === app._id ? (
                      <ThreeDots
                        color="#fff"
                        height={20}
                        width={20}
                        className="inline-block"
                      />
                    ) : (
                      <>
                        <i className="fas fa-check mr-2"></i>Approve
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDisapprove(app._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    disabled={buttonLoading === app._id}
                  >
                    {buttonLoading === app._id ? (
                      <ThreeDots
                        color="#fff"
                        height={20}
                        width={20}
                        className="inline-block"
                      />
                    ) : (
                      <>
                        <i className="fas fa-times mr-2"></i>Disapprove
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No pending applications found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Application;
