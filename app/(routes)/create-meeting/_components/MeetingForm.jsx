"use client";

import { ChevronLeft } from "lucide-react";
import React, { useEffect, useState } from "react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LocationOption from "@/app/_utils/LocationOption";
import Image from "next/image";
import Link from "next/link";
import ThemeOptions from "@/app/_utils/ThemeOptions";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/Firebase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function MeetingForm({setFormValue}) {
  
    const db = getFirestore(app);
    const router = useRouter();

 const [themeColor, setThemeColor] = useState('');
 const [eventName, setEventName] = useState('');
 const [duration, setDuration] = useState(30);
 const [locationType, setLocationType] = useState();
 const [locationUrl, setLocationUrl] = useState('');
 const {user}=useKindeBrowserClient();
 
  
 useEffect(()=>{
    setFormValue({
        eventName:eventName,
        duration:duration,
        locationType:locationType,
        locationUrl:locationUrl,
        themeColor:themeColor,
    })

 },[eventName, duration, locationType, locationUrl, themeColor])


 const onCreateHandler = async() => {
    const id = Date.now().toString();

    await setDoc(doc(db,'MeetingEvent',id),{
       id: id,
       eventName: eventName,
       duration: duration,
       locationType: locationType,
       locationUrl: locationUrl,
       themeColor: themeColor,
       businessId: doc(db,'Business',user?.email),
       createdBy:user?.email,
    }).then((response) => {
        toast('New Meeting Event Created!')
        router.replace('/dashboard/meeting-type')
    })
 }


  return (
    <div className="p-8">
      <Link href={'/dashboard'}>
        <h2 className="flex gap-2">
            <ChevronLeft></ChevronLeft> Cancel
        </h2>
      </Link>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name*</h2>
        <Input onChange={(event)=>setEventName(event.target.value)} placeholder="Name of your meeting event"></Input>
        <h2 className="font-bold">Duration*</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              {duration} Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setDuration(15)}>15 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(30)}>30 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(45)}>45 Min</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setDuration(60)}>60 Min</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
        <div className="grid grid-cols-4 gap-3">
            {
                LocationOption.map((option, idx) => (
                  
                    <div onClick={() => setLocationType(option.name)} key={idx} className={`border flex hover:bg-blue-100 hover:border-primary cursor-pointer flex-col justify-center items-center p-3 ${ locationType == option.name && 'bg-blue-100 border-primary'} rounded-lg`}>
                        <Image src={option.icon} width={30} height={30} alt={option.name}></Image>
                        <h2>{option.name}</h2>
                    </div>

                ))
            }
        </div>
        {
            locationType && (<>
                <h2 className="font-bold ">Add {locationType} Url</h2>
                <Input onChange={(event) => setLocationUrl(event.target.value)} placeholder='Add url'></Input>
            </>)
        }
        <h2 className="font-bold">Select Theme Color</h2>
        <div className="flex justify-evenly">
            {
               ThemeOptions?.map((color,idx)=>(
                 <div key={idx} className={`h-7 w-7 cursor-pointer rounded-full ${themeColor==color && 'border-4 border-black'}`}
                  style={{backgroundColor:color}}
                  onClick={ () => setThemeColor(color)}
                 ></div>
               ))
            }
        </div>
      </div>
       <Button disabled={(!eventName || !duration || !locationType || !locationUrl)}  className='w-full mt-5' onClick={onCreateHandler}>Create</Button>
       
    </div>
  );
}

export default MeetingForm;
