import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "../ui/button";

function Datepicker({ value, onChange, placeholder }) {
  return (
    <>
      <Popover>
        <PopoverTrigger
          asChild
          style={{ backgroundColor: "white", color: "#004368" }}
        >
          <Button
            variant="destructive"
            className={cn(
              "w-[700px] justify-start text-left font-normal",
              !value && "text-muted-foreground bg-transparent"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
}

export default Datepicker;
