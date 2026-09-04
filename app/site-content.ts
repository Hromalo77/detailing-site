export type Service = {
  name: string;
  price: string;
  text: string;
  items: string[];
  popular?: boolean;
};

export type Step = {
  number: string;
  title: string;
  text: string;
};

export type Review = {
  quote: string;
  name: string;
  location: string;
};

export type GalleryItem = {
  number: string;
  title: string;
  label: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type SiteContent = {
  brand: {
    mark: string;
    name: string;
    highlight: string;
    subline: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
  };
  nav: string[];
  hero: {
    eyebrow: string;
    title: string;
    emphasis: string;
    lede: string;
    primaryCta: string;
    secondaryCta: string;
    trust: string[];
    badgeLabel: string;
    badgeText: string;
  };
  strip: string[];
  servicesSection: {
    label: string;
    title: string;
    emphasis: string;
    text: string;
  };
  services: Service[];
  process: {
    label: string;
    title: string;
    emphasis: string;
    text: string;
    cta: string;
    steps: Step[];
  };
  reviewsSection: {
    label: string;
    title: string;
    emphasis: string;
    text: string;
  };
  reviews: Review[];
  gallery: {
    label: string;
    title: string;
    emphasis: string;
    text: string;
    tags: string[];
    items: GalleryItem[];
  };
  coverage: {
    label: string;
    title: string;
    emphasis: string;
    text: string;
    towns: string[];
  };
  faq: {
    label: string;
    title: string;
    emphasis: string;
    text: string;
    cta: string;
    items: Faq[];
  };
  contactSection: {
    label: string;
    title: string;
    emphasis: string;
    text: string;
    phoneCta: string;
    submitLabel: string;
    sentMessage: string;
  };
  footer: {
    text: string;
    copyright: string;
  };
};

export const defaultSiteContent: SiteContent = {
  brand: {
    mark: "CS",
    name: "CAPE",
    highlight: "SHINE",
    subline: "MOBILE DETAILING",
  },
  contact: {
    phone: "+15082736150",
    phoneDisplay: "508-273-6150",
    email: "hello@capecodmobiledetailing.com",
  },
  nav: ["Home", "Services", "Reviews", "Gallery", "About"],
  hero: {
    eyebrow: "Cape Cod's mobile detailing service",
    title: "A better detail.",
    emphasis: "Right in your driveway.",
    lede: "Premium mobile auto detailing across Cape Cod and Southeast Massachusetts. We bring the water, power, tools, and attention to detail so you don't have to go anywhere.",
    primaryCta: "Call 508-273-6150",
    secondaryCta: "Request a detail",
    trust: ["We come to you", "Fully self-contained", "Cape Cod local"],
    badgeLabel: "SERVICE AREA",
    badgeText: "Cape Cod +\nSoutheast MA",
  },
  strip: [
    "Mobile convenience",
    "Professional results",
    "Zero waiting rooms",
    "We bring everything",
  ],
  servicesSection: {
    label: "Packages",
    title: "Choose your level",
    emphasis: "of clean.",
    text: "Simple starting packages for every kind of vehicle. Final pricing is confirmed after we learn about your vehicle's size and condition.",
  },
  services: [
    {
      name: "Interior Refresh",
      price: "$149",
      text: "A focused reset for daily drivers with vacuuming, wipe-down, glass, mats, and careful finishing touches.",
      items: ["Deep vacuum", "Interior surfaces", "Windows & mats"],
    },
    {
      name: "Complete Detail",
      price: "$279",
      text: "Our complete inside-and-out service for a vehicle that deserves the full treatment.",
      items: [
        "Full interior detail",
        "Hand wash & decontamination",
        "Paint protection finish",
      ],
      popular: true,
    },
    {
      name: "Exterior Revival",
      price: "$189",
      text: "Restore gloss and protection with a careful wash, surface decontamination, and premium finish.",
      items: ["Foam hand wash", "Wheels & tires", "Gloss protection"],
    },
  ],
  process: {
    label: "How it works",
    title: "From request to",
    emphasis: "freshly detailed.",
    text: "Easy to book, easy to plan, and no driving across town. We handle the details from the first call to the final walk-around.",
    cta: "Start your request",
    steps: [
      {
        number: "01",
        title: "Reach out",
        text: "Call or send a quick request with your contact details and what your vehicle needs.",
      },
      {
        number: "02",
        title: "We connect",
        text: "We'll ask a few helpful questions and recommend the right service.",
      },
      {
        number: "03",
        title: "Pick a time",
        text: "Choose an appointment and confirm where the vehicle will be parked.",
      },
      {
        number: "04",
        title: "We come to you",
        text: "Our mobile setup arrives with the equipment, water, and power needed.",
      },
      {
        number: "05",
        title: "Enjoy the result",
        text: "We walk you through the finished vehicle and leave your space tidy.",
      },
    ],
  },
  reviewsSection: {
    label: "Client feedback",
    title: "Clean cars.",
    emphasis: "Happy drivers.",
    text: "Sample review layout. Replace these with verified feedback as your customer list grows.",
  },
  reviews: [
    {
      quote:
        "The convenience was unbeatable. They showed up on time and my SUV looked better than the day I bought it.",
      name: "Sarah M.",
      location: "Barnstable, MA",
    },
    {
      quote:
        "Professional from the first message to the final walk-around. Every little area was spotless.",
      name: "James R.",
      location: "Plymouth, MA",
    },
    {
      quote:
        "I worked from home while they handled everything in the driveway. Simple, friendly, and a fantastic result.",
      name: "Nicole T.",
      location: "Falmouth, MA",
    },
  ],
  gallery: {
    label: "Real work only",
    title: "Your results will",
    emphasis: "speak for themselves.",
    text: "We've intentionally left stock and AI imagery out. Add real before-and-after photos here when they're ready, so customers see the quality they can actually expect.",
    tags: ["Interior", "Exterior", "Full detail"],
    items: [
      { number: "01", title: "Before / After", label: "YOUR REAL PHOTO" },
      { number: "02", title: "Interior Detail", label: "YOUR REAL PHOTO" },
      { number: "03", title: "Exterior Finish", label: "YOUR REAL PHOTO" },
    ],
  },
  coverage: {
    label: "Service area",
    title: "Based on the Cape.",
    emphasis: "Built to travel.",
    text: "From Bourne to Yarmouth and across Southeast Massachusetts, our shop is wherever your vehicle is parked.",
    towns: [
      "Bourne",
      "Falmouth",
      "Barnstable",
      "Yarmouth",
      "Plymouth",
      "Wareham",
      "New Bedford",
      "Fall River",
    ],
  },
  faq: {
    label: "FAQ",
    title: "Good questions.",
    emphasis: "Straight answers.",
    text: "Still wondering about something?",
    cta: "Call 508-273-6150",
    items: [
      {
        question: "Do you come to me?",
        answer:
          "Yes, that's the point of mobile detailing. Tell us where the vehicle is parked, whether that's home or work, and we'll bring the setup to you. No drop-off or waiting room required.",
      },
      {
        question: "How long does a detail take?",
        answer:
          "Most appointments take 3-5 hours. Vehicle size, condition, pet hair, and the selected service can affect timing. We'll give you a realistic estimate before we confirm.",
      },
      {
        question: "What areas do you serve?",
        answer:
          "We serve Cape Cod and Southeast Massachusetts, including Bourne, Falmouth, Barnstable, Yarmouth, Plymouth, Wareham, Marion, New Bedford, Taunton, and Fall River. Not sure if you're in range? Just ask.",
      },
      {
        question: "How do I book?",
        answer:
          "Call us directly or use the request form below. We'll contact you, recommend a package, provide a quote, and schedule the visit.",
      },
      {
        question: "Do you need access to water or power?",
        answer:
          "No. Our mobile setup is self-contained, so we bring the water and power equipment. We only need safe access to the vehicle and enough room to work around it.",
      },
    ],
  },
  contactSection: {
    label: "Let's get started",
    title: "Your cleanest drive starts",
    emphasis: "right here.",
    text: "Tell us a little about your vehicle. We'll get back to recommend a service, confirm pricing, and find the right appointment.",
    phoneCta: "Prefer to talk?",
    submitLabel: "Send my request",
    sentMessage: "Your email app should open with the request ready to send.",
  },
  footer: {
    text: "Mobile auto detailing across Cape Cod & Southeast Massachusetts.",
    copyright:
      "(c) 2026 Cape Shine Mobile Detailing. Template content - update business details before launch.",
  },
};
