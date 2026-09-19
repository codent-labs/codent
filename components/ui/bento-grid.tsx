import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface BentoGridProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
}

function BentoGrid({ children, className, ...props }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface BentoCardProps extends React.ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: React.ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

// Port of Magic UI's BentoCard (magicuidesign/dd: Registry UI bento-grid),
// adapted for this repo: lucide ArrowRight, next/link instead of Button.
function BentoCard({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) {
  return (
    <div
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        className
      )}
      {...props}
    >
      <div>{background}</div>
      <div className="p-4">
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
          <Icon className="h-12 w-12 origin-left transform-gpu text-white/90 transition-all duration-300 ease-in-out group-hover:scale-75" />
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="max-w-lg text-white/75">{description}</p>
        </div>

        <div
          className={cn(
            "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
          )}
        >
          <Link
            href={href}
            className="pointer-events-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#111]"
          >
            {cta}
            <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 lg:flex"
        )}
      >
        <Link
          href={href}
          className="pointer-events-auto inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#111]"
        >
          {cta}
          <ArrowRight className="size-3.5 rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
}

export { BentoGrid, BentoCard };