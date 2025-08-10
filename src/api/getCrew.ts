import { crewSchema } from '../types/crew';

export const getCrew = async (id: string) => {
  const res = await fetch(`https://api.spacexdata.com/v4/crew/${id}`);
  const data = await res.json();

  return crewSchema.parse(data);
};
