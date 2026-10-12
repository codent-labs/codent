import { Blocks } from "lucide-react";
import type { ComponentProps } from "react";

type BlocksIconProps = ComponentProps<typeof Blocks>;

export function BlocksIcon(props: BlocksIconProps) {
  return <Blocks {...props} />;
}
