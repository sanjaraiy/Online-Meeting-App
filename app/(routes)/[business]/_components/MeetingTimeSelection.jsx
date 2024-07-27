"use client";

import { Clock, MapPin, Timer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import TimeDateSelection from "./TimeDateSelection";
import UserFormInfo from "./UserFormInfo";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from "@/config/Firebase";
import { toast } from "sonner";

function MeetingTimeSelection({eventInfo, businessInfo}) {
    
    const [date, setDate] = useState(new Date());
    const [timeSlots, setTimeSlots] = useState();
    const [enableTimeSlot,setEnabledTimeSlot] = useState(false);
    const [selectedTime,setSelectedTime]=useState();
    const [step, setStep] = useState(1);
   

    const [userName, setUserName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userMessage, setUserMessage] = useState('');

    const db = getFirestore(app);


    useEffect(() => {
  
      eventInfo?.duration && createTimeSlot(eventInfo?.duration);
    }, [eventInfo]);
  
    const createTimeSlot = (interval) => {
      const startTime = 8 * 60; // 8 AM in min
      const endTime = 22 * 60; // 10 Pm in min
      const totalSlots = (endTime - startTime) / interval;
  
      const slots = Array.from({ length: totalSlots }, (_, i) => {
        const totalMinutes = startTime + i * interval;
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedHours = hours > 12 ? hours - 12 : hours; //Convert to 12-hour format
        const period = hours >= 12 ? "PM" : "AM";
        return `${String(formattedHours).padStart(2, "0")} : ${String(
          minutes
        ).padStart(2, "0")} ${period}`;
      });
  
      setTimeSlots(slots);
    };
  

 const onChangeDateHandler = (date) => {
    setDate(date);
    const date = format(date,'EEEE');
    if(businessInfo?.daysAvailable?.[day]){
      setEnabledTimeSlot(true);
    }else{
      setEnabledTimeSlot(false);
    }
 }
  
const onScheduleEventHandler = async () => {
      
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if(regex.test(userEmail)==false){
            toast('Invalid Email address..!!')
            return;
        }
       
       const docId = Date.now().toString();
       
       await setDoc(doc(db,'ScheduledMeetings',docId),{
          businessName:businessInfo.businessName,
          businessEmail:businessInfo.email,
          selectedTime:businessInfo.selectedTime,
          selectedDate:date,
          duration:eventInfo.duration,
          location:eventInfo.locationUrl,
          eventId:eventInfo.id,
          id:docId,
          userName:userName,
          userEmail:userEmail,
          userMessage:userMessage,
       }).then((response) => {
          toast('Meeting Scheduled successfully..!!');
       })
      
}

    return (
      <div className="p-5 py-10 shadow-lg m-5 border-t-8 mx-10 md:mx-26 lg:mx-56 my-10"
       style={{borderTopColor:eventInfo?.themeColor}}
      >
        <Image src="/logo.svg" alt="logo" width={50} height={50}></Image>
  
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Meeting Info */}
          <div className="p-4 border-r">
            <h2>{businessInfo?.businessName}</h2>
            <h2 className="font-bold text-2xl">
              {eventInfo?.eventName ? eventInfo?.eventName : "Meeting Name"}
            </h2>
            <div className="mt-5 flex flex-col gap-4">
              <h2 className="flex gap-2">
                <Clock></Clock> {eventInfo?.duration} Min
              </h2>
              <h2 className="flex gap-2">
                <MapPin></MapPin> {eventInfo?.locationType} Meeting
              </h2>
              <h2 className="flex gap-2">
                <CalendarCheck></CalendarCheck> {format(date,'PPP')} 
              </h2>
              {
                selectedTime && <h2 className="flex gap-2">
                <Timer></Timer> {selectedTime} 
              </h2>
              }
              <Link
                className="text-primary"
                href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              >
                {eventInfo?.locationUrl}
              </Link>
            </div>
          </div>
          {/* Time & Date Selection */}
          {
            step==1 ? ( <TimeDateSelection
            date={date}
            enableTimeSlot={enableTimeSlot}
            onChangeDateHandler={onChangeDateHandler}
            setSelectedTime={setSelectedTime}
            selectedTime={selectedTime}
            timeSlots={timeSlots}
          ></TimeDateSelection>) : (<UserFormInfo
            setUserName={setUserName} setUserEmail={setUserEmail} setUserMessage={setUserMessage}
           ></UserFormInfo>)
          }
        </div>
        <div className="mb-16">
         {
            step==2 && <Button variant="outline" onClick={()=>setStep(1)}>Back</Button>
         }
         {
            step==1 ? ( <Button disabled={!selectedTime || !date} onClick={()=>setStep(step+1)} className='mt-10 float-right'>Next
            </Button>) : (<Button onClick={onScheduleEventHandler} disabled={!userEmail || !userName}>Schedule</Button>)
         }
        </div>
        
      </div>
    );
}

export default MeetingTimeSelection