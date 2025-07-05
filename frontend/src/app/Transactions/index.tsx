import React, { useEffect, useMemo, useState } from "react";

import { updateTransactions } from "@/utils/zakahApis";
import { useAuth } from "@/context/AuthProvider";

import { ITransaction, IZakahYear } from "../types";
import { Amount, GlassCardHeader } from "../Zakah/common/Common";

const thisYear = new Date().getFullYear().toString();

const SelectYear = ({ zakahYears }:
  { zakahYears: IZakahYear[] }) => {
  const [year, setYear] = useState<string>(thisYear);

  const { dispatch } = useAuth();

  useEffect(() => {
    updateTransactions(Number(year.trim()), dispatch);
  }, [year, dispatch]);


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
  const { zakahState } = useAuth();
  const transactions = zakahState.transactions;

  return (
    <div className="flex-row-reverse">
      <div className="flex justify-end">
        <SelectYear zakahYears={zakahYears} />
      </div>
      <div>
        <ul>
          {transactions.length === 0 ? <NoTransaction /> :

            transactions.map((transaction: ITransaction, index: number) => {
              return (
                <Transaction
                  key={index.toString()}
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
