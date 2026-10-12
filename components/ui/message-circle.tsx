import { MessageCircle } from "lucide-react";
import type { ComponentProps } from "react";

type MessageCircleIconProps = ComponentProps<typeof MessageCircle>;

export function MessageCircleIcon(props: MessageCircleIconProps) {
  return <MessageCircle {...props} />;
}
