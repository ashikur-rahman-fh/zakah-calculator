import React from "react";

import { useForm } from "@/hooks/InputHandler";
import { useAssetData } from "@/context/DataProvider";

import { Button, StyledInput } from "../Zakah/common/Common";
import { IAsset } from "../types";

import { AssetInput } from "./constants";

const AddAsset = () => {
  const { value, error, handleChange, hasError, clearForm } =
    useForm(AssetInput);

  const { addAsset } = useAssetData();

  const handleCreate = async () => {
    const asset: Partial<IAsset> = {
      name: value.name || "",
      amount: Number(value.amount) || 0,
    };
    addAsset(asset);
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
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
      <div className="flex justify-center items-center">
        <Button twStyle="" disabled={hasError} onClick={handleCreate}>
          Create
        </Button>
        <Button twStyle="" disabled={false} onClick={clearForm}>
          Clear
        </Button>
      </div>
    </section>
  );
};

export default AddAsset;
