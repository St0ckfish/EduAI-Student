import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  UseQueryOptions,
} from "@tanstack/react-query";
import { fetchAllNews, likePost } from "../features/news";


export const useGetAllNews = (
  options?: UseQueryOptions<any, Error>,
) => {
  return useQuery<any, Error>({
    queryKey: ["news"],
    queryFn: () => fetchAllNews(),
    staleTime: 1000 * 60 * 5,
    ...options,
  });
};

export function useLikePost() {
  return useMutation<void, Error, { postId: number; liked: boolean }>({
    mutationFn: ({ postId, liked }) => likePost(postId, liked), 
  });
}