export async function fetchFont(text: string): Promise<ArrayBuffer | null> {
  // NOTE: Noto Sans JP を使用する場合は以下の URL になる。（他のフォントを使用する場合は別のフォント名にする）
  // text パラメータを付与することで、使用する文字のみをサブセット化を行い通信容量を削減しながら通信が可能となる。
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP&text=${encodeURIComponent(
    text,
  )}`;

  const css = await (
    await fetch(googleFontsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1",
      },
    })
  ).text();

  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (!resource) return null;
  const res = await fetch(resource[1]);
  return res.arrayBuffer();
}

/**
 * Google FontsのCSSファイルから、
 * フォントURL `src: url(ここ) format(truetype OR opentype)` を探し、
 * 見つかればfetchしてArrayBufferにして返す
 * @see https://github.com/kvnang/workers-og/blob/main/packages/workers-og/src/font.ts
 * @see https://zenn.dev/uzimaru0000/articles/satori-workers
 *
 * 調べてみると、next/fontも同じようなことをしている
 * @see https://github.com/vercel/next.js/blob/canary/packages/font/src/google/find-font-files-in-css.ts
 */
export async function loadGoogleFont({
  family,
  weight,
  text,
}: {
  family: string;
  weight?: number;
  text?: string;
}) {
  const params = new URLSearchParams({
    family: `${family}${weight ? `:wght@${weight}` : ""}`,
  });
  if (text) {
    params.append("text", text);
  } else {
    params.append("subset", "latin");
  }

  const url = `https://fonts.googleapis.com/css2?${params.toString()}`;

  const css = await fetch(url).then((res) => res.text());

  const fontUrl = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  )?.[1];

  if (!fontUrl) {
    throw new Error("Font file not found in CSS fetched from Google Fonts");
  }

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}
