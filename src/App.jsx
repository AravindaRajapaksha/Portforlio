import { useEffect, useRef, useState } from "react";
import "./style.css";

const projects = [
  {
    title: "Student Management System",
    desc: "Django web app to manage students, courses, and enrollments.",
    tags: ["Django", "SQLite", "Bootstrap"],
  },
  {
    title: "Task Tracker",
    desc: "To-do app with CRUD + validation + local storage.",
    tags: ["JavaScript", "HTML", "CSS"],
  },
  {
    title: "Portfolio Website",
    desc: "My personal portfolio with magic UI + animations.",
    tags: ["React", "UI", "Animations"],
  },
  {
    title: "Database Management",
    desc: "Optimized MySQL database for a high-traffic e-commerce platform.",
    tags: ["SQL", "MySQL", "DB"],
  },
];

const profileData = {
  name: "Shehan",
  title_L1: "A developer who",
  title_L2: "Judges a book",
  title_L3_pre: "by its",
  title_L3_accent: "cover",
  subtitle: "Software Engineering Undergraduate | Backend & Web Developer",
  description: "Building clean web apps using Python, Django, and modern web technologies.",
  bio_title: "I’m a Software Engineer.",
  bio: "Currently, I’m a Software Engineering undergraduate at OUSL. I’m seeking an internship/training opportunity to apply and grow my skills in web/backend development.",
  // Use the image found in public folder
  imgSrc: "/Profile.png",
};

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function Card({ item, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, []);

  const slideDir = index % 2 === 0 ? "slide-left" : "slide-right";

  return (
    <article
      ref={cardRef}
      className={`card ${slideDir} ${isVisible ? "revealed" : ""}`}
    >
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
        <a className="miniBtn" href="#" onClick={(e) => e.preventDefault()}>
          GitHub
        </a>
        <a className="miniBtn ghostMini" href="#" onClick={(e) => e.preventDefault()}>
          Live
        </a>
      </div>
    </article>
  );
}

import CursorFollower from "./CursorFollower";

export default function App() {

  const [mobileOpen, setMobileOpen] = useState(false);
  const canvasRef = useRef(null);

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
            <span className="brandMark">Σ</span>
          </a>

          <nav className="navLinks">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#lab">Lab</a>
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
            Home
          </a>
          <a href="#about" onClick={() => setMobileOpen(false)}>
            About
          </a>
          <a href="#lab" onClick={() => setMobileOpen(false)}>
            Lab
          </a>
          <a href="#contact" onClick={() => setMobileOpen(false)}>
            Contact
          </a>
        </div>
      </header>

      <main className="wrap">
        <section className="hero">
          <div className="heroHeader">
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

            <div className="avatarWrap">
              <div className="avatar">
                <img
                  src={profileData.imgSrc}
                  alt={profileData.name}
                  className="avatarImg"
                />
              </div>
            </div>
          </div>

          <div className="heroRow">
            {/* LEFT TEXT */}
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
                <Pill>JavaScript</Pill>
                <Pill>SQL</Pill>
                <Pill>Git</Pill>
              </div>
            </div>

            {/* RIGHT PROFILE (TOP ALIGNED) - MOVED TO TOP OF HERO */}
          </div>
        </section>

        <section className="section" id="about">
          <h3 className="sectionTitle">Work Experience</h3>
          <div className="grid">
            {projects.map((p, i) => (
              <Card key={p.title} item={p} index={i} />
            ))}
          </div>
        </section>

        <section className="section center" id="lab">
          <p className="muted small">
            I’m currently looking to join a cross-functional team that values building accessible,
            delightful software experiences.
          </p>

          <div className="skillArc">
            {["🐍", "🟩", "🟨", "🧩", "🗄️", "🔧"].map((x, i) => (
              <span key={i} className="arcIcon">
                {x}
              </span>
            ))}
          </div>

          <div className="orbitWrap">
            <div className="planet">
              <span className="planetMark">Σ</span>
            </div>

            <svg className="orbits" viewBox="0 0 800 260" aria-hidden="true">
              <path d="M40,210 C190,120 310,90 400,90 C490,90 610,120 760,210" />
              <path d="M80,228 C220,150 320,130 400,130 C480,130 580,150 720,228" />
              <path d="M120,244 C250,185 330,175 400,175 C470,175 550,185 680,244" />
            </svg>
          </div>
        </section>

        <section className="section" id="contact">
          <h3 className="sectionTitle">Contact</h3>

          <div className="contact">
            <a className="pillBig" href="mailto:www.aravindadocumant@gmail.com">
              ✉️ www.aravindadocumant@gmail.com
            </a>
            <a className="pillBig" href="https://github.com/" target="_blank" rel="noreferrer">
              🧷 github.com/shehan
            </a>
            <a className="pillBig" href="https://linkedin.com/" target="_blank" rel="noreferrer">
              🔗 linkedin.com/in/shehan
            </a>
          </div>

          <footer className="foot">Built with React • Hosted on GitHub Pages</footer>
        </section>
      </main>
    </div>
  );
}
