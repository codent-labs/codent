import Link from "next/link";
import type { ComponentProps } from 'react'

type CodentLabsLogoProps = ComponentProps<'div'>

export function Logo({ className, ...props }: CodentLabsLogoProps) {
  return (
    <div
      aria-label="codent labs."
      role="img"
      className={className}
      {...props}
    >
      <Link href='/'>
      <span className="font-bold tracking-[1px] leading-[1.08] text-[#0f0f0f]">
        Codent labs.
      </span>
      </Link>
    </div>
  )
}
