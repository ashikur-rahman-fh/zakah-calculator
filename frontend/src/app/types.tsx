export type IMonth =
                    "January"     | "Jan" |
                    "February"    | "Feb" |
                    "March"       | "Mar" |
                    "April"       | "Apr" |
                    "May"         | "May" |
                    "June"        | "Jun" |
                    "July"        | "Jul" |
                    "August"      | "Aug" |
                    "September"   | "Sep" |
                    "October"     | "OCT" |
                    "November"    | "Nov" |
                    "December"    | "Dec";

export interface IZakahYear {
  year: string;
  month: IMonth;
  arabicYear?: string,
  zakah: number;
  paid: number;
};

export const mockData: IZakahYear[] = [
  {
    year: "2023",
    month: "Jan",
    arabicYear: "1444-1445",
    zakah: 444,
    paid: 444
  },
  {
    year: "2024",
    month: "Feb",
    arabicYear: "1445-1446",
    zakah: 555,
    paid: 444,
  },
  {
    year: "2025",
    month: "Mar",
    arabicYear: "1446-1447",
    zakah: 666,
    paid: 666
  }
];
