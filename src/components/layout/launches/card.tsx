import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Launch } from "@/types/launches";

type CardComponentProps = {
  launch: Launch;
  onClick?: () => void;
};

const CardComponent = ({ launch, onClick }: CardComponentProps) => {
  return (
    <div className="transition-opacity duration-300 opacity-100">
      <Card
        className="transition-shadow hover:shadow-lg h-full flex flex-col"
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle>{launch.name}</CardTitle>
          <CardDescription>
            {new Date(launch.date_utc).toDateString()}
          </CardDescription>
        </CardHeader>

        <div className="flex-grow flex items-center justify-center min-h-[200px] max-h-[200px]">
          {launch.links.patch?.small ? (
            <img
              src={launch.links.patch.small}
              alt={launch.name}
              className="max-h-full object-contain p-4"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full" />
          )}
        </div>

        <CardContent className="mt-auto">
          <p className="line-clamp-2">
            {launch.details || "No details available"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CardComponent;
