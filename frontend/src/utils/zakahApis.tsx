import { Dispatch } from "react";

import { ITransaction, IZakahYear } from "@/app/types";
import { IAction } from "@/context/StateProvider";
import { notifications, notify } from "@/app/Zakah/common/notification";
import { format } from "@/app/Zakah/common/helper";

import { api } from "./api";

export const getZakahYears = async (): Promise<IZakahYear[]> => {
  try {
    const data = await api.get("/api/zakah-years");
    notify.success(
      notifications.zakah_list_update.success.message,
      notifications.zakah_list_update.success.id,
    );
    return data as IZakahYear[];
  } catch (error) {
    if (error instanceof Error) {
      notify.error(
        notifications.zakah_list_update.failed.message,
        notifications.zakah_list_update.failed.id,
      );
    } else {
      console.error("Failed to update zakah list");
    }
  }
  return [];
};

export const updateZakahYears = async (dispatch: Dispatch<IAction>) => {
  const zakahYears: IZakahYear[] = await getZakahYears();
  dispatch({ type: "UPDATE_ZAKAH", payload: zakahYears });
};

export const getTransactions = async (year: number): Promise<ITransaction[]> => {
  try {
    const data = await api.get("/api/zakah-transactions", { year: year });
    notify.success(
      notifications.transaction_list_update.success.message,
      format(notifications.transaction_list_update.success.id, year),
    );
    return data as ITransaction[];
  } catch (error) {
    if (error instanceof Error) {
      notify.error(
        notifications.transaction_list_update.failed.message,
        format(notifications.transaction_list_update.failed.id, year),
      );
    } else {
      console.log("Transaction list update failed due to ", error);
    }
  }
  return [];
};

export const updateTransactions = async (year: number, dispatch: Dispatch<IAction>) => {
  const transactions: ITransaction[] = await getTransactions(year);
  dispatch({ type: "UPDATE_TRANSACTION", payload: transactions });
};
