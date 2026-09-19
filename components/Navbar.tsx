"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./logo"
import { ModeToggle } from "./mode-toggle"

function ChevronArrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Every nav item resolves to a crawlable URL (issue #36) - no bare anchors.
const NAV_ITEMS = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-[70] backdrop-saturate-[180%] backdrop-blur-[10px] bg-background/70">
        <div className="max-w-[1100px] mx-auto px-10 py-6 flex items-center justify-between relative">
          {/* Dashed bottom border */}
          <div className="codent-dashed absolute start-10 end-10 bottom-0" />

          <Logo/>

          <ul className="hidden md:flex items-center gap-9 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`text-[14px] font-normal text-foreground transition-opacity ${
                    isActive(item.href)
                      ? "opacity-100 underline underline-offset-8 decoration-[1.5px] decoration-foreground/50"
                      : "opacity-65 hover:opacity-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <ModeToggle />

          <Link
            href="/contact"
            className="codent-pill-dark hidden md:inline-flex"
            aria-label="Start a project"
          >
            <span className="codent-arrow-circ">
              <ChevronArrow />
            </span>
            Start a project
          </Link>

          {/* Hamburger */}
          <button
            className="flex md:hidden flex-col gap-[6px] w-6 h-6 justify-center items-center cursor-pointer relative"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={`block w-6 h-[2px] bg-foreground rounded-sm transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-6 h-[2px] bg-foreground rounded-sm transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-[2px] bg-foreground rounded-sm transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 bg-background z-[60] flex flex-col px-8 pt-[90px] pb-10 transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${menuOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive(item.href) ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
            className={`flex items-center gap-4 text-[38px] font-black tracking-[-1.5px] py-6 border-b border-dashed border-line ${
              isActive(item.href) ? "text-foreground" : "text-foreground/35"
            }`}
          >
            {isActive(item.href) && (
              <span className="codent-arrow-circ inline-flex">
                <ChevronArrow />
              </span>
            )}
            {item.label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="codent-pill-dark lg mt-6 self-start"
          onClick={() => setMenuOpen(false)}
        >
          <span className="codent-arrow-circ lg">
            <ChevronArrow />
          </span>
          Start a project
        </Link>
      </div>
    </>
  );
}