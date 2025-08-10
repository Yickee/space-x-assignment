import { DatePicker } from "@/components/ui/datepicker";
import { useLaunchesStore } from "@/state/useLanchesStore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

function LaunchesFilters() {
  const dateRange = useLaunchesStore((state) => state.dateRange);
  const setDateRange = useLaunchesStore((state) => state.setDateRange);

  const setSuccessFilter = useLaunchesStore((state) => state.setSuccessFilter);
  const setUpcomingFilter = useLaunchesStore(
    (state) => state.setUpcomingFilter
  );

  const successFilter = useLaunchesStore((state) => state.successFilter);
  const upcomingFilter = useLaunchesStore((state) => state.upcomingFilter);

  return (
    <div className="flex flex-col min-w-[350px] max-w-[350px] w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Filter launches</h1>
      <div className="flex gap-2 mt-4">
        <h2 className="text-lg font-semibold">Date filter</h2>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon color="white" size={16} />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Select 2 dates to create a range. Only launches within this range
              will be shown.
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <DatePicker dateRange={dateRange} setDateRange={setDateRange} />

      <h2 className="text-lg font-semibold mt-4">Success Filter</h2>
      <ToggleGroup
        type="single"
        value={successFilter}
        onValueChange={setSuccessFilter}
        className="w-full"
      >
        <ToggleGroupItem value="all" variant="outline">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="success" variant="outline">
          Successful
        </ToggleGroupItem>
        <ToggleGroupItem value="failed" variant="outline">
          Failed
        </ToggleGroupItem>
      </ToggleGroup>
      <h2 className="text-lg font-semibold mt-4">Upcoming Filter</h2>
      <ToggleGroup
        type="single"
        value={upcomingFilter}
        onValueChange={setUpcomingFilter}
        className="w-full"
      >
        <ToggleGroupItem value="all" variant="outline">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="upcoming" variant="outline">
          Upcoming
        </ToggleGroupItem>
        <ToggleGroupItem value="finished" variant="outline">
          Finished
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

export default LaunchesFilters;
