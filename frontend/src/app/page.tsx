"use client";
import React from "react";

import Transactions from "./Transactions";
import ZakahYear from "./Zakah";
import PayZakah from "./PayZakah";

import { GlassCard } from "./Common";

export default function Home() {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-16">
        <GlassCard twStyle="col-span-1 md:col-start-1 md:col-end-4">
          <ZakahYear />
        </GlassCard>
        <GlassCard twStyle="col-span-1 md:col-start-4 md:col-end-10">
          <Transactions />
        </GlassCard>
        <GlassCard twStyle="col-span-1 md:col-start-3 md:col-end-8">
          <PayZakah />
        </GlassCard>
      </div>
    </React.Fragment >
  );
};
