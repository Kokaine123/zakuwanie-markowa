type ZakuwanieMarkowaLogoProps = {
  className?: string;
  variant?: "dark" | "light";
  title?: string;
};

export default function ZakuwanieMarkowaLogo({
  className,
  variant = "dark",
  title = "Zakuwanie Markowa",
}: ZakuwanieMarkowaLogoProps) {
  const classes = ["brand-logo", `brand-logo--${variant}`, className].filter(Boolean).join(" ");

  return (
    <svg
      className={classes}
      viewBox="0 0 530 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
    >
      <title>{title}</title>

      <g transform="translate(10, 10)">
        <polygon
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
          points="50,4 96,28 96,72 50,96 4,72 4,28"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinejoin="round"
          strokeLinecap="round"
          d="M 50,4 L 50,20 C 50,45 20,25 20,50 C 20,65 40,55 52,55 L 65,55 C 85,55 85,80 65,80 L 48,80"
        />
        <g fill="currentColor">
          <rect x="42" y="74" width="6" height="12" rx="1" />
          <polygon points="42,71 35,71 31,75 31,85 35,89 42,89" />
          <rect x="26" y="77" width="5" height="6" rx="1" />
          <rect x="23" y="78.5" width="3" height="3" />
        </g>
      </g>

      <text
        x="130"
        y="42"
        fill="currentColor"
        fontFamily="Montserrat, Arial, sans-serif"
        fontSize="34"
        fontWeight="400"
        letterSpacing="3"
      >
        ZAKUWANIE
      </text>
      <text
        x="130"
        y="94"
        fill="currentColor"
        fontFamily="Montserrat, Arial, sans-serif"
        fontSize="58"
        fontWeight="800"
        letterSpacing="1"
      >
        MARKOWA
      </text>
    </svg>
  );
}
