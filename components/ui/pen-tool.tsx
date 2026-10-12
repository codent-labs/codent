import { PenTool } from "lucide-react";
import type { ComponentProps } from "react";

type PenToolIconProps = ComponentProps<typeof PenTool>;

export function PenToolIcon(props: PenToolIconProps) {
  return <PenTool {...props} />;
}
