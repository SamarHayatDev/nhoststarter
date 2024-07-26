import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: "https://bzkgqcpnryqmebuuzowd.graphql.eu-central-1.nhost.run/v1",
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("nhost-auth-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import Cookies from "js-cookie";

// const httpLink = createHttpLink({
//   uri: "https://bzkgqcpnryqmebuuzowd.graphql.eu-central-1.nhost.run/v1",
// });

// const authLink = setContext((_, { headers }) => {
//   const token = Cookies.get("nhost-auth-token");
//   const authHeader = token ? `Bearer ${token}` : "";

//   console.log("Authorization Header:", authHeader); // Log the authorization header

//   return {
//     headers: {
//       ...headers,
//       authorization: authHeader,
//     },
//   };
// });

// export const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// });
