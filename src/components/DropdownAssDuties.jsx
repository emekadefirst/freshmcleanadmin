import React, { useState } from "react";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    console.log(`Selected: ${item}`);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <p className="cursor-pointer px-5 text-gray-400 flex items-center" onClick={handleToggle}>
        Assign Duties &nbsp;
        <FontAwesomeIcon icon={faChevronDown} />
      </p>
      {isOpen && (
        <div className="absolute -right-20 mt-2 w-56 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none z-10">
          <div className="py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleSelect('Duty 1')}
            >
              Duty 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleSelect('Duty 2')}
            >
              Duty 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleSelect('Duty 3')}
            >
              Duty 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
