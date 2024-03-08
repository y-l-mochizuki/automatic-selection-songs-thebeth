import { ImageResponse } from "@vercel/og";
import { url } from "inspector";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export async function GET(req: NextRequest) {
  // NOTE: テキストをパラメータで指定することで動的な文章の表示が行える
  // URLオブジェクトを作成します。
  console.log(req);
  const url = new URL(req.url);

  // URLの検索部分（クエリ文字列）からURLSearchParamsオブジェクトを作成します。
  const searchParams = new URLSearchParams(url.search);

  // 特定のパラメータを取得します。例えば 'result' パラメータ
  const result = searchParams.get("result");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {result}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
