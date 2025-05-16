import React, { useEffect, useState } from 'react'

const CurrentTime = () => {
     const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        // Cleanup on unmount
        return () => clearInterval(timer);
    }, []);
  return (
     <div className='border-2 w-full text-white text-center rounded-2xl text-lg xl:text-2xl py-2 bg-greenback'>{currentTime}</div>
  )
}

export default CurrentTime