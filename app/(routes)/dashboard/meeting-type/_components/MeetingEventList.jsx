"use client";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { app } from "@/config/Firebase";
import { getFirestore, orderBy } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Clock, Copy, MapPin, Pen, Settings, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function MeetingEventList() {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [eventList, setEventList] = useState([]);
  const [businessInfo,setBusinessInfo] = useState();
  useEffect(() => {
    user && getEventList();
    user && BusinessInfo();
  }, [user]);

  const getEventList = async () => {
    setEventList([]);

    const q = query(
      collection(db, "MeetingEvent"),
      where("createdBy", "==", user?.email),
      orderBy("id", "desc")
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setEventList((prevEvent) => [...prevEvent, doc.data()]);
    });
  };

  const onDeleteMeetingHandler = async(event) => {
      await deleteDoc(doc(db, "MeetingEvent",event?.id))
      .then((response) => {
        toast('Meeting Event is Deleted..!!')
        
      } )
  }
  const BusinessInfo= async()=>{
    const docRef = doc(db,'Business',user?.email);
    const docSnap = await getDoc(docRef);
    setBusinessInfo(docSnap.data());
  }

  const onCopyClickHandler = (event) => {
    const meetingEventUrl = process.env.NEXT_PUBLIC_BASE_URL+'/'+businessInfo.businessName+'/'+event?.id
    navigator.clipboard.writeText(meetingEventUrl);
    toast("Url Copied to Clipboard");
  } 

 

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3">
      {eventList.length > 0 ? (
        eventList?.map((event, idx) => (
          <div key={idx}
            className="border p-5 shadow-md border-t-8 rounded-lg flex flex-col gap-3"
            style={{ borderTopColor: event?.themeColor }}
          >
            <div className="flex justify-end">
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                     <Settings className="cursor-pointer"></Settings>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  
                  
                  <DropdownMenuItem className='flex gap-2'><Pen></Pen> Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={()=> onDeleteMeetingHandler(event)} className='flex gap-2'><Trash></Trash> Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="font-medium text-xl">{event?.eventName}</h2>
            <div className="flex justify-between">
              <h2 className="flex gap-2 text-gray-500">
                <Clock></Clock> {event?.duration} Min
              </h2>
              <h2 className="flex gap-2 text-gray-500">
                <MapPin></MapPin> {event?.locationType}{" "}
              </h2>
            </div>
            <hr />
            <div className="flex justify-between">
              <h2
                className="flex gap-2 text-sm text-primary items-center cursor-pointer"
                onClick={() => {
                  onCopyClickHandler(event)
                 
                }}
              >
                <Copy className="h-5 w-5"></Copy> Copy Link
              </h2>
              <Button className="rounded-lg">Share</Button>
            </div>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
export default MeetingEventList;
