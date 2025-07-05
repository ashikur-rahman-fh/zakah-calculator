import React from "react";

import { GlassCard, GlassCardHeader } from "../Zakah/common/Common";

import LoginForm from "./LogInForm";

export const metadata = {
  title: 'Login - Zakah Calculator',
  description: 'Log in to manage your zakah account.',
};

const LoginPage = () => {
  return (
    <div className="grid grid-col-1 md:grid-cols-6">
      <GlassCard twStyle="col-span-1 md:col-start-2 md:col-end-6">
        <GlassCardHeader>Please log in</GlassCardHeader>
        <LoginForm />
      </ GlassCard>
    </ div>
  );
};

export default LoginPage;
