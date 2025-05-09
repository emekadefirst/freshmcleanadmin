import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//     faAnglesLeft,
//     faAnglesRight
// } from "@fortawesome/free-solid-svg-icons";

const Calendar = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const renderDays = () => {
    const daysInMonth = selectedDate.daysInMonth();
    const firstDayOfMonth = selectedDate.startOf('month').day();
    const daysArray = Array.from({ length: daysInMonth }, (_, index) =>
      dayjs(selectedDate).set('date', index + 1)
    );

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.unshift(null);
    }

    return daysArray.map((day, index) => (
      <div
        key={index}
        className={`p-1 text-center ${
          day
            ? `cursor-pointer ${
                day.isSame(selectedDate, 'day') ? 'bg-blue-700 rounded-lg text-white' : 'hover:bg-gray-200'
              }`
            : 'bg-gray-100'
        }`}
        onClick={() => day && handleDateSelect(day)}
      >
        {day ? day.format('D') : ''}
      </div>
    ));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <div className="mt-5 w-96 border-2 p-4 rounded-lg">
      {/* <div className="flex justify-between items-center mb-3">
        <button onClick={() => setSelectedDate(selectedDate.subtract(1, 'month'))}>
        <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
        <h2 className="text-lg font-bold">{selectedDate.format('MMMM YYYY')}</h2>
        <button onClick={() => setSelectedDate(selectedDate.add(1, 'month'))}>
        <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        <div className="p-2 font-bold">Su</div>
        <div className="p-2 font-bold">Mo</div>
        <div className="p-2 font-bold">Tu</div>
        <div className="p-2 font-bold">We</div>
        <div className="p-2 font-bold">Th</div>
        <div className="p-2 font-bold">Fr</div>
        <div className="p-2 font-bold">Sa</div>
        {renderDays()}
      </div> */}
    </div>
  );
};

export default Calendar;
