"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Transactions from "./Transactions";
import ZakahYear from "./Zakah";
import PayZakah from "./PayZakah";

import { GlassCard } from "./Common";
import { IZakahYear } from "./types";

import { api } from "@/utils/api";

export default function HomePage() {
  const [openPaymentForm, setOpenPaymentForm] = useState<boolean>(false);
  const [paymentFor, setPaymentFor] = useState<string>("");
  const [zakahYears, setZakahYears] = useState<IZakahYear[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.get("/api/zakah-years");
        setZakahYears(data as IZakahYear[]);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error(error);
        }
      }
    })();
  }, []);

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
      <GlassCard twStyle="mb-2">
        <Link
          href="/calculate"
        >
          Click here to calculate your zakah
        </Link>
      </GlassCard>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-16">
        <GlassCard twStyle="col-span-1 md:col-start-1 md:col-end-4">
          <ZakahYear
            zakahYears={zakahYears}
            showPaymentForm={showPaymentForm}
            setPaymentFor={setPaymentFor}
          />
        </GlassCard>
        <GlassCard twStyle="col-span-1 md:col-start-4 md:col-end-10">
          <Transactions zakahYears={zakahYears} />
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
