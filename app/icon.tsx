// import { gray } from "@radix-ui/colors";
import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <img
      src="/logo.png"
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
