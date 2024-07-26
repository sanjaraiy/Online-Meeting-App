"use client";

import { ChevronLeft } from "lucide-react";
import React from "react";
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

function MeetingForm() {
  return (
    <div className="p-4">
      <h2 className="flex gap-2">
        <ChevronLeft></ChevronLeft> Cancel
      </h2>
      <div className="mt-4">
        <h2 className="font-bold text-2xl my-4">Create New Event</h2>
        <hr />
      </div>
      <div className="flex flex-col gap-3 my-4">
        <h2 className="font-bold">Event Name*</h2>
        <Input placeholder="Name of your meeting event"></Input>
        <h2 className="font-bold">Duration *</h2>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="max-w-40">
              30 Min
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>15 Min</DropdownMenuItem>
            <DropdownMenuItem>30 Min</DropdownMenuItem>
            <DropdownMenuItem>45 Min</DropdownMenuItem>
            <DropdownMenuItem>60 Min</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <h2 className="font-bold">Location *</h2>
      </div>
    </div>
  );
}

export default MeetingForm;
