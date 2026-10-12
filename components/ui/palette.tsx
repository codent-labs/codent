import { Palette } from "lucide-react";
import type { ComponentProps } from "react";

type PaletteIconProps = ComponentProps<typeof Palette>;

export function PaletteIcon(props: PaletteIconProps) {
  return <Palette {...props} />;
}
