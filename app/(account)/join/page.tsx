import { Join } from "@/webcomponent/account";

export default async function JoinPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const token =
    typeof params?.token === "string"
      ? params.token
      : Array.isArray(params?.token)
      ? params.token[0]
      : "";

  console.log(token, "token from search params");

  return <Join token={token} />;
}
