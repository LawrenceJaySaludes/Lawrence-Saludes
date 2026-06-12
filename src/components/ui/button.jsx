import { cn } from "../../lib/utils";

function Button({
  className,
  variant = "default",
  size = "default",
  type = "button",
  ...props
}) {
  const variantClassName = variant === "outline" ? "btn-outline" : "btn-solid";
  const sizeClassName = size === "icon" ? "btn-icon" : "";

  return (
    <button
      type={type}
      className={cn(variantClassName, sizeClassName, className)}
      {...props}
    />
  );
}

export { Button };
