import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";

type ArrowRightIconProps = ComponentProps<typeof ArrowRight>;

export function ArrowRightIcon(props: ArrowRightIconProps) {
  return <ArrowRight {...props} />;
}
