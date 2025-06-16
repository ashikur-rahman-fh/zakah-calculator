"use client";
import React, { useState } from "react";

import Transactions from "./Transactions";
import ZakahYear from "./Zakah";
import PayZakah from "./PayZakah";

import { GlassCard } from "./Common";

export default function Home() {
  const [openPaymentForm, setOpenPaymentForm] = useState<boolean>(false);
  const [paymentFor, setPaymentFor] = useState<string>("");

  const showPaymentForm = () => {
    setOpenPaymentForm(true);
  };

  const hidePaymentForm = () => {
    setOpenPaymentForm(false);
    setPaymentFor("");
  };

  const hidden = openPaymentForm ? "visible" : "hidden";
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-16">
        <GlassCard twStyle="col-span-1 md:col-start-1 md:col-end-4">
          <ZakahYear
            showPaymentForm={showPaymentForm}
            setPaymentFor={setPaymentFor}
          />
        </GlassCard>
        <GlassCard twStyle="col-span-1 md:col-start-4 md:col-end-10">
          <Transactions />
        </GlassCard>
        <div className={`
                    col-span-1 md:col-start-3 md:col-end-8
                    ${hidden}
        `}>
          <GlassCard twStyle="">
            <PayZakah
              paymentFor={paymentFor}
              closeForm={hidePaymentForm}
            />
          </GlassCard>
        </div>
      </div>
    </React.Fragment >
  );
};
