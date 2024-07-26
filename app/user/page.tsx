"use client";
import { nhost } from "@/lib/nhost";
import React from "react";

const page = () => {
  console.log("first", nhost.auth.isAuthenticated());
  return <div>page</div>;
};

export default page;
