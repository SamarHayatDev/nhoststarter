// pages/page.tsx
"use client";

import React, { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { client } from "@/lib/apolloClient"; // Adjust the path as necessary

// Define the GraphQL query to get brands
const GET_BRANDS = gql`
  query GetBrands {
    brands {
      name
      description
    }
  }
`;

// Define the GraphQL mutation to add a brand
const ADD_BRAND = gql`
  mutation AddBrand($name: String!, $description: String!) {
    insert_brands(objects: { name: $name, description: $description }) {
      returning {
        id
        name
        description
      }
    }
  }
`;

const Page: React.FC = () => {
  const {
    loading: queryLoading,
    error: queryError,
    data,
  } = useQuery(GET_BRANDS, { client });
  const [addBrand, { loading: mutationLoading, error: mutationError }] =
    useMutation(ADD_BRAND, { client });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addBrand({ variables: { name, description } });
      setName("");
      setDescription("");
    } catch (err) {
      console.error("Error adding brand:", err);
    }
  };

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error: {queryError.message}</p>;

  return (
    <div>
      <h1>Brand Names</h1>
      <ul>
        {data.brands.map(
          (brand: { name: string; description: string }, index: number) => (
            <li key={index}>
              <strong>{brand.name}</strong>: {brand.description}
            </li>
          )
        )}
      </ul>

      <h2>Add a New Brand</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Brand Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" disabled={mutationLoading}>
          {mutationLoading ? "Adding..." : "Add Brand"}
        </button>
      </form>
      {mutationError && <p>Error: {mutationError.message}</p>}
      {mutationLoading === false && !mutationError && (
        <p>Brand added successfully!</p>
      )}
    </div>
  );
};

export default Page;
