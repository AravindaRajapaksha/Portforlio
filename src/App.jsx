import { useEffect, useRef, useState } from "react";
import "./style.css";

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`;

const projects = [
  {
    title: "Hostel Registration System",
    desc: "A React-based hostel booking platform with approvals, payments, and QR-powered access tracking.",
    longDesc: "A full hostel registration workflow built with React and Vite, backed by Supabase. Students can submit booking requests, staff can handle academic and warden approvals, payments are tracked in the system, and QR generation plus QR scan history help support hostel access and confirmation flows with an ESP32-CAM scanner.",
    tags: ["React", "Supabase", "ESP32-CAM"],
    img: publicAsset("projects/hostel1.png?v=2"),
    images: [
      publicAsset("projects/hostel1.png?v=2"),
      publicAsset("projects/hostel2.png"),
      publicAsset("projects/hostel3.png"),
      publicAsset("projects/hostel4.png"),
    ],
    github: "https://github.com/AravindaRajapaksha/HostelRegistrationSystem",
    live: "https://hostel-registration-system.vercel.app",
  },
  {
    title: "RestoBite - Restaurant Ordering System",
    desc: "A Supabase-backed restaurant ordering app with customer auth, live checkout, and admin controls.",
    longDesc: "RestoBite is a React and Vite restaurant ordering platform powered by Supabase. It includes customer signup and login, Google authentication, password reset, menu browsing, cart and checkout flows, customer profile management with order history, and admin-facing tools for menu management plus live order and revenue tracking.",
    tags: ["React", "Supabase", "React Router"],
    img: publicAsset("projects/restaurant_home.png"),
    images: [
      publicAsset("projects/restaurant_home.png"),
      publicAsset("projects/restaurant_shop.png"),
      publicAsset("projects/restaurant_login.png"),
      publicAsset("projects/restaurant_admin_login.png"),
    ],
    github: "https://github.com/AravindaRajapaksha/RestaurantSystem",
    live: "https://restaurantsystem-one.vercel.app/shop",
  },
  {
    title: "NuraNova Solutions Website",
    desc: "A modern digital agency website with a bold hero section, service highlights, and a polished contact experience.",
    longDesc: "A group project created for NuraNova Solutions to present the brand through a clean multi-section website. The experience includes a strong landing page, service cards for software and creative offerings, dark-mode-friendly styling, and a contact section that makes it easy for visitors to reach out.",
    tags: ["React", "Responsive UI", "Web Design"],
    img: publicAsset("projects/nuranova2.png"),
    cardLayout: "collage",
    cardImages: [
      publicAsset("projects/nuranova2.png"),
      publicAsset("projects/nuranova3.png"),
      publicAsset("projects/nuranova4.png"),
      publicAsset("projects/nuranova1.png"),
    ],
    images: [
      publicAsset("projects/nuranova2.png"),
      publicAsset("projects/nuranova3.png"),
      publicAsset("projects/nuranova4.png"),
      publicAsset("projects/nuranova1.png"),
    ],
    github: "#",
    live: "https://nuranova.vercel.app/",
  },
  {
    title: "School Management System",
    desc: "A school operations dashboard focused on alerts, communication, and daily academic updates.",
    longDesc: "A school management platform designed to make academic administration and communication easier for schools, teachers, students, and parents. The interface highlights important notifications such as attendance alerts, parent meeting reminders, and exam timetable updates in a clean, modern dashboard experience.",
    tags: ["React", "Dashboard UI", "Education"],
    img: publicAsset("projects/school4.png"),
    images: [publicAsset("projects/school4.png")],
    github: "#",
    live: "#",
  },
  {
    title: "QR Code Generator",
    desc: "Python tool that generates customizable QR codes from any URL or text input.",
    longDesc: "A complete Python-based QR code generation utility. It allows users to input URLs, text, or contact information and generates a high-quality SVG or PNG image. The tool supports custom colors, sizes, and error correction levels.",
    tags: ["Python", "qrcode", "PIL"],
    img: publicAsset("projects/qr_generator.png"),
    images: [publicAsset("projects/qr_generator.png")],
    github: "https://github.com/AravindaRajapaksha/QR-Code-generator",
    live: "#",
  },
  {
    title: "Factory Machine Monitoring System",
    desc: "Real-time factory machine monitoring dashboard with live charts.",
    longDesc: "This group project is a real-time dashboard designed for factory supervisors. It monitors machine health, uptime, and output using sensors. Data is streamed via Firebase and visualized with interactive charts to help predict maintenance needs.",
    tags: ["Vue.js", "Firebase", "Chart.js"],
    img: publicAsset("projects/FactoryMachineMonitoringSystem.png"),
    images: [publicAsset("projects/FactoryMachineMonitoringSystem.png")],
    github: "https://github.com/Group-Project-Ousl/factory-machine-monitoring-system",
    live: "#",
  },
  {
    title: "Python Calculator",
    desc: "A sleek, functional calculator built with Python's Tkinter.",
    longDesc: "A simple yet powerful calculator application built using Python and the Tkinter library. It features a modern UI design inspired by Figma, supporting basic arithmetic operations with an emphasis on clean code and user experience.",
    tags: ["Python", "Tkinter", "UI/UX"],
    img: publicAsset("projects/Calculator.png"),
    images: [publicAsset("projects/Calculator.png")],
    github: "https://github.com/AravindaRajapaksha/Calculator",
    live: "#",
  },
  {
    title: "ElectroStore - E-commerce UI",
    desc: "A high-fidelity UI/UX design for an electronic components store.",
    longDesc: "ElectroStore is a modern, dark-themed e-commerce platform designed for electronic components. The design includes a full workflow from landing page to product catalog, featuring high-quality component imagery, advanced sidebar filters, and a sleek tech-focused aesthetic. Built with a focus on professional engineers and hobbyists.",
    tags: ["Figma", "UI/UX", "E-commerce"],
    img: publicAsset("projects/ElectroStore.png"),
    images: [publicAsset("projects/ElectroStore.png")],
    github: "#",
    live: "https://www.figma.com/design/SjYkCfRrejIai2wvLxwoFw/Untitled?node-id=0-1&p=f&t=AkWwdidIOEYvvFRX-0",
  },
];

const profileData = {
  name: "Shehan Aravinda",
  title_L1: "A developer who",
  title_L2: "Judges a book",
  title_L3_pre: "by its",
  title_L3_accent: "cover",
  subtitle: "Software Engineering Undergraduate | Backend & Web Developer",
  description: "Building clean web apps using Python, Django, and modern web technologies.",
  bio_title: "I’m a Software Engineer.",
  bio: "Software Engineering undergraduate at OUSL with a strong focus on web and backend development.",
  aboutName: "I'm Shehan Aravinda",
  // Use the image found in public folder
  imgSrc: publicAsset("Profile.png"),
};

const cvData = {
  href: publicAsset("Shehan%20Aravinda.pdf"),
  fileName: "Shehan Aravinda.pdf",
};

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Reveal({ children, direction = "bottom", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal reveal-${direction} ${isVisible ? "revealed" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function getEmbedUrl(url) {
  if (!url || url === "#") return null;
  if (url.includes("figma.com/") && !url.includes("figma.com/embed")) {
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  }
  return url;
}

function Card({ item, index, onView }) {
  const slideDir = index % 2 === 0 ? "left" : "right";
  const cardImages = item.cardImages && item.cardImages.length > 0
    ? item.cardImages
    : (item.img ? [item.img] : (item.images || []));
  const showCollage = item.cardLayout === "collage" && cardImages.length > 1;
  const hasMultipleImages = !showCollage && cardImages.length > 1;

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % cardImages.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, cardImages.length]);

  return (
    <Reveal direction={slideDir}>
      <article className="card">
        {showCollage && (
          <div className="cardImgWrap" onClick={() => onView(item, "preview")} style={{ cursor: "pointer" }}>
            <div className="cardCollage">
              {cardImages.slice(0, 4).map((imgSrc, imgIndex) => (
                <img
                  key={imgIndex}
                  src={imgSrc}
                  alt={`${item.title} preview ${imgIndex + 1}`}
                  className="cardImg collageImg"
                />
              ))}
            </div>
          </div>
        )}

        {!showCollage && cardImages.length > 0 && (
          <div className="cardImgWrap" onClick={() => onView(item, "preview")} style={{ cursor: "pointer" }}>
            <div
              className="cardSlider"
              style={{ transform: `translateX(-${currentImgIndex * 100}%)`, transition: "transform 0.5s ease" }}
            >
              {cardImages.map((imgSrc, imgIndex) => (
                <img
                  key={imgIndex}
                  src={imgSrc}
                  alt={`${item.title} image ${imgIndex + 1}`}
                  className="cardImg"
                />
              ))}
            </div>
          </div>
        )}

        <div className="cardTop">
          <div className="cardDot" />
          <h4 className="cardTitle">{item.title}</h4>
        </div>

        <p className="cardDesc">{item.desc}</p>

        <div className="cardTags">
          {item.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>

        <div className="cardActions">
          <button
            type="button"
            className="miniBtn"
            onClick={() => onView(item, "preview")}
          >
            Live Review
          </button>
          <button
            type="button"
            className="miniBtn ghostMini"
            onClick={() => onView(item, "details")}
          >
            Details
          </button>
        </div>
      </article>
    </Reveal>
  );
}

function GalleryCard({ item, onView }) {
  const primaryTag = item.category || (item.tags && item.tags[0]) || "Project";

  return (
    <article className="galleryCard">
      <div className="galleryCardTop">
        <span className="galleryPill">{primaryTag}</span>
      </div>

      <h4 className="galleryCardTitle">{item.title}</h4>

      <p className="galleryCardDesc">{item.desc}</p>

      <div className="galleryCardActions">
        <button
          type="button"
          className="galleryBtn galleryBtnView"
          onClick={() => onView(item, "preview")}
        >
          View
        </button>
        <button
          type="button"
          className="galleryBtn galleryBtnDetails"
          onClick={() => onView(item, "details")}
        >
          Details
        </button>
      </div>
    </article>
  );
}

function ProjectModal({ item, initialTab = "preview", onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [deviceWidth, setDeviceWidth] = useState("100%");
  const [iframeKey, setIframeKey] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

  if (!item) return null;

  const images = item.images && item.images.length > 0 ? item.images : (item.img ? [item.img] : []);
  const embedUrl = getEmbedUrl(item.live);

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal projectReviewModal" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} aria-label="Close project review">
          ✕
        </button>

        <div className="modalContent projectReviewContent">
          <div className="projectModalHeader">
            <div>
              <p className="cvEyebrow">In-Page Project Review</p>
              <h2 className="modalTitle">{item.title}</h2>
            </div>

            <div className="projectModalTabs">
              <button
                type="button"
                className={`projectTabBtn ${activeTab === "preview" ? "active" : ""}`}
                onClick={() => setActiveTab("preview")}
              >
                🖥️ Live Preview
              </button>
              <button
                type="button"
                className={`projectTabBtn ${activeTab === "details" ? "active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                📋 Details & Info
              </button>
            </div>
          </div>

          {activeTab === "preview" ? (
            <div className="inPageBrowserFrame">
              <div className="browserToolbar">
                <div className="browserDots" aria-hidden="true">
                  <span className="bDot red" />
                  <span className="bDot yellow" />
                  <span className="bDot green" />
                </div>

                <div className="browserAddressBar">
                  <span className="lockIcon">🔒</span>
                  <span className="addressText">
                    {embedUrl ? item.live : `${window.location.origin}${images[activeSlide] || ""}`}
                  </span>
                </div>

                {embedUrl && (
                  <div className="browserControls">
                    <button
                      type="button"
                      className={`deviceBtn ${deviceWidth === "100%" ? "active" : ""}`}
                      onClick={() => setDeviceWidth("100%")}
                      title="Desktop View"
                    >
                      Desktop
                    </button>
                    <button
                      type="button"
                      className={`deviceBtn ${deviceWidth === "768px" ? "active" : ""}`}
                      onClick={() => setDeviceWidth("768px")}
                      title="Tablet View"
                    >
                      Tablet
                    </button>
                    <button
                      type="button"
                      className={`deviceBtn ${deviceWidth === "390px" ? "active" : ""}`}
                      onClick={() => setDeviceWidth("390px")}
                      title="Mobile View"
                    >
                      Mobile
                    </button>
                    <button
                      type="button"
                      className="deviceBtn"
                      onClick={() => setIframeKey((k) => k + 1)}
                      title="Reload Preview"
                    >
                      ↻
                    </button>
                  </div>
                )}
              </div>

              <div className="browserViewport">
                {embedUrl ? (
                  <iframe
                    key={iframeKey}
                    src={embedUrl}
                    title={`${item.title} Live Preview`}
                    className="projectLiveIframe"
                    style={{ width: deviceWidth }}
                    allowFullScreen
                  />
                ) : (
                  <div className="inPageVisualViewer">
                    {images.length > 0 && (
                      <img
                        src={images[activeSlide]}
                        alt={`${item.title} preview`}
                        className="inPageVisualImg"
                      />
                    )}
                    {images.length > 1 && (
                      <div className="inPageSlideDots">
                        {images.map((_, idx) => (
                          <button
                            key={idx}
                            type="button"
                            className={`slideDot ${activeSlide === idx ? "active" : ""}`}
                            onClick={() => setActiveSlide(idx)}
                          />
                        ))}
                      </div>
                    )}
                    <div className="inPageOverlayBar">
                      <p className="inPageOverlayDesc">{item.longDesc || item.desc}</p>
                      <button
                        type="button"
                        className="btn ghost"
                        onClick={() => setActiveTab("details")}
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="projectDetailsPane">
              <div className="modalGallery">
                {images.map((imgSrc, i) => (
                  <img key={i} src={imgSrc} alt={item.title} className="modalImg" />
                ))}
              </div>

              <div className="modalTags">
                {item.tags.map((tag) => (
                  <span key={tag} className="tag" style={{ marginRight: "8px" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <p className="modalDesc">{item.longDesc || item.desc}</p>

              <div className="modalActions">
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => setActiveTab("preview")}
                >
                  Open Live Preview Here
                </button>
                {item.github && item.github !== "#" && (
                  <a className="btn ghost" href={item.github} target="_blank" rel="noreferrer">
                    GitHub Source
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CvModal({ cv, onClose }) {
  if (!cv) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal cvModal" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose} aria-label="Close CV preview">
          ✕
        </button>

        <div className="modalContent cvModalContent">
          <div className="cvModalHeader">
            <div>
              <p className="cvEyebrow">Resume Preview</p>
              <h2 className="modalTitle">My CV</h2>
            </div>

            <div className="modalActions cvModalActions">
              <a className="btn primary" href={cv.href} download={cv.fileName}>
                Download CV
              </a>
              <button type="button" className="btn ghost" onClick={onClose}>
                Close
              </button>
            </div>
          </div>

          <div className="cvViewerWrap">
            <iframe
              className="cvViewer"
              src={cv.href}
              title={`${profileData.name} CV`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const contactIcons = {
  email: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.09-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.89 2.42 1.02 2.59.13.17 1.76 2.69 4.26 3.77.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3Z" />
    </svg>
  ),
};

function DirectContactCard({ icon, label, value, href, accentClass = "", delay = 0 }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Reveal direction="bottom" delay={delay}>
      <div className={`directContactCard ${accentClass}`}>
        <a className="directContactMain" href={href}>
          <div className="directContactIcon">{icon}</div>
          <div className="directContactText">
            <span className="contactCardLabel">{label}</span>
            <span className="contactCardValue">{value}</span>
          </div>
        </a>
        <button
          type="button"
          className={`copyPillBtn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
    </Reveal>
  );
}

function SocialCard({ icon, label, handle, href, brandClass = "", delay = 0 }) {
  return (
    <Reveal direction="bottom" delay={delay}>
      <a
        className={`socialBentoCard ${brandClass}`}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        <div className="socialBentoTop">
          <div className="socialBentoIcon">{icon}</div>
          <span className="socialBentoArrow" aria-hidden="true">↗</span>
        </div>
        <div className="socialBentoMeta">
          <span className="socialBentoLabel">{label}</span>
          <span className="socialBentoHandle">{handle}</span>
        </div>
      </a>
    </Reveal>
  );
}

export default function App() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectModalTab, setProjectModalTab] = useState("preview");
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [formSent, setFormSent] = useState(false);
  const canvasRef = useRef(null);

  const openProjectModal = (item, tab = "preview") => {
    setProjectModalTab(tab);
    setSelectedProject(item);
  };

  const handleWhatsAppSubmit = (e) => {
    if (e) e.preventDefault();
    const name = formState.name.trim();
    const email = formState.email.trim();
    const subject = formState.subject.trim();
    const message = formState.message.trim();

    if (!name || !message) {
      alert("Please enter your Name and Message.");
      return;
    }

    let text = `Hello Shehan! 👋\n\n`;
    text += `*Name:* ${name}\n`;
    if (email) text += `*Email:* ${email}\n`;
    if (subject) text += `*Subject:* ${subject}\n`;
    text += `\n*Message:*\n${message}`;

    const phone = "94778052582";
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setFormSent("whatsapp");
    setTimeout(() => setFormSent(false), 4000);
  };

  const handleEmailSubmit = (e) => {
    if (e) e.preventDefault();
    const name = formState.name.trim();
    const email = formState.email.trim();
    const subject = formState.subject.trim() || `Portfolio Inquiry from ${name || "Visitor"}`;
    const message = formState.message.trim();

    if (!name || !message) {
      alert("Please enter your Name and Message.");
      return;
    }

    const body = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`;
    window.location.href = `mailto:www.aravindadocumant@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSent("email");
    setTimeout(() => setFormSent(false), 4000);
  };

  const openCvModal = () => {
    setMobileOpen(false);
    setIsCvOpen(true);
  };

  const closeCvModal = () => {
    setIsCvOpen(false);
  };

  // Smooth scroll to section on load if hash exists
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Small delay to let animations settle
    }
  }, []);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Responsive star count
    const starCount = Math.min(Math.floor((w * h) / 10000), 125);
    const stars = Array.from({ length: starCount }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.5,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      baseAlpha: Math.random() * 0.45 + 0.35,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.015,
      isDiamond: Math.random() > 0.72,
    }));

    // Shooting stars (Meteors)
    const meteors = [];
    let lastMeteor = Date.now();
    const mouse = { x: -1000, y: -1000 };

    const spawnMeteor = () => {
      const startX = Math.random() * (w * 0.8) + w * 0.1;
      const startY = Math.random() * (h * 0.35);
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.2; // ~45 deg downward
      const speed = Math.random() * 9 + 11;
      const length = Math.random() * 100 + 70;
      meteors.push({
        x: startX,
        y: startY,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        length,
        life: 1.0,
        decay: Math.random() * 0.018 + 0.016,
      });
    };

    const drawStarSparkle = (cx, cy, radius, alpha) => {
      const inner = radius * 0.25;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy - radius);
      ctx.quadraticCurveTo(cx, cy, cx + inner, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy + radius);
      ctx.quadraticCurveTo(cx, cy, cx - inner, cy);
      ctx.quadraticCurveTo(cx, cy, cx, cy - radius);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.shadowColor = "#c084fc";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.restore();
    };

    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const now = Date.now();
      // Periodically spawn meteors when idle
      if (now - lastMeteor > 4000 && Math.random() < 0.03) {
        spawnMeteor();
        lastMeteor = now;
      }

      // 1. Draw Meteors / Shooting stars
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > w + 100 || m.y > h + 100) {
          meteors.splice(i, 1);
          continue;
        }

        const norm = Math.hypot(m.dx, m.dy) || 1;
        const tailX = m.x - (m.dx / norm) * m.length;
        const tailY = m.y - (m.dy / norm) * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, "rgba(180, 124, 255, 0)");
        grad.addColorStop(0.65, `rgba(192, 132, 252, ${m.life * 0.55})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.life * 0.95})`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${m.life})`;
        ctx.shadowColor = "#d8b4fe";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      // 2. Draw Constellation Connection Lines between close stars
      const maxDist = 95;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(180, 124, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Faint mouse interaction thread if close to mouse
        if (mouse.x > 0 && mouse.y > 0) {
          const mdx = stars[i].x - mouse.x;
          const mdy = stars[i].y - mouse.y;
          const mdist = Math.hypot(mdx, mdy);
          if (mdist < 130) {
            const mAlpha = (1 - mdist / 130) * 0.22;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(192, 132, 252, ${mAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // 3. Update & Draw Stars with Twinkle Animation
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        s.phase += s.pulseSpeed;

        if (s.x < -15) s.x = w + 15;
        if (s.x > w + 15) s.x = -15;
        if (s.y < -15) s.y = h + 15;
        if (s.y > h + 15) s.y = -15;

        // Twinkle effect (alpha breathing)
        const alpha = Math.max(0.12, Math.min(1, s.baseAlpha + Math.sin(s.phase) * 0.35));

        if (s.isDiamond && s.r > 1.1) {
          drawStarSparkle(s.x, s.y, s.r * 2.4, alpha);
        } else {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      if (window.innerWidth > 860) setMobileOpen(false);
    };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!selectedProject && !isCvOpen) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
        setIsCvOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject, isCvOpen]);

  return (
    <div className="page" id="home">
      <canvas ref={canvasRef} className="stars" aria-hidden="true" />

      <div className="bg" aria-hidden="true">
        <div className="noise" />
      </div>

      <header className="nav">
        <div className="navInner">
          <a className="brand" href="#home" aria-label="home">
            <div className="brandDot" />
            <span className="brandName">Aravinda</span>
          </a>

          <nav className="navLinks">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className="navRight">
            <a
              className="iconPill navGithub"
              href="https://github.com/AravindaRajapaksha"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </a>
            <a
              className="iconPill navLinkedin"
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
              </svg>
            </a>
            <a
              className="iconPill navFacebook"
              href="https://www.facebook.com/share/1CckL2VFcS/"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
              </svg>
            </a>
            <a
              className="iconPill navInstagram"
              href="https://www.instagram.com/aravinda_rajapaksha_?igsh=MXBxNHp0ZGZ3aGdieg=="
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <button
              className="menuBtn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>
          </div>
        </div>

        <div className={`mobileMenu ${mobileOpen ? "open" : ""}`}>
          <a href="#home" onClick={() => setMobileOpen(false)}>
            🏠 Home
          </a>
          <a href="#about" onClick={() => setMobileOpen(false)}>
            👤 About
          </a>
          <a href="#projects" onClick={() => setMobileOpen(false)}>
            🚀 Projects
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            ✉️ Contact
          </a>
          <div className="mobileSocialRow">
            <a
              className="iconPill navGithub"
              href="https://github.com/AravindaRajapaksha"
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              aria-label="GitHub"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </a>
            <a
              className="iconPill navLinkedin"
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
              </svg>
            </a>
            <a
              className="iconPill navFacebook"
              href="https://www.facebook.com/share/1CckL2VFcS/"
              target="_blank"
              rel="noreferrer"
              title="Facebook"
              aria-label="Facebook"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z" />
              </svg>
            </a>
            <a
              className="iconPill navInstagram"
              href="https://www.instagram.com/aravinda_rajapaksha_?igsh=MXBxNHp0ZGZ3aGdieg=="
              target="_blank"
              rel="noreferrer"
              title="Instagram"
              aria-label="Instagram"
              onClick={() => setMobileOpen(false)}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <div className="heroHeader">
            <Reveal direction="left">
              <div className="heroHeaderText">
                <p className="tiny">
                  Hello! I am <span className="accent">{profileData.name}</span>
                </p>

                <h1 className="title">
                  {profileData.title_L1} <br />
                  {profileData.title_L2} <br />
                  {profileData.title_L3_pre} <span className="accent underline">{profileData.title_L3_accent}</span>...
                </h1>

                <p className="sub">
                  {profileData.subtitle} <br />
                  {profileData.description}
                </p>

                <p className="muted heroBio">
                  Software Engineering undergraduate at OUSL. Building clean web apps and backend systems using Python, Java, Django, and modern web frameworks — paired with Adobe Creative Suite and AI video prompting skills.
                </p>

                <div className="btnRow">
                  <a className="btn primary" href={cvData.href} download={cvData.fileName}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "7px" }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download CV
                  </a>
                  <button type="button" className="btn ghost" onClick={openCvModal}>
                    Preview CV
                  </button>
                  <a className="btn ghost" href="#projects">
                    See Work
                  </a>
                  <a className="btn ghost" href="#contact">
                    Contact
                  </a>
                </div>

                <div className="chips">
                  <Pill>Python</Pill>
                  <Pill>Java</Pill>
                  <Pill>Django</Pill>
                  <Pill>React</Pill>
                  <Pill>JavaScript</Pill>
                  <Pill>SQL</Pill>
                  <Pill>Adobe Photoshop</Pill>
                  <Pill>Adobe Premiere Pro</Pill>
                  <Pill>Adobe Illustrator</Pill>
                  <Pill>AI Video Creation</Pill>
                  <Pill>Figma</Pill>
                  <Pill>Git</Pill>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div className="avatarWrap">
                <div className="avatar">
                  <img
                    src={profileData.imgSrc}
                    alt={profileData.name}
                    className="avatarImg"
                  />
                </div>
                <div className="avatarBadges">
                  <div className="heroBadge">🎓 OUSL Software Engineer</div>
                  <div className="heroBadge">🎨 Adobe Suite & AI Video</div>
                  <div className="heroBadge liveStatus"><span className="statusDot" />Open to Internship</div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section aboutSection" id="about">
          <Reveal direction="bottom">
            <div className="aboutContainer">
              <div className="aboutMainCol">
                <span className="aboutEyebrow">Who I Am</span>
                <h2 className="aboutTitle">{profileData.aboutName}</h2>
                <p className="aboutBio">
                  Software Engineering undergraduate at OUSL with a strong focus on web and backend development. Passionate about building clean, efficient web applications using Python, modern frontend frameworks, and scalable cloud databases.
                </p>

                <div className="aboutHighlights">
                  <div className="aboutHighlightItem">
                    <span className="highlightIcon">🎓</span>
                    <div>
                      <strong>Degree</strong>
                      <span>Bachelor of Software Engineering (UG) • OUSL</span>
                    </div>
                  </div>
                  <div className="aboutHighlightItem">
                    <span className="highlightIcon">📍</span>
                    <div>
                      <strong>Location</strong>
                      <span>Sri Lanka</span>
                    </div>
                  </div>
                  <div className="aboutHighlightItem">
                    <span className="highlightIcon">💼</span>
                    <div>
                      <strong>Status</strong>
                      <span>Available for Internship & Training</span>
                    </div>
                  </div>
                </div>

                <div className="btnRow" style={{ marginTop: "1.6rem" }}>
                  <a className="btn primary" href={cvData.href} download={cvData.fileName}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: "7px" }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download CV
                  </a>
                  <button type="button" className="btn ghost" onClick={openCvModal}>
                    Preview CV
                  </button>
                </div>
              </div>

              <div className="aboutSkillsCol">
                <span className="aboutEyebrow">My Toolkit & Capabilities</span>
                <h3 className="aboutSkillsHeading">Technologies & Creative Skills</h3>
                <p className="aboutSkillsSub">
                  Proficient in software engineering, backend architectures, creative design suites, and AI content prompting:
                </p>

                <div className="aboutSkillCategory">
                  <div className="aboutSkillCategoryTitle">
                    <span>💻</span> Software & Backend Engineering
                  </div>
                  <div className="aboutSkillsGrid">
                    <span className="aboutSkillTag"><span className="skillDot" />Java</span>
                    <span className="aboutSkillTag"><span className="skillDot" />Python</span>
                    <span className="aboutSkillTag"><span className="skillDot" />Django</span>
                    <span className="aboutSkillTag"><span className="skillDot" />React</span>
                    <span className="aboutSkillTag"><span className="skillDot" />JavaScript</span>
                    <span className="aboutSkillTag"><span className="skillDot" />SQL</span>
                    <span className="aboutSkillTag"><span className="skillDot" />HTML5 / CSS3</span>
                    <span className="aboutSkillTag"><span className="skillDot" />Git & GitHub</span>
                    <span className="aboutSkillTag"><span className="skillDot" />Postman</span>
                    <span className="aboutSkillTag"><span className="skillDot" />Android Studio</span>
                  </div>
                </div>

                <div className="aboutSkillCategory">
                  <div className="aboutSkillCategoryTitle">
                    <span>🎨</span> Creative Design & Multimedia
                  </div>
                  <div className="aboutSkillsGrid">
                    <span className="aboutSkillTag creativeTag"><span className="skillDot creative" />Adobe Photoshop</span>
                    <span className="aboutSkillTag creativeTag"><span className="skillDot creative" />Adobe Premiere Pro</span>
                    <span className="aboutSkillTag creativeTag"><span className="skillDot creative" />Adobe Illustrator</span>
                    <span className="aboutSkillTag creativeTag"><span className="skillDot creative" />Figma UI/UX</span>
                  </div>
                </div>

                <div className="aboutSkillCategory">
                  <div className="aboutSkillCategoryTitle">
                    <span>⚡</span> AI Video & Creative Prompting
                  </div>
                  <div className="aboutSkillsGrid">
                    <span className="aboutSkillTag aiTag"><span className="skillDot ai" />AI Video Creation</span>
                    <span className="aboutSkillTag aiTag"><span className="skillDot ai" />Prompt Engineering</span>
                    <span className="aboutSkillTag aiTag"><span className="skillDot ai" />Generative AI Media</span>
                    <span className="aboutSkillTag aiTag"><span className="skillDot ai" />AI-Assisted Development</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        <section className="section projectGallerySection" id="project-gallery">
          <Reveal direction="bottom">
            <h3 className="sectionTitle gallerySectionTitle">Project Gallery</h3>
          </Reveal>
          <div className="projectMarquee">
            <div className="projectMarqueeTrack">
              {[0, 1].map((groupIndex) => (
                <div
                  className="projectMarqueeGroup"
                  key={groupIndex}
                  aria-hidden={groupIndex === 1 ? "true" : undefined}
                >
                  {[...projects, ...projects].map((p, i) => (
                    <GalleryCard
                      key={`${groupIndex}-${p.title}-${i}`}
                      item={p}
                      onView={openProjectModal}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="projects">
          <Reveal direction="bottom">
            <h3 className="sectionTitle">Projects</h3>
          </Reveal>
          <div className="grid">
            {projects.map((p, i) => (
              <Card key={p.title} item={p} index={i} onView={openProjectModal} />
            ))}
          </div>
        </section>

        {selectedProject && (
          <ProjectModal
            item={selectedProject}
            initialTab={projectModalTab}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {isCvOpen && (
          <CvModal cv={cvData} onClose={closeCvModal} />
        )}

        <section className="section contactSection" id="contact">
          <Reveal direction="bottom">
            <div className="contactHeader">
              <div className="contactStatusBadge">
                <span className="statusPulse" />
                <span>Available for Internship & Freelance Opportunities</span>
              </div>
              <h3 className="contactMainTitle">Let’s Work Together</h3>
              <p className="contactSub">
                Have a project idea, internship opportunity, or just want to say hi?
                Reach out directly or drop a message below.
              </p>
            </div>
          </Reveal>

          <div className="contactShowcase">
            {/* LEFT COLUMN: PROFILE + DIRECT + SOCIALS */}
            <div className="contactInfoCol">
              <Reveal direction="bottom" delay={60}>
                <div className="contactProfileCard">
                  <div className="contactAvatarWrap">
                    <img
                      src={profileData.imgSrc}
                      alt={profileData.name}
                      className="contactAvatarImg"
                    />
                    <span className="contactAvatarStatus" title="Available for work" />
                  </div>
                  <div className="contactProfileMeta">
                    <h4 className="contactProfileName">{profileData.name}</h4>
                    <p className="contactProfileRole">Software Engineering Undergraduate</p>
                    <span className="contactProfileLoc">📍 Sri Lanka • Open to Internship</span>
                  </div>
                  <div className="contactCvBtnGroup">
                    <a
                      className="contactCvMiniBtn"
                      href={cvData.href}
                      download={cvData.fileName}
                      title="Download CV"
                    >
                      Download CV
                    </a>
                    <button
                      type="button"
                      className="contactCvMiniBtn ghost"
                      onClick={openCvModal}
                      title="Preview CV"
                    >
                      Preview
                    </button>
                  </div>
                </div>
              </Reveal>

              <div className="directContactStack">
                <DirectContactCard
                  icon={contactIcons.email}
                  label="Email Address"
                  value="www.aravindadocumant@gmail.com"
                  href="mailto:www.aravindadocumant@gmail.com"
                  accentClass="accentPurple"
                  delay={100}
                />
                <DirectContactCard
                  icon={contactIcons.phone}
                  label="Phone / WhatsApp"
                  value="0778052582"
                  href="tel:0778052582"
                  accentClass="accentCyan"
                  delay={150}
                />
              </div>

              <div className="socialBentoGrid">
                <SocialCard
                  icon={contactIcons.github}
                  label="GitHub"
                  handle="@AravindaRajapaksha"
                  href="https://github.com/AravindaRajapaksha"
                  brandClass="brandGithub"
                  delay={200}
                />
                <SocialCard
                  icon={contactIcons.linkedin}
                  label="LinkedIn"
                  handle="in/aravinda"
                  href="https://linkedin.com/"
                  brandClass="brandLinkedin"
                  delay={250}
                />
                <SocialCard
                  icon={contactIcons.facebook}
                  label="Facebook"
                  handle="Aravinda Rajapaksha"
                  href="https://www.facebook.com/share/1CckL2VFcS/"
                  brandClass="brandFacebook"
                  delay={300}
                />
                <SocialCard
                  icon={contactIcons.instagram}
                  label="Instagram"
                  handle="@aravinda_rajapaksha_"
                  href="https://www.instagram.com/aravinda_rajapaksha_?igsh=MXBxNHp0ZGZ3aGdieg=="
                  brandClass="brandInstagram"
                  delay={350}
                />
              </div>
            </div>

            {/* RIGHT COLUMN: INTERACTIVE MESSAGE CARD */}
            <Reveal direction="bottom" delay={200}>
              <form className="contactFormCard" onSubmit={handleWhatsAppSubmit}>
                <div className="contactFormTop">
                  <h4 className="contactFormTitle">Send a Message</h4>
                  <p className="contactFormHint">
                    Sends directly to my WhatsApp or Email.
                  </p>
                </div>

                <div className="contactFormRow">
                  <div className="inputGroup">
                    <label htmlFor="contact-name">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    />
                  </div>
                  <div className="inputGroup">
                    <label htmlFor="contact-email">Your Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="inputGroup">
                  <label htmlFor="contact-subject">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Internship Opportunity / Project Inquiry"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  />
                </div>

                <div className="inputGroup">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    rows="4"
                    placeholder="Tell me about your project or opportunity..."
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  />
                </div>

                <div className="contactFormActions">
                  <button type="submit" className="contactSubmitBtn whatsappSubmitBtn">
                    {contactIcons.whatsapp}
                    <span>{formSent === "whatsapp" ? "Opening WhatsApp... ✓" : "Send on WhatsApp"}</span>
                  </button>
                  <button
                    type="button"
                    className="contactSecondaryBtn"
                    onClick={handleEmailSubmit}
                  >
                    {contactIcons.email}
                    <span>{formSent === "email" ? "Opening Mail... ✓" : "Send via Email"}</span>
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </section>

        <footer className="foot">Built with React • Hosted on GitHub Pages</footer>
      </main>
    </div>
  );
}
