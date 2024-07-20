"use client";

import React from "react";
import { NhostProvider } from "@nhost/nextjs";
import { nhost } from "../lib/nhost";

const NhostProviderContext = ({ children }: any) => {
  return <NhostProvider nhost={nhost}>{children}</NhostProvider>;
};

export default NhostProviderContext;
