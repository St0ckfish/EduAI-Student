import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { ChangePassword, StudentProfile, StudentProfileUpdate } from "../../types";
import {
  changePassword,
  fetchStudentProfile,
  fetchStudentProfileUpdate,
  updateProfile,
  updateProfilePicture,
} from "../features/profile";

export const useProfile = (
  options?: UseQueryOptions<StudentProfile, Error>,
) => {
  return useQuery<StudentProfile, Error>({
    queryKey: ["studentProfile"],
    queryFn: fetchStudentProfile,
    ...options,
  });
};

export const useGetProfileUpdate = (
  options?: UseQueryOptions<StudentProfile, Error>,
) => {
  return useQuery<StudentProfile, Error>({
    queryKey: ["studentProfileUpdate"],
    queryFn: fetchStudentProfileUpdate,
    ...options,
  });
};

export const useUpdateProfile = (
    options?: UseMutationOptions<StudentProfileUpdate, Error, StudentProfileUpdate>
  ) => {
    return useMutation<StudentProfileUpdate, Error, StudentProfileUpdate>({
      mutationFn: updateProfile, // The mutation function
      ...options, // Spread any additional options (onSuccess, onError, etc.)
    });
  };

  export const useChangePassword = (
    options?: UseMutationOptions<void, Error, ChangePassword>
  ) => {
    return useMutation<void, Error, ChangePassword>({
      mutationFn: changePassword, // Use the changePassword mutation function
      ...options, // Spread any additional options like onSuccess, onError, etc.
    });
  };

  export const useUpdateProfilePicture = (
    options?: UseMutationOptions<void, Error, File>
  ) => {
    return useMutation<void, Error, File>({
      mutationFn: updateProfilePicture,
      ...options, // Spread any additional options like onSuccess, onError, etc.
    });
  };