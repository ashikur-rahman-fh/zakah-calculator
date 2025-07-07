import { ITransaction, IZakahYear } from "@/app/types";

export interface IZakahState {
  zakahYears: IZakahYear[];
  transactions: ITransaction[];
}

export const initialState: IZakahState = {
  zakahYears: [],
  transactions: [],
};

export type ActionTypes =
  | "UPDATE_ZAKAH"
  | "UPDATE_TRANSACTION"
  | "UPDATE_ZAKAH_AND_TRANSACTION";

export interface IAction {
  type: ActionTypes;
  payload: IZakahYear[] | ITransaction[] | IZakahState;
}

export const zakahReducer = (
  state: IZakahState,
  action: IAction,
): IZakahState => {
  switch (action.type) {
    case "UPDATE_ZAKAH": {
      return {
        ...state,
        zakahYears: action.payload as IZakahYear[],
      };
    }
    case "UPDATE_TRANSACTION": {
      return {
        ...state,
        transactions: action.payload as ITransaction[],
      };
    }
    case "UPDATE_ZAKAH_AND_TRANSACTION": {
      return {
        ...(action.payload as IZakahState),
      };
    }
  }
  throw Error("Unknown action type");
};

export type DataFetchingState = "idle" | "loading" | "success" | "error";

export type ListDataState<T> = {
  status: DataFetchingState;
  data: T[];
  error: string | null;
};

export type ListDataAction<T> =
  | { type: "START" }
  | { type: "SUCCESS"; payload: T[] }
  | { type: "ERROR"; error: string }
  | { type: "ADD"; payload: T }
  | { type: "UPDATE"; payload: T }
  | { type: "DELETE"; payload: string | number };

export function ListDataReducer<T extends { id: string | number }>(
  state: ListDataState<T>,
  action: ListDataAction<T>,
): ListDataState<T> {
  switch (action.type) {
    case "START":
      return { ...state, status: "loading", error: null };
    case "SUCCESS":
      return { ...state, status: "success", data: action.payload, error: null };
    case "ERROR":
      return { ...state, status: "error", error: action.error };
    case "ADD":
      return {
        ...state,
        status: "success",
        data: [...state.data, action.payload],
        error: null,
      };
    case "UPDATE":
      return {
        ...state,
        status: "success",
        data: state.data.map((item) =>
          item.id === action.payload.id ? action.payload : item,
        ),
        error: null,
      };
    case "DELETE":
      return {
        ...state,
        status: "success",
        data: state.data.filter((item) => item.id !== action.payload),
        error: null,
      };
    default:
      return state;
  }
}
