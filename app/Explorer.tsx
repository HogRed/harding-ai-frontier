"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Track = "Software" | "Artificial Intelligence" | "Mathematics";

const courses: Record<Track, { code: string; name: string; hours: number; tag: string }[]> = {
  Software: [
    { code: "COMP 1700", name: "Software Development", hours: 5, tag: "Foundation" },
    { code: "COMP 2450", name: "Data Structures", hours: 3, tag: "Core" },
    { code: "COMP 3010", name: "Software Engineering", hours: 3, tag: "Build" },
    { code: "COMP 3490", name: "Applied Algorithms", hours: 3, tag: "Core" },
    { code: "IS 3800", name: "Database Design", hours: 3, tag: "Data" },
    { code: "IS 4300", name: "Data Analytics", hours: 3, tag: "Insight" },
  ],
  "Artificial Intelligence": [
    { code: "COMP 2200", name: "Introduction to Machine Learning", hours: 3, tag: "Launch" },
    { code: "COMP 3200", name: "Deep Learning", hours: 3, tag: "Neural" },
    { code: "COMP 4200", name: "Computer Vision & Generative AI", hours: 3, tag: "Create" },
    { code: "COMP 4299", name: "Machine Learning", hours: 3, tag: "Advanced" },
    { code: "COMP 4300", name: "Knowledge, Search & Reasoning", hours: 3, tag: "Intelligence" },
    { code: "COMP 4380", name: "AI & Computing Ethics", hours: 3, tag: "Purpose" },
    { code: "COMP 4400", name: "Software Development Project", hours: 3, tag: "Capstone" },
    { code: "IS 2200", name: "Artificial Intelligence in Business", hours: 3, tag: "Impact" },
  ],
  Mathematics: [
    { code: "MATH 2350", name: "Analytics & Calculus I", hours: 4, tag: "Foundation" },
    { code: "MATH 3200", name: "Probability", hours: 3, tag: "Models" },
    { code: "MATH 3300", name: "Analytics & Calculus II", hours: 4, tag: "Advanced" },
    { code: "MATH 3530", name: "Discrete Mathematical Structures", hours: 3, tag: "Logic" },
    { code: "MATH 3730", name: "Linear Algebra", hours: 3, tag: "Vectors" },
  ],
};

const careers = [
  { title: "AI Engineer", fit: "I want to build intelligent products.", skills: ["Deep learning", "Software engineering", "Generative AI"] },
  { title: "Machine Learning Engineer", fit: "I want models to work in the real world.", skills: ["Algorithms", "Data structures", "ML systems"] },
  { title: "Data Scientist", fit: "I want to turn data into decisions.", skills: ["Probability", "Analytics", "Machine learning"] },
  { title: "Responsible AI Lead", fit: "I want technology to serve people well.", skills: ["AI ethics", "Business", "Reasoning"] },
];

export function Explorer() {
  const [track, setTrack] = useState<Track>("Artificial Intelligence");
  const [career, setCareer] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const total = useMemo(() => courses[track].reduce((sum, c) => sum + c.hours, 0), [track]);

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="nav shell">
        <a className="brand" href="#top" aria-label="Harding AI home">
          <Image src="/ai-bison.jpg" alt="Harding AI Bison" width={68} height={48} priority />
          <span><b>HARDING</b><small>ARTIFICIAL INTELLIGENCE</small></span>
        </a>
        <button className="menu" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>MENU</button>
        <nav className={menuOpen ? "navlinks open" : "navlinks"} aria-label="Main navigation">
          <a href="#curriculum">Curriculum</a>
          <a href="#careers">Careers</a>
          <a href="#guide">Your guide</a>
          <a className="nav-cta" href="#launch">Start exploring <span>↗</span></a>
        </nav>
      </header>

      <section className="hero shell" id="top">
        <div className="hero-copy">
          <div className="eyebrow"><i /> ARTIFICIAL INTELLIGENCE · BACHELOR OF SCIENCE</div>
          <h1>Build what’s <em>next.</em></h1>
          <p className="lead">Master the science behind intelligent systems—and learn to create technology with skill, purpose, and conviction.</p>
          <div className="hero-actions">
            <a className="primary" href="#curriculum">Explore the degree <span>↓</span></a>
            <a className="text-link" href="#careers">See where AI can take you <span>→</span></a>
          </div>
          <div className="proof">
            <div><strong>124</strong><span>Total degree<br />hours</span></div>
            <div><strong>71–72</strong><span>Major<br />hours</span></div>
            <div><strong>25</strong><span>Dedicated AI<br />hours</span></div>
          </div>
        </div>
        <div className="hero-visual" aria-label="AI learning pathway visualization">
          <div className="orbit orbit-a" />
          <div className="orbit orbit-b" />
          <div className="core">
            <Image src="/ai-bison.jpg" alt="Harding AI Bison logo" width={290} height={180} priority />
          </div>
          <span className="node node-a">MACHINE LEARNING</span>
          <span className="node node-b">ETHICAL AI</span>
          <span className="node node-c">GENERATIVE AI</span>
          <span className="node node-d">COMPUTER VISION</span>
          <div className="signal"><span /> FUTURE SIGNAL: STRONG</div>
        </div>
      </section>

      <section className="manifesto shell" id="launch">
        <p className="section-kicker">THE FRONTIER IS OPEN</p>
        <h2>More than a major.<br />A launchpad.</h2>
        <p>Harding’s AI program combines computer science, mathematics, and ethical reasoning so you can do more than use tomorrow’s tools—you can help shape them.</p>
        <div className="feature-grid">
          {[
            ["01", "Code the intelligence", "Build a serious computer science foundation—from data structures and algorithms to production-ready software."],
            ["02", "Train the future", "Move from machine learning fundamentals to deep learning, computer vision, and generative AI."],
            ["03", "Lead with purpose", "Explore business impact and computing ethics alongside the technical power to make ideas real."],
          ].map(([n, title, text]) => <article className="feature" key={n}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="curriculum" id="curriculum">
        <div className="shell">
          <div className="section-head">
            <div><p className="section-kicker">INTERACTIVE CURRICULUM</p><h2>Map your mind.</h2></div>
            <p>Choose a knowledge system to see how your courses connect. The current Harding catalog remains the official source.</p>
          </div>
          <div className="tabs" role="tablist" aria-label="Curriculum areas">
            {(Object.keys(courses) as Track[]).map((name) => (
              <button key={name} role="tab" aria-selected={track === name} onClick={() => setTrack(name)}>
                {name}<span>{name === "Software" ? "29–30" : name === "Artificial Intelligence" ? "25" : "17"} HRS</span>
              </button>
            ))}
          </div>
          <div className="course-panel">
            <div className="track-summary">
              <p>ACTIVE SYSTEM</p>
              <h3>{track}</h3>
              <div className="big-number">{track === "Software" ? "29–30" : total}<small>HOURS</small></div>
              <p>{track === "Artificial Intelligence" ? "From first models to responsible, real-world AI." : track === "Software" ? "The engineering foundation that makes intelligent systems reliable." : "The language and structure behind modern machine intelligence."}</p>
            </div>
            <div className="course-list">
              {courses[track].map((course, index) => (
                <article className="course" key={course.code}>
                  <span className="course-index">{String(index + 1).padStart(2, "0")}</span>
                  <div><small>{course.code}</small><h4>{course.name}</h4></div>
                  <span className="tag">{course.tag}</span><b>{course.hours} HR</b>
                </article>
              ))}
            </div>
          </div>
          <a className="catalog-link" target="_blank" rel="noreferrer" href="https://catalog.harding.edu/preview_program.php?catoid=4&poid=2261">View the official 2026–27 catalog requirements <span>↗</span></a>
        </div>
      </section>

      <section className="careers shell" id="careers">
        <div className="section-head">
          <div><p className="section-kicker">OPPORTUNITY ENGINE</p><h2>Choose your trajectory.</h2></div>
          <p>Select a role to see how the degree’s technical and human-centered strengths align with your future.</p>
        </div>
        <div className="career-console">
          <div className="career-list">
            {careers.map((item, index) => (
              <button key={item.title} onClick={() => setCareer(index)} className={career === index ? "active" : ""}>
                <span>0{index + 1}</span>{item.title}<b>→</b>
              </button>
            ))}
          </div>
          <div className="career-detail" aria-live="polite">
            <p>MATCHED TRAJECTORY</p>
            <h3>{careers[career].title}</h3>
            <blockquote>“{careers[career].fit}”</blockquote>
            <small>YOUR HARDING AI TOOLKIT</small>
            <div className="skill-pills">{careers[career].skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            <div className="match"><div><i /></div><strong>High<br /><small>PROGRAM FIT</small></strong></div>
          </div>
        </div>
      </section>

      <section className="guide" id="guide">
        <div className="shell guide-grid">
          <div className="portrait-wrap">
            <div className="portrait-frame"><Image src="/joe-faith.png" alt="Joe Faith, AI program guide" width={640} height={720} /></div>
            <span className="portrait-label">HUMAN GUIDANCE<br />MEETS AI AMBITION</span>
          </div>
          <div className="guide-copy">
            <p className="section-kicker">YOUR GUIDE TO THE FRONTIER</p>
            <h2>You won’t navigate<br />the future alone.</h2>
            <p>Big ideas need personal guidance. Connect with Joe Faith to talk through the AI major, the skills you’ll build, and the opportunities you want to pursue.</p>
            <div className="guide-name"><strong>Joe Faith</strong><span>AI EDUCATOR · DATA SCIENTIST · STUDENT ADVOCATE</span></div>
            <a className="primary" href="mailto:jfaith@harding.edu">Start a conversation <span>↗</span></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div className="brand"><Image src="/ai-bison.jpg" alt="" width={68} height={48} /><span><b>HARDING</b><small>ARTIFICIAL INTELLIGENCE</small></span></div>
          <p>Build intelligently.<br />Lead faithfully.</p>
          <div><a href="https://www.harding.edu" target="_blank" rel="noreferrer">Harding University ↗</a><a href="https://catalog.harding.edu/preview_program.php?catoid=4&poid=2261" target="_blank" rel="noreferrer">Official catalog ↗</a></div>
        </div>
        <div className="shell legal">Student exploration experience · Verify all requirements with the official Harding University catalog.</div>
      </footer>
    </main>
  );
}
