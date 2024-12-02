// import { gray } from "@radix-ui/colors";
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return new ImageResponse(
    <img
      src={`${baseUrl}/logo.png`}
      alt="Favicon"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 100,
      }}
    />,
    {
      ...size,
    },
  );
}
