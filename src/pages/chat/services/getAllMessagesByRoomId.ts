import { authConfig } from "../../../config/axios";

export const getAllMessagesByRoomId = async (roomId: string) => {
  try {
    const data = await authConfig.get(`/messages?room_id=${roomId}`);
    return data?.data;
  } catch (err) {
    return err;
  }
};
