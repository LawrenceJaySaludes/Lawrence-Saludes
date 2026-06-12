import { cn } from "../../lib/utils";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("pagination-root", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul className={cn("pagination-content", className)} {...props} />
  );
}

function PaginationItem({ className, ...props }) {
  return <li className={cn("pagination-item", className)} {...props} />;
}

function PaginationLink({
  className,
  isActive = false,
  href = "#",
  onClick,
  children,
  ...props
}) {
  return (
    <a
      href={href}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
      className={cn("pagination-link", isActive && "pagination-link--active", className)}
      {...props}
    >
      {children}
    </a>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span className={cn("pagination-ellipsis", className)} aria-hidden="true" {...props}>
      <span className="pagination-ellipsis-dot" />
      <span className="pagination-ellipsis-dot" />
      <span className="pagination-ellipsis-dot" />
    </span>
  );
}

function ArrowLeft({ className = "pagination-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRight({ className = "pagination-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaginationPrevious({ className, href = "#", onClick, disabled = false, ...props }) {
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <PaginationLink
      href={href}
      onClick={handleClick}
      className={cn("pagination-control", className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    >
      <ArrowLeft />
      <span>Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, href = "#", onClick, disabled = false, ...props }) {
  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <PaginationLink
      href={href}
      onClick={handleClick}
      className={cn("pagination-control", className)}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : undefined}
      {...props}
    >
      <span>Next</span>
      <ArrowRight />
    </PaginationLink>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
