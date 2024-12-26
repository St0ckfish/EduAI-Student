import type { ChangePassword, StudentProfile, StudentProfileUpdate } from "~/types";
import axiosInstance from "../axios";

export const fetchStudentProfile = async (): Promise<StudentProfile> => {
  const response = await axiosInstance.get<StudentProfile>(
    "/api/v1/my-account/profile/student",
  );
  return response.data;
};

export const fetchStudentProfileUpdate = async (): Promise<StudentProfile> => {
  const response = await axiosInstance.get<StudentProfile>(
    "/api/v1/my-account/profile/student/update",
  );
  return response.data;
};

export const updateProfile = async (profileData: StudentProfileUpdate): Promise<StudentProfileUpdate> => {
    try {
      const response = await axiosInstance.put<StudentProfileUpdate>(
        '/api/v1/my-account/profile/student/update',
        profileData
      );
      return response.data;
    } catch (error) {
      if (error) {
        console.log('Error:', error);
      }
      throw error; // Re-throw the error if you want to handle it elsewhere
    }
  };
  
  export const changePassword = async (data: ChangePassword): Promise<void> => {
    try {
      const response = await axiosInstance.post('/api/v1/my-account/password/change', data);
      return response.data; 
    } catch (error: any) {
      console.error('Error changing password:', error.response?.data || error.message);
      throw error; // Re-throw the error to be handled by the caller
    }
  };

  export const updateProfilePicture = async (picture: File): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("picture", picture);
  
      const response = await axiosInstance.put('/api/v1/my-account/picture', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; // Return response data if needed
    } catch (error: any) {
      console.error("Error updating profile picture:", error.response?.data || error.message);
      throw error; // Re-throw the error to handle it in the calling component
    }
  };

  