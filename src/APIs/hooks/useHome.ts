import { useQuery } from "@tanstack/react-query";
import type {
  UseQueryOptions,
} from "@tanstack/react-query";
import { fetchAttendance, fetchGpa, fetchUpCommingEvents } from "../features/home";


export const useGetGpa = (
  options?: UseQueryOptions<any, Error>,
) => {
  return useQuery<any, Error>({
    queryKey: ["gpa"],
    queryFn: () => fetchGpa(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
export const useGetAttendance = (
  options?: UseQueryOptions<any, Error>,
) => {
  return useQuery<any, Error>({
    queryKey: ["attendanceHome"],
    queryFn: () => fetchAttendance(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};
export const useGetUpCommingEvents = (
  options?: UseQueryOptions<any, Error>,
) => {
  return useQuery<any, Error>({
    queryKey: ["upCommingEvents"],
    queryFn: () => fetchUpCommingEvents(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};