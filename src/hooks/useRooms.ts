import { useQuery } from "@tanstack/react-query";
import { authConfig } from "../config/axios";

  export interface roomsPropsTypes{
  user_id:string | number,
  enable?:boolean | true
  }
  
  export const getAllRoomService = async(payload:roomsPropsTypes) =>{
      try{
       const data = await authConfig.get('/rooms?user_id='+payload?.user_id);
       return data?.data;
      }catch(err){
          return err;
      }
  }
  
  
  export const useRooms = (payload:roomsPropsTypes)=>{ return useQuery({
    queryKey: ['rooms',payload],
    queryFn:()=> getAllRoomService({user_id:payload.user_id}),
    staleTime: 1000 * 60,
    retry: false,
    refetchOnWindowFocus: false,
    enabled:payload.enable
  })}