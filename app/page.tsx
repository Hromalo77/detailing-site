"use client";
import {FormEvent, useState} from "react";

const services = [
    {
        name: "Interior Refresh",
        price: "$149",
        text: "A focused reset for daily drivers—vacuum, wipe-down, glass, mats, and careful finishing touches.",
        items: ["Deep vacuum", "Interior surfaces", "Windows & mats"]
    },
    {
        name: "Complete Detail",
        price: "$279",
        text: "Our complete inside-and-out service for a vehicle that deserves the full treatment.",
        items: ["Full interior detail", "Hand wash & decontamination", "Paint protection finish"],
        popular: true
    },
    {
        name: "Exterior Revival",
        price: "$189",
        text: "Restore gloss and protection with a careful wash, surface decontamination, and premium finish.",
        items: ["Foam hand wash", "Wheels & tires", "Gloss protection"]
    }
];
const steps = [["01", "Reach out", "Call or send a quick request with your contact details and what your vehicle needs."], ["02", "We connect", "We’ll ask a few helpful questions and recommend the right service."], ["03", "Pick a time", "Choose an appointment and confirm where the vehicle will be parked."], ["04", "We come to you", "Our mobile setup arrives with the equipment, water, and power needed."], ["05", "Enjoy the result", "We walk you through the finished vehicle and leave your space tidy."]];
const faqs = [["Do you come to me?", "Yes—that’s the point of mobile detailing. Tell us where the vehicle is parked, whether that’s home or work, and we’ll bring the setup to you. No drop-off or waiting room required."], ["How long does a detail take?", "Most appointments take 3–5 hours. Vehicle size, condition, pet hair, and the selected service can affect timing. We’ll give you a realistic estimate before we confirm."], ["What areas do you serve?", "We serve Cape Cod and Southeast Massachusetts, including Bourne, Falmouth, Barnstable, Yarmouth, Plymouth, Wareham, Marion, New Bedford, Taunton, and Fall River. Not sure if you’re in range? Just ask."], ["How do I book?", "Call us directly or use the request form below. We’ll contact you, recommend a package, provide a quote, and schedule the visit."], ["Do you need access to water or power?", "No. Our mobile setup is self-contained, so we bring the water and power equipment. We only need safe access to the vehicle and enough room to work around it."]];
export default function Home() {
    const [sent, setSent] = useState(false);
    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const d = new FormData(e.currentTarget);
        const subject = encodeURIComponent("Mobile detailing request");
        const body = encodeURIComponent(`Name: ${d.get("name")}\nPhone: ${d.get("phone")}\nEmail: ${d.get("email")}\n\nVehicle / question:\n${d.get("message")}`);
        setSent(true);
        window.location.href = `mailto:hello@capecodmobiledetailing.com?subject=${subject}&body=${body}`
    };
    return <main>
        <header className="site-header"><a className="brand" href="#home"><span
            className="brand-mark">CS</span><span>CAPE <b>SHINE</b><small>MOBILE DETAILING</small></span></a>
            <nav><a href="#home">Home</a><a href="#services">Services</a><a href="#reviews">Reviews</a><a
                href="#gallery">Gallery</a><a href="#about">About</a></nav>
            <a className="nav-call" href="tel:+15082736150">Call now <span>→</span></a></header>
        <section className="hero" id="home">
            <div className="hero-copy"><p className="eyebrow"><span/>Cape Cod’s mobile detailing service</p><h1>A better
                detail.<br/><em>Right in your driveway.</em></h1><p className="hero-lede">Premium mobile auto detailing
                across Cape Cod and Southeast Massachusetts. We bring the water, power, tools, and attention to
                detail—so you don’t have to go anywhere.</p>
                <div className="hero-actions"><a className="button primary" href="tel:+15082736150">Call
                    508-273-6150</a><a className="button secondary" href="#contact">Request a detail <span>↘</span></a>
                </div>
                <div className="trust-row">
                    <span><b>✓</b> We come to you</span><span><b>✓</b> Fully self-contained</span><span><b>✓</b> Cape Cod local</span>
                </div>
            </div>
            <div className="hero-art">
                <div className="sun"/>
                <div className="car-line"><i/><i/></div>
                <div className="water-line one"/>
                <div className="water-line two"/>
                <div className="service-badge"><span>●</span>
                    <div><small>SERVICE AREA</small><b>Cape Cod +<br/>Southeast MA</b></div>
                </div>
            </div>
        </section>
        <section className="service-strip">
            <span>Mobile convenience</span><i>✦</i><span>Professional results</span><i>✦</i><span>Zero waiting rooms</span><i>✦</i><span>We bring everything</span>
        </section>
        <section className="section services" id="services"><Heading label="Packages" title={<>Choose your
            level<br/>of <em>clean.</em></>}
                                                                     text="Simple starting packages for every kind of vehicle. Final pricing is confirmed after we learn about your vehicle’s size and condition."/>
            <div className="service-grid">{services.map((s, i) => <article
                className={`service-card ${s.popular ? "popular" : ""}`} key={s.name}>{s.popular &&
                <div className="popular-label">Most popular</div>}<p className="card-number">0{i + 1}</p>
                <h3>{s.name}</h3><p>{s.text}</p>
                <ul>{s.items.map(x => <li key={x}><span>✓</span>{x}</li>)}</ul>
                <div className="price"><small>STARTING AT</small><b>{s.price}</b></div>
                <a href="#contact">Request this service <span>→</span></a></article>)}</div>
        </section>
        <section className="section process" id="about">
            <div className="process-intro"><p className="eyebrow light"><span/>How it works</p><h2>From request
                to<br/><em>freshly detailed.</em></h2><p>Easy to book, easy to plan, and no driving across town. We
                handle the details from the first call to the final walk-around.</p><a className="button pale"
                                                                                       href="#contact">Start your
                request</a></div>
            <div className="steps">{steps.map(([n, t, x]) => <article key={n}><b>{n}</b>
                <div><h3>{t}</h3><p>{x}</p></div>
            </article>)}</div>
        </section>
        <section className="section reviews" id="reviews"><Heading label="Client feedback"
                                                                   title={<>Clean cars.<br/><em>Happy drivers.</em></>}
                                                                   text="Sample review layout—replace these with verified feedback as your customer list grows."/>
            <div
                className="review-grid">{[["The convenience was unbeatable. They showed up on time and my SUV looked better than the day I bought it.", "Sarah M.", "Barnstable, MA"], ["Professional from the first message to the final walk-around. Every little area was spotless.", "James R.", "Plymouth, MA"], ["I worked from home while they handled everything in the driveway. Simple, friendly, and a fantastic result.", "Nicole T.", "Falmouth, MA"]].map(r =>
                <blockquote key={r[1]}>
                    <div>★★★★★</div>
                    <p>“{r[0]}”</p>
                    <footer><b>{r[1]}</b><span>{r[2]}</span></footer>
                </blockquote>)}</div>
        </section>
        <section className="section gallery" id="gallery">
            <div className="gallery-copy"><p className="eyebrow light"><span/>Real work only</p><h2>Your results
                will<br/><em>speak for themselves.</em></h2><p>We’ve intentionally left stock and AI imagery out. Add
                real before-and-after photos here when they’re ready, so customers see the quality they can actually
                expect.</p>
                <div className="gallery-tags"><span>Interior</span><span>Exterior</span><span>Full detail</span></div>
            </div>
            <div
                className="gallery-placeholders">{[["01", "Before / After"], ["02", "Interior Detail"], ["03", "Exterior Finish"]].map(x =>
                <div key={x[0]}><span>{x[0]}</span><b>{x[1]}</b><small>YOUR REAL PHOTO</small></div>)}</div>
        </section>
        <section className="section coverage">
            <div><p className="eyebrow"><span/>Service area</p><h2>Based on the Cape.<br/><em>Built to travel.</em></h2>
                <p>From Bourne to Yarmouth and across Southeast Massachusetts, our shop is wherever your vehicle is
                    parked.</p></div>
            <div
                className="towns">{["Bourne", "Falmouth", "Barnstable", "Yarmouth", "Plymouth", "Wareham", "New Bedford", "Fall River"].map(x =>
                <span key={x}>{x}</span>)}</div>
        </section>
        <section className="section faq">
            <div className="faq-title"><p className="eyebrow"><span/>FAQ</p><h2>Good questions.<br/><em>Straight
                answers.</em></h2><p>Still wondering about something?</p><a href="tel:+15082736150">Call 508-273-6150
                →</a></div>
            <div className="faq-list">{faqs.map(([q, a], i) => <details key={q} open={i === 0}>
                <summary>{q}<span>+</span></summary>
                <p>{a}</p></details>)}</div>
        </section>
        <section className="contact section" id="contact">
            <div className="contact-copy"><p className="eyebrow light"><span/>Let’s get started</p><h2>Your cleanest
                drive<br/>starts <em>right here.</em></h2><p>Tell us a little about your vehicle. We’ll get back to
                recommend a service, confirm pricing, and find the right appointment.</p><a href="tel:+15082736150">Prefer
                to talk? <b>508-273-6150</b> →</a></div>
            <form onSubmit={submit}>
                <div className="field-row"><label>Your name<input required name="name"
                                                                  placeholder="John Smith"/></label><label>Phone
                    number<input required name="phone" type="tel" placeholder="(508) 555-0123"/></label></div>
                <label>Email address<input required name="email" type="email"
                                           placeholder="john@example.com"/></label><label>Vehicle & what you
                need<textarea name="message" rows={4}
                              placeholder="Tell us your vehicle, condition, location, or questions..."/></label>
                <button>Send my request <span>→</span></button>
                {sent && <p className="form-note">Your email app should open with the request ready to send.</p>}</form>
        </section>
        <footer><a className="brand footer-brand" href="#home"><span
            className="brand-mark">CS</span><span>CAPE <b>SHINE</b><small>MOBILE DETAILING</small></span></a><p>Mobile
            auto detailing across Cape Cod & Southeast Massachusetts.</p>
            <div><a href="#services">Services</a><a href="#gallery">Gallery</a><a href="#about">About</a><a
                href="#contact">Contact</a></div>
            <small>© 2026 Cape Shine Mobile Detailing. Template content—update business details before launch.</small>
        </footer>
        <div className="mobile-actions" aria-label="Quick actions"><a href="tel:+15082736150"><b>Call
            now</b><small>508-273-6150</small></a><a href="#contact"><b>Request detail</b><small>Get a quote
            →</small></a></div>
    </main>
}

function Heading({label, title, text}: { label: string, title: React.ReactNode, text: string }) {
    return <div className="section-heading">
        <div><p className="eyebrow"><span/>{label}</p><h2>{title}</h2></div>
        <p>{text}</p></div>
}
