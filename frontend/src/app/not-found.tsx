import React from "react";

import { GlassCard, GlassCardHeader } from "./Common";
import Link from "next/link";

const Message = () => {
  return (
    <React.Fragment>
      <GlassCardHeader>404 - Page Not Found </GlassCardHeader>
      <p className="text-gray-600 mb-4 text-center">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="text-center">
      <Link
        href="/"
        className="inline-block text-blue-600 hover:underline font-medium"
      >
        Return to Homepage
      </Link>
    </div>
    </React.Fragment>
  );
};


const NotFound = () => {
  return (
    <GlassCard twStyle="">
      <Message />
    </GlassCard>
  );
};

export default NotFound;
