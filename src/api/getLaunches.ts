import { launchSchema } from '../types/launches';

export const getLaunches = async () => {
  const res = await fetch('https://api.spacexdata.com/v4/launches');
  const data = await res.json();

  return launchSchema.array().parse(data);
};
