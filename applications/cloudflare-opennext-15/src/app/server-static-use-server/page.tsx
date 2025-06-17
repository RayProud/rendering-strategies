'use server';

export default async function UseServerClientDynamic(
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
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
