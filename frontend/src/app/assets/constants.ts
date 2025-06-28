import { IInputField } from "../types";

export const AssetInput: IInputField[] = [
  {
    id: "name",
    name: "name",
    placeholder: "Name",
    error: "Please enter a valid asset name.",
    validator: (value: string) => value.trim().length > 0,
  },
  {
    id: "amount",
    name: "amount",
    error: "Please enter a valid positive number for the amount.",
    placeholder: "Amount",
    validator: (value: string): boolean => {
      const num = Number(value.trim());
      return !isNaN(num) && num > 0;
    },
  },
];
