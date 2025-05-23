import type { RenderFunctionInput } from "astro-opengraph-images";
import React from "react";
const { twj } = await import("tw-to-css");

// from https://fullstackheroes.com/resources/vercel-og-templates/simple/
export async function ogImage({
  title,
  description,
}: RenderFunctionInput): Promise<React.ReactNode> {
  return Promise.resolve(
    <div
      style={{
        ...twj("h-full w-full flex items-start justify-start"),
        ...{ backgroundImage: "linear-gradient(to right, #171717, #262626)" },
      }}
    >
      <div style={twj("flex items-start justify-start h-full")}>
        <div style={twj("flex flex-col justify-between w-full h-full p-20")}>
          <span>
            <svg
              width="50"
              height="50"
              viewBox="0 0 128 128"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="iconify iconify--noto"
            >
              <path
                d="M69.68 54.04S98.65 7.63 99.31 6.47c.66-1.16.8-3.29-1.02-3.29S51.34 49.25 51.34 49.25l-32.05 19s-2.15 1.32-1.82 2.97 1.77 1.72 2.43 1.72 34.85-.18 36.84-.24c2.47-.07 1.86 3.44 1.86 3.44l-21.64 34.02s-9.45 13.08-9.45 13.97c0 1.31 1.58 1.96 3.05 1.08 1.14-.68 74.84-63.13 78.09-67.42.88-1.17 1.33-4.25-2.3-4.25s-32.54 8.42-32.54 8.42l-4.13-7.92z"
                fill="#feb804"
              />
              <path
                d="M64.61 50.35c-.89 1.22-1.13 3.26.79 3.38 1.91.11 40.95-.18 40.95-.18S78.46 79.18 70.02 86.83s-36.39 32.43-38.27 34.18c-1.84 1.72-3.51 3.3-4.19 3.08-.11-.03-.25-.62 2.38-4.95 2.4-3.95 25.44-42.56 26.34-44.02.9-1.46 1.69-2.7 2.14-3.38.45-.68 1.91-4.39-1.13-4.39s-38 .9-38 .9 24.15-20.49 31.13-26S96.96 3.18 98.29 3.18 65.51 49.12 64.61 50.35z"
                fill="#ffc927"
              />
              <path
                d="M63.45 70.75c1.8-2.59 3.57-2.78 4.64-2.14 1.38.83 1.52 2.74-.22 5.05-2.74 3.66-22.88 30.61-23.65 31.56-1.46 1.8-3.61 1.01-2.21-1.6 1.17-2.16 19.58-30.19 21.44-32.87zM34.83 65.49c-3.45 2.31-6.66-1.14-4.35-3.67s17.47-15.15 20.54-17.76 20.99-18.2 22.38-19.32c1.84-1.48 2.98.02 1.82 1.56-1.15 1.54-13.82 14.2-19.41 19.34-4.32 3.98-17.7 17.65-20.98 19.85z"
                fill="#ffe567"
              />
            </svg>
            <p style={twj("text-[20px] text-white text-left")}>moyis.dev</p>
          </span>
          <h1 style={twj("text-[60px] text-white font-bold text-left")}>
            {title.split(" | ")[0]}
          </h1>
          <h2 style={twj("text-[20px] text-white text-left")}>{description}</h2>
        </div>
      </div>
    </div>,
  );
}
