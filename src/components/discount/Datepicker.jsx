import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Button } from "../ui/button";

function Datepicker({ value, onChange, placeholder }) {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        style={{ backgroundColor: "white", color: "#004368" }}
      >
        <Button
          variant="outline"
          className={cn(
            "w-full sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[700px] justify-start text-left font-normal bg-white text-[#004368]",
            !value && "text-muted-foreground"
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
  );
}

export default Datepicker;
