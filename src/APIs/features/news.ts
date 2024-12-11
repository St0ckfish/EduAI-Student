import axiosInstance from "../axios";

export const fetchAllNews = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    "/api/v1/post/all?size=1000000&page=0",
  );
  return response.data;
};

export const likePost = async (postId: number, liked: boolean): Promise<void> => {
  const response = await axiosInstance.put(`/api/v1/post/${postId}/like?liked=${liked}`, {
    liked,
  });
  return response.data; 
};
