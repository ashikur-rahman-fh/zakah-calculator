import { api } from "./api";
import { notify, notifications } from "@/app/Zakah/common/notification";
import { IAsset } from "@/app/types";


export const getAssets = async (): Promise<IAsset[]> => {
  try {
    const data = await api.get("/api/assets/");
    notify.success(
      notifications.asset_list_update.success.message,
      notifications.asset_list_update.success.id,
    );
    return data as IAsset[];
  }
  catch (error) {
    if (error instanceof Error) {
      notify.error(
        notifications.asset_list_update.failed.message,
        notifications.asset_list_update.failed.id,
      );
    } else {
      console.error("Failed to update asset list");
    }
  }
  return [];
};

export const createAsset = async (asset: IAsset): Promise<IAsset | null> => {
  try {
    const data: IAsset = await api.post("/api/assets/", { ...asset });
    notify.success(
      notifications.asset_create.success.message,
      notifications.asset_create.success.id,
    );
    return data;
  }
  catch (error) {
    if (error instanceof Error) {
      notify.error(
        notifications.asset_create.failed.message,
        notifications.asset_create.failed.id,
      );
    } else {
      console.error("Failed to create asset");
    }
  }
  return null;
};
