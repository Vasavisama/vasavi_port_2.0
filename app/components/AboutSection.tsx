'use client';
import { useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';

const skills = [
  { label: 'Frontend', items: ['HTML', 'CSS', 'JavaScript', 'React'], icon: '⬡' },
  { label: 'Backend', items: ['Node.js', 'Express.js', 'PHP', 'Laravel'], icon: '⬡' },
  { label: 'Database', items: ['MongoDB', 'MySQL', 'REST APIs'], icon: '⬡' },
  { label: 'Languages', items: ['Python', 'Java', 'Git', 'GitHub'], icon: '⬡' },
];

const projects = [
  {
    name: 'Shopify Clone',
    tech: 'PHP · Laravel',
    desc: 'Full-stack e-commerce platform with product listing, cart management, category filtering, and CRUD operations built on scalable Laravel architecture.',
    year: '2024',
    accent: '#FF6B35',
  },
  {
    name: 'Debug Helper',
    tech: 'MERN Stack',
    desc: 'Developer debugging platform where users submit errors and receive AI-assisted suggestions. Built with REST APIs, MongoDB, and an interactive React UI.',
    year: '2024',
    accent: '#4A9EFF',
  },
  {
    name: 'Expense Tracker',
    tech: 'MERN Stack',
    desc: 'Personal finance app for tracking income and expenses with CRUD operations, REST APIs, and secure MongoDB data storage for financial insight.',
    year: '2024',
    accent: '#A78BFA',
  },
];

function Card3D({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `
        perspective(900px)
        rotateX(${-dy * 7}deg)
        rotateY(${dx * 10}deg)
        translateZ(12px)
      `;
      (card.querySelector(`.${styles.cardShine}`) as HTMLElement | null)!.style.background = `
        radial-gradient(
          circle at ${50 + dx * 40}% ${50 + dy * 40}%,
          rgba(255,255,255,0.07) 0%,
          transparent 60%
        )
      `;
    };

    const onLeave = () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className={`${styles.card} ${className || ''}`}>
      <div className={styles.cardShine} />
      {children}
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = '1';
            (entry.target as HTMLElement).style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = sectionRef.current?.querySelectorAll('[data-reveal]') ?? [];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.main} id="about" ref={sectionRef}>
      {/* ── About ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel} data-reveal>
          <span>01</span> About
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutText} data-reveal>
            <h2 className={styles.sectionHeading}>
              Building the future,<br />
              <em>one commit at a time.</em>
            </h2>
            <p>
              I'm Sama Vasavi — a second-year B.Sc Computer Science student at{' '}
              <strong>BITS Pilani</strong>, passionate about crafting digital experiences that
              live at the intersection of logic and beauty.
            </p>
            <p>
              With a 95.8% in MPC Intermediate and a CGPA of 9.7 in high school, I bring
              the same precision to code. My focus is full-stack development — from pixel-perfect
              frontends to robust REST APIs.
            </p>
            <div className={styles.statRow}>
              {['CGPA 9.7', '95.8% MPC', 'BITS Pilani', '3 Projects'].map((s) => (
                <div key={s} className={styles.stat}>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.skillGrid} data-reveal>
            {skills.map((sk) => (
              <Card3D key={sk.label} className={styles.skillCard}>
                <div className={styles.skillIcon}>{sk.icon}</div>
                <div className={styles.skillLabel}>{sk.label}</div>
                <ul className={styles.skillItems}>
                  {sk.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel} data-reveal>
          <span>02</span> Projects
        </div>

        <div className={styles.projectGrid}>
          {projects.map((proj, i) => (
            <Card3D key={proj.name} className={styles.projectCard}>
              <div className={styles.projectAccent} style={{ background: proj.accent }} />
              <div className={styles.projectYear}>{proj.year}</div>
              <div className={styles.projectTech} style={{ color: proj.accent }}>{proj.tech}</div>
              <h3 className={styles.projectName}>{proj.name}</h3>
              <p className={styles.projectDesc}>{proj.desc}</p>
              <div className={styles.projectArrow} style={{ color: proj.accent }}>→</div>
            </Card3D>
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel} data-reveal>
          <span>03</span> Contact
        </div>
        <div className={styles.contactBlock} data-reveal>
          <h2 className={styles.contactHeading}>Let&apos;s build<br /><em>something extraordinary.</em></h2>
          <div className={styles.contactLinks}>
            <a href="mailto:vasavisama2006@gmail.com" className={styles.contactLink}>
              vasavisama2006@gmail.com
            </a>
            <a href="tel:+919392378244" className={styles.contactLink}>
              +91 93923 78244
            </a>
            <div className={styles.contactSocials}>
              <a href="#" className={styles.socialBtn}>GitHub</a>
              <a href="#" className={styles.socialBtn}>LinkedIn</a>
              <a href="#" className={styles.socialBtn}>Portfolio</a>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <span>Sama Vasavi © 2025</span>
        <span>Full Stack Developer · Karimnagar, Telangana</span>
      </footer>
    </main>
  );
}
