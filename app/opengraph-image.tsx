import { loadGoogleFont } from "@/utils";
import { ImageResponse } from "@vercel/og";

/** ImageResponse対応 */
export const runtime = "edge";
/** 有効期間 */
export const revalidate = 10;

/** 13.3.0現在ここを動的にはできない */
export const alt = "記事のアイキャッチ画像";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type Props = {
  params: { id: string };
};

export default async function og({ params: { id } }: Props) {
  const notoSansArrayBuffer = await loadGoogleFont({
    family: "Noto Sans JP",
    weight: 700,
  });

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        TEST
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "NotoSansJP",
          data: notoSansArrayBuffer,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
