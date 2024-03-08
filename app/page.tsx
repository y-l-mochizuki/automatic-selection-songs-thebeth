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
      url: `http://localhost:3000/api/ogp?title=${title}`,
    },
    twitter: {
      title,
      card: "summary_large_image",
      description: "test",
    },
  };
};
