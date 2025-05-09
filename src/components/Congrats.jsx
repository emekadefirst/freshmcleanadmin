import Banking from "./Media/banking.png";
import Mobileprogress4 from "./Media/mobileprogress4.png";
import Logo from "./Media/KleanUp.png";
import CongratsLogo from "./Media/congratslogo.png";
import { Link } from "react-router-dom";

function Signup() {
  //   const myCustomColor = "#FAFAFA";
  const myCustomColor1 = "#3DA5EC";

  return (
    <>
      <div>
        <div className="flex justify-center mt-16">
          <img
            className="h-8 w-24 relative right-[25%] lg:w-20 object-contain"
            src={Logo}
          />
        </div>
        <div className="relative left-12 lg:left-1/4 justify-center pt-9 w-3/4 ">
          <img
            className="h-12 w-2/3 object-contain lg:block hidden"
            src={Banking}
          />
          <img
            className="h-12 object-contain lg:hidden block"
            src={Mobileprogress4}
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
        <div className="relative lg:right-9 right-12 top-10">
          <div className="top-0 text-sm ext-base  relative justify-center w-96 text-center ml-11 lg:ml-28">
            <img src={CongratsLogo} className="h-20 ml-20 relative left-20" />
            <h2 className="font-semibold text-xl mt-12">
              Congratulations you have successfully registered to KleanUp
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Maecenas sagittis faucibus
              mauris lectus turpis.
            </p>
          </div>

          <Link to="/WelcomeDashboard">
            <input
              type="submit"
              value="Go to my Dashboard"
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
