
import { useUserProfile } from "./useUserProfile";
import { useRooms } from "./useRooms";
import { useMutation } from "@tanstack/react-query";
import { addNewRoomService } from "../pages/chat/services/addNewRoomService";
import { useUsers } from "./useUsers";

export const useAddRoom = (newRoomRevicerId:any) => {
      const {data:userProfile,isSuccess:isProfileDataSuccesss} = useUserProfile();
  const {refetch:refetchRooms} = useRooms({user_id:userProfile?.payload?.data?.id,enable:isProfileDataSuccesss});
       const {refetch:refetchUsers} = useUsers({unwanted_user_id:userProfile?.payload?.data?.id,enable:isProfileDataSuccesss});
  return useMutation({
    mutationFn:  () => {
      return addNewRoomService({receiverId:newRoomRevicerId as any,senderId:userProfile?.payload?.data?.id})
    },
    onSuccess: () => {
      refetchRooms();
      refetchUsers();
    },
    onError: (error) => {
      console.log(error);
    },
  })
}