import * as React from "react";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                  */
/* -------------------------------------------------------------------------- */

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "body-sm"
  | "caption"
  | "label";

type TypographyColor = "default" | "muted" | "destructive" | "primary";

const VARIANT_CLASSES: Record<TypographyVariant, string> = {
  h1: "text-3xl font-bold tracking-tight",
  h2: "text-2xl font-semibold tracking-tight",
  h3: "text-xl font-semibold",
  body: "text-sm leading-relaxed",
  "body-sm": "text-xs leading-relaxed",
  caption: "text-xs text-muted-foreground",
  label: "text-sm font-medium",
};

const COLOR_CLASSES: Record<TypographyColor, string> = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  destructive: "text-destructive",
  primary: "text-primary",
};

const typographyVariantStyles = {
  h1: "text-4xl font-bold",
  h2: "text-2xl font-semibold",
  body: "text-base",
  caption: "text-sm text-gray-500",
};

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

import clsx from "clsx";

type TypographyProps<T extends React.ElementType = "p"> = {
  as?: T;
  variant?: "h1" | "h2" | "body" | "caption";
  children: React.ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<T>;

export function Typography<T extends React.ElementType = "p">(
  props: TypographyProps<T>
) {
  const { as, variant = "body", className, children, ...rest } = props;

  const Component = as ?? "p";

  return (
    <Component
      className={clsx(typographyVariantStyles[variant], className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
