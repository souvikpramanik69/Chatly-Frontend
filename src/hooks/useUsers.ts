import { useQuery } from "@tanstack/react-query";
import { authConfig } from "../config/axios";

export interface usersPropsTypes {
  unwanted_user_id?: string | number;
  enable: boolean | true;
}

const getAllUserService = async (payload: usersPropsTypes) => {
  try {
    const data = await authConfig.get(
      "/users?unwanted_user_id=" + payload?.unwanted_user_id,
    );
    return data?.data;
  } catch (err) {
    return err;
  }
};

export const useUsers = (payload: usersPropsTypes) => {
  return useQuery({
    queryKey: ["users", payload],
    queryFn: () => getAllUserService(payload),
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: payload.enable,
  });
};
