import Link from "next/link";
import { benefitItems } from "../data/siteContent";

type BenefitGlyphName =
  | (typeof benefitItems)[number]["badgeIcon"]
  | (typeof benefitItems)[number]["meta"][number]["icon"];

type BenefitGlyphProps = {
  name: BenefitGlyphName;
  className?: string;
};

function BenefitGlyph({ name, className }: BenefitGlyphProps) {
  const sharedProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "clock":
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v4.75l3 1.75" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...sharedProps}>
          <rect x="4" y="5.5" width="16" height="14" rx="2" />
          <path d="M8 4v3M16 4v3M4 10h16" />
        </svg>
      );
    case "ruler":
      return (
        <svg {...sharedProps}>
          <path d="M5 17 17 5" />
          <path d="M8.5 13.5l1 1M11 11l1 1M13.5 8.5l1 1M16 6l1 1" />
        </svg>
      );
    case "alert":
      return (
        <svg {...sharedProps}>
          <path d="M12 4.5 20.5 18.5H3.5L12 4.5z" />
          <path d="M12 10v4.25M12 17.25h.01" />
        </svg>
      );
    case "pin":
      return (
        <svg {...sharedProps}>
          <path d="M12 21s6-5.2 6-10.25a6 6 0 1 0-12 0C6 15.8 12 21 12 21z" />
          <circle cx="12" cy="10.75" r="2.25" />
        </svg>
      );
    case "check":
      return (
        <svg {...sharedProps}>
          <path d="M5.5 12.5 10 17l8.5-9" />
        </svg>
      );
    case "gauge":
      return (
        <svg {...sharedProps}>
          <path d="M12 4.5a7.5 7.5 0 1 1-5.3 12.8" />
          <path d="M12 8v4.25l2.75 1.75" />
        </svg>
      );
    case "phone":
      return (
        <svg {...sharedProps}>
          <path d="M6.5 5.5h3l1.5 3.5-2 1.25a11 11 0 0 0 5.25 5.25l1.25-2 3.5 1.5v3a1.75 1.75 0 0 1-1.75 1.75C10.2 20.25 3.75 13.8 3.75 7.25A1.75 1.75 0 0 1 5.5 5.5z" />
        </svg>
      );
    case "map":
      return (
        <svg {...sharedProps}>
          <path d="M9 4.5 4.5 6v13.5L9 18l6 2.5L19.5 18V4.5L15 3z" />
          <path d="M9 4.5V18M15 6.5V20" />
        </svg>
      );
    default:
      return null;
  }
}

export default function BenefitsSection() {
  return (
    <section className="benefits-section" aria-labelledby="benefits-title">
      <div className="benefits-section__inner">
        <div className="benefits-section__intro">
          <p className="benefits-section__eyebrow">Dlaczego my</p>
          <h2 id="benefits-title" className="benefits-section__title">
            Szybko, precyzyjnie, na miejscu
          </h2>
          <span className="machine__rule machine__rule--center" aria-hidden="true" />
        </div>

        <ul className="benefits-section__list">
          {benefitItems.map((item) => (
            <li
              key={item.id}
              className={`benefits-section__item${
                item.id === "emergency" ? " benefits-section__item--alert" : ""
              }`}
            >
              <article className="benefits-section__card">
                <div className="benefits-section__card-media" aria-hidden="true">
                  <picture>
                    <source media="(min-width: 48rem)" srcSet={item.image.desktop} />
                    <img
                      src={item.image.mobile}
                      alt=""
                      className="benefits-section__card-image"
                      style={{ objectPosition: item.image.focus }}
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                </div>

                <div className="benefits-section__card-overlay" aria-hidden="true" />

                <span className="benefits-section__card-badge" aria-hidden="true">
                  <BenefitGlyph
                    name={item.badgeIcon}
                    className="benefits-section__card-badge-icon"
                  />
                </span>

                <div className="benefits-section__card-content">
                  <h3 className="benefits-section__card-title">{item.title}</h3>
                  <p className="benefits-section__card-subtitle">{item.subtitle}</p>

                  <ul className="benefits-section__card-meta">
                    {item.meta.map((metaItem) => (
                      <li key={`${item.id}-${metaItem.icon}-${metaItem.label}`}>
                        <BenefitGlyph
                          name={metaItem.icon}
                          className="benefits-section__card-meta-icon"
                        />
                        <span>{metaItem.label}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href={item.cta.href} className="benefits-section__card-cta">
                    {item.cta.label}
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
