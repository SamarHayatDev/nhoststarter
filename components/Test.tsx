"use client";
import { useEffect, useState } from "react";
import { useNhostClient } from "@nhost/nextjs";
import useTodosData from "@/hooks/useTodosData";
import axios from "axios";
import { client } from "@/lib/apolloClient";
import { GET_TODOS } from "@/graphql/todos/Query";

const Test = () => {
  const nhost = useNhostClient();

  const { allData } = useTodosData();

  axios.get("/api/getTodos/").then((data) => {
    console.log("sjkdhfjdshf", data);
  });

  const runFunc = async () => {
    // const { data, error } = await nhost.graphql.request(`
    //   query {
    //     todos {
    //       title
    //     }
    //   }
    // `);

    const result = await client.query({
      query: GET_TODOS,
    });

    console.log("sgfdsfs", result);
  };

  runFunc();

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(nhost.auth.getSession());

    nhost.auth.onAuthStateChanged((_, session) => {
      setSession(session);
    });
  }, []);

  nhost.graphql.setAccessToken(session?.accessToken);

  console.log("session", session, allData);
  return <div>TEST</div>;
};

export default Test;
