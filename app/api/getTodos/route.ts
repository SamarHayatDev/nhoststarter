import { NextResponse } from "next/server";
import { client } from "../../../lib/apolloClient";
import { GET_TODOS } from "../../../graphql/todos/Query";

export const GET = async () => {
  try {
    const result = await client.query({
      query: GET_TODOS,
    });
    return NextResponse.json(result.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
