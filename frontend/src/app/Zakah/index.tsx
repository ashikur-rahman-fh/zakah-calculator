import React from "react";

import { IZakahYear, mockData } from "../types";
import { Amount, GlassCardHeader } from "../Common";

const MarkComponent = ({ due }: { due: number }) => {
  return (
    due > 0 ? <span className="text-red-500">&#10008;</span> :
      <span className="text-green-500">&#10004;</span>
  );
};

const YearComponent: React.FC<IZakahYear> = ({ year, month, zakah, paid }) => {
  const due = Math.max(0, zakah - paid);
  const dueColor = due > 0 ? 'text-red-500' : 'text-white';

  return (
    <React.Fragment>
      <li className="m-2 md:m-4">
        <pre>
          <p className="text-center text-lg">{year} {month} <MarkComponent due={due} /></p>
          <p>Total <Amount amount={zakah} fontColor="text-blue-500" /> </p>
          <p>Paid  <Amount amount={paid} fontColor="text-green-500" /></p>
          <p>Due   <Amount amount={due} fontColor={dueColor} /></p>
        </pre>
      </li>
    </React.Fragment>
  );
};

const ZakahYearRenderer = ({ zakahYears }: { zakahYears: IZakahYear[] }) => {
  if (zakahYears === undefined || zakahYears === null || zakahYears.length === 0) {
    return (
      <div>No data to display</div>
    );
  }

  return (
    <ul>
      {
        zakahYears.map((zakahYear: IZakahYear) => {
          return (
            <YearComponent
              key={zakahYear.year + zakahYear.month}
              year={zakahYear.year}
              month={zakahYear.month}
              zakah={zakahYear.zakah}
              paid={zakahYear.paid}
            />
          )
        })
      }
    </ul>
  );
};

const ZakahYear = () => {
  return (
    <React.Fragment>
      <section>
        <GlassCardHeader>History</GlassCardHeader>
        <ZakahYearRenderer zakahYears={mockData} />
      </section>
    </React.Fragment>
  );
};

export default ZakahYear;
