import { cn } from "@derivv/ui/lib/utils";

export const SectionTitle = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs font-medium text-sidebar-foreground/70 mt-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};