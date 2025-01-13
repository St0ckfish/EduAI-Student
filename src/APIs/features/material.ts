import axiosInstance from "../axios";
import type { MaterialsResponse, SessionMaterialsResponse } from "../../types";

export const getMaterials = async (
  date: string,
  size: number,
  page: number
): Promise<MaterialsResponse> => {
  const response = await axiosInstance.get<MaterialsResponse>(
    `/api/v1/student-study/materials`,
    {
      params: { date, size, page },
    }
  );
  return response.data;
};

export const getSessionMaterials = async (sessionId: string): Promise<SessionMaterialsResponse> => {
  const response = await axiosInstance.get<SessionMaterialsResponse>(
    `/api/v1/student-study/session-materials?sessionId=${sessionId}`
  );
  return response.data;
};

export const getChatHitory = async (courseId: string): Promise<any> => {
  const response = await axiosInstance.get<any>(
    `/api/v1/aiassistant/chat-history/course/${courseId}`
  );
  return response.data;
};

export const getAllSubjects = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    `/api/v1/student/course-registrations/all`
  );
  return response.data;
};

export const loadSubject = async (courseId: string): Promise<any> => {
  const response = await axiosInstance.post<any>(
    `/api/v1/aiassistant/chat-history/load-course-data?courseId=${courseId}`
  );
  return response.data;
};

export const askQuestion = async (courseId: string, question: string): Promise<any> => {
  const response = await axiosInstance.post<any>(
    `/api/v1/aiassistant/chat-history/ask-question?courseId=${courseId}&question=${question}`,
  );
  return response.data;
};