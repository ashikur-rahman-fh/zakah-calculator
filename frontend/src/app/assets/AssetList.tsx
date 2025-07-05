"use client";
import React, { useState } from "react";

import { IAsset } from "../types";
import { Amount, StyledInput } from "../Zakah/common/Common";

import { Edit, Delete } from "@/UICommon/Icons";
import { ConfirmationModal } from "@/UICommon/Modal";
import { api } from "@/utils/api";
import { notifications, notify } from "../Zakah/common/notification";
import { AssetInput } from "./constants";
import { useForm } from "@/hooks/InputHandler";

const ActionButton = ({
  children,
  onClick = () => {},
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClick}
      className="ml-4 invisible group-hover:visible group-hover:cursor-pointer"
    >
      {children}
    </button>
  );
};

const DeleteModalBody = ({ asset }: { asset: IAsset }) => {
  return (
    <div>
      <h1>Proceed to delete {asset.name}?</h1>
      <h2 className="text-xs text-amber-300">
        This operation can not be undone!
      </h2>
    </div>
  );
};

const ModifyModalBody = ({
  asset,
  value,
  error,
  handleChange,
}: {
  asset: IAsset;
  value: Record<string, string>;
  error: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="mb-4">Proceed to modify {asset.name} </h1>
      {AssetInput.map((assetInput, index) => {
        return (
          <StyledInput
            key={assetInput.id}
            name={assetInput.name}
            placeholder={assetInput.placeholder}
            value={value[assetInput.name] || ""}
            onChange={(e) => {
              handleChange(e, index);
            }}
            error={error[assetInput.name]}
          />
        );
      })}
    </div>
  );
};

const ActionButtons = ({
  asset,
  deleteAsset,
  modifyAsset,
}: {
  asset: IAsset;
  deleteAsset: (id: string) => void;
  modifyAsset: (id: string, asset: IAsset) => void;
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const { value, error, handleChange } = useForm(AssetInput, {
    name: asset.name,
    amount: asset.amount.toString(),
  });

  const confirmDelete = async () => {
    try {
      if (!asset.id) {
        console.error("Asset id not exists!");
        return;
      }
      await api.delete(`/api/assets/${asset.id}/`);
      deleteAsset(asset.id);
      notify.success(
        notifications.asset_delete.success.message,
        notifications.asset_delete.success.id,
      );
    } catch (error) {
      if (error instanceof Error) {
        notify.error(
          notifications.asset_delete.failed.message,
          notifications.asset_delete.failed.id,
        );
      } else {
        console.error("Failed to delete asset due to", error);
      }
    }
  };

  const confirmModify = async () => {
    try {
      if (!asset.id) {
        console.error("Asset id not exists!");
        return;
      }
      const newAsset: IAsset = {
        name: value.name || "",
        amount: Number(value.amount) || 0,
      };
      const data = await api.put<IAsset>(`/api/assets/${asset.id}/`, {
        ...newAsset,
      });
      modifyAsset(asset.id, data as IAsset);

      notify.success(
        notifications.asset_modify.success.message,
        notifications.asset_modify.success.id,
      );
    } catch (error) {
      if (error instanceof Error) {
        notify.error(
          notifications.asset_modify.failed.message,
          notifications.asset_modify.failed.id,
        );
      } else {
        console.error("Failed to modify asset due to", error);
      }
    }
  };
  return (
    <React.Fragment>
      <ActionButton onClick={() => setModifyModalOpen(true)}>
        <Edit />
      </ActionButton>
      <ActionButton onClick={() => setDeleteModalOpen(true)}>
        <Delete />
      </ActionButton>
      <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        body={<DeleteModalBody asset={asset} />}
        onConfirm={confirmDelete}
      />
      <ConfirmationModal
        open={modifyModalOpen}
        setOpen={setModifyModalOpen}
        body={
          <ModifyModalBody
            asset={asset}
            value={value}
            error={error}
            handleChange={handleChange}
          />
        }
        onConfirm={confirmModify}
      />
    </React.Fragment>
  );
};

const Asset = ({
  asset,
  deleteAsset,
  modifyAsset,
}: {
  asset: IAsset;
  deleteAsset: (id: string) => void;
  modifyAsset: (id: string, asset: IAsset) => void;
}) => {
  return (
    <div className="group grid grid-cols-12 mb-2">
      <div className="col-span-9 font-semibold">
        <div className="flex">
          {asset.name}
          <ActionButtons
            asset={asset}
            deleteAsset={deleteAsset}
            modifyAsset={modifyAsset}
          />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex justify-end">
          <pre>
            <Amount
              fontColor="text-green-600 font-semibold"
              amount={asset.amount}
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

const AssetList = ({
  assets,
  deleteAsset,
  modifyAsset,
}: {
  assets: IAsset[];
  deleteAsset: (id: string) => void;
  modifyAsset: (id: string, asset: IAsset) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  if (assets.length === 0) {
    return <h1 className="text-center font-semibold">No assets to display!</h1>;
  }

  return (
    <section className="mt-8">
      <div>
        {assets.map((asset) => {
          return (
            <Asset
              key={asset.name}
              asset={asset}
              deleteAsset={deleteAsset}
              modifyAsset={modifyAsset}
            />
          );
        })}
      </div>
      <ConfirmationModal open={openDeleteModal} setOpen={setOpenDeleteModal} />
    </section>
  );
};

export default AssetList;
