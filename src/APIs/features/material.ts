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