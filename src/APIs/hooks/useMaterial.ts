import { useMutation, type UseMutationOptions, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { type MaterialsResponse, type SessionMaterialsResponse } from "~/types";
import { askQuestion, getAllSubjects, getChatHitory, getMaterials, getSessionMaterials, loadSubject } from "../features/material";

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

export const useGetChatHitory = (
  courseId: string,
  options?: UseQueryOptions<any, Error>
) => {
  return useQuery<any, Error>({
    queryKey: ["history", courseId],
    queryFn: () => getChatHitory(courseId),
    enabled: !!courseId, 
    ...options,
  });
};

export const useGetAllStudentSubjects = (
  options?: UseQueryOptions<any, Error>
) => {
  return useQuery<any, Error>({
    queryKey: ["studentSubjects"],
    queryFn: () => getAllSubjects(), 
    ...options,
  });
};

export const useLoadSubject = (
  courseId: string,
  options?: UseQueryOptions<any, Error>
) => {
  return useQuery<any, Error>({
    queryKey: ["load", courseId],
    queryFn: () => loadSubject(courseId), 
    enabled: !!courseId, 
    ...options,
  });
};

export const useAskQuestion = (
  options?: UseMutationOptions<any, Error, Partial<any>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, Partial<any>>({
    mutationFn: (params: Partial<{ courseId: string; question: string }>) => askQuestion(params.courseId!, params.question!),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["askQuestion"] });
    },
    ...options,
  });
};