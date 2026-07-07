import ScrollReveal from "./ScrollReveal";
import { hm200EcolineImage } from "../data/hm200Ecoline";
import { machineGalleryImages, machineSpecs, machineUses } from "../data/machineContent";

type MachinePictureProps = {
  desktop: string;
  mobile: string;
  alt: string;
  imgClassName?: string;
};

function MachinePicture({ desktop, mobile, alt, imgClassName = "machine__img" }: MachinePictureProps) {
  return (
    <picture>
      <source media="(min-width: 48rem)" srcSet={desktop} />
      <img
        src={mobile}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}

export default function MachineSection() {
  return (
    <ScrollReveal
      as="section"
      id="oferta"
      className="machine"
      aria-labelledby="machine-title"
    >
      <div className="machine__shell">
        <div className="machine__copy">
          <p className="machine__eyebrow">O maszynie</p>
          <h2 id="machine-title" className="machine__title">
            Uniflex HM&nbsp;200 Ecoline
          </h2>
          <span className="machine__rule machine__rule--center" aria-hidden="true" />
          <p className="machine__lead">
            Precyzyjna zakuwarka warsztatowa z technologią łożysk ślizgowych —
            czyste zaciśnięcie bez zabrudzeń smarem. Zakuwamy węże hydrauliczne
            do&nbsp;1&nbsp;1/4&quot; i przemysłowe do&nbsp;2&quot;.
          </p>
        </div>

        <div className="machine__grid">
          <div className="machine__main">
            <figure className="machine__figure">
              <MachinePicture
                desktop={hm200EcolineImage.desktopSrc}
                mobile={hm200EcolineImage.mobileSrc}
                alt={hm200EcolineImage.alt}
              />
            </figure>
          </div>

          <div className="machine__aside">
            <aside className="machine__panel" aria-labelledby="machine-specs-title">
              <h3 id="machine-specs-title" className="machine__panel-title">
                Parametry techniczne
              </h3>
              <ul className="machine__panel-list">
                {machineSpecs.map((spec) => (
                  <li key={spec.label} className="machine__panel-item">
                    <span className="machine__panel-icon">
                      <i className={`fa-solid ${spec.icon}`} aria-hidden="true" />
                    </span>
                    <span className="machine__panel-text">
                      <strong>{spec.label}</strong>
                      <span>{spec.value}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>

        <div className="machine__uses-row">
          <div className="machine__aside">
            <aside className="machine__panel" aria-labelledby="machine-uses-title">
              <h3 id="machine-uses-title" className="machine__panel-title">
                Zakuwamy węże i przewody do:
              </h3>
              <ul className="machine__panel-list machine__panel-list--bullets">
                {machineUses.map((use) => (
                  <li key={use} className="machine__panel-item machine__panel-item--bullet">
                    {use}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <figure className="machine__figure machine__figure--uses">
            <MachinePicture
              desktop={machineGalleryImages.detail.desktop}
              mobile={machineGalleryImages.detail.mobile}
              alt={machineGalleryImages.detail.alt}
              imgClassName="machine__img machine__img--uses"
            />
          </figure>
        </div>
      </div>
    </ScrollReveal>
  );
}
