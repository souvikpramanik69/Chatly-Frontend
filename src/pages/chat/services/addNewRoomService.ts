import { authConfig } from "../../../config/axios";

export interface addRoomsPropsTypes{
senderId:string | number
receiverId:string | number
}

export const addNewRoomService = async(payload:addRoomsPropsTypes) =>{
    try{
     const data = await authConfig.post('/room',payload);
     return data?.data;
    }catch(err){
        return err;
    }
}