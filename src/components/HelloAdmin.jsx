import Logo from "./Media/KleanUp.png";
import AuthTemplate from "./AuthTemplate.jsx";
import { Link } from "react-router-dom";

function HelloAdmin() {
  const myCustomColor = "#3DA5EC";

  return (
    <>
      <AuthTemplate />
      <div className="absolute top-12 h-5/6 w-[100%] lg:w-1/3 mx-40 bg-white -left-40  rounded-3xl lg:-left-12 p-7 pt-16 lg:pt-16 lg:p-16 lg:rounded-md  ">
        <div className="">
          <img className="h-12 w-24 object-contain -my-8" src={Logo} />
          <p className="text-xs top-7 relative">
            Lorem ipsum dolor sit amet consectetur. Feugiat tincidunt sem sem
            nulla consectetur morbi.
          </p>
        </div>
        <div className=" flex-1 items-center relative my-20 border-gray-500 border-opacity-10 border-2 rounded-md h-4/5 lg:w-80 p-8">
          <div className="flex-1 text-center top-5 relative items-center justify-center">
            <h3 className="font-bold ">Hello admin</h3>
            <p className="text-sm ">Welcome back to Kleanup!</p>
          </div>
          <div className="my-14 ">
          <Link to="/signup">
            <button
              className="w-5/6 h-1/6 mx-6 text-white justify-center  rounded-md p-2"
              style={{ backgroundColor: myCustomColor }}
            >
              Register
            </button>
            </Link>
            <br />
            <br />
            <Link to="/LoginPage">
              {" "}
              <button
                className="w-5/6 h-1/6 mx-6 text-white justify-center  rounded-md p-2"
                style={{ backgroundColor: myCustomColor }}
              >
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HelloAdmin;
