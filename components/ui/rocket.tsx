import { Rocket } from "lucide-react";
import type { ComponentProps } from "react";

type RocketIconProps = ComponentProps<typeof Rocket>;

export function RocketIcon(props: RocketIconProps) {
  return <Rocket {...props} />;
}
