"use client";

import React from "react";

import { useForm } from "@/hooks/InputHandler";
import { useAuth } from "@/context/AuthProvider";
import { updateTransactions, updateZakahYears } from "@/utils/zakahApis";
import { api } from "@/utils/api";

import { Button, GlassCardHeader, StyledInput } from "../Zakah/common/Common";
import { notify, notifications } from "../Zakah/common/notification";
import { IInputField } from "../types";

import { InputFields } from "./constants";

const PayZakahForm = ({
  inputFields,
  zakahToPay,
}: {
  inputFields: IInputField[];
  zakahToPay: { year: number; month: string } | null;
}) => {
  const { value, error, hasError, handleChange, clearForm } =
    useForm(inputFields);

  const { dispatch } = useAuth();

  const handleSubmit = () => {
    if (zakahToPay === null) {
      return;
    }
    (async () => {
      try {
        await api.post("/api/zakah-transactions/create/", {
          ...value,
          zakah_year: zakahToPay.year,
          zakah_month: zakahToPay.month,
        });
        notify.success(
          notifications.transaction_create.success.message,
          notifications.transaction_create.success.id,
        );
        updateZakahYears(dispatch);
        updateTransactions(zakahToPay.year, dispatch);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.log(error);
        }
        notify.error(
          notifications.transaction_create.failed.message,
          notifications.transaction_create.failed.id,
        );
      }
    })();
  };

  return (
    <React.Fragment>
      {inputFields.map((inputField: IInputField, index: number) => {
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
    </React.Fragment>
  );
};

const PayZakah = ({
  zakahToPay,
  closeForm,
}: {
  zakahToPay: { year: number; month: string } | null;
  closeForm: () => void;
}) => {
  return (
    <section>
      <GlassCardHeader>
        <span>Pay Zakah - {zakahToPay?.year + " " + zakahToPay?.month}</span>
        <span
          className="float-right mx-4 text-red-700 cursor-pointer"
          onClick={closeForm}
        >
          &#10008;{" "}
        </span>
      </GlassCardHeader>
      <div className="flex flex-col justify-center items-center">
        <PayZakahForm inputFields={InputFields} zakahToPay={zakahToPay} />
      </div>
    </section>
  );
};

export default PayZakah;
