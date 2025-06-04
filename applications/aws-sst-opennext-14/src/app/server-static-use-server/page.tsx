'use server';

export default async function UseServerClientDynamic({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  console.log('Dynamic Server Side page with use server', searchParams);
  return (
    <div>
      <h1>
        this is a Dynamic Server Side page with use server{' '}
        {searchParams.toString()}
      </h1>
    </div>
  );
}
