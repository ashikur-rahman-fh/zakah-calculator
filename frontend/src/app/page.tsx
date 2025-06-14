"use client";
import React from "react";

import Transactions from "./Transactions";
import ZakahYear from "./Zakah";
import PayZakah from "./PayZakah";

import { GlassCard } from "./Common";

export default function Home() {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <GlassCard twStyle="col-span-1">
          <ZakahYear />
        </GlassCard>
        <GlassCard twStyle="col-span-1 md:col-span-2">
          <Transactions />
        </GlassCard>
        <GlassCard twStyle="col-span-1 md:col-span-3">
          <PayZakah />
        </GlassCard>
      </div>
    </React.Fragment >
  );
};
