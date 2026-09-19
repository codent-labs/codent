import { getAllPosts, SITE } from "@/lib/posts";

export const dynamic = "force-static";

function rfc822(date: string) {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts();
  const latest = posts[0];

  const items = posts
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE.url}/journal/${post.slug}</link>
      <guid isPermaLink="true">${SITE.url}/journal/${post.slug}</guid>
      <pubDate>${rfc822(post.date)}</pubDate>
      <description>${escapeXml(post.description)}</description>
      <author>${escapeXml(SITE.email)} (${escapeXml(SITE.name)})</author>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Codent Labs - Journal</title>
    <link>${SITE.url}/journal</link>
    <description>How we scope, price and hand off work - notes from a two-person lab.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(latest.date)}</lastBuildDate>
    <ttl>2880</ttl>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}