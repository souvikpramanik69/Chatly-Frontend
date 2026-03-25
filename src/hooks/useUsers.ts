import { useQuery } from "@tanstack/react-query"
import { authConfig } from "../config/axios";


const getAllUserService = async() =>{
    try{
     const data = await authConfig.get('/users');
     return data?.data;
    }catch(err){
        return err;
    }
}


export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: getAllUserService,
        staleTime: 1000 * 60,
        retry: false,
        refetchOnWindowFocus: false
    })
}   