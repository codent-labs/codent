import { GitBranch } from "lucide-react";
import type { ComponentProps } from "react";

type GitBranchIconProps = ComponentProps<typeof GitBranch>;

export function GitBranchIcon(props: GitBranchIconProps) {
  return <GitBranch {...props} />;
}
