import { benefitItems } from "../data/siteContent";

type BenefitIconProps = {
  name: (typeof benefitItems)[number]["icon"];
};

function BenefitIcon({ name }: BenefitIconProps) {
  const sharedProps = {
    className: "benefits-section__icon-svg",
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
                <span className="benefits-section__icon" aria-hidden="true">
                  <BenefitIcon name={item.icon} />
                </span>
                <p className="benefits-section__label">{item.title}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
