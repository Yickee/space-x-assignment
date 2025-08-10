import { useQuery } from '@tanstack/react-query';
import { getLaunches } from '../api/getLaunches';

export const useLaunches = () => {
  return useQuery({
    queryKey: ['launches'],
    queryFn: getLaunches,
  });
};