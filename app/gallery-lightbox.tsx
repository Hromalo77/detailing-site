"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { SiteContent } from "./site-content";
import "./gallery-lightbox.css";

export default function GalleryLightbox({ items }: { items: SiteContent["gallery"]["items"] }) {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const images = items.filter((item) => item.imageUrl);
  const active = selected === null ? undefined : images[selected];
  const isOpen = Boolean(active);

  useEffect(() => {
    if (!isOpen) return;
    const modal = dialog.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      modal.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  const move = (direction: number) => {
    setSelected((index) => index === null || !images.length ? null : (index + direction + images.length) % images.length);
  };

  return (
    <>
      <div className="gallery-placeholders">
        {items.map((item) => (
          <div key={item.number}>
            {item.imageUrl ? <Image src={item.imageUrl} alt={item.imageAlt || item.title} fill unoptimized sizes="(max-width: 768px) 100vw, 40vw" className="gallery-photo" /> : null}
            <span>{item.number}</span>
            <b>{item.title}</b>
            <small>{item.label}</small>
            {item.imageUrl ? <button className="gallery-open" type="button" aria-label={`Enlarge ${item.title}`} aria-haspopup="dialog" onClick={() => setSelected(images.indexOf(item))}><span aria-hidden="true">↗</span></button> : null}
          </div>
        ))}
      </div>
      <dialog ref={dialog} className="gallery-lightbox" aria-label="Gallery image viewer" onCancel={() => setSelected(null)} onClose={() => setSelected(null)} onClick={(event) => { if (event.target === event.currentTarget) setSelected(null); }} onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}>
        {active ? <section className="gallery-lightbox-panel">
          <button type="button" className="gallery-close" aria-label="Close gallery" onClick={() => setSelected(null)} autoFocus>×</button>
          <div className="gallery-full-image">
            <Image key={active.imageUrl} src={active.imageUrl!} alt={active.imageAlt || active.title} fill unoptimized sizes="100vw" />
          </div>
          <div className="gallery-lightbox-controls">
            <button type="button" aria-label="Previous image" onClick={() => move(-1)} disabled={images.length < 2}>←</button>
            <p aria-live="polite" aria-atomic="true"><strong>{active.title}</strong><span>{selected! + 1} / {images.length}</span></p>
            <button type="button" aria-label="Next image" onClick={() => move(1)} disabled={images.length < 2}>→</button>
          </div>
        </section> : null}
      </dialog>
    </>
  );
}
