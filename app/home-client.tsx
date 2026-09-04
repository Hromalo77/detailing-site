"use client";

import { FormEvent, ReactNode, useState } from "react";
import type { SiteContent } from "./site-content";

const sectionIds: Record<string, string> = {
  Home: "home",
  Services: "services",
  Reviews: "reviews",
  Gallery: "gallery",
  About: "about",
};

export default function HomeClient({ content }: { content: SiteContent }) {
  const [sent, setSent] = useState(false);
  const phoneHref = `tel:${content.contact.phone}`;

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent("Mobile detailing request");
    const body = encodeURIComponent(
      `Name: ${d.get("name")}\nPhone: ${d.get("phone")}\nEmail: ${d.get("email")}\n\nVehicle / question:\n${d.get("message")}`
    );
    setSent(true);
    window.location.href = `mailto:${content.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main>
      <header className="site-header">
        <Brand content={content} />
        <nav>
          {content.nav.map((item) => (
            <a href={`#${sectionIds[item] ?? item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <a className="nav-call" href={phoneHref}>
          Call now <span>-&gt;</span>
        </a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">
            <span />
            {content.hero.eyebrow}
          </p>
          <h1>
            {content.hero.title}
            <br />
            <em>{content.hero.emphasis}</em>
          </h1>
          <p className="hero-lede">{content.hero.lede}</p>
          <div className="hero-actions">
            <a className="button primary" href={phoneHref}>
              {content.hero.primaryCta}
            </a>
            <a className="button secondary" href="#contact">
              {content.hero.secondaryCta} <span>-&gt;</span>
            </a>
          </div>
          <div className="trust-row">
            {content.hero.trust.map((item) => (
              <span key={item}>
                <b>✓</b> {item}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-art">
          <div className="sun" />
          <div className="car-line">
            <i />
            <i />
          </div>
          <div className="water-line one" />
          <div className="water-line two" />
          <div className="service-badge">
            <span>●</span>
            <div>
              <small>{content.hero.badgeLabel}</small>
              <b>{content.hero.badgeText}</b>
            </div>
          </div>
        </div>
      </section>

      <section className="service-strip">
        {content.strip.map((item, index) => (
          <FragmentWithSeparator key={item} showSeparator={index > 0}>
            <span>{item}</span>
          </FragmentWithSeparator>
        ))}
      </section>

      <section className="section services" id="services">
        <Heading
          label={content.servicesSection.label}
          title={
            <>
              {content.servicesSection.title}
              <br />
              <em>{content.servicesSection.emphasis}</em>
            </>
          }
          text={content.servicesSection.text}
        />
        <div className="service-grid">
          {content.services.map((service, i) => (
            <article
              className={`service-card ${service.popular ? "popular" : ""}`}
              key={`${service.name}-${i}`}
            >
              {service.popular && (
                <div className="popular-label">Most popular</div>
              )}
              <p className="card-number">{String(i + 1).padStart(2, "0")}</p>
              <h3>{service.name}</h3>
              <p>{service.text}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>
                    <span>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="price">
                <small>STARTING AT</small>
                <b>{service.price}</b>
              </div>
              <a href="#contact">
                Request this service <span>-&gt;</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section process" id="about">
        <div className="process-intro">
          <p className="eyebrow light">
            <span />
            {content.process.label}
          </p>
          <h2>
            {content.process.title}
            <br />
            <em>{content.process.emphasis}</em>
          </h2>
          <p>{content.process.text}</p>
          <a className="button pale" href="#contact">
            {content.process.cta}
          </a>
        </div>
        <div className="steps">
          {content.process.steps.map((step) => (
            <article key={step.number}>
              <b>{step.number}</b>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reviews" id="reviews">
        <Heading
          label={content.reviewsSection.label}
          title={
            <>
              {content.reviewsSection.title}
              <br />
              <em>{content.reviewsSection.emphasis}</em>
            </>
          }
          text={content.reviewsSection.text}
        />
        <div className="review-grid">
          {content.reviews.map((review) => (
            <blockquote key={`${review.name}-${review.location}`}>
              <div>★★★★★</div>
              <p>"{review.quote}"</p>
              <footer>
                <b>{review.name}</b>
                <span>{review.location}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section gallery" id="gallery">
        <div className="gallery-copy">
          <p className="eyebrow light">
            <span />
            {content.gallery.label}
          </p>
          <h2>
            {content.gallery.title}
            <br />
            <em>{content.gallery.emphasis}</em>
          </h2>
          <p>{content.gallery.text}</p>
          <div className="gallery-tags">
            {content.gallery.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
        <div className="gallery-placeholders">
          {content.gallery.items.map((item) => (
            <div key={item.number}>
              <span>{item.number}</span>
              <b>{item.title}</b>
              <small>{item.label}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="section coverage">
        <div>
          <p className="eyebrow">
            <span />
            {content.coverage.label}
          </p>
          <h2>
            {content.coverage.title}
            <br />
            <em>{content.coverage.emphasis}</em>
          </h2>
          <p>{content.coverage.text}</p>
        </div>
        <div className="towns">
          {content.coverage.towns.map((town) => (
            <span key={town}>{town}</span>
          ))}
        </div>
      </section>

      <section className="section faq">
        <div className="faq-title">
          <p className="eyebrow">
            <span />
            {content.faq.label}
          </p>
          <h2>
            {content.faq.title}
            <br />
            <em>{content.faq.emphasis}</em>
          </h2>
          <p>{content.faq.text}</p>
          <a href={phoneHref}>
            {content.faq.cta} -&gt;
          </a>
        </div>
        <div className="faq-list">
          {content.faq.items.map((item, i) => (
            <details key={item.question} open={i === 0}>
              <summary>
                {item.question}
                <span>+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="contact section" id="contact">
        <div className="contact-copy">
          <p className="eyebrow light">
            <span />
            {content.contactSection.label}
          </p>
          <h2>
            {content.contactSection.title}
            <br />
            <em>{content.contactSection.emphasis}</em>
          </h2>
          <p>{content.contactSection.text}</p>
          <a href={phoneHref}>
            {content.contactSection.phoneCta}{" "}
            <b>{content.contact.phoneDisplay}</b> -&gt;
          </a>
        </div>
        <form onSubmit={submit}>
          <div className="field-row">
            <label>
              Your name
              <input required name="name" placeholder="John Smith" />
            </label>
            <label>
              Phone number
              <input required name="phone" type="tel" placeholder="(508) 555-0123" />
            </label>
          </div>
          <label>
            Email address
            <input required name="email" type="email" placeholder="john@example.com" />
          </label>
          <label>
            Vehicle & what you need
            <textarea
              name="message"
              rows={4}
              placeholder="Tell us your vehicle, condition, location, or questions..."
            />
          </label>
          <button>
            {content.contactSection.submitLabel} <span>-&gt;</span>
          </button>
          {sent && <p className="form-note">{content.contactSection.sentMessage}</p>}
        </form>
      </section>

      <footer>
        <Brand content={content} footer />
        <p>{content.footer.text}</p>
        <div>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <small>{content.footer.copyright}</small>
      </footer>

      <div className="mobile-actions" aria-label="Quick actions">
        <a href={phoneHref}>
          <b>Call now</b>
          <small>{content.contact.phoneDisplay}</small>
        </a>
        <a href="#contact">
          <b>Request detail</b>
          <small>Get a quote -&gt;</small>
        </a>
      </div>
    </main>
  );
}

function Brand({
  content,
  footer = false,
}: {
  content: SiteContent;
  footer?: boolean;
}) {
  return (
    <a className={`brand ${footer ? "footer-brand" : ""}`} href="#home">
      <span className="brand-mark">{content.brand.mark}</span>
      <span>
        {content.brand.name} <b>{content.brand.highlight}</b>
        <small>{content.brand.subline}</small>
      </span>
    </a>
  );
}

function FragmentWithSeparator({
  children,
  showSeparator,
}: {
  children: ReactNode;
  showSeparator: boolean;
}) {
  return (
    <>
      {showSeparator && <i>✦</i>}
      {children}
    </>
  );
}

function Heading({
  label,
  title,
  text,
}: {
  label: string;
  title: ReactNode;
  text: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span />
          {label}
        </p>
        <h2>{title}</h2>
      </div>
      <p>{text}</p>
    </div>
  );
}
