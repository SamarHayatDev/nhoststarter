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

  if (queryLoading) return <p className="text-gray-400">Loading...</p>;
  if (queryError)
    return <p className="text-red-500">Error: {queryError.message}</p>;

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-4">Brand Names</h1>
      <ul className="space-y-2">
        {data.brands.map(
          (brand: { name: string; description: string }, index: number) => (
            <li key={index} className="p-4 bg-gray-800 rounded-md shadow-md">
              <strong className="text-xl">{brand.name}</strong>:{" "}
              {brand.description}
            </li>
          )
        )}
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Add a New Brand</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-md shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2">
            Brand Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 mt-1 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </label>
        </div>
        <button
          type="submit"
          disabled={mutationLoading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            mutationLoading ? "bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {mutationLoading ? "Adding..." : "Add Brand"}
        </button>
      </form>
      {mutationError && (
        <p className="text-red-500 mt-4">Error: {mutationError.message}</p>
      )}
      {mutationLoading === false && !mutationError && (
        <p className="text-green-500 mt-4">Brand added successfully!</p>
      )}
    </div>
  );
};

export default Page;
