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
      className={cn("mx-auto max-w-[1230px] w-[calc(100%-24px)]", className)}
    >
      {children}
    </div>
  );
};
