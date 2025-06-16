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
  year: string;
  month: IMonth;
  arabicYear?: string,
  zakah: number;
  paid: number;
};

export const mockData: IZakahYear[] = [
  {
    id: "a1",
    year: "2023",
    month: "Jan",
    arabicYear: "1444-1445",
    zakah: 444,
    paid: 444
  },
  {
    id: "a2",
    year: "2024",
    month: "Feb",
    arabicYear: "1445-1446",
    zakah: 555,
    paid: 444,
  },
  {
    id: "a3",
    year: "2024",
    month: "Mar",
    arabicYear: "1446-1447",
    zakah: 666,
    paid: 666
  }
];

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
  error: string;
  validator: (value: string) => boolean;
};
