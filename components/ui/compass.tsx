import { Compass } from "lucide-react";
import type { ComponentProps } from "react";

type CompassIconProps = ComponentProps<typeof Compass>;

export function CompassIcon(props: CompassIconProps) {
  return <Compass {...props} />;
}
