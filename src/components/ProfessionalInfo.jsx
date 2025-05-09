import Professional from "./Media/professional.png";
import Mobileprogress2 from "./Media/mobileprogress2.png";
import Logo from "./Media/KleanUp.png";
import { Link } from "react-router-dom";

function Signup() {
  const myCustomColor = "#FAFAFA";
  const myCustomColor1 = "#3DA5EC";

  return (
    <>
      <div>
        <div className="flex lg:justify-center mt-16">
          <img
            className="h-8 w-24 relative right-[-12%] lg:right-0 lg:w-24 object-contain"
            src={Logo}
          />
        </div>
        <div className="relative left-12 lg:left-1/4 justify-center pt-9 w-3/4 ">
          <img
            className="h-12 w-2/3 object-contain lg:block hidden"
            src={Professional}
          />
          <img
            className="h-12 object-contain lg:hidden block"
            src={Mobileprogress2}
          />
          <div className="lg:flex space-x-16 font-semibold hidden -ml-10">
            <p>Personal Details</p>
            <p className="left-2 relative">Contact information</p>
            <p className="right-2 relative">Professional information</p>
            <p>Banking history</p>
          </div>
        </div>
      </div>
      <div className="lg:w-2/5 h-fit shadow-lg relative  lg:left-96 lg:ml-10 mt-10 -pb-20">
        <div className="relative right-9 top-10">
          <div className="top-0  relative ">
            <label className="-mt-8 top-7 left-20 relative whitespace-nowrap font-semibold">
              Bank name
            </label>
            <input
              type="text"
              placeholder="NexaBank"
              className="border-gray-200 mt-11 ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
              style={{ backgroundColor: myCustomColor }}
            />
          </div>

          <div className="top-0  relative ">
            <label className="-mt-8 top-7 left-20 relative whitespace-nowrap font-semibold">
              Account number
            </label>
            <input
              type="number"
              placeholder="8326738292847"
              className="border-gray-200 mt-11 ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
              style={{ backgroundColor: myCustomColor }}
            />
          </div>

          <div className="top-0  relative ">
            <label className="-mt-8 top-7 left-20 relative whitespace-nowrap font-semibold">
              Routing number (For direct deposit)
            </label>
            <input
              type="email"
              placeholder="piersmorgan@gmail.com"
              className="border-gray-200 mt-11 ml-20 rounded-md border-2 text-sm placeholder-black w-5/6 px-10 pl-6 py-3 focus:outline-none"
              style={{ backgroundColor: myCustomColor }}
            />
          </div>
          <Link to="/Banking">
            <input
              type="submit"
              value="Next"
              className=" flex-1 text-white items-center my-40 top-40 border-gray-500 border-opacity-10 border-2 rounded-md ml-20 h-3/2 w-5/6 p-2 mt-12 cursor-pointer"
              style={{ backgroundColor: myCustomColor1 }}
            />
          </Link>
        </div>
      </div>
      <div className="h-40 mt-20"></div>
    </>
  );
}

export default Signup;
