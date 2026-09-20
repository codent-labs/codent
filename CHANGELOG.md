# Changelog

All notable changes to this project are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project does not yet follow Semantic Versioning (pre-1.0).

## [Unreleased]

### Added

- **Magic Card spotlight borders** on the services, solutions, and process
  surfaces — a cursor-following gradient border that uses each practice's
  accent color on services/solutions and a neutral gray on `/process`.
- **Animated Lucide icons** (`components/ui/`): `arrow-right`, `blocks`,
  `compass`, `git-branch`, `message-circle`, `palette`, `pen-tool`,
  `rocket` — animate on hover and replace the previous Material Symbols
  usage in the services, solutions, how-we-work, and process sections.
- **Solutions marquee**: the four practice cards (full 320×380 size, accent
  strips, animated icons) now auto-scroll in a marquee with pause-on-hover
  and edge fade, replacing the horizontal drag-scroll track.
- `CHANGELOG.md` — this file.

### Changed

- Homepage: removed the `TextReveal` full-viewport section.
- Navbar: primary nav swaps `Contact` for `About`.
- Services page: practice cards drop the top accent-strip class.

### Removed

- `components/ScrollTrack.tsx` and its homepage usage.

### Fixed

- `magic-card.tsx`: card face now fills with the themed `--card-bg`
  (instead of the page background) and honors per-use border radii.
- `tests/smoke.spec.ts`: navbar assertion updated to the `About` link.