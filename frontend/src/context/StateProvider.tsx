import { ITransaction, IZakahYear } from "@/app/types";

export interface IZakahState {
  zakahYears: IZakahYear[];
  transactions: ITransaction[];
};

export const initialState: IZakahState = {
  zakahYears: [],
  transactions: [],
};

export type ActionTypes = "UPDATE_ZAKAH" | "UPDATE_TRANSACTION" | "UPDATE_ZAKAH_AND_TRANSACTION";

export interface IAction {
  type: ActionTypes;
  payload: IZakahYear[] | ITransaction[] | IZakahState;
}

export const zakahReducer = (state: IZakahState, action: IAction): IZakahState => {
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
        ...action.payload as IZakahState,
      };
    }
  }
  throw Error("Unknown action type");
};
