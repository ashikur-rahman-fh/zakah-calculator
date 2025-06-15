import { IInputField } from "../types";

export const InputFields: IInputField[] = [
  {
    id: "date",
    name: "date",
    error: "Please enter a valid date in the format YYYY-MM-DD.",
    placeholder: "Date",
    validator: (date: string): boolean => {
      const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
      return regex.test(date);
    },
  },
  {
    id: "donated_to",
    name: "donated_to",
    error: "This field is required. Please specify where the donation was made.",
    placeholder: "Donated to",
    validator: (value) => {
      return !!value;
    },
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
  {
    id: "payment_method",
    name: "payment_method",
    error: "Enter a valid payment method.",
    placeholder: "Payment Method",
    validator: (value: string): boolean => {
      return !!value;
    },
  },
  {
    id: "description",
    name: "description",
    error: "",
    placeholder: "Description",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validator: (value: string): boolean => {
      return true;
    },
  },

];
