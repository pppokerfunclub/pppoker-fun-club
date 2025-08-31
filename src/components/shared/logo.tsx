import React from "react";
import { cn } from "@/shared";
import { LogoIcon } from "./icons";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Logo = ({ className }: Props) => {
  return (
    <Link href={"/"} className={cn(className)}>
      <LogoIcon />
    </Link>
  );
};
