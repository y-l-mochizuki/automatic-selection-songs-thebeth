import { ResolvingMetadata } from "next";

export default function Home() {
  return <div>asd</div>;
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
    title,
    description: "test",
    openGraph: {
      siteName: "test",
      type: "website",
      url: `/?title=${title}`,
      images: [
        `https://automatic-selection-songs-thebeth.vercel.app/opengraoh-image`,
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@mczk9402",
      // title,
      // description: "test",
      images: [
        `https://automatic-selection-songs-thebeth.vercel.app/twitter-image`,
      ],
    },
  };
};
