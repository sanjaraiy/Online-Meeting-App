"use client";

import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { interval } from "date-fns";
import { Button } from "@/components/ui/button";

function PreviewMeeting({ formValue }) {
    console.log(formValue);
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState();

  useEffect(() => {

    formValue?.duration && createTimeSlot(formValue?.duration);
  }, [formValue]);

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

  console.log(formValue?.themeColor);

  return (
    <div className="p-5 py-10 shadow-lg m-5 border-t-8"
     style={{borderTopColor:formValue?.themeColor}}
    >
      <Image src="/logo.svg" alt="logo" width={50} height={50}></Image>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Meeting Info */}
        <div className="p-4 border-r">
          <h2>Business Name</h2>
          <h2 className="font-bold text-2xl">
            {formValue?.eventName ? formValue?.eventName : "Meeting Name"}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            <h2 className="flex gap-2">
              <Clock></Clock> {formValue?.duration} Min
            </h2>
            <h2 className="flex gap-2">
              <MapPin></MapPin> {formValue?.locationType} Meeting
            </h2>
            <Link
              className="text-primary"
              href={formValue?.locationUrl ? formValue?.locationUrl : "#"}
            >
              {formValue?.locationUrl}
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
              onSelect={setDate}
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

export default PreviewMeeting;
