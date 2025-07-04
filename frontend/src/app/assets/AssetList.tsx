"use client";
import React, { useState } from "react";

import { IAsset } from "../types";
import { Amount } from "../Zakah/common/Common";

import { Edit, Delete } from "@/UICommon/Icons";
import { ConfirmationModal } from "@/UICommon/Modal";
import { api } from "@/utils/api";
import { notifications, notify } from "../Zakah/common/notification";

const ActionButton = (
  { children, onClick = () => { } }: { children: React.ReactNode, onClick?: React.MouseEventHandler<HTMLButtonElement> }
) => {
  return (
    <button onClick={onClick} className="ml-4 invisible group-hover:visible group-hover:cursor-pointer">
      {children}
    </button>
  );
};

const DeleteModalBody = ({ asset }: { asset: IAsset }) => {
  return (
    <div>
      <h1>Proceed to delete {asset.name}?</h1>
      <h2 className="text-xs text-amber-300">This operation can not be undone!</h2>
    </div>
  );
};

const ActionButtons = ({ asset, deleteAsset }: { asset: IAsset, deleteAsset: (id: string) => void }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const confirmDelete = async () => {
    try {
      await api.delete(`/api/assets/${asset.id}/`);
      if (!asset.id) {
        console.error("Asset id not exists!");
        return;
      }
      deleteAsset(asset.id);
      notify.success(
        notifications.asset_delete.success.message,
        notifications.asset_delete.success.id
      );
    } catch (error) {
      if (error instanceof Error) {
        notify.error(
          notifications.asset_delete.failed.message,
          notifications.asset_delete.failed.id
        );
      } else {
        console.error("Failed to delete asset due to", error);
      }
    }
  };

  return (
    <React.Fragment>
      <ActionButton onClick={() => { console.log(`${asset.name} edit clicked!`); }}>
        <Edit />
      </ActionButton>
      <ActionButton onClick={() => setDeleteModalOpen(true)}>
        < Delete />
      </ActionButton>
      <ConfirmationModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
        body={<DeleteModalBody asset={asset} />}
        onConfirm={confirmDelete}
      />
    </ React.Fragment>
  );
};

const Asset = ({ asset, deleteAsset }: { asset: IAsset, deleteAsset: (id: string) => void }) => {

  return (
    <div
      className="group grid grid-cols-12 mb-2"
    >
      <div className="col-span-9 font-semibold">
        <div className="flex">
          {asset.name}
          <ActionButtons asset={asset} deleteAsset={deleteAsset} />
        </div>
      </div>
      <div className="col-span-3">
        <div className="flex justify-end">
          <pre>
            <Amount fontColor="text-green-600 font-semibold" amount={asset.amount} />
          </pre>
        </div>
      </div>
    </div>
  );
};

const AssetList = ({ assets, deleteAsset }: { assets: IAsset[], deleteAsset: (id: string) => void }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  return (
    <section className="mt-8">
      <div>
        {assets.map((asset) => {
          return (
            <Asset
              key={asset.name}
              asset={asset}
              deleteAsset={deleteAsset}
            />
          );
        })}
      </div>
      <ConfirmationModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
      />
    </section>
  );
};

export default AssetList;
