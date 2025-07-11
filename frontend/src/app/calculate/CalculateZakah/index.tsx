"use client";
import React, { useEffect, useState } from "react";

import { IInputField } from "@/app/types";
import { StyledInput, Button } from "@/app/Zakah/common/Common";
import { useForm } from "@/hooks/InputHandler";
import { api } from "@/utils/api";
import { useAuth } from "@/context/AuthProvider";
import { notifications, notify } from "@/app/Zakah/common/notification";
import { calculateZakah } from "@/utils/helper";

import { calZakahInputs } from "./constants";
import { InitialState } from "./constants";

let cnt = 1;

const getNewField = (): IInputField => {
  return {
    id: `other_${cnt}`,
    name: `amount_other_${cnt}`,
    placeholder: "Other",
    error: "Please enter a valid non-negative number.",
    validator: (value: string): boolean => {
      const num = Number(value.trim());
      return !isNaN(num) && num >= 0;
    },
  };
};

const CalculateZakahForm = ({
  inputFields,
  totalAsset,
  setTotalAsset,
}: {
  inputFields: IInputField[];
  totalAsset: number;
  setTotalAsset: (asset: number) => void;
}) => {
  const [fields, setFields] = useState(inputFields);
  const { value, error, hasError, handleChange, clearForm } = useForm(fields, {
    ...InitialState,
  });
  const { router } = useAuth();

  const addField = () => {
    setFields((prev) => {
      return [...prev, getNewField()];
    });
    cnt += 1;
  };

  useEffect(() => {
    const total = Object.entries(value).reduce((sum, [key, value]) => {
      const amount = Number(value);
      if (key.startsWith("amount_") && !isNaN(amount) && amount > 0) {
        return sum + amount;
      }
      return sum;
    }, 0);
    setTotalAsset(total);
  }, [value, setTotalAsset]);

  const handleSubmit = async () => {
    const zakah = calculateZakah(totalAsset);
    try {
      await api.post("/api/zakah-years/create/", {
        year: value["year"],
        month: value["month"],
        total_amount: zakah,
        calculation_breakdown: value,
      });
      notify.success(
        notifications.zakah_calculation.success.message,
        notifications.zakah_calculation.success.id,
      );
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error(error);
      }
      notify.error(
        notifications.zakah_calculation.failed.message,
        notifications.zakah_calculation.failed.id,
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {fields.map((inputField: IInputField, index: number) => {
        return (
          <StyledInput
            key={inputField.id}
            name={inputField.name}
            placeholder={inputField.placeholder}
            value={value[inputField.name] || ""}
            onChange={(e) => {
              handleChange(e, index);
            }}
            error={error[inputField.name]}
          />
        );
      })}
      <div className="flex justify-center">
        <Button
          twStyle="!bg-green-600/60 hover:!bg-green-600 text-xl font-bold mb-4"
          disabled={false}
          onClick={addField}
        >
          +
        </Button>
      </div>
      <div>
        <Button
          twStyle=""
          disabled={Object.entries(error).length === 0 || hasError}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button twStyle="" disabled={false} onClick={clearForm}>
          Clear
        </Button>
      </div>
    </div>
  );
};

const CalculateZakah = ({
  totalAsset,
  setTotalAsset,
}: {
  totalAsset: number;
  setTotalAsset: (asset: number) => void;
}) => {
  return (
    <section>
      <CalculateZakahForm
        inputFields={calZakahInputs}
        totalAsset={totalAsset}
        setTotalAsset={setTotalAsset}
      />
    </section>
  );
};

export default CalculateZakah;
