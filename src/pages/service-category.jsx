import { useState, useEffect } from "react";
import CategoryModal from "../components/CategoryModal";
import MiniLoader from "../components/preloader/mini-preloader";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";

const ServiceCategory = () => {
  const [activeTab, setActiveTab] = useState("service-category");
  const [loading, setLoading] = useState();

  const [serviceCategories, setServiceCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentService,] = useState({});

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState(null);

  const { t } = useTranslation();
  const api = import.meta.env.VITE_API_BASE_URL;

  const openUpdateModal = (category) => {
    setSelectedServiceCategory(category);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedServiceCategory(null);
  };

  const [userInfo,] = useState({ name: "", email: "" });
//   const [formData, setFormData] = useState({
//     priceName: "",
//     priceAmount: "",
//     priceRange: "",
//     priceItemName: "",
//     priceItemPrice: "",
//     image: null,
//   });

const [formData, setFormData] = useState({
  name: "",
  price: "",
  range: "",
  image: null,
});

  const fetchServiceCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api}/getAllServiceCategories`
      );
      setServiceCategories(response.data.reverse());
    } catch (error) {
      console.error("Error fetching service categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServiceCategories();
  }, []);

  const calculateTimeElapsed = (timestamp) => {
    const currentTime = new Date();
    const updatedTime = new Date(timestamp);
    const timeDifference = currentTime.getTime() - updatedTime.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hoursDifference} hours ago`;
  };

  //   Modals
  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSave = () => {
    // Save the updated info
    console.log("Updated Info:", userInfo);
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

//   Form
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
  setLoading(true);

  if (!formData.name || !formData.price || !formData.range || !formData.image) {
    toast.error("Opps!😉 Please fill in all the fields to register.");
    setLoading(false);
    return;
  }

  const formDataObj = new FormData();
  formDataObj.append("name", formData.name);
  formDataObj.append("price", formData.price);
  formDataObj.append("range", formData.range);
  formDataObj.append("image", formData.image);

  try {
    const response = await axios.post(
      `${api}/createSeriveCategory`,
      formDataObj,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    console.log("Response:", response.data);
    toast.success("Service Category is added successful!");
    setTimeout(() => {
      history.push("/ServiceCategory");
    }, 1000);
  } catch (error) {
    console.error("Error creating service category:", error);
    toast.error(
      error.response.data.error ||
        "Registration failed. Please try again later."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="w-full py-3 px-2">
        <div className="flex space-x-8 border-b border-gray-200 mb-4">
          <button
            className={`py-2 text-center text-md font-medium ${activeTab === "service-category" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("service-category")}
          >
            {t("serviceCategory")}
          </button>
          <button
            className={`py-2 text-center text-md font-medium ${activeTab === "create-new" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("create-new")}
          >
            {t("createNew")}
          </button>
        </div>
      </div>

      {activeTab === "service-category" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? (
              <MiniLoader />
            ) : (
              serviceCategories.map((category) => (
                <div
                  key={category._id}
                  className="border border-gray-300 rounded-lg pt-4 pb-3 px-4"
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
                    created On: {new Date(category.createdAt).toDateString()}
                  </p>
                  <button
                    onClick={() => openUpdateModal(category)}
                    className="px-3 w-full ml-0 py-2 font-medium text-white bg-blue-500 whitespace-nowrap mt-7 rounded-lg"
                  >
                    Update
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Update Modal */}
          {isUpdateModalOpen && selectedServiceCategory && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded-lg p-6 w-[95%] md:w-[55%] lg:w-[40%]">
                <h2 className="text-xl font-bold mb-4">Update Category</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedServiceCategory.name}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Price
                    </label>
                    <input
                      type="number"
                      defaultValue={selectedServiceCategory.price}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Range
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedServiceCategory.range}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedServiceCategory.image}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div> */}

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image
                    </label>
                    <img src={selectedServiceCategory.image} alt="image src" className="w-[64px] h-[64px] rounded-md" />
                    {/* <input
                      type="text"
                      defaultValue={selectedServiceCategory.image}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    /> */}
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={closeUpdateModal}
                      className="px-4 py-2 mr-2 bg-gray-300 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "create-new" && (
        <>
          <ToastContainer />
          <div className="w-full max-w-lg border border-gray-300 mx-auto relative mt-10 bg-white rounded-lg">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="px-8 pt-6 pb-8 mb-4"
            >
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Service Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Service Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="price"
                >
                  Price (Euros)
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Price"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="range"
                >
                  Range (in hour)
                </label>
                <input
                  type="text"
                  id="range"
                  name="range"
                  value={formData.range}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="i.e 2hrs"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
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
                  className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loading ? "cursor-not-allowed" : ""}`}
                  disabled={loading}
                >
                  {loading ? <MiniLoader /> : "Create"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ServiceCategory;
