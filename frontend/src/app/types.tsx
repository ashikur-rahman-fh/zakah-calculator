export type IMonth =
  "January" | "Jan" |
  "February" | "Feb" |
  "March" | "Mar" |
  "April" | "Apr" |
  "May" | "May" |
  "June" | "Jun" |
  "July" | "Jul" |
  "August" | "Aug" |
  "September" | "Sep" |
  "October" | "OCT" |
  "November" | "Nov" |
  "December" | "Dec";

export interface IZakahYear {
  id: string;
  year: number;
  month: IMonth;
  arabicYear?: string,
  zakah: number;
  paid: number;
};

export interface ITransaction {
  to: string;
  amount: number;
  date: string;
  method: string;
  description: string;
};

export const mockTransactions: ITransaction[] = [
  {
    to: "Local Orphanage",
    amount: 5000,
    date: "2025-06-10",
    method: "Bank Transfer",
    description: "Zakah donation for education fund"
  },
  {
    to: "Hospital XYZ",
    amount: 15,
    date: "2025-05-25",
    method: "Cash",
    description: "Zakah for medical aid"
  },
  {
    to: "Islamic Relief Fund",
    amount: 3000,
    date: "2025-04-10",
    method: "Online Payment",
    description: "Zakah for general support"
  },
  {
    to: "Masjid Al-Nur",
    amount: 2,
    date: "2025-03-15",
    method: "Cash",
    description: "Zakah for mosque maintenance"
  },
  {
    to: "Educational Fund for Orphans",
    amount: 8000,
    date: "2025-02-20",
    method: "Bank Transfer",
    description: "Zakah donation for orphans' education"
  }
];

export interface IInputField {
  id: string;
  name: string;
  placeholder: string;
  type?: string;
  error: string;
  validator: (value: string) => boolean;
};

export interface IAsset {
  id?: string;
  name: string;
  amount: number;
};
