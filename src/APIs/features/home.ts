import axiosInstance from "../axios";

export const fetchGpa = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    "/api/v1/student/progress/gpa-comparison",
  );
  return response.data;
};
export const fetchAttendance = async (): Promise<any> => {
    const response = await axiosInstance.get<any>(
        "/api/v1/student/progress/attendance",
    );
    return response.data;
};
export const fetchUpCommingEvents = async (): Promise<any> => {
  const response = await axiosInstance.get<any>(
    "/api/v1/dashboard/upcoming-events?size=1000000&page=0&getActive=1",
  );
  return response.data;
};