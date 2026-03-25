import { authConfig } from "../../../config/axios";

export interface loginPayload {
    email: string;
    password: string;
}

export const loginService = async(payload: loginPayload) =>{
try{
   const data  = await authConfig.post('/auth/login',payload);
   return data?.data;
}catch(err){
return err;
}
}