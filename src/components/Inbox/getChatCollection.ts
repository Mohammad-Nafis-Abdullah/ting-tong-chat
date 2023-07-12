import { CHATS_COLLECTION } from "../../hooks/DbCollectionName";
import { getCloudStoreSingleData } from "../../hooks/cloudFireStore";
import { ChatSchema } from "../../schema/schema";

export const getChatCollection = async (id_1: string, id_2?: string) => {
    if (!id_2) {
        return id_1;
    }

    const res =
        ((await getCloudStoreSingleData(
            CHATS_COLLECTION,
            `${id_1}-${id_2}`
        )) as ChatSchema) ||
        ((await getCloudStoreSingleData(
            CHATS_COLLECTION,
            `${id_2}-${id_1}`
        )) as ChatSchema);

      const id = res.id || undefined;
    return id;
};
