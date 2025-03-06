import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllRocks } from "@/lib/appwrite";
import { QUERY_KEYS } from "./queryKeys";

export const useGetRocks = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_ROCKS],
    queryFn: () => getAllRocks(),
  });
};
