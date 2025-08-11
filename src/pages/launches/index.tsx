import { getCrew } from "@/api/getCrew";
import { getPayload } from "@/api/getPayload";
import { getRocket } from "@/api/getRocket";
import CardComponent from "@/components/layout/launches/card";
import LaunchesFilters from "@/components/layout/launches/filters";
import FullScreenCard from "@/components/layout/launches/fullscreenCard";

import { useLaunches } from "@/hooks/useLaunches";
import { useLaunchesStore } from "@/state/useLanchesStore";
import { useEffect } from "react";

function LaunchesPage() {
  const { data, isLoading, error } = useLaunches();

  const launches = useLaunchesStore((state) => state.launches);
  const setLaunches = useLaunchesStore((state) => state.setLaunches);
  const selectedLaunch = useLaunchesStore((state) => state.selectedLaunch);
  const setSelectedLaunch = useLaunchesStore(
    (state) => state.setSelectedLaunch
  );
  const dateRange = useLaunchesStore((state) => state.dateRange);
  const successFilter = useLaunchesStore((state) => state.successFilter);
  const upcomingFilter = useLaunchesStore((state) => state.upcomingFilter);
  const setRocket = useLaunchesStore((state) => state.setRocket);
  const setPayloads = useLaunchesStore((state) => state.setPayloads);
  const setCrew = useLaunchesStore((state) => state.setCrew);

  useEffect(() => {
    if (data) {
      setLaunches(data);
    }
  }, [data, setLaunches]);

  useEffect(() => {
    const fetchRocketAndPayloads = async () => {
      if (selectedLaunch) {
        const rocket = await getRocket(selectedLaunch.rocket);
        const payloads = await Promise.all(
          selectedLaunch.payloads.map((id) => getPayload(id))
        );

        const crew = await Promise.all(
          selectedLaunch.crew.map((id) => getCrew(id))
        );

        setRocket(rocket);
        setPayloads(payloads);
        setCrew(crew);
      } else {
        setRocket(null);
        setPayloads([]);
        setCrew([]);
      }
    };

    fetchRocketAndPayloads();
  }, [selectedLaunch, setCrew, setPayloads, setRocket]);

  useEffect(() => {
    if (selectedLaunch) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedLaunch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading launches: {error.message}</div>;
  }

  const filteredLaunches = launches.filter((launch) => {
    const isInDateRange =
      (!dateRange[0] || new Date(launch.date_utc) >= dateRange[0]) &&
      (!dateRange[1] || new Date(launch.date_utc) <= dateRange[1]);

    const isSuccessFilterMatch =
      successFilter === "all" ||
      (successFilter === "success" && launch.success) ||
      (successFilter === "failed" && !launch.success);

    const isUpcomingFilterMatch =
      upcomingFilter === "all" ||
      (upcomingFilter === "upcoming" &&
        new Date(launch.date_utc) > new Date()) ||
      (upcomingFilter === "finished" &&
        new Date(launch.date_utc) <= new Date());

    return isInDateRange && isSuccessFilterMatch && isUpcomingFilterMatch;
  });

  return (
    <div className="flex flex-col h-screen bg-background dark">
      <div className="p-4 border-b-4">
        <img
          src="spacex-logo-black.png"
          alt="Space-X Image"
          className="w-[50vw] mx-auto pb-2 brightness-0 invert"
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <LaunchesFilters />
        <div
          className={`flex-1 p-4 ${
            selectedLaunch ? "overflow-hidden" : "overflow-y-auto"
          }`}
          style={{ scrollbarGutter: "stable" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredLaunches.map((launch) => (
              <CardComponent
                key={launch.id}
                launch={launch}
                onClick={() => setSelectedLaunch(launch)}
              />
            ))}
          </div>

          {selectedLaunch && (
            <FullScreenCard
              launch={selectedLaunch}
              onClose={() => setSelectedLaunch(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LaunchesPage;
