// pages/page.tsx
"use client";

import React from "react";
import { useQuery, gql } from "@apollo/client";
import { client } from "@/lib/apolloClient"; // Adjust the path as necessary

// Define the GraphQL query directly in the component file
const GET_BRANDS = gql`
  query GetBrands {
    brands {
      name
      description
    }
  }
`;

const Page: React.FC = () => {
  const { loading, error, data } = useQuery(GET_BRANDS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Brand Names</h1>
      <ul>
        {data.brands.map((brand: { name: string }) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
