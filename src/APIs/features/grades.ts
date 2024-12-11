import axiosInstance from "../axios";
import { type AcademicYearResponse } from "../../types";

export const fetchAcademicYears = async (): Promise<AcademicYearResponse> => {
  const response = await axiosInstance.get<AcademicYearResponse>("/api/v1/student-study/Academic-YEAR");
  return response.data;
};
export const fetchSemesterByYear = async (academicYearId: string): Promise<any> => {
    const response = await axiosInstance.get<any>(`/api/v1/student-study/Semesters?academicYearId=${academicYearId}`);
    return response.data;
  };
export const fetchAllGrades = async (semesterId: string): Promise<any> => {
    const response = await axiosInstance.get<any>(`/api/v1/student-study/student-gradeReport?semesterId=${semesterId}`);
    return response.data;
  };