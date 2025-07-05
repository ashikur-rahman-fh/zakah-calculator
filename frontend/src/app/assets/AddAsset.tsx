import React, { Dispatch, SetStateAction } from "react";

import { useForm } from "@/hooks/InputHandler";
import { createAsset } from "@/utils/assetApis";

import { Button, StyledInput } from "../Zakah/common/Common";
import { IAsset } from "../types";

import { AssetInput } from "./constants";

const AddAsset = ({
  setAssets,
}: {
  setAssets: Dispatch<SetStateAction<IAsset[]>>;
}) => {
  const { value, error, handleChange, hasError, clearForm } =
    useForm(AssetInput);

  const handleCreate = async () => {
    const asset: IAsset = {
      name: value.name || "",
      amount: Number(value.amount) || 0,
    };
    const data: IAsset | null = await createAsset(asset);
    if (data === null) {
      return;
    }
    setAssets((prev: IAsset[]) => {
      return [...prev, data as IAsset];
    });
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
