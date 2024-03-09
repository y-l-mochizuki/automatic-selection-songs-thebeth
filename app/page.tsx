import { Album } from "@/types";
import { client } from "@/utils/microcms";
import { ResolvingMetadata } from "next";
import { Home } from "@/components/Home";

export default async function Page() {
  const data = await client.getList<Album>({
    endpoint: "albums",
  });

  return <Home albums={data.contents} />;
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
export const generateMetadata = async (
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
) => {
  const title = searchParams?.title;

  return {
    title: "TEST",
    description: "test",
    openGraph: {
      title: "TEST",
      siteName: "test",
      type: "website",
      images: [`http://localhost:3000/api/ogp?${title}`],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
};
