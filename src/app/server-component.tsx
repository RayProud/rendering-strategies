// import "server-only";
import React from "react";
import { promises as fs } from "fs";
import StateComponent from "./state-component-client-wrapper";

export default async function ServerComponent() {
  console.log("ServerComponent message");
  const env = process.env.NODE_ENV;

  const files = await fs.readdir(".");

  return (
    <div>
      <p>Server Component: our NODE_ENV is {env}</p>

      <p>Files from the server component: {files}</p>

      <StateComponent files={files} />
    </div>
  );
}
