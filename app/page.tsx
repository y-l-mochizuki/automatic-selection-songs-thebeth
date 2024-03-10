import { type Album } from "@/types";
import { client } from "@/utils/microcms";
import { Home } from "@/components/Home";

export default async function Page() {
  const data = await client.getList<Album>({
    endpoint: "albums",
  });

  return <Home albums={data.contents} />;
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
export const generateMetadata = async ({ searchParams }: Props) => {
  const title = searchParams?.title;
  if (!title) {
    return;
  }

  const encStr = encodeURIComponent(title.toString());
  return {
    title: "TEST",
    description: "test",
    openGraph: {
      title: "TEST",
      siteName: "test",
      type: "website",
      images: [
        `https://automatic-selection-songs-thebeth.vercel.app/api/ogp?title=${encStr}`,
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
  };
};
