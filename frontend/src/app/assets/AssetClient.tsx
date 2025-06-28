"use client"

import React, { useState, useEffect, useMemo } from "react"
import AssetList from "./AssetList";
import TotalAsset from "./TotalAsset";
import AddAsset from "./AddAsset";

import AuthGuard from "../Zakah/common/AuthGuard";
import { GlassCard, GlassCardHeader } from "../Zakah/common/Common";
import { IAsset } from "../types";
import { getAssets } from "@/utils/assetApis";

const AssetClient = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);
  useEffect(() => {
    (async () => {
      const data = await getAssets();
      setAssets(data);
    })();
  }, []);

  const totalAsset = useMemo(() => {
    return assets.reduce((acc: number, curr) => Number(acc.toString().trim()) + Number(curr.amount.toString().trim()), 0);
  }, [assets]);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-12 md:grid-rows-10">
      <GlassCard twStyle="col-span-1 md:col-start-1 md:col-end-9 md:row-start-1 md:row-end-11 md:min-h-[80vh]">
        <GlassCardHeader>Assets</GlassCardHeader>
        <AssetList assets={assets} />
      </GlassCard>
      <GlassCard twStyle="col-span-1 md:col-start-9 md:col-end-13 md:row-start-1 md:row-end-6">
        <GlassCardHeader>Add Asset</GlassCardHeader>
        <AddAsset setAssets={setAssets} />
      </GlassCard>
      <GlassCard twStyle="col-span-1 md:col-start-9 md:col-end-13 md:row-start-6 md:row-end-11">
        <GlassCardHeader>Total Assets</GlassCardHeader>
        <TotalAsset totalAsset={totalAsset} />
      </GlassCard>
    </div>
  );
};

const ProtectedAssetClient = () => {
  return (
    <AuthGuard>
      <AssetClient />
    </ AuthGuard>
  );
};

export default ProtectedAssetClient;
