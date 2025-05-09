import { useState, useEffect } from "react";
import DataTable from "../components/ui/DataTable";

const RequestHistory = () => {
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");
  const api = import.meta.env.VITE_API_URL;

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        `${api}/orders/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const columns = [
    { 
      header: "Client Name", 
      accessor: "address.customerName", 
      render: (request) => request.address?.customerName || "No name provided"
    },
    { 
      header: "Date of Request", 
      accessor: "createdAt", 
      render: (request) => new Date(request.createdAt).toLocaleDateString() 
    },
    { 
      header: "Address", 
      accessor: "address",
      render: (request) => `${request.address?.streetName}, ${request.address?.city}`
    },
    { 
      header: "Service Type", 
      accessor: "orderType"
    },
    { 
      header: "Status", 
      accessor: "status",
      render: (request) => (
        <span className={`px-2 py-1 rounded ${
          request.status === 'completed' 
            ? "bg-green-100 text-green-800"
            : request.status === 'pending'
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}>
          {request.status}
        </span>
      )
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Request History</h1>
      <DataTable
        data={requests}
        columns={columns}
        title="All Requests"
      />
    </div>
  );
};

export default RequestHistory;