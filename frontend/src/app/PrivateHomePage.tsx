"use client";
import React from "react";

import { ZakahDataProvider } from "@/context/DataProvider";

import AuthGuard from "./Zakah/common/AuthGuard";
import HomePage from "./HomePage";

const PrivateHomePage = () => {
  return (
    <AuthGuard>
      <ZakahDataProvider>
        <HomePage />
      </ZakahDataProvider>
    </ AuthGuard >
  );
};

export default PrivateHomePage;
