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
    title: "TEST",
    description: "test",
    openGraph: {
      title: "TEST",
      siteName: "test",
      type: "website",
      url: `https://automatic-selection-songs-thebeth.vercel.app/`,
      images: [
        `https://automatic-selection-songs-thebeth.vercel.app/opengraph-image`,
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@mczk9402",
      title: "TEST",
      description: "test",
      images: [
        `https://automatic-selection-songs-thebeth.vercel.app/twitter-image`,
      ],
    },
  };
};
