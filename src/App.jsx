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
    title: "QR Code Generator",
    desc: "Python tool that generates customizable QR codes from any URL or text input.",
    longDesc: "A complete Python-based QR code generation utility. It allows users to input URLs, text, or contact information and generates a high-quality SVG or PNG image. The tool supports custom colors, sizes, and error correction levels.",
    tags: ["Python", "qrcode", "PIL"],
    img: publicAsset("projects/qr_generator.png"),
    images: [publicAsset("projects/qr_generator.png")], // Add more image paths here as you upload them
    github: "https://github.com/AravindaRajapaksha/QR-Code-generator",
    live: "#",
  },
  {
    title: "Factory Machine Monitoring System",
    desc: "Real-time factory machine monitoring dashboard with live charts.",
    longDesc: "This group project is a real-time dashboard designed for factory supervisors. It monitors machine health, uptime, and output using sensors. Data is streamed via Firebase and visualized with interactive charts to help predict maintenance needs.",
    tags: ["Vue.js", "Firebase", "Chart.js"],
    img: publicAsset("projects/FactoryMachineMonitoringSystem.png"),
    images: [publicAsset("projects/FactoryMachineMonitoringSystem.png")], // Add more image paths here as you upload them
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
  bio: "Software Engineering undergraduate at OUSL. I’m seeking an internship/training opportunity to apply and grow my skills in web/backend development.",
  aboutName: "I'm Shehan Aravinda",
  // Use the image found in public folder
  imgSrc: publicAsset("Profile.png"),
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
  }, [cardImages.length, hasMultipleImages]);

  return (
    <Reveal direction={slideDir}>
      <article className="card">
        {showCollage && (
          <div className="cardImgWrap">
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
          <div className="cardImgWrap">
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
          <a className="miniBtn" href={item.github || "#"} target={item.github && item.github !== "#" ? "_blank" : undefined} rel="noreferrer">
            GitHub
          </a>
          <button className="miniBtn ghostMini" onClick={() => onView(item)}>
            View
          </button>
        </div>
      </article>
    </Reveal>
  );
}

function ProjectShowcase({ items, onView }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused, items.length]);

  if (!items.length) return null;

  const activeProject = items[activeIndex];

  const showPrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const showNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <Reveal direction="bottom">
      <div
        className="showcase"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="showcaseMedia">
          {items.map((item, index) => {
            const slideImages = item.images && item.images.length > 0 ? item.images : (item.img ? [item.img] : []);
            const slideImage = slideImages[0];

            return (
              <img
                key={item.title}
                src={slideImage}
                alt={item.title}
                className={`showcaseImg ${index === activeIndex ? "active" : ""}`}
              />
            );
          })}

          <div className="showcaseShade" />

          <div className="showcaseControls">
            <button className="showcaseArrow" type="button" onClick={showPrevious} aria-label="Previous project">
              ‹
            </button>
            <button className="showcaseArrow" type="button" onClick={showNext} aria-label="Next project">
              ›
            </button>
          </div>
        </div>

        <div className="showcasePanel">
          <div>
            <div className="showcaseMeta">
              <span className="showcaseLabel">Project Gallery</span>
              <span className="showcaseCount">
                {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <h3 className="showcaseTitle">{activeProject.title}</h3>
            <p className="showcaseDesc">{activeProject.longDesc || activeProject.desc}</p>

            <div className="cardTags">
              {activeProject.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="showcaseDots" role="tablist" aria-label="Project slides">
              {items.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  className={`showcaseDot ${index === activeIndex ? "active" : ""}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>

            <div className="showcaseActions">
              <button className="btn primary" type="button" onClick={() => onView(activeProject)}>
                View Project
              </button>
              <a className="btn ghost" href={activeProject.github || "#"} target="_blank" rel="noreferrer">
                GitHub
              </a>
              {activeProject.live && activeProject.live !== "#" && (
                <a className="btn ghost" href={activeProject.live} target="_blank" rel="noreferrer">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ProjectModal({ item, onClose }) {
  if (!item) return null;

  const images = item.images && item.images.length > 0 ? item.images : (item.img ? [item.img] : []);

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modalClose" onClick={onClose}>✕</button>
        
        <div className="modalContent">
          <div className="modalGallery">
            {images.map((imgSrc, i) => (
              <img key={i} src={imgSrc} alt={item.title} className="modalImg" />
            ))}
          </div>

          <h2 className="modalTitle">{item.title}</h2>
          
          <div className="modalTags">
            {item.tags.map(tag => <span key={tag} className="tag" style={{marginRight: '8px'}}>{tag}</span>)}
          </div>

          <p className="modalDesc">{item.longDesc || item.desc}</p>

          <div className="modalActions">
            <a className="btn primary" href={item.github || "#"} target="_blank" rel="noreferrer">
              GitHub Repo
            </a>
            {item.live && item.live !== "#" && (
              <a className="btn ghost" href={item.live} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, label, value, href, delay = 0 }) {
  return (
    <Reveal direction="bottom" delay={delay}>
      <a className="contactCard" href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        <div className="contactCardIcon">{icon}</div>
        <div className="contactCardContent">
          <span className="contactCardLabel">{label}</span>
          <span className="contactCardValue">{value}</span>
        </div>
      </a>
    </Reveal>
  );
}

import CursorFollower from "./CursorFollower";

export default function App() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const canvasRef = useRef(null);

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
                  <a className="btn primary" href="#about">
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

        <section className="section">
          <Reveal direction="bottom">
            <h3 className="sectionTitle">Project Gallery</h3>
          </Reveal>
          <ProjectShowcase items={projects} onView={setSelectedProject} />
        </section>

        <section className="section" id="projects">
          <Reveal direction="bottom">
            <h3 className="sectionTitle">Projects</h3>
          </Reveal>
          <div className="grid">
            {projects.map((p, i) => (
              <Card key={p.title} item={p} index={i} onView={setSelectedProject} />
            ))}
          </div>
        </section>

        {selectedProject && (
          <ProjectModal item={selectedProject} onClose={() => setSelectedProject(null)} />
        )}

        <section className="section" id="contact">
          <Reveal direction="bottom">
            <h3 className="sectionTitle">Get In Touch</h3>
          </Reveal>

          <div className="contactGrid">
            <ContactCard
              icon="✉️"
              label="Email"
              value="www.aravindadocumant@gmail.com"
              href="mailto:www.aravindadocumant@gmail.com"
              delay={100}
            />
            <ContactCard
              icon="📞"
              label="Phone"
              value="0778052582"
              href="tel:0778052582"
              delay={150}
            />
            <ContactCard
              icon="👥"
              label="Facebook"
              value="Aravinda Rajapaksha"
              href="https://www.facebook.com/share/1CckL2VFcS/"
              delay={200}
            />
            <ContactCard
              icon="📸"
              label="Instagram"
              value="@aravinda_rajapaksha_"
              href="https://www.instagram.com/aravinda_rajapaksha_?igsh=MXBxNHp0ZGZ3aGdieg=="
              delay={250}
            />
            <ContactCard
              icon="🧷"
              label="GitHub"
              value="github.com/aravinda"
              href="https://github.com/"
              delay={300}
            />
            <ContactCard
              icon="🔗"
              label="LinkedIn"
              value="linkedin.com/in/aravinda"
              href="https://linkedin.com/"
              delay={350}
            />
          </div>
        </section>

        <footer className="foot">Built with React • Hosted on GitHub Pages</footer>
      </main>
    </div>
  );
}
