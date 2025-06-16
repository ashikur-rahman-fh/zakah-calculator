import React, { useState, useMemo } from "react";

import { IInputField } from "@/app/types";

interface UseFormResult {
  value: Record<string, string>;
  error: Record<string, string>;
  hasError: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  clearForm: () => void;
}

export const useForm = (inputFields: IInputField[], InitialState: Record<string, string> = {}): UseFormResult => {
  const errorState = Object.keys(InitialState).reduce((newObj, key) => {
    return { ...newObj, [key]: "" };
  }, {});

  const [value, setValue] = useState<Record<string, string>>({ ...InitialState });
  const [error, setError] = useState<Record<string, string>>({ ...errorState });

  const validateField = (name: string, val: string, index: number): string => {
    const isValid = inputFields[index].validator(val);
    return isValid ? "" : inputFields[index].error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { name, value: newValue } = e.target;

    setValue((prev) => ({ ...prev, [name]: newValue }));
    setError((prev) => ({ ...prev, [name]: validateField(name, newValue, index) }));
  };

  const hasError = useMemo(() => {
    return inputFields.reduce((res, curr) => {
      if (curr.error === "") {
        return res;
      }

      return res || (Object.hasOwn(error, curr.name) === false || error[curr.name] !== "");
    }, false);
  }, [error, inputFields]);

  const clearForm = () => {
    setValue({});
    setError({});
  };

  return { value, error, hasError, handleChange, clearForm };
};
