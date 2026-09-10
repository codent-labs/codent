// Material Symbols Rounded, subset to exactly the glyphs this site renders
// (see issue #41). Each icon is addressed by its PUA codepoint in the subset
// font rather than by the font's ligature mechanism, so glyph rendering never
// depends on GSUB tables surviving subsetting.
const GLYPHS: Record<string, string> = {
  cloud: "\ue2bd",
  favorite: "\ue87d",
  play_arrow: "\ue037",
  hexagon: "\ueb39",
  air: "\uefd8",
  sunny: "\ue81a",
  local_fire_department: "\uea05",
  public: "\ue80b",
  menu_book: "\uea19",
  design_services: "\uf10a",
  hub: "\ue9f4",
  deployed_code: "\uf720",
  rocket_launch: "\ueb9b",
  north_east: "\uf1e1",
  chat_bubble: "\ue0ca",
  explore: "\ue87a",
  draw: "\ue746",
  format_quote: "\ue244",
  alternate_email: "\ue0e6",
  camera: "\ue3af",
  work: "\ue8f9",
  sports_basketball: "\uea26",
};

type IconProps = {
  name: string;
  className?: string;
};

export function Icon({ name, className = "" }: IconProps) {
  const glyph = GLYPHS[name];
  if (!glyph) return null;
  return (
    <span className={`codent-icon ${className}`} aria-hidden>
      {glyph}
    </span>
  );
}