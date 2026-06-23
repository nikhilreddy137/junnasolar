import { Link } from "react-router-dom";

/**
 * Junna Solar Systems Limited official logo.
 * - `tone="light"` for use over dark backgrounds (wraps in a soft white plate)
 * - `tone="default"` for use on light backgrounds
 */
export const Logo = ({ tone = "default", size = "md", asLink = true, className = "" }) => {
  const heights = { sm: "h-8", md: "h-10", lg: "h-12", xl: "h-16" };
  const widths = { sm: "w-auto", md: "w-auto", lg: "w-auto", xl: "w-auto" };
  const h = heights[size] || heights.md;
  const w = widths[size] || widths.md;

  const img = (
    <img
      src="/junna-logo.png"
      alt="Junna Solar Systems Limited"
      width={size === "xl" ? 220 : size === "lg" ? 170 : 140}
      height={size === "xl" ? 70 : size === "lg" ? 55 : 44}
      className={`${h} ${w} object-contain ${tone === "light" ? "" : ""}`}
      decoding="async"
      loading="eager"
    />
  );

  const wrapper = (
    <span
      data-testid="junna-logo"
      className={`inline-flex items-center ${tone === "light" ? "bg-white rounded-xl px-2.5 py-1.5 shadow-[0_1px_2px_rgba(0,0,0,0.06)]" : ""} ${className}`}
    >
      {img}
    </span>
  );

  if (!asLink) return wrapper;
  return (
    <Link to="/" aria-label="Junna Solar — Home" data-testid="nav-logo">
      {wrapper}
    </Link>
  );
};

export default Logo;
