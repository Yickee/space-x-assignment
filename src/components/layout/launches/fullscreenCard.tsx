import { type Launch } from "@/types/launches";
import { Button } from "@/components/ui/button";
import { DotIcon, XIcon } from "lucide-react";
import { useLaunchesStore } from "@/state/useLanchesStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function FullScreenCard({
  launch,
  onClose,
}: {
  launch: Launch;
  onClose: () => void;
}) {
  const rocket = useLaunchesStore((state) => state.rocket);
  const payloads = useLaunchesStore((state) => state.payloads);
  const crew = useLaunchesStore((state) => state.crew);

  if (!launch) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-[calc(100vh-4rem)] bg-card rounded-xl shadow-2xl overflow-hidden flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b ">
          <div>
            <h2 className="text-2xl font-bold">{launch.name}</h2>
            <p className="text-muted-foreground text-sm">
              {new Date(launch.date_utc).toDateString()}
            </p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            <XIcon className="h-6 w-6 text-card-foreground" />
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="basis-1/3 min-w-[220px] flex flex-col items-center p-6 overflow-hidden border-r">
            <div className="w-full h-1/2 flex items-center justify-center">
              {launch.links.patch?.large ? (
                <img
                  src={launch.links.patch.large}
                  alt={launch.name}
                  className="max-h-full w-auto object-contain"
                />
              ) : (
                <div className="w-full h-full bg-card-background border-4 border-dashed" />
              )}
            </div>

            <div className="mt-4 w-full">
              <div className="text-sm text-card-foreground text-center">
                {launch.success ? (
                  <div className="flex items-center justify-center">
                    <DotIcon size={48} color="green" />
                    Launch was successful
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <DotIcon size={64} color="red" />
                    Launch failed
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1 p-6 text-card-foreground">
            <div className="mt-4 w-full h-1/3">
              <p className="text-sm text-card-foreground text-center">
                {launch.details || "No details available"}
              </p>
            </div>
            <h1 className="mb-2">Additional information about this launch</h1>
            <Accordion type="single" collapsible className="h-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Crew</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {crew.length > 0 ? (
                      crew.map((member) => (
                        <li key={member.id}>
                          <div className="flex items-center gap-2">
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <span>
                              {member.name} ({member.agency})
                            </span>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="text-muted-foreground">
                        No crew members assigned to this launch.
                      </p>
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                className="flex flex-col flex-1 min-h-0"
                value="item-2"
              >
                <AccordionTrigger>Rocket</AccordionTrigger>
                <AccordionContent className="flex-1 min-h-0 max-h-60 overflow-y-auto">
                  <div className="space-y-2 ml-4">
                    <div>
                      <strong>Name:</strong> {rocket?.name}
                    </div>
                    <div>
                      <strong>Type:</strong> {rocket?.type}
                    </div>
                    <div>
                      <strong>Active:</strong> {rocket?.active ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Stages:</strong> {rocket?.stages}
                    </div>
                    <div>
                      <strong>Boosters:</strong> {rocket?.boosters}
                    </div>
                    <div>
                      <strong>Cost per Launch:</strong> $
                      {rocket?.cost_per_launch?.toLocaleString()}
                    </div>
                    <div>
                      <strong>Success Rate:</strong> {rocket?.success_rate_pct}%
                    </div>
                    <div>
                      <strong>First Flight:</strong>{" "}
                      {rocket?.first_flight
                        ? new Date(rocket.first_flight).toDateString()
                        : "N/A"}
                    </div>
                    <div>
                      <strong>Country:</strong> {rocket?.country}
                    </div>
                    <div>
                      <strong>Company:</strong> {rocket?.company}
                    </div>
                    <div>
                      <strong>Description:</strong> {rocket?.description}
                    </div>
                    {rocket?.wikipedia && (
                      <div>
                        <strong>Wikipedia:</strong>
                        <a
                          href={rocket.wikipedia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline ml-2"
                        >
                          View on Wikipedia
                        </a>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-">
                <AccordionTrigger>Payloads</AccordionTrigger>
                <AccordionContent className="flex-1 min-h-0 max-h-60 overflow-y-auto">
                  {payloads.length === 0 && (
                    <p className="text-muted-foreground">
                      No payloads available for this launch.
                    </p>
                  )}

                  {payloads.map((payload) => (
                    <div
                      key={payload.id}
                      className="border p-4 rounded-lg space-y-2 m-2"
                    >
                      <div>
                        <h4 className="font-bold text-lg">{payload.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {payload.type}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-1" key={payload.id}>
                        {payload.customers && payload.customers.length > 0 && (
                          <div>
                            <strong>Customers: </strong>
                            {payload.customers.join(", ")}
                          </div>
                        )}

                        {payload.manufacturers &&
                          payload.manufacturers.length > 0 && (
                            <div>
                              <strong>Manufacturers: </strong>
                              {payload.manufacturers.join(", ")}
                            </div>
                          )}

                        {payload.nationalities &&
                          payload.nationalities.length > 0 && (
                            <div>
                              <strong>Nationalities: </strong>
                              {payload.nationalities.join(", ")}
                            </div>
                          )}

                        {payload.mass_kg && (
                          <div>
                            <strong>Mass: </strong>
                            {payload.mass_kg.toLocaleString()} kg (
                            {payload.mass_lbs?.toLocaleString()} lbs)
                          </div>
                        )}

                        {payload.orbit && (
                          <div>
                            <strong>Orbit: </strong> {payload.orbit}
                          </div>
                        )}

                        {payload.regime && (
                          <div>
                            <strong>Regime: </strong> {payload.regime}
                          </div>
                        )}

                        {payload.reference_system && (
                          <div>
                            <strong>Reference System: </strong>
                            {payload.reference_system}
                          </div>
                        )}

                        {payload.inclination_deg && (
                          <div>
                            <strong>Inclination: </strong>
                            {payload.inclination_deg}°
                          </div>
                        )}

                        {payload.period_min && (
                          <div>
                            <strong>Orbital Period: </strong>
                            {payload.period_min} minutes
                          </div>
                        )}

                        {payload.lifespan_years && (
                          <div>
                            <strong>Lifespan: </strong>
                            {payload.lifespan_years} years
                          </div>
                        )}

                        {payload.periapsis_km && payload.apoapsis_km && (
                          <div>
                            <strong>Altitude: </strong>
                            {payload.periapsis_km} - {payload.apoapsis_km} km
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullScreenCard;
