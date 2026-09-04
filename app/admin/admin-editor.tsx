"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Faq, GalleryItem, Review, Service, SiteContent, Step } from "../site-content";

type Status = "idle" | "saving" | "saved" | "error";

export default function AdminEditor({
  initialContent,
}: {
  initialContent: SiteContent;
}) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const jsonPreview = useMemo(
    () => JSON.stringify(content, null, 2),
    [content]
  );

  async function save() {
    setStatus("saving");
    setMessage("");

    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      setStatus("error");
      setMessage("Could not save changes.");
      return;
    }

    setStatus("saved");
    setMessage("Changes saved.");
  }

  function patch<T extends keyof SiteContent>(key: T, value: SiteContent[T]) {
    setContent((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <a href="#business">Business</a>
        <a href="#hero">Hero</a>
        <a href="#services">Services</a>
        <a href="#process">Process</a>
        <a href="#reviews">Reviews</a>
        <a href="#gallery">Gallery</a>
        <a href="#coverage">Coverage</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
        <a href="#footer">Footer</a>
      </aside>

      <div className="admin-content">
        <Section id="business" title="Business">
          <Field
            label="Brand mark"
            value={content.brand.mark}
            onChange={(value) => patch("brand", { ...content.brand, mark: value })}
          />
          <Field
            label="Brand name"
            value={content.brand.name}
            onChange={(value) => patch("brand", { ...content.brand, name: value })}
          />
          <Field
            label="Brand highlight"
            value={content.brand.highlight}
            onChange={(value) =>
              patch("brand", { ...content.brand, highlight: value })
            }
          />
          <Field
            label="Brand subline"
            value={content.brand.subline}
            onChange={(value) =>
              patch("brand", { ...content.brand, subline: value })
            }
          />
          <Field
            label="Phone href"
            value={content.contact.phone}
            onChange={(value) =>
              patch("contact", { ...content.contact, phone: value })
            }
          />
          <Field
            label="Phone display"
            value={content.contact.phoneDisplay}
            onChange={(value) =>
              patch("contact", { ...content.contact, phoneDisplay: value })
            }
          />
          <Field
            label="Email"
            value={content.contact.email}
            onChange={(value) =>
              patch("contact", { ...content.contact, email: value })
            }
          />
          <ListField
            label="Navigation"
            value={content.nav}
            onChange={(value) => patch("nav", value)}
          />
        </Section>

        <Section id="hero" title="Hero">
          <Field
            label="Eyebrow"
            value={content.hero.eyebrow}
            onChange={(value) => patch("hero", { ...content.hero, eyebrow: value })}
          />
          <Field
            label="Title"
            value={content.hero.title}
            onChange={(value) => patch("hero", { ...content.hero, title: value })}
          />
          <Field
            label="Emphasis"
            value={content.hero.emphasis}
            onChange={(value) =>
              patch("hero", { ...content.hero, emphasis: value })
            }
          />
          <Area
            label="Lede"
            value={content.hero.lede}
            onChange={(value) => patch("hero", { ...content.hero, lede: value })}
          />
          <Field
            label="Primary CTA"
            value={content.hero.primaryCta}
            onChange={(value) =>
              patch("hero", { ...content.hero, primaryCta: value })
            }
          />
          <Field
            label="Secondary CTA"
            value={content.hero.secondaryCta}
            onChange={(value) =>
              patch("hero", { ...content.hero, secondaryCta: value })
            }
          />
          <ListField
            label="Trust items"
            value={content.hero.trust}
            onChange={(value) => patch("hero", { ...content.hero, trust: value })}
          />
          <Field
            label="Badge label"
            value={content.hero.badgeLabel}
            onChange={(value) =>
              patch("hero", { ...content.hero, badgeLabel: value })
            }
          />
          <Area
            label="Badge text"
            value={content.hero.badgeText}
            onChange={(value) =>
              patch("hero", { ...content.hero, badgeText: value })
            }
          />
          <ListField
            label="Strip items"
            value={content.strip}
            onChange={(value) => patch("strip", value)}
          />
        </Section>

        <Section id="services" title="Services">
          <SectionHeadingEditor
            label={content.servicesSection.label}
            title={content.servicesSection.title}
            emphasis={content.servicesSection.emphasis}
            text={content.servicesSection.text}
            onChange={(value) => patch("servicesSection", value)}
          />
          <ServiceList
            services={content.services}
            onChange={(services) => patch("services", services)}
          />
        </Section>

        <Section id="process" title="Process">
          <Field
            label="Label"
            value={content.process.label}
            onChange={(value) =>
              patch("process", { ...content.process, label: value })
            }
          />
          <Field
            label="Title"
            value={content.process.title}
            onChange={(value) =>
              patch("process", { ...content.process, title: value })
            }
          />
          <Field
            label="Emphasis"
            value={content.process.emphasis}
            onChange={(value) =>
              patch("process", { ...content.process, emphasis: value })
            }
          />
          <Area
            label="Text"
            value={content.process.text}
            onChange={(value) =>
              patch("process", { ...content.process, text: value })
            }
          />
          <Field
            label="CTA"
            value={content.process.cta}
            onChange={(value) =>
              patch("process", { ...content.process, cta: value })
            }
          />
          <StepList
            steps={content.process.steps}
            onChange={(steps) => patch("process", { ...content.process, steps })}
          />
        </Section>

        <Section id="reviews" title="Reviews">
          <SectionHeadingEditor
            label={content.reviewsSection.label}
            title={content.reviewsSection.title}
            emphasis={content.reviewsSection.emphasis}
            text={content.reviewsSection.text}
            onChange={(value) => patch("reviewsSection", value)}
          />
          <ReviewList
            reviews={content.reviews}
            onChange={(reviews) => patch("reviews", reviews)}
          />
        </Section>

        <Section id="gallery" title="Gallery">
          <Field
            label="Label"
            value={content.gallery.label}
            onChange={(value) =>
              patch("gallery", { ...content.gallery, label: value })
            }
          />
          <Field
            label="Title"
            value={content.gallery.title}
            onChange={(value) =>
              patch("gallery", { ...content.gallery, title: value })
            }
          />
          <Field
            label="Emphasis"
            value={content.gallery.emphasis}
            onChange={(value) =>
              patch("gallery", { ...content.gallery, emphasis: value })
            }
          />
          <Area
            label="Text"
            value={content.gallery.text}
            onChange={(value) =>
              patch("gallery", { ...content.gallery, text: value })
            }
          />
          <ListField
            label="Tags"
            value={content.gallery.tags}
            onChange={(tags) => patch("gallery", { ...content.gallery, tags })}
          />
          <GalleryList
            items={content.gallery.items}
            onChange={(items) => patch("gallery", { ...content.gallery, items })}
          />
        </Section>

        <Section id="coverage" title="Coverage">
          <Field
            label="Label"
            value={content.coverage.label}
            onChange={(value) =>
              patch("coverage", { ...content.coverage, label: value })
            }
          />
          <Field
            label="Title"
            value={content.coverage.title}
            onChange={(value) =>
              patch("coverage", { ...content.coverage, title: value })
            }
          />
          <Field
            label="Emphasis"
            value={content.coverage.emphasis}
            onChange={(value) =>
              patch("coverage", { ...content.coverage, emphasis: value })
            }
          />
          <Area
            label="Text"
            value={content.coverage.text}
            onChange={(value) =>
              patch("coverage", { ...content.coverage, text: value })
            }
          />
          <ListField
            label="Towns"
            value={content.coverage.towns}
            onChange={(towns) => patch("coverage", { ...content.coverage, towns })}
          />
        </Section>

        <Section id="faq" title="FAQ">
          <Field
            label="Label"
            value={content.faq.label}
            onChange={(value) => patch("faq", { ...content.faq, label: value })}
          />
          <Field
            label="Title"
            value={content.faq.title}
            onChange={(value) => patch("faq", { ...content.faq, title: value })}
          />
          <Field
            label="Emphasis"
            value={content.faq.emphasis}
            onChange={(value) =>
              patch("faq", { ...content.faq, emphasis: value })
            }
          />
          <Field
            label="CTA"
            value={content.faq.cta}
            onChange={(value) => patch("faq", { ...content.faq, cta: value })}
          />
          <FaqList
            items={content.faq.items}
            onChange={(items) => patch("faq", { ...content.faq, items })}
          />
        </Section>

        <Section id="contact" title="Contact">
          <Field
            label="Label"
            value={content.contactSection.label}
            onChange={(value) =>
              patch("contactSection", { ...content.contactSection, label: value })
            }
          />
          <Field
            label="Title"
            value={content.contactSection.title}
            onChange={(value) =>
              patch("contactSection", { ...content.contactSection, title: value })
            }
          />
          <Field
            label="Emphasis"
            value={content.contactSection.emphasis}
            onChange={(value) =>
              patch("contactSection", {
                ...content.contactSection,
                emphasis: value,
              })
            }
          />
          <Area
            label="Text"
            value={content.contactSection.text}
            onChange={(value) =>
              patch("contactSection", { ...content.contactSection, text: value })
            }
          />
          <Field
            label="Phone CTA"
            value={content.contactSection.phoneCta}
            onChange={(value) =>
              patch("contactSection", {
                ...content.contactSection,
                phoneCta: value,
              })
            }
          />
          <Field
            label="Submit label"
            value={content.contactSection.submitLabel}
            onChange={(value) =>
              patch("contactSection", {
                ...content.contactSection,
                submitLabel: value,
              })
            }
          />
          <Field
            label="Sent message"
            value={content.contactSection.sentMessage}
            onChange={(value) =>
              patch("contactSection", {
                ...content.contactSection,
                sentMessage: value,
              })
            }
          />
        </Section>

        <Section id="footer" title="Footer">
          <Area
            label="Footer text"
            value={content.footer.text}
            onChange={(value) => patch("footer", { ...content.footer, text: value })}
          />
          <Area
            label="Copyright"
            value={content.footer.copyright}
            onChange={(value) =>
              patch("footer", { ...content.footer, copyright: value })
            }
          />
          <details className="admin-json">
            <summary>Raw JSON</summary>
            <pre>{jsonPreview}</pre>
          </details>
        </Section>
      </div>

      <div className="admin-savebar">
        <span className={`admin-status ${status}`}>{message || "Ready"}</span>
        <button type="button" onClick={save} disabled={status === "saving"}>
          {status === "saving" ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="admin-panel" id={id}>
      <h2>{title}</h2>
      <div className="admin-fields">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="admin-field wide">
      <span>{label}</span>
      <textarea
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ListField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
}) {
  return (
    <Area
      label={`${label} - one per line`}
      value={value.join("\n")}
      onChange={(next) =>
        onChange(next.split("\n").map((item) => item.trim()).filter(Boolean))
      }
    />
  );
}

function SectionHeadingEditor({
  label,
  title,
  emphasis,
  text,
  onChange,
}: {
  label: string;
  title: string;
  emphasis: string;
  text: string;
  onChange: (value: {
    label: string;
    title: string;
    emphasis: string;
    text: string;
  }) => void;
}) {
  const current = { label, title, emphasis, text };

  return (
    <>
      <Field
        label="Label"
        value={label}
        onChange={(value) => onChange({ ...current, label: value })}
      />
      <Field
        label="Title"
        value={title}
        onChange={(value) => onChange({ ...current, title: value })}
      />
      <Field
        label="Emphasis"
        value={emphasis}
        onChange={(value) => onChange({ ...current, emphasis: value })}
      />
      <Area
        label="Text"
        value={text}
        onChange={(value) => onChange({ ...current, text: value })}
      />
    </>
  );
}

function ServiceList({
  services,
  onChange,
}: {
  services: Service[];
  onChange: (services: Service[]) => void;
}) {
  return (
    <Repeater
      label="Service"
      items={services}
      empty={{ name: "", price: "", text: "", items: [], popular: false }}
      onChange={onChange}
      render={(service, update) => (
        <>
          <Field label="Name" value={service.name} onChange={(name) => update({ ...service, name })} />
          <Field label="Price" value={service.price} onChange={(price) => update({ ...service, price })} />
          <Area label="Description" value={service.text} onChange={(text) => update({ ...service, text })} />
          <ListField label="Included items" value={service.items} onChange={(items) => update({ ...service, items })} />
          <label className="admin-check">
            <input
              type="checkbox"
              checked={Boolean(service.popular)}
              onChange={(event) => update({ ...service, popular: event.target.checked })}
            />
            Most popular
          </label>
        </>
      )}
    />
  );
}

function StepList({
  steps,
  onChange,
}: {
  steps: Step[];
  onChange: (steps: Step[]) => void;
}) {
  return (
    <Repeater
      label="Step"
      items={steps}
      empty={{ number: "", title: "", text: "" }}
      onChange={onChange}
      render={(step, update) => (
        <>
          <Field label="Number" value={step.number} onChange={(number) => update({ ...step, number })} />
          <Field label="Title" value={step.title} onChange={(title) => update({ ...step, title })} />
          <Area label="Text" value={step.text} onChange={(text) => update({ ...step, text })} />
        </>
      )}
    />
  );
}

function ReviewList({
  reviews,
  onChange,
}: {
  reviews: Review[];
  onChange: (reviews: Review[]) => void;
}) {
  return (
    <Repeater
      label="Review"
      items={reviews}
      empty={{ quote: "", name: "", location: "" }}
      onChange={onChange}
      render={(review, update) => (
        <>
          <Area label="Quote" value={review.quote} onChange={(quote) => update({ ...review, quote })} />
          <Field label="Name" value={review.name} onChange={(name) => update({ ...review, name })} />
          <Field label="Location" value={review.location} onChange={(location) => update({ ...review, location })} />
        </>
      )}
    />
  );
}

function GalleryList({
  items,
  onChange,
}: {
  items: GalleryItem[];
  onChange: (items: GalleryItem[]) => void;
}) {
  return (
    <Repeater
      label="Gallery item"
      items={items}
      empty={{ number: "", title: "", label: "" }}
      onChange={onChange}
      render={(item, update) => (
        <>
          <Field label="Number" value={item.number} onChange={(number) => update({ ...item, number })} />
          <Field label="Title" value={item.title} onChange={(title) => update({ ...item, title })} />
          <Field label="Label" value={item.label} onChange={(label) => update({ ...item, label })} />
        </>
      )}
    />
  );
}

function FaqList({
  items,
  onChange,
}: {
  items: Faq[];
  onChange: (items: Faq[]) => void;
}) {
  return (
    <Repeater
      label="Question"
      items={items}
      empty={{ question: "", answer: "" }}
      onChange={onChange}
      render={(item, update) => (
        <>
          <Field label="Question" value={item.question} onChange={(question) => update({ ...item, question })} />
          <Area label="Answer" value={item.answer} onChange={(answer) => update({ ...item, answer })} />
        </>
      )}
    />
  );
}

function Repeater<T>({
  label,
  items,
  empty,
  onChange,
  render,
}: {
  label: string;
  items: T[];
  empty: T;
  onChange: (items: T[]) => void;
  render: (item: T, update: (item: T) => void) => ReactNode;
}) {
  return (
    <div className="admin-repeater wide">
      {items.map((item, index) => (
        <div className="admin-repeat-item" key={index}>
          <div className="admin-repeat-head">
            <h3>
              {label} {index + 1}
            </h3>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            >
              Remove
            </button>
          </div>
          <div className="admin-fields">
            {render(item, (next) =>
              onChange(items.map((current, itemIndex) => (itemIndex === index ? next : current)))
            )}
          </div>
        </div>
      ))}
      <button type="button" className="admin-add" onClick={() => onChange([...items, empty])}>
        Add {label.toLowerCase()}
      </button>
    </div>
  );
}
