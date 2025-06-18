import { IInputField } from "../types";

export const InputFields: IInputField[] = [
  {
    id: "username",
    name: "username",
    placeholder: "Enter your username",
    error: "Username cannot be empty.",
    validator: (value: string) => value.trim().length > 0,
  },
  {
    id: "password",
    name: "password",
    placeholder: "Enter your password",
    error: "Password cannot be empty.",
    type: "password",
    validator: (value: string) => value.trim().length > 0,
  },
];
