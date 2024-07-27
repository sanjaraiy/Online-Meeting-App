
import React from 'react'
import { Input } from '@/components/ui/input'
import MeetingEventList from './_components/MeetingEventList'



function MeetingType() {
  
  return (
    <div className='p-5'>
     <div className='flex flex-col gap-5'>
     <h2 className='fontfbold text-3xl'>Meeting Event Type</h2>
     <Input placeholder='Search here...'  className='max-w-xs'></Input>
     <hr />
     </div>
     <MeetingEventList></MeetingEventList>
    </div>
  )
}

export default MeetingType