import { Suspense } from "react";
import ExampleFunnel from "./_funnel";

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExampleFunnel />
    </Suspense>
  );
}
