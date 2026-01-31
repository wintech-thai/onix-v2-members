import * as React from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Context                                  */
/* -------------------------------------------------------------------------- */

type FieldContextValue = {
  id: string;
  error?: string;
  helper?: string;
  hasLeft: boolean;
  hasRight: boolean;
  setHasLeft: (v: boolean) => void;
  setHasRight: (v: boolean) => void;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

function useField() {
  const ctx = React.useContext(FieldContext);
  if (!ctx) {
    throw new Error("Input components must be used inside <InputBase.Field>");
  }
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                                Base Components                              */
/* -------------------------------------------------------------------------- */

function Field({
  children,
  error,
  helper,
}: {
  children: React.ReactNode;
  error?: string;
  helper?: string;
}) {
  const id = React.useId();
  const [hasLeft, setHasLeft] = React.useState(false);
  const [hasRight, setHasRight] = React.useState(false);

  const value = React.useMemo<FieldContextValue>(
    () => ({
      id,
      error,
      helper,
      hasLeft,
      hasRight,
      setHasLeft,
      setHasRight,
    }),
    [id, error, helper, hasLeft, hasRight]
  );

  return (
    <FieldContext.Provider value={value}>
      <div className="w-full space-y-1">{children}</div>
    </FieldContext.Provider>
  );
}

/* ---------------------------------- Label --------------------------------- */

function Label({
  children,
  required,
  className,
}: {
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  const { id } = useField();

  return (
    <label htmlFor={id} className={cn("text-sm font-medium", className)}>
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </label>
  );
}

/* ---------------------------------- Group --------------------------------- */

function Group({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { error } = useField();

  return (
    <div
      className={cn(
        "relative flex items-center h-12 w-full rounded-md border px-3",
        "transition-colors",
        error
          ? "border-destructive"
          : "border-input focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/40",
        className
      )}
    >
      {children}
    </div>
  );
}

/* --------------------------------- Control -------------------------------- */

const Control = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  const { id, error, hasLeft, hasRight } = useField();

  return (
    <input
      ref={ref}
      id={id}
      aria-invalid={!!error}
      className={cn(
        "peer w-full bg-transparent text-sm outline-none",
        "placeholder:text-muted-foreground",
        hasLeft && "pl-9",
        hasRight && "pr-9",
        className
      )}
      {...props}
    />
  );
});
Control.displayName = "InputBase.Control";

/* ----------------------------------- Icon --------------------------------- */

function Icon({
  children,
  position = "left",
  className,
}: {
  children: React.ReactNode;
  position?: "left" | "right";
  className?: string;
}) {
  const { setHasLeft, setHasRight } = useField();

  React.useEffect(() => {
    if (position === "left") setHasLeft(true);
    if (position === "right") setHasRight(true);

    return () => {
      if (position === "left") setHasLeft(false);
      if (position === "right") setHasRight(false);
    };
  }, [position, setHasLeft, setHasRight]);

  return (
    <span
      className={cn(
        "pointer-events-none absolute flex items-center text-muted-foreground",
        position === "left" ? "left-3" : "right-3",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------- IconButton -------------------------------- */

function IconButton({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setHasRight } = useField();

  React.useEffect(() => {
    setHasRight(true);
    return () => setHasRight(false);
  }, [setHasRight]);

  return (
    <button
      type="button"
      className={cn(
        "absolute right-3 flex items-center text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ---------------------------------- Message -------------------------------- */

function Message({ className }: { className?: string }) {
  const { error, helper } = useField();

  if (!error && !helper) return null;

  return (
    <p
      className={cn(
        "text-xs",
        error ? "text-destructive" : "text-muted-foreground",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {error ?? helper}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Preset <Input />                              */
/* -------------------------------------------------------------------------- */

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isRequired?: boolean;
  errorMessage?: string;
  helper?: string;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

function Input({
  label,
  isRequired,
  errorMessage,
  helper,
  startContent,
  endContent,
  ...props
}: InputProps) {
  return (
    <InputBase.Field error={errorMessage} helper={helper}>
      {label && (
        <InputBase.Label required={isRequired}>{label}</InputBase.Label>
      )}

      <InputBase.Group>
        {startContent && (
          <InputBase.Icon position="left">{startContent}</InputBase.Icon>
        )}

        <InputBase.Control {...props} />

        {endContent && (
          <InputBase.IconButton>{endContent}</InputBase.IconButton>
        )}
      </InputBase.Group>

      <InputBase.Message />
    </InputBase.Field>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Export                                   */
/* -------------------------------------------------------------------------- */

export const InputBase = {
  Field,
  Label,
  Group,
  Control,
  Icon,
  IconButton,
  Message,
};

export { Input };
