import { api } from "./api";
import { notify } from "@/app/Common";
import { ITransaction, IZakahYear } from "@/app/types";
import { IAction } from "@/context/StateProvider";
import { Dispatch } from "react";

export const getZakahYears = async (): Promise<IZakahYear[]> => {
  try {
    const data = await api.get("/api/zakah-years");
    notify.success("Zakah list has been updated", "zakah-year-success");
    return data as IZakahYear[];
  } catch (error) {
    if (error instanceof Error) {
      notify.error("Failed to update zakah list", "zakah-year-fail");
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
    notify.success("Transaction list has been updated", `transaction-success-${year}`);
    return data as ITransaction[];
  } catch (error) {
    if (error instanceof Error) {
      notify.error("Failed to update transaction list", `transaction-failed-${year}`);
    } else {
      notify.error("Failed to update transaction list", `transaction-failed-${year}`);
    }
  }
  return [];
};

export const updateTransactions = async (year: number, dispatch: Dispatch<IAction>) => {
  const transactions: ITransaction[] = await getTransactions(year);
  dispatch({ type: "UPDATE_TRANSACTION", payload: transactions });
};
