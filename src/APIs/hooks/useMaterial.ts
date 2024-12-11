import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MaterialsResponse, SessionMaterialsResponse } from "~/types";
import { getMaterials, getSessionMaterials } from "../features/material";

export const useGetMaterials = (
  date: string,
  size = 1000,
  page = 0,
  options?: UseQueryOptions<MaterialsResponse, Error>
) => {
  return useQuery<MaterialsResponse, Error>({
    queryKey: ["materials", date, size, page],
    queryFn: () => getMaterials(date, size, page),
    enabled: !!date, // Prevent query from running if date is not provided
    ...options,
  });
};

export const useGetSessionMaterials = (
  sessionId: string,
  options?: UseQueryOptions<SessionMaterialsResponse, Error>
) => {
  return useQuery<SessionMaterialsResponse, Error>({
    queryKey: ["session-materials", sessionId],
    queryFn: () => getSessionMaterials(sessionId),
    enabled: !!sessionId, 
    ...options,
  });
};