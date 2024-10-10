"use client";

export default function ClientDynamic({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log("Client Side Dynamic page", searchParams);
  return (
    <div>
      <h1>this is a Client Side Dynamic page page {searchParams.toString()}</h1>
    </div>
  );
}
