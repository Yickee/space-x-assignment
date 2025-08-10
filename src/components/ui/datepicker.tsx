"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({
  dateRange,
  setDateRange,
}: React.ComponentProps<typeof Calendar> & {
  dateRange: [Date | undefined, Date | undefined];
  setDateRange: (dateRange: [Date | undefined, Date | undefined]) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!dateRange[0] && !dateRange[1]}
          className="data-[empty=true]:text-muted-foreground data-[empty=false]:text-card-foreground w-full justify-start text-left font-normal"
        >
          <CalendarIcon />
          {dateRange[0] && dateRange[1] ? (
            `${format(dateRange[0], "PPP")} - ${format(dateRange[1], "PPP")}`
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={{ from: dateRange[0], to: dateRange[1] }}
          onSelect={(range) => {
            if (range) {
              setDateRange([range.from, range.to]);
            }
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
