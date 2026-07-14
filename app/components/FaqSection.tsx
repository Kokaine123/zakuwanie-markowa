"use client";

import { useRef, useState } from "react";
import { faqItems } from "../data/siteContent";

type FaqItemProps = {
  id: string;
  question: string;
  answer: string;
};

function FaqItem({ id, question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const headingId = `${id}-heading`;

  const toggleItem = () => {
    const content = contentRef.current;

    if (!content) {
      setIsOpen((current) => !current);
      return;
    }

    if (isOpen) {
      setContentHeight(content.scrollHeight);
      window.requestAnimationFrame(() => {
        setContentHeight(0);
      });
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
    setContentHeight(content.scrollHeight);
  };

  return (
    <article className={`faq-section__item${isOpen ? " faq-section__item--open" : ""}`}>
      <button
        id={headingId}
        className="faq-section__question"
        type="button"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={toggleItem}
      >
        <h3 className="faq-section__question-text">{question}</h3>
        <span className="faq-section__toggle" aria-hidden="true" />
      </button>

      <div
        id={id}
        className="faq-section__answer"
        style={{ height: `${contentHeight}px` }}
        aria-labelledby={headingId}
        role="region"
      >
        <div ref={contentRef} className="faq-section__answer-inner">
          <p>{answer}</p>
        </div>
      </div>
    </article>
  );
}

export default function FaqSection() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="faq-section__inner">
        <div className="faq-section__header">
          <p className="faq-section__eyebrow">FAQ</p>
          <h2 id="faq-title" className="faq-section__title">
            Najczęściej zadawane pytania
          </h2>
          <span className="machine__rule machine__rule--center" aria-hidden="true" />
          <p className="faq-section__description">
            Odpowiedzi na pytania o zakuwanie węży hydraulicznych w Markowej i okolicach
            Łańcuta.
          </p>
        </div>

        <div className="faq-section__list">
          {faqItems.map((item) => (
            <FaqItem
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
