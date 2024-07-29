import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import React from 'react'

function TimeDateSelection({date,onChangeDateHandler,timeSlots,setSelectedTime,enableTimeSlot,selectedTime,prevBooking}) {
  
  
     const checkTimeSlot=(time)=>{
         return prevBooking.filter((item) => item.selectedTime==time).length>0;
     }
  
  return (
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
          disabled={!enableTimeSlot || checkTimeSlot(time)}
          key={idx}
          className={`border-primary text-primary ${time==selectedTime && 'bg-primary text-white' }`}
          variant="outline"
          onClick={()=>setSelectedTime(time)}
        >
          {time}
        </Button>
      ))}
    </div>
  </div>
  )
}

export default TimeDateSelection