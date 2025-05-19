import React from 'react';
import moment from 'moment-hijri';

const IslamicDate = () => {
  const todayHijri = moment().format('iD iMMMM'); // e.g., 11 Shawwal

  return (
    <div className="text-center flex flex-col md:block justify-center items-center text-xl font-semibold  mt-6">
    <span className=''>Today Date :</span> 
    <span className="font-bold text-green-700 ">{todayHijri}</span>
    </div>
  );
};

export default IslamicDate;
