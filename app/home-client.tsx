"use client";

import Image from "next/image";

import { FormEvent, ReactNode, useRef, useState } from "react";
import type { SiteContent } from "./site-content";
import ServiceCard from "./service-card";
import { serviceSummary } from "./contact-request";

const sectionIds: Record<string, string> = {
  Home: "home",
  Services: "services",
  Reviews: "reviews",
  Gallery: "gallery",
  About: "about",
};

export default function HomeClient({ content }: { content: SiteContent }) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const submitting = useRef(false);
  const [requestedIndex, setRequestedIndex] = useState<number | null>(null);
  const [selections, setSelections] = useState<Record<number, number[]>>({});
  const requested = requestedIndex === null ? null : content.services[requestedIndex];
  const requestedService = requested ? serviceSummary(requested, selections[requestedIndex!] ?? []) : "";
  const phoneHref = `tel:${content.contact.phone}`;
  const footerCopyright = content.footer.copyright.replace(/\. Template content.*$/i, ". All rights reserved.");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting.current) return;
    submitting.current = true;
    setSending(true);
    setSent(false);
    setSendError("");
    const d = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: d.get("name"), phone: d.get("phone"), email: d.get("email"), message: d.get("message"), website: d.get("website"),
          selection: requested ? { serviceIndex: requestedIndex, serviceName: requested.name, addOns: (selections[requestedIndex!] ?? []).map((index) => ({ index, name: requested.addOns![index].name })) } : null }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not submit your request. Please call us.");
      setSent(true);
    } catch (error) {
      setSendError(error instanceof Error ? error.message : "Could not confirm your request. Please call us.");
    } finally { submitting.current = false; setSending(false); }
  };

  return (
    <main id="main-content">
      <header className="site-header">
        <Brand content={content} />
        <nav>
          {content.nav.map((item) => (
            <a href={`#${sectionIds[item] ?? item.toLowerCase()}`} key={item}>
              {item}
            </a>
          ))}
        </nav>
        <a className="nav-call" href={phoneHref} aria-label={`Call Cape Shine at ${content.contact.phoneDisplay}`}>
          Call now <span aria-hidden="true">-&gt;</span>
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
              {content.hero.secondaryCta} <span aria-hidden="true">-&gt;</span>
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
          {content.services.map((service, i) => (<ServiceCard key={`${service.name}-${i}`} service={service} index={i} selected={selections[i] ?? []} onSelectionChange={(selected) => { setSelections((current) => ({ ...current, [i]: selected })); setSent(false); }} onRequest={() => { setRequestedIndex(i); setSent(false); }} />))}
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
              <p>&quot;{review.quote}&quot;</p>
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
              {item.imageUrl ? <Image src={item.imageUrl} alt={item.imageAlt || item.title} fill unoptimized sizes="(max-width: 768px) 100vw, 40vw" className="gallery-photo" /> : null}
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
          <div className="contact-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          {requestedService && <p className="request-summary" role="status">{requestedService}</p>}
          <div className="field-row">
            <label htmlFor="name">
              Your name
              <input id="name" required name="name" maxLength={120} autoComplete="name" placeholder="John Smith" />
            </label>
            <label htmlFor="phone">
              Phone number
              <input id="phone" required name="phone" maxLength={60} type="tel" autoComplete="tel" placeholder="(508) 555-0123" />
            </label>
          </div>
          <label htmlFor="email">
            Email address
            <input id="email" required name="email" maxLength={254} type="email" autoComplete="email" placeholder="john@example.com" />
          </label>
          <label htmlFor="message">
            Vehicle & what you need
            <textarea
              id="message"
              name="message"
              maxLength={4000}
              rows={4}
              placeholder="Tell us your vehicle, condition, location, or questions..."
            />
          </label>
          <p className="contact-disclosure">We’ll use your details to respond to this request. This does not subscribe you to marketing. We usually reply with a few questions and a quote recommendation. Read our <a href="/privacy">privacy notice</a> and <a href="/service-information">service information</a>.</p>
          <button disabled={sending || sent}>
            {sending ? "Sending…" : sent ? "Request submitted" : content.contactSection.submitLabel} <span>-&gt;</span>
          </button>
          {sent && <p className="form-note" role="status">Your request was submitted. We’ll be in touch soon.</p>}
          {sendError && <p className="form-note" role="alert">{sendError} <a href={phoneHref}>Call {content.contact.phoneDisplay}</a></p>}
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
          <a href="/privacy">Privacy notice</a>
          <a href="/service-information">Service information</a>
        </div>
        <small>{footerCopyright}</small>
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
      <Image
        className="brand-logo"
        src="/cape-shine-logo-simplified.png"
        unoptimized
        alt="Cape Shine Mobile Detailing logo"
        width={64}
        height={64}
        sizes="(max-width: 980px) 52px, 64px"
        priority={!footer}
      />
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


