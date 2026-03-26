import { useQuery } from "@tanstack/react-query"
import { authConfig } from "../config/axios";

export interface usersPropsTypes {
    unwanted_user_id?:string | number
}

const userProfileService = async() =>{
    try{
     const data = await authConfig.get('/profile');
     return data?.data;
    }catch(err){
        return err;
    }
}




export const useUserProfile = () => {
    return useQuery({
        queryKey: ['user-profile',],
        queryFn:()=> userProfileService(),
        staleTime: 1000 * 60,
        retry: false,
        refetchOnWindowFocus: false
    })
}   