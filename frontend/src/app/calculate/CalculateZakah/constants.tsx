import { IInputField } from "@/app/types";

const today = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const InitialState = {
  year: today.getFullYear().toString(),
  month: months[today.getMonth()].toString(),
};

export const calZakahInputs: IInputField[] = [
  {
    id: "year",
    name: "year",
    placeholder: "Year",
    error: "Please enter a valid 4-digit year (e.g., 2024).",
    validator: (value: string): boolean => {
      const trimmed = value.trim();
      return /^\d{4}$/.test(trimmed) && Number(trimmed) >= 1900 && Number(trimmed) <= new Date().getFullYear();
    },
  },
  {
    id: "month",
    name: "month",
    placeholder: "Month",
    error: "Please enter a valid month (e.g., January, February, ...).",
    validator: (value: string): boolean => {
      return months.includes(value.trim());
    },
  },
  {
    id: "checking_account",
    name: "amount_checking_account",
    placeholder: "Checking Account",
    error: "Please enter a valid non-negative number.",
    validator: (value: string): boolean => {
      const num = Number(value.trim());
      return !isNaN(num) && num >= 0;
    },
  },
  {
    id: "savings_account",
    name: "amount_savings_account",
    placeholder: "Savings Account",
    error: "Please enter a valid non-negative number.",
    validator: (value: string): boolean => {
      const num = Number(value.trim());
      return !isNaN(num) && num >= 0;
    },
  },
  {
    id: "stocks",
    name: "amount_stocks",
    placeholder: "Stocks",
    error: "Please enter a valid non-negative number.",
    validator: (value: string): boolean => {
      const num = Number(value.trim());
      return !isNaN(num) && num >= 0;
    },
  },
  {
    id: "rrsp",
    name: "amount_rrsp",
    placeholder: "RRSP",
    error: "Please enter a valid non-negative number.",
    validator: (value: string): boolean => {
      const num = Number(value.trim());
      return !isNaN(num) && num >= 0;
    },
  },
  {
    id: "dpsp",
    name: "amount_dpsp",
    placeholder: "DPSP",
    error: "Please enter a valid non-negative number.",
    validator: (value: string): boolean => {
      const num = Number(value.trim());
      return !isNaN(num) && num >= 0;
    },
  },
];
