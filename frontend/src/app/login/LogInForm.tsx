"use client"

import { useState } from 'react';

import { useAuth } from '@/context/AuthProvider';
import { Button, notify, StyledInput } from '../Zakah/common/Common';
import { InputFields } from './constants';
import { useForm } from '@/hooks/InputHandler';

const LoginForm = () => {
  const { value, hasError, handleChange } = useForm([...InputFields]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const { login } = useAuth();

  const handleSubmit = async () => {
    try {
      await login(value["username"], value["password"]);
      notify.success(`Welcome ${value["username"]}!`, "login-success");
    } catch (error: unknown) {
      notify.error("Login was unsuccessful!", "login-failed");
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('An unknown error occurred.');
      }
    }
  };

  return (
    <div className='pt-4 pb-8 px-32'>
      {InputFields.map((inputField, index: number) => {
        return (
          <StyledInput
            twStyle="min-w-[100%]"
            key={inputField.id}
            name={inputField.name}
            placeholder={inputField.placeholder}
            type={inputField.type}
            value={value[inputField.name] || ""}
            onChange={(e) => { handleChange(e, index) }}
          />
        );
      })}
      {errorMsg && (
        <h1 className='text-red-600 mb-3 text-center'>{errorMsg}</h1>
      )}
      <div className='flex justify-center items-center'>
        <Button twStyle='' disabled={hasError} onClick={handleSubmit}>Login</Button>
      </div>
    </div>
  );
};

export default LoginForm;
