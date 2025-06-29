"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Transactions from "./Transactions";
import ZakahYear from "./Zakah";
import PayZakah from "./PayZakah";

import { GlassCard } from "./Zakah/common/Common";

import { useAuth } from "@/context/AuthProvider";
import { updateZakahYears } from "@/utils/zakahApis";

export default function HomePage() {
  const [openPaymentForm, setOpenPaymentForm] = useState<boolean>(false);
  const [zakahToPay, setZakahToPay] = useState<{ year: number, month: string } | null>(null);
  const { zakahState, dispatch } = useAuth();

  useEffect(() => {
    updateZakahYears(dispatch);
  }, [dispatch]);

  const showPaymentForm = () => {
    setOpenPaymentForm(true);
  };

  const hidePaymentForm = () => {
    setOpenPaymentForm(false);
    setZakahToPay(null);
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
            zakahYears={zakahState.zakahYears}
            showPaymentForm={showPaymentForm}
            setZakahToPay={setZakahToPay}
          />
        </GlassCard>
        <GlassCard twStyle="col-span-1 md:col-start-4 md:col-end-10">
          <Transactions zakahYears={zakahState.zakahYears} />
        </GlassCard>
        {openPaymentForm ?
          <div className={`
                    col-span-1 md:col-start-3 md:col-end-8
                    ${hidden}
        `}>
            <GlassCard twStyle="">
              <PayZakah
                zakahToPay={zakahToPay}
                closeForm={hidePaymentForm}
              />
            </GlassCard>
          </div> : null}
      </div>
    </React.Fragment >
  );
};
