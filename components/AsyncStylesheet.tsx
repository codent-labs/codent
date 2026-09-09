"use client";

export default function AsyncStylesheet({ href }: { href: string }) {
  return (
    <link
      rel="stylesheet"
      href={href}
      media="print"
      onLoad={(e) => {
        e.currentTarget.media = "all";
      }}
    />
  );
}