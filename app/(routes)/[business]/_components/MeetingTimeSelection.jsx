"use client";

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import { format } from "date-fns";

function MeetingTimeSelection({eventInfo, businessInfo}) {
    
    const [date, setDate] = useState(new Date());
    const [timeSlots, setTimeSlots] = useState();
    const [enableTimeSlot,setEnabledTimeSlot] = useState(false);
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
              <Link
                className="text-primary"
                href={eventInfo?.locationUrl ? eventInfo?.locationUrl : "#"}
              >
                {eventInfo?.locationUrl}
              </Link>
            </div>
          </div>
          {/* Time & Date Selection */}
          <div className="md:col-span-2 flex px-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-lg">Select Date & Time</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(d)=>onChangeDateHandler(d)}
                className="rounded-md border mt-5"
                disabled={(date) => date <= new Date()}
              />
            </div>
            <div
              className="flex flex-col overflow-auto gap-4 p-5"
              style={{ maxHeight: "400px" }}
            >
              {timeSlots?.map((time, idx) => (
                <Button
                  disabled={!enableTimeSlot}
                  key={idx}
                  className="border-primary text-primary"
                  variant="outline"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default MeetingTimeSelection