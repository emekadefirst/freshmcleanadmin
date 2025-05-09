import { useState, useEffect } from 'react';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MiniLoader from '../components/preloader/mini-preloader';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from "react-i18next";

const Services = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState("services");
    const [serviceData, setServiceData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addLoading, setAddLoading] = useState(false);
    const [, setCurrentServiceId] = useState(null);
    const api = import.meta.env.VITE_API_BASE_URL;
    const [formData, setFormData] = useState({
      name: "",
      type: "",
      price: "",
      discount: "",
      image: null,
    });
    const [serviceCategories, setServiceCategories] = useState([]);
    // const token = sessionStorage.getItem("token");

    const fetchService = async () => {
        setLoading(true);
      try {
        const response = await axios.get(
          `${api}/services`
        );
        setServiceData(response.data.reverse());
        setLoading(false)
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false)
      }
    };

    const fetchServiceCategories = async () => {
      try {
        const response = await axios.get(
          `${api}/getAllServiceCategories`
        );
        setServiceCategories(response.data);
      } catch (error) {
        console.error("Error fetching service categories:", error);
        toast.error("Failed to load service categories.");
      }
    };

    useEffect(() => {
        fetchService();
        fetchServiceCategories();
    })

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setFormData({
        ...formData,
        image: file,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setAddLoading(true);

      if (
        !formData.name ||
        !formData.price ||
        !formData.discount ||
        !formData.image
      ) {
        toast.error("Opps!😉 Please fill in all the fields to register.");
        setAddLoading(false);
        return;
      }

      const formDataObj = new FormData();
      formDataObj.append("serviceName", formData.name);
      formDataObj.append("serviceType", formData.type);
      formDataObj.append("servicePrice", formData.price);
      formDataObj.append("serviceDiscount", formData.discount);
      formDataObj.append("image", formData.image);

      try {
        const response = await axios.post(
          `${api}/services`,
          formDataObj,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        console.log("Response:", response.data);
        toast.success("Service Category is added successful!");
        // setTimeout(() => {
        //   navigate("/services");
        // }, 1000);
        setFormData({
          name: "",
          type: "",
          price: "",
          discount: "",
          image: null,
        });
      } catch (error) {
        console.error("Error creating service category:", error);
        toast.error(
          error.response.data.error ||
            "Registration failed. Please try again later."
        );
      } finally {
        setAddLoading(false);
      }
    };

    // Modal

    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = (service = null) => {
      setIsModalOpen((prev) => !prev);
      if (service) {
        setCurrentServiceId(service._id);
        setFormData({
          name: service.serviceName || "",
          type: service.serviceType || "",
          price: service.servicePrice || "",
          discount: service.serviceDiscount || "",
          image: null,
        });
      }
    };

    return (
      <>
        <div className="w-full py-3 px-2">
          <div className="flex space-x-8 border-b border-gray-200 mb-4">
            <button
              className={`py-2 text-center text-md font-medium ${activeTab === "services" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("services")}
            >
              {t("services")}
            </button>
            <button
              className={`py-2 text-center text-md font-medium ${activeTab === "add-services" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              onClick={() => setActiveTab("add-services")}
            >
              {t("addServices")}
            </button>
          </div>
        </div>

        {activeTab === "services" && (
          <>
            <div className="px-4">
              <h1 className="text-2xl font-medium">All Services</h1>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-6">
                {serviceData.map((service) => (
                  <div
                    key={service._id}
                    className="pt-5 pb-3 px-3 border border-gray-300 rounded-lg bg-white flex flex-col justify-between"
                  >
                    <div>
                      <p className="font-medium capitalize whitespace-nowrap text-lg">
                        {service.serviceName}
                      </p>
                      <sup>{service.priceRange}</sup>
                      <img
                        src={service.serviceImage}
                        alt="Price Image"
                        className="h-16 w-16 rounded-lg my-3"
                      />
                      <p>Price: ${service.servicePrice}</p>
                      <p>Service Type: {service.serviceType}</p>
                      <p>Service Discount: {service.serviceDiscount}</p>
                    </div>

                    <button
                      onClick={() => toggleModal(service)}
                      className="px-2 py-2 text-white bg-blue-600 hover:bg-blue-700 duration-150 mt-6 w-full font-medium rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                ))}
              </div>

              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-white rounded-lg w-[95%] md:w-[55%] lg:w-[45%] p-6 shadow-lg relative">
                    <h2 className="text-xl font-bold mb-4">Update Services</h2>

                    {/* Modal Form */}
                    <form>
                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">
                          Service Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">
                          Service Type
                        </label>
                        <input
                          type="text"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">
                          Service Price
                        </label>
                        <input
                          type="text"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">
                          Service Discount
                        </label>
                        <input
                          type="text"
                          name="discount"
                          value={formData.discount}
                          onChange={handleInputChange}
                          className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium">
                          Service Image (optional)
                        </label>
                        <input
                          type="file"
                          name="image"
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              image: e.target.files[0],
                            }))
                          }
                          className="block w-full p-2 border border-gray-300 rounded-lg"
                        />
                      </div>

                      <button
                        type="button"
                        className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                      >
                        Save
                      </button>
                    </form>

                    {/* Close Button */}
                    <button
                      onClick={() => toggleModal()}
                      className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "add-services" && (
          <>
            <div className="w-full">
              <ToastContainer />
              <div className="w-full max-w-lg mx-auto border border-gray-300 relative mt-10 bg-white rounded-lg">
                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="px-8 pt-6 pb-8 mb-4"
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-md font-medium font-inter mb-2"
                      htmlFor="name"
                    >
                      Service Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Service Name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-md font-medium mb-2"
                      htmlFor="type"
                    >
                      Service Type
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="border rounded-lg bg-gray-50 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                      <option value="">Select a service type</option>
                      {serviceCategories.map((category) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-md font-medium mb-2"
                      htmlFor="price"
                    >
                      Service Price
                    </label>
                    <input
                      type="text"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Price"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-md font-medium mb-2"
                      htmlFor="discount"
                    >
                      Service Discount
                    </label>
                    <input
                      type="text"
                      id="discount"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                      placeholder="Service Discount"
                      required
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-md font-medium mb-2"
                      htmlFor="image"
                    >
                      Upload Image
                    </label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept=".png, .jpg, .jpeg"
                      onChange={handleFileChange}
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      className={`w-full bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none ${addLoading ? "cursor-not-allowed" : ""}`}
                      disabled={addLoading}
                    >
                      {addLoading ? <MiniLoader /> : "Create"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </>
    );
}

export default Services;