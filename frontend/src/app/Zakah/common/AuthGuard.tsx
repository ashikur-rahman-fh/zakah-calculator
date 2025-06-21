import React from "react";

import { useAuth } from "@/context/AuthProvider";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  return (
    <React.Fragment>
      {isAuthenticated ? children : null}
    </React.Fragment>
  );
};

export default AuthGuard;
