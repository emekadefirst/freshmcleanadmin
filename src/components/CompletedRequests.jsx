/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import DashboardTemp from './DashboardTemp'

import Smilinglady from "./Media/smilinglady.png";
import Rating from "./Media/rating.png";

function CompletedRequests() {
  return (
    <>
        <div>
            <DashboardTemp AltNav={true} Color1='#3DA5EC' tempColor1='black' ValueInText1={75} NavText="Cleaning Requests" showAdditionalDiv2={true}/>
            {/* {showAdditionalDiv5 && ( */}
          <div className="w-3/5 h-screen-1 bg-white p-8 z-50 top-0 absolute left-1/3 ml-20 rounded-lg">
            <div>
              <FontAwesomeIcon
                icon={faXmark}
                className="border-2 py-1 cursor-pointer border-black px-2 rounded-2xl font-semibold float-right"
              />
              <p className="font-semibold text-2xl mb-10">List of cleaners</p>
            </div>
            <div className="flex space-x-12 mb-10">
              <div className="border-2 p-5 rounded-lg w-80">
                <p className="absolute text-green-800 bg-emerald-50 px-4 rounded-2xl top-36 left-56">
                  Available
                </p>

                <img src={Smilinglady} className="w-80" />
                <div>
                  <div>
                    <div className="mt-5">
                      <p>Name</p>
                      <p className="float-right font-semibold">Megan clark</p>
                    </div>
                    <div className="mt-5">
                      <p>Contact</p>
                      <p className="float-right font-semibold">
                        +65 8293 8383 0922
                      </p>
                    </div>
                    <div className="mt-5">
                      <p>Overall rating</p>
                      <img src={Rating} className="w-20 float-right" />
                    </div>
                    <button className="px-24 w-72 relative right-1 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
                      Assign job
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-2 p-5 rounded-lg w-80 relative -1/2">
                <p className="absolute text-green-800 bg-emerald-50 px-4 rounded-2xl top-10 left-48">
                  Available
                </p>
                <img src={Smilinglady} className="w-80" />
                <div>
                  <div>
                    <div className="mt-5">
                      <p>Name</p>
                      <p className="float-right font-semibold">Megan clark</p>
                    </div>
                    <div className="mt-5">
                      <p>Contact</p>
                      <p className="float-right font-semibold">
                        +65 8293 8383 0922
                      </p>
                    </div>
                    <div className="mt-5">
                      <p>Overall rating</p>
                      <img src={Rating} className="w-20 float-right" />
                    </div>
                    <button className="px-24 w-72 relative right-1 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
                      Assign job
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-12 mb-10">
              <div className="border-2 p-5 rounded-lg w-80">
                <p className="absolute text-green-800 bg-emerald-50 px-4 rounded-2xl mt-5 left-56">
                  Available
                </p>
                <img src={Smilinglady} className="w-80" />
                <div>
                  <div>
                    <div className="mt-5">
                      <p>Name</p>
                      <p className="float-right font-semibold">Megan clark</p>
                    </div>
                    <div className="mt-5">
                      <p>Contact</p>
                      <p className="float-right font-semibold">
                        +65 8293 8383 0922
                      </p>
                    </div>
                    <div className="mt-5">
                      <p>Overall rating</p>
                      <img src={Rating} className="w-20 float-right" />
                    </div>
                    <button className="px-24 w-72 relative right-1 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
                      Assign job
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-2 p-5 rounded-lg w-80 relative -1/2">
                <p className="absolute text-green-800 bg-emerald-50 px-4 rounded-2xl top-10 left-48">
                  Available
                </p>
                <img src={Smilinglady} className="w-80" />
                <div>
                  <div>
                    <div className="mt-5">
                      <p>Name</p>
                      <p className="float-right font-semibold">Megan clark</p>
                    </div>
                    <div className="mt-5">
                      <p>Contact</p>
                      <p className="float-right font-semibold">
                        +65 8293 8383 0922
                      </p>
                    </div>
                    <div className="mt-5">
                      <p>Overall rating</p>
                      <img src={Rating} className="w-20 float-right" />
                    </div>
                    <button className="px-24 w-72 relative right-1 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
                      Assign job
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-12 mb-10">
              <div className="border-2 p-5 rounded-lg w-80">
                <p className="absolute text-green-800 bg-emerald-50 px-4 rounded-2xl mt-5 left-56">
                  Available
                </p>
                <img src={Smilinglady} className="w-80" />
                <div>
                  <div>
                    <div className="mt-5">
                      <p>Name</p>
                      <p className="float-right font-semibold">Megan clark</p>
                    </div>
                    <div className="mt-5">
                      <p>Contact</p>
                      <p className="float-right font-semibold">
                        +65 8293 8383 0922
                      </p>
                    </div>
                    <div className="mt-5">
                      <p>Overall rating</p>
                      <img src={Rating} className="w-20 float-right" />
                    </div>
                    <button className="px-24 w-72 relative right-1 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
                      Assign job
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-2 p-5 rounded-lg w-80 relative -1/2">
                <p className="absolute text-green-800 bg-emerald-50 px-4 rounded-2xl top-10 left-48">
                  Available
                </p>
                <img src={Smilinglady} className="w-80" />
                <div>
                  <div>
                    <div className="mt-5">
                      <p>Name</p>
                      <p className="float-right font-semibold">Megan clark</p>
                    </div>
                    <div className="mt-5">
                      <p>Contact</p>
                      <p className="float-right font-semibold">
                        +65 8293 8383 0922
                      </p>
                    </div>
                    <div className="mt-5">
                      <p>Overall rating</p>
                      <img src={Rating} className="w-20 float-right" />
                    </div>
                    <button className="px-24 w-72 relative right-1 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
                      Assign job
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-12 mb-10">
              <div className="border-2 p-5 rounded-lg w-80">
                <p className="absolute text-green-800 bg-emerald-50 px-4 rounded-2xl mt-5 left-56 w-24">
                  Available
                </p>
                <img src={Smilinglady} className="w-80" />
                <div>
                  <div>
                    <div className="mt-5">
                      <p>Name</p>
                      <p className="float-right font-semibold">Megan clark</p>
                    </div>
                    <div className="mt-5">
                      <p>Contact</p>
                      <p className="float-right font-semibold">
                        +65 8293 8383 0922
                      </p>
                    </div>
                    <div className="mt-5">
                      <p>Overall rating</p>
                      <img src={Rating} className="w-20 float-right" />
                    </div>
                    <button className="px-24 w-72 relative right-1 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
                      Assign job
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-2 p-5 rounded-lg w-80 relative -1/2">
                <p className="absolute text-green-800 bg-emerald-50 px-4 rounded-2xl top-10 left-48">
                  Available
                </p>
                <img src={Smilinglady} className="w-80" />
                <div>
                  <div>
                    <div className="mt-5">
                      <p>Name</p>
                      <p className="float-right font-semibold">Megan clark</p>
                    </div>
                    <div className="mt-5">
                      <p>Contact</p>
                      <p className="float-right font-semibold">
                        +65 8293 8383 0922
                      </p>
                    </div>
                    <div className="mt-5">
                      <p>Overall rating</p>
                      <img src={Rating} className="w-20 float-right" />
                    </div>
                    <button className="px-24 w-72 relative right-1 py-2 text-white bg-blue-500 whitespace-nowrap mt-12 rounded-lg">
                      Assign job
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* )} */}
            <div>

            </div>
      </div>
    </>
  )
}

export default CompletedRequests
