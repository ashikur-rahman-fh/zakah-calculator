"use client";
import React, { useState } from "react";

import { Edit, Delete } from "@/UICommon/Icons";
import { ConfirmationModal } from "@/UICommon/Modal";
import { useForm } from "@/hooks/InputHandler";
import { useAssetData } from "@/context/DataProvider";
import Spinner from "@/UICommon/Spinner";

import { IAsset } from "../types";
import { Amount, StyledInput } from "../Zakah/common/Common";

import { AssetInput } from "./constants";

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
      <h1>
        Proceed to delete <span className="text-amber-300">{asset.name}</span>?
      </h1>
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
      <h1 className="mb-4">
        Proceed to modify <span className="text-amber-300">{asset.name}</span>{"?"}
      </h1>
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

const ActionButtons = ({ asset }: { asset: IAsset }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modifyModalOpen, setModifyModalOpen] = useState(false);
  const { value, error, handleChange } = useForm(AssetInput, {
    name: asset.name,
    amount: asset.amount.toString(),
  });

  const { deleteAsset, updateAsset } = useAssetData();

  const confirmDelete = async () => {
    if (!asset.id) {
      console.error("Asset id not exists!");
      return;
    }
    deleteAsset(asset.id);
  };

  const confirmModify = async () => {
    if (!asset.id) {
      console.error("Asset id not exists!");
      return;
    }
    const newAsset: Partial<IAsset> = {
      name: value.name || "",
      amount: Number(value.amount) || 0,
    };
    updateAsset(asset.id, newAsset);
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

const Asset = ({ asset }: { asset: IAsset }) => {
  return (
    <div className="group grid grid-cols-12 mb-2">
      <div className="col-span-9 font-semibold">
        <div className="flex">
          {asset.name}
          <ActionButtons asset={asset} />
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

const AssetList = () => {
  const { assetDataState } = useAssetData();
  const assets = assetDataState.data;

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  if (assetDataState.status === "loading") {
    return <Spinner size="w-30" />;
  }

  if (assets.length === 0) {
    return <h1 className="text-center font-semibold">No assets to display!</h1>;
  }

  return (
    <section className="mt-8">
      <div>
        {assets.map((asset) => {
          return <Asset key={asset.id} asset={asset} />;
        })}
      </div>
      <ConfirmationModal open={openDeleteModal} setOpen={setOpenDeleteModal} />
    </section>
  );
};

export default AssetList;
