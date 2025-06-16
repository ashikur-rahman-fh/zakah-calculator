import React, { useMemo, useState } from "react";

import { ITransaction, IZakahYear, mockData, mockTransactions } from "../types";
import { Amount, GlassCardHeader } from "../Common";

const thisYear = new Date().getFullYear().toString();

const SelectYear = ({ zakahYears }: { zakahYears: IZakahYear[] }) => {
  const [year, setYear] = useState<string>(thisYear);

  const optionWithCurrentYear = useMemo(() => {
    const years = zakahYears.map((zakah) => zakah.year.trim());
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

const TransactionsRenderer = ({ transactions }: { transactions: ITransaction[] }) => {
  if (transactions === undefined || transactions === null || transactions.length === 0) {
    return <div>No transaction available</div>;
  }

  return (
    <div className="flex-row-reverse">
      <div className="flex justify-end">
        <SelectYear zakahYears={mockData} />
      </div>
      <div>
        <ul>
          {
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


const Transactions = () => {
  return (
    <React.Fragment>
      <section>
        <GlassCardHeader>Transaction</GlassCardHeader>
        <TransactionsRenderer transactions={mockTransactions} />
      </section>
    </React.Fragment>
  );
};

export default Transactions;
