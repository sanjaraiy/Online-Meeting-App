import { Input } from '@/components/ui/input'
import React, { useState } from 'react'

function UserFormInfo({setUserName,setUserEmail,setUserMessage}) {
   

    

  return (
    <div className='p-4 px-8'>
        <h2 className='font-bold text-xl'>Enter Details</h2>
        <div>
            <h2>Name*</h2>
            <Input onChange={(event) => setUserName(event.target.value)}></Input>
        </div>
        <div>
            <h2>Email*</h2>
            <Input onChange={(event) => setUserEmail(event.target.value)}></Input>
        </div>
        <div>
            <h2>Message</h2>
            <Input onChange={(event) => setUserMessage(event.target.value)}></Input>
        </div>
        <div>
            <h2 className='text-xs text-gray-500'>By Proceeding, you confirm that you read and agree Sanjay Technical terms and conditions</h2>
        </div>
        
    </div>
  )
}

export default UserFormInfo