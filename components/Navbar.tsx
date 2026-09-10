"use client";

import { useState, useEffect } from "react";
import { Logo } from "./logo"

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

// Nav items must point at sections that actually exist on the page
// (ids: #solutions in Services, #showcase in Showcase, #process in Process,
// #contact in CTA). See issue #24.
const NAV_ITEMS = [
  { label: "Solutions", href: "#solutions" },
  { label: "Showcase", href: "#showcase" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

// function Logo() {
//   return (
//     <Link href="#" className="flex items-center gap-[9px]" aria-label="codent home">
//       {/* eslint-disable-next-line @next/next/no-img-element */}
//       <span className="text-[20px] font-bold tracking-[-0.3px] text-[#111]">codent lab</span>
//     </Link>
//   );
// }

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className="sticky top-0 z-[70] backdrop-saturate-[180%] backdrop-blur-[10px] bg-[rgba(245,245,245,0.7)]">
        <div className="max-w-[1100px] mx-auto px-10 py-6 flex items-center justify-between relative">
          {/* Dashed bottom border */}
          <div className="codent-dashed absolute start-10 end-10 bottom-0" />

          <Logo/>

          <ul className="hidden md:flex items-center gap-9 list-none">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-[14px] font-normal text-[#1a1a1a] opacity-65 hover:opacity-100 transition-opacity"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="codent-pill-dark hidden md:inline-flex"
            aria-label="Let's Connect"
          >
            <span className="codent-arrow-circ">
              <ChevronArrow />
            </span>
            Let&apos;s Connect
          </a>

          {/* Hamburger */}
          <button
            className="flex md:hidden flex-col gap-[6px] w-6 h-6 justify-center items-center cursor-pointer relative"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span
              className={`block w-6 h-[2px] bg-[#111] rounded-sm transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#111] rounded-sm transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-[2px] bg-[#111] rounded-sm transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile nav */}
      <div
        aria-hidden={!menuOpen}
        className={`fixed inset-0 bg-[#F5F5F5] z-[60] flex flex-col px-8 pt-[90px] pb-10 transition-[transform,visibility] duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${menuOpen ? "translate-x-0 visible" : "translate-x-full invisible"}`}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[38px] font-black tracking-[-1.5px] text-[#0f0f0f] py-6 border-b border-dashed border-black/15"
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="codent-pill-dark lg mt-6 self-start"
          onClick={() => setMenuOpen(false)}
        >
          <span className="codent-arrow-circ lg">
            <ChevronArrow />
          </span>
          Let&apos;s Connect
        </a>
      </div>
    </>
  );
}
