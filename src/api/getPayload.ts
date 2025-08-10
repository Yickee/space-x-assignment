import { payloadSchema } from '../types/payload';

export const getPayload = async (id: string) => {
  const res = await fetch(`https://api.spacexdata.com/v4/payloads/${id}`);
  const data = await res.json();

  return payloadSchema.parse(data);
};
