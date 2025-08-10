import { rocketSchema } from '../types/rocket';

export const getRocket= async (id: string) => {
  const res = await fetch(`https://api.spacexdata.com/v4/rockets/${id}`);
  const data = await res.json();

  return rocketSchema.parse(data);
};
