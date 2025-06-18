import React, { useEffect, useMemo, useState } from "react";

import { ITransaction, IZakahYear } from "../types";
import { Amount, GlassCardHeader } from "../Common";
import { api } from "@/utils/api";

const thisYear = new Date().getFullYear().toString();

const SelectYear = ({ zakahYears, setTransactions }:
  { zakahYears: IZakahYear[], setTransactions: (transactions: ITransaction[]) => void }) => {
  const [year, setYear] = useState<string>(thisYear);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/api/zakah-transactions", { year: year });
        setTransactions(data as ITransaction[]);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.log(error);
        }
      }
    })();
  }, [setTransactions, year]);


  const optionWithCurrentYear = useMemo(() => {
    const years = zakahYears.map((zakah) => String(zakah.year).trim());
    const yearsWithCurrent = [...years, thisYear];

    return [... new Set(yearsWithCurrent)];
  }, [zakahYears]);


  return (
    <select
      name="year"
      className="w-1/3 mb-4 bg-white/20 border border-white/10 text-white text-md rounded-md focus:ring-white focus:border-white block p-1 focus:outline-none"
      defaultValue={year}
      onChange={(e) => setYear(e.target.value)}
    >
      {optionWithCurrentYear.map((year: string) => {
        return (
          <option key={year} value={year}>{year}</option>
        );
      })}
    </select>
  );
};

const Transaction: React.FC<ITransaction> = ({ to, amount, date, method }) => {
  return (
    <li>
      <pre>
        <p className="text-lg">{date} <Amount amount={amount} fontColor="text-white" />    sent to <span className="text-green-700">{to}</span> using <span className="text-blue-700">{method}</span></p>
      </pre>
    </li>
  );
};

const NoTransaction = () => {
  return <h1 className="text-center text-lg">No transactions available</h1>;
};

const TransactionsRenderer = ({ zakahYears }: { zakahYears: IZakahYear[] }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  return (
    <div className="flex-row-reverse">
      <div className="flex justify-end">
        <SelectYear zakahYears={zakahYears} setTransactions={setTransactions} />
      </div>
      <div>
        <ul>
          {transactions.length === 0 ? <NoTransaction /> :

            transactions.map((transaction: ITransaction) => {
              return (
                <Transaction
                  key={transaction.description}
                  to={transaction.to}
                  amount={transaction.amount}
                  date={transaction.date}
                  method={transaction.method}
                  description={transaction.description}
                />
              )
            })
          }
        </ul>
      </div>
    </ div>
  );
};


const Transactions = ({ zakahYears }: { zakahYears: IZakahYear[] }) => {
  return (
    <React.Fragment>
      <section>
        <GlassCardHeader>Transaction</GlassCardHeader>
        <TransactionsRenderer zakahYears={zakahYears} />
      </section>
    </React.Fragment>
  );
};

export default Transactions;
