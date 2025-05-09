import { useState } from "react";
import { Link } from "react-router-dom";

const availableInquiries = [
  {
    clientName: "Samson James",
    inquiryId: "8384738920",
    dateOfInquiry: "Tomorrow, 10:00 AM",
  },
  {
    clientName: "Jane Doe",
    inquiryId: "7483920192",
    dateOfInquiry: "Dec 5, 2024, 3:00 PM",
  },
];

const inquiries = [
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "Resolved",
    actionType: "text",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "Resolved",
    actionType: "text",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "View details",
    actionType: "link",
    link: "/CustomDetails",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "View details",
    actionType: "text",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "Resolved",
    actionType: "text",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "View details",
    actionType: "text",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "Resolved",
    actionType: "text",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "Resolved",
    actionType: "text",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "View details",
    actionType: "link",
    link: "/CustomDetails",
  },
  {
    name: "Samson James",
    id: "#8384738920",
    date: "Tomorrow, 10:00 AM",
    action: "Resolved",
    actionType: "text",
  },
];


const CustomerSupport = () => {
    const [activeTab, setActiveTab] = useState("customer");
    return (
      <>
        <div className="w-full py-3 px-2">
          <div className="flex space-x-8 border-b border-gray-200 mb-4">
            <button
              className={`py-2 text-center text-md font-medium ${activeTab === "customer" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("customer")}
            >
              Customer Inquiries
            </button>
            <button
              className={`py-2 text-center text-md font-medium ${activeTab === "complaint" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("complaint")}
            >
              Complaint Resolution
            </button>
          </div>
        </div>

        {activeTab === "customer" && (
          <>
            <div className="overflow-x-auto px-4 py-6 border border-gray-300 rounded-lg">
              <h1 className="font-medium text-xl mb-6">Customer Inquiries</h1>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Client Name</th>
                      <th className="px-4 py-2 text-left">Inquiry ID</th>
                      <th className="px-4 py-2 text-left">Date of Inquiry</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableInquiries.map((inquiry, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                      >
                        <td className="px-4 py-2 truncate">
                          {inquiry.clientName}
                        </td>
                        <td className="px-4 py-2 truncate">
                          #{inquiry.inquiryId}
                        </td>
                        <td className="px-4 py-2 truncate">
                          {inquiry.dateOfInquiry}
                        </td>
                        <td className="px-4 py-2">
                          <button className="text-white font-medium px-4 py-2 rounded-lg bg-blue-600 hover:g-blue-700 duration-150 text-sm ">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {availableInquiries.length === 0 && (
                  <p className="text-center text-gray-500 py-4">
                    No inquiries available.
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === "complaint" && (
          <>
            <div className="overflow-x-auto whitespace-nowrap px-4 py-6 border border-gray-300 rounded-lg">
              <h1 className="font-medium text-xl">Complaint Resolution</h1>

              <table className="table-auto mt-4 w-full border-collapse border border-gray-200 text-left">
                <thead>
                  <tr className="bg-gray-100 text-gray-800 font-medium">
                    <th className="py-3 px-4">
                      Client Name
                    </th>
                    <th className="py-3 px-4">
                      Inquiry ID
                    </th>
                    <th className="py-3 px-4">
                      Date of Inquiry
                    </th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="py-3 px-4 border border-gray-200">
                        {inquiry.name}
                      </td>
                      <td className="py-3 px-4 border border-gray-200">
                        {inquiry.id}
                      </td>
                      <td className="py-3 px-4 border border-gray-200">
                        {inquiry.date}
                      </td>
                      <td className="py-3 px-4 border border-gray-200">
                        {inquiry.actionType === "link" ? (
                          <Link
                            to={inquiry.link}
                            className="text-white font-medium text-sm px-2 py-1 rounded-md bg-blue-700"
                          >
                            {inquiry.action}
                          </Link>
                        ) : (
                          <span className="text-blue-600 font-medium text-sm px-2 py-1 rounded-md bg-blue-100">
                            {inquiry.action}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </>
    );
}

export default CustomerSupport;