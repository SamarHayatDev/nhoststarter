"use client";

import { ApolloProvider } from "@apollo/client";
import React from "react";
import { client } from "../lib/apolloClient";

const ApolloProviderContext = ({ children }: any) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderContext;
