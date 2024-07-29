import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarCheck, Clock, Timer } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ScheduledMeetingList({ meetingList }) {
  return (
    <div>
      {meetingList &&
        meetingList.map((meeting, idx) => (
          <Accordion type="single" collapsible key={idx}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
              <AccordionContent>
                <div>
                  <div className="mt-5 flex flex-col gap-4">
                    <h2 className="flex gap-2">
                      <Clock></Clock> {meeting?.duration} Min
                    </h2>

                    <h2 className="flex gap-2">
                      <CalendarCheck></CalendarCheck> {meeting.formatedDate}
                    </h2>
                    { 
                      <h2 className="flex gap-2">
                        <Timer></Timer> {meeting.selectedTime}
                      </h2>
                    }
                    <Link
                      className="text-primary"
                      href={meeting?.locationUrl ? meeting?.locationUrl : "#"}
                    >
                      {meeting?.locationUrl}
                    </Link>
                  </div>
                 <Link href={meeting?.locationUrl}>
                     <Button className='mt-5'>Join Now</Button>
                 </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
}

export default ScheduledMeetingList;
