import Link from "next/link";

type CodentLabsLogoProps = {
  className?: string;
};

// The wordmark link carries the accessible name (issue #60) and a
// ≥24px hit area (issue #62); the span inside is styling only.
export function Logo({ className }: CodentLabsLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Codent labs."
      className={`inline-block py-[2px] ${className ?? ""}`}
    >
      <span className="font-bold tracking-[1px] leading-[1.08] text-main">
        Codent labs.
      </span>
    </Link>
  );
}