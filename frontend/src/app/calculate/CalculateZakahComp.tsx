"use client"
import React, { useState } from "react";

import { Amount, GlassCard, GlassCardHeader } from "../Zakah/common/Common";
import CalculateZakah from "./CalculateZakah";

const CalculateZakahComponent = () => {
  const [totalAsset, setTotalAsset] = useState<number>(0);
  const zakah = Math.ceil(totalAsset * 2.5) / 100;

  return (
    <div className="grid grid-col-1 md:grid-cols-12 gap-8">
      <GlassCard twStyle="col-span-1 md:col-start-1 md:col-end-9">
        <GlassCardHeader>Enter Assets</GlassCardHeader>
        <CalculateZakah
          totalAsset={totalAsset}
          setTotalAsset={setTotalAsset}
        />
      </GlassCard>
      <GlassCard twStyle="col-span-1 md:col-start-9 md:col-end-13 row-end-auto">
        <GlassCardHeader>Zakah</GlassCardHeader>
        <div className="flex justify-center items-center h-full">
          <pre className="text-xl">
            <p>Total Asset: <Amount amount={totalAsset} fontColor="text-green-600" /></p>
            <p>Zakah:       <Amount amount={zakah} fontColor="text-red-600" /></p>
          </pre>
        </div>
      </GlassCard>
    </ div>
  );
};

export default CalculateZakahComponent;
