import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



import {
    faChevronDown
} from "@fortawesome/free-solid-svg-icons";


const PlanSelector = () => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const myCustomColor = "#FAFAFA";

  return (
    <div className="flex items-center 
    mt-12 w-5/6 ">
      <label className='absolute -mt-20 mb-1 font-semibold'>Current plan</label>
      <FontAwesomeIcon className='absolute left-96' icon={faChevronDown} />
      <select
        className="border border-gray-300 rounded p-6  py-3 w-screen focus:outline-none appearance-none"
        value={selectedGender}
        onChange={handleGenderChange}
        style={{ backgroundColor: myCustomColor }}
      >
        <option value="">Monthly plan</option>
        <option value="male">Monthly plan 1</option>
        <option value="female">Monthly plan 2</option>
        <option value="other">Monthly plan 3</option>
      </select>
    </div>
  );
};

export default PlanSelector;
