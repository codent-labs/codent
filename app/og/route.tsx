import { ImageResponse } from "next/og";
import { Simple } from "@/components/og/simple";

export const contentType = "image/png";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title =
    searchParams.get("title") ??
    "Codent Labs - Brand, Product & Engineering";
  const description =
    searchParams.get("description") ??
    "We partner with founders and product teams on brand, product and engineering - turning fuzzy bets into shipped work. Est. 2019.";

  return new ImageResponse(
    <Simple
      label="Design & Engineering Studio"
      title={title}
      description={description}
      brand="Codent Labs"
    />,
    {
      width: 1200,
      height: 630,
    }
  );
}