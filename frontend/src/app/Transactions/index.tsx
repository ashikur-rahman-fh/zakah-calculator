import React from "react";

import { ITransaction, mockTransactions } from "../types";
import { Amount } from "../Common";

const SelectYear = () => {
  return (
    <select
      name="year"
      className="mb-4 bg-white/20 border border-white/10 text-white text-md rounded-md focus:ring-white focus:border-white block p-1"
    >
      <option>2023</option>
      <option>2024</option>
      <option>2025</option>
    </select>
  );
};

const Transaction: React.FC<ITransaction> = ({ to, amount, date, method }) => {
  return (
    <li>
      <pre>
        <p className="text-lg">{date} <Amount amount={amount} fontColor="text-white" />    sent to <span className="text-green-500">{to}</span> using <span className="text-blue-500">{method}</span></p>
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
      <div>
        <SelectYear />
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
        <h1 className="text-xl text-center text-white uppercase mb-4">Transactions</h1>
        <TransactionsRenderer transactions={mockTransactions} />
      </section>
    </React.Fragment>
  );
};

export default Transactions;
