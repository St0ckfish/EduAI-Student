import axiosInstance from "../axios";

export const fetchAllNews = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    "/api/v1/post/all?size=1000000&page=0",
  );
  return response.data;
};