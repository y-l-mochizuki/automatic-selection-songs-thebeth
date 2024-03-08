import { ResolvingMetadata } from "next";

export default function Home() {
  return <div>asd</div>;
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const generateMetadata = async (
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
) => {
  const title = searchParams?.title;

  return {
    title,
    description: "test",
    openGraph: {
      title,
      description: "Test",
      url: `https://automatic-selection-songs-thebeth.vercel.app/?title=${title}`,
      images: [
        `https://automatic-selection-songs-thebeth.vercel.app/api/ogp?title=${title}`,
      ],
    },
    twitter: {
      title,
      card: "summary_large_image",
      description: "test",
      images: [
        `https://automatic-selection-songs-thebeth.vercel.app/api/ogp?title=${title}`,
      ],
    },
  };
};
