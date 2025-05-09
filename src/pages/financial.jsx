import { useState, useEffect } from "react";
import MiniLoader from "../components/preloader/mini-preloader";
import { toast, ToastContainer } from "react-toastify";

const FinancialManagement = () => {
  const [activeTab, setActiveTab] = useState("pricing");
  const [pricingData, setPricingData] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = import.meta.env.VITE_API_BASE_URL;

  const [formData, setFormData] = useState({
    priceName: "",
    priceAmount: "",
    priceRange: "",
    priceItemName: "",
    priceItemPrice: "",
    image: null,
  });

  const fetchPricingData = async () => {
    try {
      const response = await fetch(
        `${api}/getAllPricings`
      );
      const data = await response.json();
      setPricingData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pricing data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPricingData();
  }, []);

//   Add Pricing Form

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
      `${api}/createPricing`,
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

    if (error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      console.error("Request data:", error.request);
    } else {
      console.error("Error message:", error.message);
    }

    if (error.stack) {
      console.error("Error stack:", error.stack);
    }

    toast.error(
      error.response?.data?.message ||
        "Error creating pricing. Please try again."
    );
  }
};

  return (
    <>
    <ToastContainer />
      <div className="w-full py-3 px-2">
        <div className="flex space-x-8 border-b border-gray-200 mb-4">
          <button
            className={`py-2 text-center text-md font-medium ${activeTab === "pricing" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("pricing")}
          >
            Pricing
          </button>
          <button
            className={`py-2 text-center text-md font-medium ${activeTab === "add-pricing" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("add-pricing")}
          >
            Add Pricing
          </button>
        </div>
      </div>

      {activeTab === "pricing" && (
        <>
          <h1 className="text-xl font-medium">All Pricing</h1>

          {!loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {pricingData.map((pricing) => (
                <div
                  key={pricing._id}
                  className="rounded-lg bg-white pt-6 pb-3 px-4 border border-gray-300 flex flex-col justify-between"
                >
                  <div>
                    <p className="font-medium whitespace-nowrap text-xl capitalize">
                      {pricing.priceName}
                    </p>
                    <sup>{pricing.priceRange}</sup>
                    <img
                      src={pricing.priceImage}
                      alt="Price Image"
                      className="h-10 w-10 my-3"
                    />
                    <div className="my-3 space-y-2">
                      <p className="capitalize font-medium">
                        Price: ${pricing.priceAmount}
                      </p>
                      <p>Range: {pricing.priceRange}</p>
                      <p>
                        Created On:{" "}
                        {new Date(pricing.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    // onClick={handleOpen}
                    className="py-2.5 text-white bg-blue-600 hover:bg-blue-700 mt-3 duration-150 w-full whitespace-nowrap rounded-lg"
                  >
                    Update
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <MiniLoader />
          )}
        </>
      )}

      {activeTab === "add-pricing" && (
        <>
          <div className="bg-white">
            <div className="container mx-auto mt-6 max-w-lg border border-gray-300 rounded-lg py-6 px-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="priceName" className="mb-1 font-medium">
                    Price Name
                  </label>
                  <input
                    type="text"
                    id="priceName"
                    name="priceName"
                    value={formData.priceName}
                    onChange={handleChange}
                    className="p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="priceAmount" className="mb-1 font-medium">
                    Price Amount
                  </label>
                  <input
                    type="number"
                    id="priceAmount"
                    name="priceAmount"
                    value={formData.priceAmount}
                    onChange={handleChange}
                    className="p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="priceRange" className="mb-1 font-medium">
                    Price Range
                  </label>
                  <select
                    id="priceRange"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleChange}
                    className="p-2 border rounded-lg bg-gray-50"
                  >
                    <option value="oneTime">One Time</option>
                    <option value="OnceAweek">Once A Week</option>
                    <option value="TwiceAmonth">Twice A Month</option>
                    <option value="EveryMonth">Every Month</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="priceItemName" className="mb-1 font-medium">
                    Price Item Name
                  </label>
                  <input
                    type="text"
                    id="priceItemName"
                    name="priceItemName"
                    value={formData.priceItemName}
                    onChange={handleChange}
                    className="p-2 border rounded-lg"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="priceItemPrice" className="mb-1 font-medium">
                    Price Item Price
                  </label>
                  <input
                    type="number"
                    id="priceItemPrice"
                    name="priceItemPrice"
                    value={formData.priceItemPrice}
                    onChange={handleChange}
                    className="p-2 border rounded"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="image" className="mb-1 font-medium">
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={handleFileChange}
                    className="p-2 border rounded-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`py-2 px-4 mt-4 text-sm text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500"}`}
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FinancialManagement;
