"use client";

import { doc, getFirestore, updateDoc } from "firebase/firestore";
import DaysList from "@/app/_utils/DaysList";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { app } from "@/config/Firebase";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";

function Availability() {
   
  const [daysAvailable, setDaysAvailable]=useState([]);
  const [startTime, setStartTime]=useState();
  const [endTime, setEndTime] = useState();
   
  const db = getFirestore(app);
  const {user} = useKindeBrowserClient();

  const onChangeHandler = (day, isAvailable) => {
      setDaysAvailable({
        ...daysAvailable,
        [day]:isAvailable
      })
  }

  const onSaveHandler= async() => {
    console.log(daysAvailable, startTime, endTime);
    const docRef = doc(db,'Business',user?.email);
    await updateDoc(docRef, {
       daysAvailable: daysAvailable,
       startTime: startTime,
       endTime: endTime
    }).then((response) => {
       toast('Change Updated..!!')
    })
    
  }

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl">Availability</h2>
      <hr className="my-7" />
      <div>
        <h2 className="font-bold">Availability Days</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 my-3">
          {DaysList.map((item, idx) => (
            <div key={idx} className="">
              <h2>
                <Checkbox  onCheckedChange={(isAvailable) => onChangeHandler(item.day, isAvailable)}/> {item.day}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold mt-10">Availability Time</h2>
        <div className="flex gap-10">
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input type="time" onChange={(e)=>setStartTime(e.target.value)}></Input>
          </div>
          <div className="mt-3">
            <h2>Start Time</h2>
            <Input type="time" onChange={(e)=>setEndTime(e.target.value)}></Input>
          </div>
        </div>
      </div>
      <Button onClick={()=>onSaveHandler()} className='mt-10'>Save</Button>
    </div>
  );
}

export default Availability;
