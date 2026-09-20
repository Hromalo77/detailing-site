"use client";

import type { Service } from "./site-content";
import { formatPrice, priceInCents } from "./service-price";

export default function ServiceCard({ service, index, onRequest, selected, onSelectionChange }: {
  service: Service;
  index: number;
  onRequest: (summary: string) => void;
  selected: number[];
  onSelectionChange: (selected: number[]) => void;
}) {
  const addOns = service.addOns ?? [];
  const selectedAddOns = addOns.filter((_, i) => selected.includes(i));
  const extras = selectedAddOns.reduce((sum, item) => sum + (priceInCents(item.price) ?? 0), 0);
  const base = priceInCents(service.price);
  const price = base === null ? service.price : formatPrice(base + extras);
  const summary = [
    `Service: ${service.name}`,
    ...selectedAddOns.map((item) => `${item.name}: +${formatPrice(priceInCents(item.price) ?? 0)}`),
    base === null ? `Base price: ${service.price}; selected add-ons: ${formatPrice(extras)}` : `Starting total: ${price}`,
  ].join("\n");

  return (
    <article className={`service-card ${service.popular ? "popular" : ""}`}>
      {service.popular && <div className="popular-label">Most popular</div>}
      <p className="card-number">{String(index + 1).padStart(2, "0")}</p>
      <h3>{service.name}</h3>
      <p>{service.text}</p>
      <ul>{service.items.map((item) => <li key={item}><span>✓</span>{item}</li>)}</ul>
      {addOns.length > 0 && (
        <fieldset className="service-addons">
          <legend>Optional add-ons</legend>
          {addOns.map((addOn, i) => (
            <label className="service-addon" key={i}>
              <input type="checkbox" checked={selected.includes(i)}
                disabled={priceInCents(addOn.price) === null}
                onChange={(event) => {
                  const checked = event.target.checked;
                  onSelectionChange(checked ? [...selected, i] : selected.filter((value) => value !== i));
                }} />
              <span>{addOn.name}</span>
              <strong>+{formatPrice(priceInCents(addOn.price) ?? 0)}</strong>
            </label>
          ))}
        </fieldset>
      )}
      <div className="price" aria-live="polite" aria-atomic="true">
        <small>{selected.length ? "STARTING TOTAL WITH ADD-ONS" : "STARTING AT"}</small>
        <b>{price}</b>
        {base === null && selected.length > 0 && <p>Plus {formatPrice(extras)} in selected add-ons</p>}
      </div>
      <p className="quote-disclosure">Starting estimate. Final quote depends on your vehicle and service needs. <a href="/service-information">Pricing details</a></p>
      <a className="service-request-button" href="#contact" onClick={() => onRequest(summary)}>Schedule a cleaning</a>
    </article>
  );
}
