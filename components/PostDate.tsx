/** Shared journal date (issue #50): full month, machine-readable datetime. */
export function PostDate({ iso }: { iso: string }) {
  const formatted = new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return <time dateTime={iso}>{formatted}</time>;
}