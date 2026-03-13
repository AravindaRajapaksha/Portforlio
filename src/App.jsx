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

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Reveal({ children, direction = "bottom", delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
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
          <div className="cardImgWrap">
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
