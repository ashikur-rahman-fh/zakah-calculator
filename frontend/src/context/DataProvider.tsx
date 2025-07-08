"use client";
import React, { createContext, useContext, useReducer } from "react";

import { IAsset, IZakahYear } from "@/app/types";
import { api } from "@/utils/api";
import { notifications, notify } from "@/app/Zakah/common/notification";

import { ListDataReducer, ListDataState } from "./StateProvider";

interface AssetDataContextProps {
  assetDataState: ListDataState<IAsset>;
  fetchAssets: () => void;
  addAsset: (asset: Partial<IAsset>) => void;
  updateAsset: (id: IAsset["id"], newAsset: Partial<IAsset>) => void;
  deleteAsset: (id: IAsset["id"]) => void;
};

interface ZakahDataContextProps {
  zakahDataState: ListDataState<IZakahYear>;
  fetchZakahYears: () => void;
  addZakahYear: (zakahYear: Partial<IZakahYear>) => void;
};

const AssetDataContext = createContext<AssetDataContextProps | undefined>(undefined);
const ZakahDataContext = createContext<ZakahDataContextProps | undefined>(undefined);

export const AssetDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [assetDataState, assetDispatch] = useReducer(ListDataReducer<IAsset>, {
    status: "idle",
    data: [],
    error: null,
  });

  const fetchAssets = async () => {
    assetDispatch({ type: "START" });
    try {
      const data = await api.get("/api/assets/");
      assetDispatch({ type: "SUCCESS", payload: data as IAsset[] });
    } catch (error) {
      if (error instanceof Error) {
        assetDispatch({ type: "ERROR", error: error.message });
      } else {
        assetDispatch({ type: "ERROR", error: error as string });
      }
      notify.error(
        notifications.asset_list_update.failed.message,
        notifications.asset_list_update.failed.id,
      );
    }
  };

  const addAsset = async (asset: Partial<IAsset>) => {
    assetDispatch({ type: "START" });
    try {
      const data = await api.post("/api/assets/", asset);
      assetDispatch({ type: "ADD", payload: data as IAsset });
      notify.success(
        notifications.asset_create.success.message,
        notifications.asset_create.success.id,
      );
    } catch (error) {
      if (error instanceof Error) {
        assetDispatch({ type: "ERROR", error: error.message });
      } else {
        assetDispatch({ type: "ERROR", error: error as string });
      }
      notify.error(
        notifications.asset_create.failed.message,
        notifications.asset_create.failed.id,
      );
    }
  };

  const updateAsset = async (id: IAsset["id"], newAsset: Partial<IAsset>) => {
    assetDispatch({ type: "START" });
    try {
      const data = await api.post(`/api/assets/${id}/`, newAsset);
      assetDispatch({ type: "UPDATE", payload: data as IAsset });
      notify.success(
        notifications.asset_modify.success.message,
        notifications.asset_modify.success.id,
      );
    } catch (error) {
      if (error instanceof Error) {
        assetDispatch({ type: "ERROR", error: error.message });
      } else {
        assetDispatch({ type: "ERROR", error: error as string });
      }
      notify.error(
        notifications.asset_modify.failed.message,
        notifications.asset_modify.failed.id,
      );
    }
  };

  const deleteAsset = async (id: IAsset["id"]) => {
    assetDispatch({ type: "START" });
    try {
      await api.delete(`/api/assets/${id}/`);
      assetDispatch({ type: "DELETE", payload: id });
      notify.success(
        notifications.asset_delete.success.message,
        notifications.asset_delete.success.id,
      );
    } catch (error) {
      if (error instanceof Error) {
        assetDispatch({ type: "ERROR", error: error.message });
      } else {
        assetDispatch({ type: "ERROR", error: error as string });
      }
      notify.error(
        notifications.asset_delete.failed.message,
        notifications.asset_delete.failed.id,
      );
    }
  };

  return (
    <AssetDataContext.Provider
      value={{
        assetDataState,
        fetchAssets,
        addAsset,
        updateAsset,
        deleteAsset,
      }}
    >
      {children}
    </AssetDataContext.Provider>
  );
};

export const ZakahDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [zakahDataState, zakahDispatch] = useReducer(
    ListDataReducer<IZakahYear>, { status: "idle", data: [], error: null });

  const fetchZakahYears = async () => {
    zakahDispatch({ type: "START" });
    try {
      const data = await api.get("/api/zakah-years");
      zakahDispatch({ type: "SUCCESS", payload: data as IZakahYear[] });
    } catch (error) {
      if (error instanceof Error) {
        zakahDispatch({ type: "ERROR", error: error.message });
      } else {
        zakahDispatch({ type: "ERROR", error: error as string });
      }
      notify.error(
        notifications.zakah_list_update.failed.message,
        notifications.zakah_list_update.failed.id,
      );
    }
  };

  const addZakahYear = async (zakahYear: Partial<IZakahYear>) => {
    zakahDispatch({ type: "START" });
    try {
      const data = await api.get("/api/zakah-years/create/", zakahYear);
      zakahDispatch({ type: "ADD", payload: data as IZakahYear });
      notify.success(
        notifications.zakah_calculation.success.message,
        notifications.zakah_calculation.success.id,
      );
    } catch (error) {
      if (error instanceof Error) {
        zakahDispatch({ type: "ERROR", error: error.message });
      } else {
        zakahDispatch({ type: "ERROR", error: error as string });
      }
      notify.error(
        notifications.zakah_calculation.failed.message,
        notifications.zakah_calculation.failed.id,
      );
    }
  };

  return (
    <ZakahDataContext.Provider
      value={{ zakahDataState, fetchZakahYears, addZakahYear }}
    >
      {children}
    </ZakahDataContext.Provider>
  );
};

export const useAssetData = () => {
  const context = useContext(AssetDataContext);

  if (!context) {
    throw new Error("useAssetData must be used within an AssetDataContext");
  }
  return context;
};

export const useZakahData = () => {
  const context = useContext(ZakahDataContext);

  if (!context) {
    throw new Error("useZakahData must be used within an ZakahDataContext");
  }
  return context;
};
