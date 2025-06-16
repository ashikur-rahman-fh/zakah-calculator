"use client"

import React from "react";

import { Button, GlassCardHeader, StyledInput } from "../Common";
import { IInputField } from "../types";
import { InputFields } from "./constants";
import { useForm } from "@/hooks/InputHandler";

const PayZakahForm = ({ inputFields, paymentFor }:
  { inputFields: IInputField[], paymentFor: string }) => {
  const { value, error, hasError, handleChange, clearForm } = useForm(inputFields);
  return (
    <React.Fragment>
      {inputFields.map((inputField: IInputField, index: number) => {
        return (
          <StyledInput
            key={inputField.id}
            name={inputField.name}
            placeholder={inputField.placeholder}
            value={value[inputField.name] || ""}
            onChange={(e) => { handleChange(e, index) }}
            error={error[inputField.name]}
          />
        );
      })}
      <div>
        <Button
          disabled={Object.entries(error).length === 0 || hasError}
          onClick={() => console.log({...value, paymentFor})}
        >
          Submit
        </Button>
        <Button
          disabled={false}
          onClick={clearForm}
        >
          Clear
        </Button>
      </div>
    </ React.Fragment>
  );
};

const PayZakah = ({ paymentFor, closeForm }:
  { paymentFor: string, closeForm: () => void }) => {
  return (
    <section>
      <GlassCardHeader>
        <span>Pay Zakah - {paymentFor}</span>
        <span
          className="float-right mx-4 text-red-700 cursor-pointer"
          onClick={closeForm}
        >&#10008; </span>
      </GlassCardHeader>
      <div className="flex flex-col justify-center items-center">
        <PayZakahForm
          inputFields={InputFields}
          paymentFor={paymentFor}
        />
      </div>
    </section>
  );
};

export default PayZakah;
