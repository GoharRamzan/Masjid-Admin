import React from 'react'
import CurrentTime from '../components/CurrentTime'
import Videos from '../components/videos'

const Dashboard = () => {
  return (
    <>
    <div className='w-full h-full flex justify-end  overflow-y-auto overflow-x-hidden'>
      <span className='w-1/4 flex  '>
      <CurrentTime />
      </span>
      
    </div>
    <Videos/>
    </>
  )
}

export default Dashboard