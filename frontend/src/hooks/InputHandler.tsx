import React, { useState, useMemo } from "react";

import { IInputField } from "@/app/types";

interface UseFormResult {
  value: Record<string, string>;
  error: Record<string, string>;
  hasError: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
}

export const useForm = (inputFields: IInputField[]): UseFormResult => {
  const [value, setValue] = useState<Record<string, string>>({});
  const [error, setError] = useState<Record<string, string>>({});

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

  return { value, error, hasError, handleChange };
};
