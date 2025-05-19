import React from 'react'
import CurrentTime from '../components/CurrentTime'
import IslamicDate from '../components/IslamicDate'
import Video from '../components/Video'

const Dashboard = () => {
  return (
    <>
      <div className='w-full  flex justify-end  overflow-y-auto overflow-x-hidden py-4'>
        <span className='w-4/4 flex  justify-between'>
          <span className='w-2/4 flex  items-center'><IslamicDate /></span>
          <span className='w-2/4 flex justify-end items-center'><CurrentTime /></span>


        </span>

      </div>
      <div className='flex flex-wrap justify-around items-center'>
        {/* <Videos videoUrl={'tQHAwV9B8hQ'} />
        <Videos videoUrl={'yMg4DXHQooc'} />
        <Videos videoUrl={'c-1VpxPwDcU'} /> */}

        <Video videoUrl={'tQHAwV9B8hQ'}/>
        <Video videoUrl={'yMg4DXHQooc'}/>
        <Video videoUrl={'c-1VpxPwDcU'}/>
      </div>

    </>
  )
}

export default Dashboard