import Image from "next/image";

type LogoVariant =
  | "symbol-black"
  | "symbol-white"
  | "primary-black"
  | "primary-white"
  | "primary-dark-bg";

type LogoSize = "sm" | "md" | "lg";

const logoSrc: Record<LogoVariant, string> = {
  "symbol-black": "/debroder-icon.png",
  "symbol-white": "/brand/debroder/logo-symbol-white.svg",
  "primary-black": "/brand/debroder/logo-primary-black.svg",
  "primary-white": "/brand/debroder/logo-primary-white.svg",
  "primary-dark-bg": "/brand/debroder/logo-primary-dark-bg.png"
};

const symbolSize: Record<LogoSize, number> = {
  sm: 40,
  md: 48,
  lg: 56
};

const primarySize: Record<LogoSize, { width: number; height: number }> = {
  sm: { width: 128, height: 40 },
  md: { width: 168, height: 52 },
  lg: { width: 220, height: 68 }
};

export function Logo({
  variant,
  size = "md",
  className = "",
  showText = false
}: {
  variant: LogoVariant;
  size?: LogoSize;
  className?: string;
  showText?: boolean;
}) {
  const isSymbol = variant.startsWith("symbol");
  const dimensions = isSymbol
    ? {
        width: symbolSize[size],
        height: symbolSize[size]
      }
    : primarySize[size];
  const imageClass = isSymbol
    ? size === "md"
      ? "h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
      : "h-auto shrink-0 object-contain"
    : "h-auto shrink-0 object-contain";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src={logoSrc[variant]}
        alt="Logo DEBRODER"
        width={dimensions.width}
        height={dimensions.height}
        className={imageClass}
        priority
      />
      {showText ? (
        <span className="leading-none">
          <span className="block text-base font-black tracking-[0.2em] text-brand-green">
            DEBRODER
          </span>
          <span className="mt-2 block text-xs font-bold text-brand-charcoal/60">
            Kaos Polos Import & Sablon
          </span>
        </span>
      ) : null}
    </span>
  );
}
