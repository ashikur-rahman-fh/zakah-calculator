"use client";

import React, { useEffect } from "react";

import { AssetDataProvider, useAssetData } from "@/context/DataProvider";

import AuthGuard from "../Zakah/common/AuthGuard";
import { GlassCard, GlassCardHeader } from "../Zakah/common/Common";

import AssetList from "./AssetList";
import AddAsset from "./AddAsset";
import TotalAsset from "./TotalAsset";

const AssetClient = () => {
  const { fetchAssets } = useAssetData();

  useEffect(() => {
    fetchAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-12 md:grid-rows-10">
      <GlassCard twStyle="col-span-1 md:col-start-1 md:col-end-9 md:row-start-1 md:row-end-11 md:min-h-[80vh]">
        <GlassCardHeader>Assets</GlassCardHeader>
        <AssetList />
      </GlassCard>
      <GlassCard twStyle="col-span-1 md:col-start-9 md:col-end-13 md:row-start-1 md:row-end-6">
        <GlassCardHeader>Add Asset</GlassCardHeader>
        <AddAsset />
      </GlassCard>
      <GlassCard twStyle="col-span-1 md:col-start-9 md:col-end-13 md:row-start-6 md:row-end-11">
        <GlassCardHeader>Total Assets</GlassCardHeader>
        <TotalAsset />
      </GlassCard>
    </div>
  );
};

const ProtectedAssetClient = () => {
  return (
    <AuthGuard>
      <AssetDataProvider>
        <AssetClient />
      </AssetDataProvider>
    </AuthGuard>
  );
};

export default ProtectedAssetClient;
