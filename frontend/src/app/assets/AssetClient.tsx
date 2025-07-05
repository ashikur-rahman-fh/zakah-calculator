"use client";

import React, { useState, useEffect } from "react";
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

  const deleteAsset = (id: string) => {
    setAssets((prev) => {
      return prev.filter((asset) => asset.id !== id);
    });
  };

  const modifyAsset = (id: string, asset: IAsset) => {
    setAssets((prev) => {
      const index = prev.findIndex((asset) => id === asset.id);
      return [...prev.slice(0, index), asset, ...prev.slice(index + 1)];
    });
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-12 md:grid-rows-10">
      <GlassCard twStyle="col-span-1 md:col-start-1 md:col-end-9 md:row-start-1 md:row-end-11 md:min-h-[80vh]">
        <GlassCardHeader>Assets</GlassCardHeader>
        <AssetList
          assets={assets}
          deleteAsset={deleteAsset}
          modifyAsset={modifyAsset}
        />
      </GlassCard>
      <GlassCard twStyle="col-span-1 md:col-start-9 md:col-end-13 md:row-start-1 md:row-end-6">
        <GlassCardHeader>Add Asset</GlassCardHeader>
        <AddAsset setAssets={setAssets} />
      </GlassCard>
      <GlassCard twStyle="col-span-1 md:col-start-9 md:col-end-13 md:row-start-6 md:row-end-11">
        <GlassCardHeader>Total Assets</GlassCardHeader>
        <TotalAsset assets={assets} />
      </GlassCard>
    </div>
  );
};

const ProtectedAssetClient = () => {
  return (
    <AuthGuard>
      <AssetClient />
    </AuthGuard>
  );
};

export default ProtectedAssetClient;
