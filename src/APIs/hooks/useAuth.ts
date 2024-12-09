import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import {
  signUp,
  getAllCounties,
  getAllNationalities,
  getAllSchools,
  getAllRegions,
  login,
} from "../features/auth";
<<<<<<< HEAD
import type { Advice } from "../../types";
=======
import type { Advice, SignUpFormData } from "../../types";
>>>>>>> 040f133 (setup project)

export const useGetAllCountries = (options?: UseQueryOptions<unknown>) => {
  return useQuery<unknown>({
    queryKey: ["auth"],
    queryFn: () => getAllCounties(),
    ...options,
  });
};
//
export const useGetAllNationalities = (options?: UseQueryOptions<unknown>) => {
  return useQuery<unknown>({
    queryKey: ["nationalities"],
    queryFn: () => getAllNationalities(),
    ...options,
  });
};
//
export const useGetAllSchools = (options?: UseQueryOptions<unknown>) => {
  return useQuery<unknown>({
    queryKey: ["schools"],
    queryFn: () => getAllSchools(),
    ...options,
  });
};
//
export const useGetAllRegions = (options?: UseQueryOptions<unknown>) => {
  return useQuery<unknown>({
    queryKey: ["regions"],
    queryFn: () => getAllRegions(),
    ...options,
  });
};
//
export const useSignUp = (
<<<<<<< HEAD
  options?: UseMutationOptions<Advice, Error, Partial<Advice>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<Advice, Error, Partial<Advice>>({
=======
  options?: UseMutationOptions<SignUpFormData, Error, Partial<SignUpFormData>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<SignUpFormData, Error, Partial<SignUpFormData>>({
>>>>>>> 040f133 (setup project)
    mutationFn: signUp,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    ...options,
  });
};
//
export const useLogin = (
  options?: UseMutationOptions<Advice, Error, Partial<Advice>>,
) => {
  const queryClient = useQueryClient();
  return useMutation<Advice, Error, Partial<Advice>>({
    mutationFn: login,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    ...options,
  });
};
