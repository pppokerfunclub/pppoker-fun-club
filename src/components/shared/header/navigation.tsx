import React from "react";
import { cn } from "@/shared";
import Link from "next/link";

interface Props {
  className?: string;
}

const links = [
  {
    label: "Main",
    href: "#main",
  },
  {
    label: "About game",
    href: "#about-game",
  },
  {
    label: "Get started",
    href: "#get-started",
  },
];

export const Navigation = ({ className }: Props) => {
  return (
    <nav className={cn("hidden md:flex items-center gap-6", className)}>
      {links.map((link) => (
        <Link
          className="text-muted text-base hover:text-white"
          key={link.href}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};
