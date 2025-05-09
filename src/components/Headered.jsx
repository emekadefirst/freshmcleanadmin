// import { FaBel}

const Header = () => {
  return (
    <header className="w-full bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Welcome</h1>
      <div className="flex space-x-4 items-center">
        {/* Notifications Button */}
        <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600">
          {/* <FaBell className="text-white text-lg" /> */}
        </button>

        {/* Profile Picture */}
        <div className="w-10 h-10">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            className="rounded-full w-full h-full object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
