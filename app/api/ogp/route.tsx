import { NextRequest } from "next/server";
import { ImageResponse } from "@vercel/og";
import { fetchFont } from "@/utils";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const title = searchParams.get("title") || "";
  const data = await fetchFont(title);
  if (!data) {
    return new Response(null, {
      status: 404,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          color: "#232323",
          background: "#ffc81e",
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          whiteSpace: "pre-wrap",
        }}
      >
        {`今日のTHE+BETH MUSIC占い\n` + title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "NotoSansJP",
          style: "normal",
          data,
        },
      ],
    },
  );
}
