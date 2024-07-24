import { gql } from "@apollo/client";

export const GET_TODOS = gql`
  query MyQuery {
    todos {
      title
    }
  }
`;
