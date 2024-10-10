// import "server-only";
import React, { Suspense } from "react";
import { promises as fs } from "fs";
// import StateComponent from "./state-component-client-wrapper";
//
//       // <StateComponent files={files} />

const StateComponent = React.lazy(() => import("./state-component"));

export default async function ServerComponent() {
  console.log("ServerComponent message");
  const env = process.env.NODE_ENV;

  const files = await fs.readdir(".");

  return (
    <div>
      <p>Server Component: our NODE_ENV is {env}</p>

      <Suspense fallback={<div>Loading...</div>}>
        <StateComponent files={files} />
      </Suspense>
    </div>
  );
}
