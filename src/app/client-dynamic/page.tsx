'use client';;
import { use } from "react";

export const runtime = 'nodejs';

export default function ClientDynamic(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = use(props.searchParams);
  console.log('Client Side Dynamic page', searchParams);
  return (
    <div>
      <h1>this is a Client Side Dynamic page page {searchParams.toString()}</h1>
    </div>
  );
}
