"use client"

import React from "react";

import { Button, GlassCardHeader, StyledInput } from "../Common";
import { IInputField } from "../types";
import { InputFields } from "./constants";
import { useForm } from "@/hooks/InputHandler";

const PayZakahForm = ({ inputFields }: { inputFields: IInputField[] }) => {
  const { value, error, hasError, handleChange } = useForm(inputFields);
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
      <Button
        disabled={Object.entries(error).length === 0 || hasError}
        onClick={() => console.log("hello world")}
      >
        Submit
      </Button>
    </ React.Fragment>
  );
};

const PayZakah = () => {
  return (
    <section>
      <GlassCardHeader>Pay Zakah</GlassCardHeader>
      <div className="flex flex-col justify-center items-center">
        <PayZakahForm inputFields={InputFields} />
      </div>
    </section>
  );
};

export default PayZakah;
