import React from "react";
import { cn } from "@/shared";
import { Container } from "./container";
import { getTranslations } from "next-intl/server";

interface Props {
  className?: string;
}

export const Footer = async ({ className }: Props) => {
  const t = await getTranslations("footer");

  return (
    <footer className={cn("w-full py-6 relative", className)}>
      <Container className="flex items-center justify-center md:justify-start">
        <h5 className="text-center md:text-start !text-white md:!text-black">
          {t("copyright")}
        </h5>
        {/* <h5 className="hidden md:block">{t("author")}</h5> */}
      </Container>
    </footer>
  );
};
