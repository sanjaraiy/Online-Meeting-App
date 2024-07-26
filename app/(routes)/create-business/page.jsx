'use client'

import { toast } from "sonner"

import { doc, getFirestore, setDoc } from "firebase/firestore";
import Image from 'next/image'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { app } from "@/config/Firebase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRouter } from "next/navigation";

function CreateBusiness() {

   const [businessName, setBusinessName] = useState('');
   const router = useRouter();
   const db = getFirestore(app);
   const {user} = useKindeBrowserClient();
   const onCreateBusiness = async() => {
       
       await setDoc(doc(db, 'Business', user.email), {
         businessName:businessName,
         email:user.email,
         userName:user.given_name+" "+user.family_name,
       }).then((response) => {
        toast("New Business Successfully Created..!!")
        router.replace('/dashboard');
    })

   }   

  return (
    <div className='p-14 items-center flex flex-col gap-20 my-10'>
        <Image src='/logo.svg' width={30} height={30} alt="logo"></Image>
        <div className='flex flex-col items-center gap-4 max-w-3xl'>
            <h2 className='text-4xl font-bold'>What should we call your business?</h2>
            <p className='text-slate-500'>You can always change this later from settings</p>
            <div className='w-full'>
                <label htmlFor="" className='text-slate-400'>Team Name</label>
                <Input  onChange={(e) => setBusinessName(e.target.value)}  placeholder='Enter team name...' className="mt-2" />
             
            </div>
            <Button  onClick={onCreateBusiness}  className='w-full' disabled={!businessName}>Create Business</Button>
        </div>
    </div>
  )
}

export default CreateBusiness