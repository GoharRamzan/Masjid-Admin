import React from 'react'
import CurrentTime from '../components/CurrentTime'

const Dashboard = () => {
  return (
    <div className='w-full h-full flex justify-end  overflow-y-auto overflow-x-hidden'>
      <span className='w-1/4 flex  '>
      <CurrentTime />
      </span>
    </div>
  )
}

export default Dashboard