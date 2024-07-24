"use client";

import { gql, useQuery } from "@apollo/client";

export default function useTodosData() {
  const { data } = useQuery(gql`
    query getTodos {
      todos {
        title
      }
    }
  `);

  return { allData: data };
}
