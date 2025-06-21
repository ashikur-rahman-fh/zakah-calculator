"use client";

import React from "react";

import { IZakahYear } from "../types";
import { Amount, GlassCardHeader } from "./common/Common";


const MarkComponent = ({ due }: { due: number }) => {
  return (
    due > 0 ? <span className="text-red-700">&#10008;</span> :
      <span className="text-green-700">&#10004;</span>
  );
};

interface YearProps extends IZakahYear {
  showPaymentForm: () => void;
  setZakahToPay: (value: { year: number, month: string }) => void;
};


const YearComponent: React.FC<YearProps> = ({ year, month, zakah, paid, showPaymentForm, setZakahToPay }) => {
  const due = Math.max(0, zakah - paid);
  const dueColor = due > 0 ? 'text-red-700' : 'text-white';

  const handleClick = (value: { year: number, month: string }) => {
    showPaymentForm();
    setZakahToPay(value);
  };

  return (
    <React.Fragment>
      <li className="m-2 md:m-4">
        <pre
          className="cursor-pointer"
          onClick={() => handleClick({ year, month })}
        >
          <p className="text-center text-lg">{year} {month} <MarkComponent due={due} /></p>
          <p>Total <Amount amount={zakah} fontColor="text-blue-700" /> </p>
          <p>Paid  <Amount amount={paid} fontColor="text-green-700" /></p>
          <p>Due   <Amount amount={due} fontColor={dueColor} /></p>
        </pre>
      </li>
    </React.Fragment>
  );
};

const ZakahYearRenderer = ({ zakahYears, showPaymentForm, setZakahToPay }:
  {
    zakahYears: IZakahYear[], showPaymentForm: () => void,
    setZakahToPay: (value: { year: number, month: string }) => void
  }) => {
  if (zakahYears === undefined || zakahYears === null || zakahYears.length === 0) {
    return (
      <h1 className="text-center text-lg">No data to display</h1>
    );
  }

  return (
    <ul>
      {
        zakahYears.map((zakahYear: IZakahYear) => {
          return (
            <YearComponent
              key={zakahYear.year + zakahYear.month}
              id={zakahYear.id}
              year={zakahYear.year}
              month={zakahYear.month}
              zakah={zakahYear.zakah}
              paid={zakahYear.paid}
              showPaymentForm={showPaymentForm}
              setZakahToPay={setZakahToPay}
            />
          )
        })
      }
    </ul>
  );
};

const ZakahYear = ({ zakahYears, showPaymentForm, setZakahToPay }:
  {
    zakahYears: IZakahYear[], showPaymentForm: () => void,
    setZakahToPay: (value: { year: number, month: string }) => void
  }) => {

  return (
    <React.Fragment>
      <section>
        <GlassCardHeader>History</GlassCardHeader>
        <ZakahYearRenderer
          zakahYears={zakahYears.slice(-3)}
          showPaymentForm={showPaymentForm}
          setZakahToPay={setZakahToPay}
        />
      </section>
    </React.Fragment>
  );
};

export default ZakahYear;
