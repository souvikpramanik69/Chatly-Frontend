import { authConfig } from "../../../config/axios";

export interface roomsPropsTypes{
user_id:string | number
}

export const getAllRoomService = async(payload:roomsPropsTypes) =>{
    try{
     const data = await authConfig.get('/rooms?user_id='+payload?.user_id);
     return data?.data;
    }catch(err){
        return err;
    }
}