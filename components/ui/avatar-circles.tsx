"use client";

import type * as CSS from "csstype";

import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl?: string;
  profileUrl?: string;
  /** Initial chip rendered when `imageUrl` is absent (site has no avatar photos). */
  initial?: string;
  initialsStyle?: CSS.Properties;
}

interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((avatar, index) => {
        const inner = avatar.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={index}
            className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-gray-800"
            src={avatar.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        ) : (
          <span
            key={index}
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-[13px] font-bold text-white dark:border-gray-800"
            style={avatar.initialsStyle}
          >
            {avatar.initial}
          </span>
        );

        return avatar.profileUrl ? (
          <a
            key={index}
            href={avatar.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {inner}
          </a>
        ) : (
          inner
        );
      })}
      {(numPeople ?? 0) > 0 && (
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black">
          +{numPeople}
        </span>
      )}
    </div>
  );
};