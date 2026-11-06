import { useEffect, useRef, useState } from "react";
import "./style.css";

const projects = [


  {
    title: "QR Code Generator",
    desc: "Python tool that generates customizable QR codes from any URL or text input.",
    longDesc: "A complete Python-based QR code generation utility. It allows users to input URLs, text, or contact information and generates a high-quality SVG or PNG image. The tool supports custom colors, sizes, and error correction levels.",
    tags: ["Python", "qrcode", "PIL"],
    img: "/projects/qr_generator.png",
    images: ["/projects/qr_generator.png"], // Add more image paths here as you upload them
    github: "https://github.com/AravindaRajapaksha/QR-Code-generator",
    live: "#",
  },
  {
    title: "Factory Machine Monitoring System",
    desc: "Real-time factory machine monitoring dashboard with live charts.",
    longDesc: "This group project is a real-time dashboard designed for factory supervisors. It monitors machine health, uptime, and output using sensors. Data is streamed via Firebase and visualized with interactive charts to help predict maintenance needs.",
    tags: ["Vue.js", "Firebase", "Chart.js"],
    img: "/projects/FactoryMachineMonitoringSystem.png",
    images: ["/projects/FactoryMachineMonitoringSystem.png"], // Add more image paths here as you upload them
    github: "https://github.com/Group-Project-Ousl/factory-machine-monitoring-system",
    live: "#",
  },
  {
    title: "Python Calculator",
    desc: "A sleek, functional calculator built with Python's Tkinter.",
    longDesc: "A simple yet powerful calculator application built using Python and the Tkinter library. It features a modern UI design inspired by Figma, supporting basic arithmetic operations with an emphasis on clean code and user experience.",
    tags: ["Python", "Tkinter", "UI/UX"],
    img: "/projects/Calculator.png",
    images: ["/projects/Calculator.png"],
    github: "https://github.com/AravindaRajapaksha/Calculator",
    live: "#",
  },
  {
    title: "ElectroStore - E-commerce UI",
    desc: "A high-fidelity UI/UX design for an electronic components store.",
    longDesc: "ElectroStore is a modern, dark-themed e-commerce platform designed for electronic components. The design includes a full workflow from landing page to product catalog, featuring high-quality component imagery, advanced sidebar filters, and a sleek tech-focused aesthetic. Built with a focus on professional engineers and hobbyists.",
    tags: ["Figma", "UI/UX", "E-commerce"],
    img: "/projects/ElectroStore.png",
    images: ["/projects/ElectroStore.png"],
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
  bio: "Software Engineering undergraduate at OUSL. I’m seeking an internship/training opportunity to apply and grow my skills in web/backend development.",
  aboutName: "I'm Shehan Aravinda",
  // Use the image found in public folder
  imgSrc: "/Profile.png",
};

const cvData = {
  href: "/Shehan%20Aravinda.pdf",
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
  const hasMultipleImages = item.images && item.images.length > 0;
  const images = hasMultipleImages ? item.images : (item.img ? [item.img] : []);

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      setCurrentImgIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <Reveal direction={slideDir}>
      <article className="card">
        {images.length > 0 && (
          <div className="cardImgWrap" onClick={() => onView(item, "preview")} style={{ cursor: "pointer" }}>
            <div
              className="cardSlider"
              style={{ transform: `translateX(-${currentImgIndex * 100}%)`, transition: "transform 0.5s ease" }}
            >
              {images.map((imgSrc, imgIndex) => (
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

import CursorFollower from "./CursorFollower";

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

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(formState.subject || `Portfolio Inquiry from ${formState.name}`);
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`
    );
    window.location.href = `mailto:www.aravindadocumant@gmail.com?subject=${subject}&body=${body}`;
    setFormSent(true);
    setTimeout(() => setFormSent(false), 3500);
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

    const stars = Array.from({ length: 120 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      a: Math.random() * 0.6 + 0.22,
    }));

    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;

        if (s.x < -20) s.x = w + 20;
        if (s.x > w + 20) s.x = -20;
        if (s.y < -20) s.y = h + 20;
        if (s.y > h + 20) s.y = -20;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.a})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      if (window.innerWidth > 860) setMobileOpen(false);
    };

    const onMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
      document.documentElement.style.setProperty("--mouse-x", x);
      document.documentElement.style.setProperty("--mouse-y", y);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
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
      <CursorFollower />
      <canvas ref={canvasRef} className="stars" aria-hidden="true" />

      <div className="bg" aria-hidden="true">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="glow g3" />
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
            <button type="button" className="navLinkBtn" onClick={openCvModal}>
              My CV
            </button>
          </nav>

          <div className="navRight">
            <a className="iconPill" href="https://github.com/" target="_blank" rel="noreferrer">
              GH
            </a>
            <a className="iconPill" href="https://linkedin.com/" target="_blank" rel="noreferrer">
              in
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
          <button type="button" className="mobileMenuBtn" onClick={openCvModal}>
            My CV
          </button>
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
              </div>
            </Reveal>
          </div>

          <div className="heroRow">
            {/* LEFT TEXT */}
            <Reveal direction="left" delay={200}>
              <div className="heroText">
                <h2 className="bigLine">
                  I’m a Software Engineer<span className="accent">.</span>
                </h2>

                <p className="muted">
                  Currently, I’m a Software Engineering undergraduate at OUSL. I’m seeking an
                  internship/training opportunity to apply and grow my skills in web/backend development.
                </p>

                <div className="btnRow">
                  <button type="button" className="btn primary" onClick={openCvModal}>
                    My CV
                  </button>
                  <a className="btn ghost" href="#about">
                    See Work
                  </a>
                  <a className="btn ghost" href="#contact">
                    Contact
                  </a>
                </div>

                <div className="chips">
                  <Pill>Python</Pill>
                  <Pill>Django</Pill>
                  <Pill>React</Pill>
                  <Pill>JavaScript</Pill>
                  <Pill>HTML</Pill>
                  <Pill>CSS</Pill>
                  <Pill>SQL</Pill>
                  <Pill>Android Studio</Pill>
                  <Pill>Postman</Pill>
                  <Pill>Git</Pill>
                </div>
              </div>
            </Reveal>

            {/* RIGHT PROFILE (TOP ALIGNED) - MOVED TO TOP OF HERO */}
          </div>
        </section>

        <section className="section" id="about">
          <Reveal direction="bottom">
            <h3 className="sectionTitle">About Me</h3>
          </Reveal>
          <Reveal direction="bottom" delay={100}>
            <div className="aboutCard">
              <h2 className="aboutName">{profileData.aboutName}</h2>
              <p className="muted">
                {profileData.bio}
              </p>
              <div className="chips" style={{ marginTop: "1.2rem" }}>
                <Pill>Python</Pill>
                <Pill>Django</Pill>
                <Pill>React</Pill>
                <Pill>JavaScript</Pill>
                <Pill>HTML</Pill>
                <Pill>CSS</Pill>
                <Pill>SQL</Pill>
                <Pill>Android Studio</Pill>
                <Pill>Postman</Pill>
                <Pill>Git</Pill>
              </div>
            </div>
          </Reveal>
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
                  <button
                    type="button"
                    className="contactCvMiniBtn"
                    onClick={openCvModal}
                  >
                    My CV
                  </button>
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
              <form className="contactFormCard" onSubmit={handleContactSubmit}>
                <div className="contactFormTop">
                  <h4 className="contactFormTitle">Send a Message</h4>
                  <p className="contactFormHint">I usually respond within 24 hours.</p>
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
                      required
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

                <button type="submit" className="contactSubmitBtn">
                  <span>{formSent ? "Opening Mail Client ✓" : "Send Message"}</span>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </Reveal>
          </div>
        </section>

        <footer className="foot">Built with React • Hosted on GitHub Pages</footer>
      </main>
    </div>
  );
}
