"use client";
import React from "react";

import AuthGuard from "./Zakah/common/AuthGuard";
import HomePage from "./HomePage";

const PrivateHomePage = () => {
  return (
    <AuthGuard>
      <HomePage />
    </ AuthGuard >
  );
};

export default PrivateHomePage;
