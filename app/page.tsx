import Test from "@/components/Test";
import useTodosData from "@/hooks/useTodosData";
import { Suspense } from "react";

const Home = () => {
  // const { allData } = useTodosData();
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Test />
      </Suspense>
    </>
  );
};

export default Home;
