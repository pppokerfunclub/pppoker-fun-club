import React, { PropsWithChildren } from "react";
import { cn } from "@/shared";

interface Props {
  className?: string;
}

export const Container = ({
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <div
      className={cn("max-w-[1200px] mx-auto w-[calc(100%-40px)]", className)}
    >
      {children}
    </div>
  );
};
