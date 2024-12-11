import {useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { type AcademicYearResponse } from "../../types";
import { fetchAcademicYears, fetchAllGrades, fetchSemesterByYear } from "../features/grades";

export const useGetAllAcademicYear = (options?: UseQueryOptions<AcademicYearResponse, Error>) => {
  return useQuery<AcademicYearResponse, Error>({
    queryKey: ["academicYear"],
    queryFn: fetchAcademicYears,
    ...options,
  });
};

export const useGetSemesterByYear = (
    academicYearId: string | undefined,
    options?: UseQueryOptions<any, Error>,
  ) => {
    return useQuery<any, Error>({
      queryKey: ["SemesterByYear", academicYearId],
      queryFn: () => fetchSemesterByYear(academicYearId!),
      enabled: !!academicYearId,
      ...options,
    });
  };

export const useGetAllGrades = (
    semesterId: string | undefined,
    options?: UseQueryOptions<any, Error>,
  ) => {
    return useQuery<any, Error>({
      queryKey: ["Grades", semesterId],
      queryFn: () => fetchAllGrades(semesterId!),
      enabled: !!semesterId ,
      ...options,
    });
  };