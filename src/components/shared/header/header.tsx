"use client";

import React from "react";
import { cn } from "@/shared";
import { Container } from "../container";
import { LogoIcon } from "../icons";
import Link from "next/link";
import { Logo } from "../logo";
import { useTranslations } from "next-intl";

interface Props {
  className?: string;
}

export const Header = ({ className }: Props) => {
  const t = useTranslations("header");

  return (
    <header className={cn("w-full z-10 mt-6", className)}>
      <Container className="flex items-center justify-center md:justify-between relative">
        <Logo />
        <Link
          className="hidden md:block"
          href={"https://t.me/bystudio_manager_bot"}
          target="_blank"
        >
          <h5 className="underline text-black">{t("telegram_link")}</h5>
        </Link>
      </Container>
    </header>
  );
};
