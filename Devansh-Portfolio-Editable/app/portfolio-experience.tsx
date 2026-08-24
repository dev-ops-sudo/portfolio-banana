"use client";
/* eslint-disable @next/next/no-img-element */

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

type Project = {
  id: "breachwise" | "lifesync" | "college-gym";
  number: string;
  title: string;
  shortTitle: string;
  kicker: string;
  context: string;
  description: string;
  features: string[];
  stack: string[];
  image: string;
  tone: "red" | "cyan" | "violet";
};

const projects: Project[] = [
  {
    id: "breachwise",
    number: "01",
    title: "BreachWise — AI Incident Response Trainer",
    shortTitle: "BreachWise",
    kicker: "AI incident response, made adaptive",
    context: "Primary technical deliverable · Lysandra Group internship",
    description:
      "An end-to-end training platform with authentication, persistent history, adaptive scoring, an Intel Library, and realistic breach scenarios mapped to NIST incident response and MITRE ATT&CK.",
    features: ["Adaptive scoring", "Training history", "Intel Library", "Real-world scenarios"],
    stack: ["Next.js", "Tailwind CSS", "Node.js", "Express", "Supabase", "PostgreSQL", "Groq API", "Google OAuth", "Vercel", "Railway"],
    image: "/projects/breachwise.png",
    tone: "red",
  },
  {
    id: "lifesync",
    number: "02",
    title: "LifeSync — Health & Lifestyle Web Application",
    shortTitle: "LifeSync",
    kicker: "Daily wellbeing, kept in sync",
    context: "Independent full-stack web application",
    description:
      "An interactive application that analyses daily routines and turns them into practical posture, diet, and lifestyle guidance, with reminders and motion designed to keep people engaged.",
    features: ["Routine analysis", "Posture guidance", "Diet guidance", "Smart reminders"],
    stack: ["Full-stack web", "Responsive UI", "Interactive motion", "Reminder system"],
    image: "/projects/lifesync.png",
    tone: "cyan",
  },
  {
    id: "college-gym",
    number: "03",
    title: "College Gym Management Platform",
    shortTitle: "College Gym",
    kicker: "Shorter queues. Smarter workouts.",
    context: "Full-stack campus utility platform",
    description:
      "A campus gym platform with front-end and back-end features for queue management, workout planning, and student participation—built to reduce waiting time and improve facility usage.",
    features: ["Live queue flow", "Workout planning", "Student participation", "Usage management"],
    stack: ["React", "Node.js", "JavaScript", "Database concepts"],
    image: "/projects/college-gym-platform.png",
    tone: "violet",
  },
];

const firstNameLetters = Array.from("DEVANSH");
const lastNameLetters = Array.from("MISHRA");

export default function PortfolioExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [introDone, setIntroDone] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [contactMode, setContactMode] = useState<"meeting" | "review" | null>(null);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const loaderPixels = useMemo(() => Array.from({ length: 50 }), []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const compact = window.innerWidth <= 680;
    const useMomentum = !reducedMotion && window.innerWidth > 760;
    const lenis = new Lenis({
      lerp: useMomentum ? 0.105 : 1,
      smoothWheel: useMomentum,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.1,
    });
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const context = gsap.context(() => {
      gsap.set(".loading-pixel", {
        scale: 0,
        rotation: -25,
        transformOrigin: "50% 50%",
      });
      gsap.set(".hero-letter", { yPercent: 125, rotate: 7 });
      gsap.set(".hero-device", {
        opacity: 0,
        scale: 0.52,
        rotate: -20,
        xPercent: -50,
        yPercent: 75,
      });
      gsap.set(".hero-tech", {
        opacity: 0,
        scale: 0.82,
        rotateX: 9,
        transformPerspective: 1000,
      });
      gsap.set(".tech-node", { opacity: 0, y: 70, rotate: -5 });
      gsap.set(".tech-connector__line", {
        scaleX: 0,
        transformOrigin: "0% 50%",
      });
      gsap.set(".tech-terminal", {
        opacity: 0,
        y: 55,
        clipPath: "inset(0 0 100% 0)",
      });
      gsap.set(".tech-code-line", {
        scaleX: 0,
        transformOrigin: "0% 50%",
      });
      gsap.set(".tech-float", { opacity: 0, scale: 0.55, y: 24 });
      gsap.set(".hero-stickers span", {
        opacity: 0,
        scale: 0.35,
        y: 38,
      });

      const intro = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => setIntroDone(true),
      });
      intro
        .to(".loading-pixel", {
          scale: 1,
          rotation: 45,
          duration: 0.55,
          ease: "back.out(1.8)",
          stagger: { grid: [5, 10], from: "center", amount: 0.85 },
        })
        .to(
          ".loading-grid",
          { scale: 1.22, rotation: 9, duration: 0.65, ease: "power3.inOut" },
          0.72,
        )
        .to(
          ".loading-pixel",
          {
            scale: 0,
            rotation: 110,
            duration: 0.42,
            ease: "power3.in",
            stagger: { grid: [5, 10], from: "edges", amount: 0.42 },
          },
          1.02,
        )
        .to(
          ".loader",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.78,
            ease: "expo.inOut",
          },
          1.22,
        )
        .to(
          ".hero-letter",
          {
            yPercent: 0,
            rotate: 0,
            duration: 0.82,
            ease: "power4.out",
            stagger: 0.045,
          },
          1.48,
        )
        .from(
          ".hero-socials",
          { opacity: 0, y: 18, duration: 0.55, ease: "power3.out" },
          1.88,
        )
        .from(
          ".hero-meta, .hero-scroll, .site-nav",
          { opacity: 0, y: 20, duration: 0.6, stagger: 0.07, ease: "power3.out" },
          1.62,
        );

      if (!reducedMotion) {
        const heroSequence = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: compact ? "+=300%" : "+=420%",
            pin: true,
            scrub: compact ? 0.7 : 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        heroSequence
          // Scene 1: the two-line name owns the opening frame.
          .to(".hero-scroll", { opacity: 0, y: 16, duration: 0.07 }, 0.02)
          .to(
            ".hero-title__sans, .hero-socials",
            {
              opacity: 0,
              xPercent: 34,
              scale: 0.84,
              rotate: 2,
              filter: "blur(8px)",
              duration: 0.22,
              ease: "power3.in",
            },
            0.08,
          )
          // Scene 2: Devansh's full-stack pipeline builds itself on scroll.
          .to(
            ".hero-tech",
            {
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 0.11,
              ease: "power3.out",
            },
            0.4,
          )
          .to(
            ".tech-node",
            {
              opacity: 1,
              y: 0,
              rotate: 0,
              duration: 0.13,
              stagger: 0.045,
              ease: "back.out(1.45)",
            },
            0.43,
          )
          .to(
            ".tech-connector__line",
            { scaleX: 1, duration: 0.14, stagger: 0.035, ease: "power2.inOut" },
            0.51,
          )
          .to(
            ".tech-terminal",
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 0.18,
              ease: "power3.out",
            },
            0.52,
          )
          .to(
            ".tech-code-line",
            { scaleX: 1, duration: 0.11, stagger: 0.025, ease: "power2.out" },
            0.6,
          )
          .to(
            ".tech-float",
            { opacity: 1, scale: 1, y: 0, duration: 0.08, stagger: 0.035, ease: "back.out(1.8)" },
            0.64,
          )
          .to(
            ".hero-tech",
            {
              opacity: 0,
              yPercent: -78,
              scale: 1.08,
              rotateX: -6,
              duration: 0.15,
              ease: "power3.in",
            },
            0.84,
          )
          // Scene 3: the central device follows after the pipeline clears.
          .to(
            ".hero-device",
            {
              opacity: 1,
              yPercent: -50,
              scale: 1,
              rotate: -3,
              duration: 0.22,
              ease: "expo.out",
            },
            1.02,
          )
          .to(".hero-dotfield", { backgroundPosition: "48px 58px", duration: 0.5, ease: "none" }, 1.02)
          // Scene 4: one technology label at a time, each with its own exit.
          .to(
            ".hero-stickers span:nth-child(1)",
            { opacity: 1, scale: 1, y: 0, duration: 0.07, ease: "back.out(1.8)" },
            1.25,
          )
          .to(
            ".hero-stickers span:nth-child(1)",
            { opacity: 0, scale: 0.72, y: -36, duration: 0.07, ease: "power2.in" },
            1.36,
          )
          .to(
            ".hero-stickers span:nth-child(2)",
            { opacity: 1, scale: 1, y: 0, duration: 0.07, ease: "back.out(1.8)" },
            1.39,
          )
          .to(
            ".hero-stickers span:nth-child(2)",
            { opacity: 0, scale: 0.72, y: -36, duration: 0.07, ease: "power2.in" },
            1.5,
          )
          .to(
            ".hero-stickers span:nth-child(3)",
            { opacity: 1, scale: 1, y: 0, duration: 0.07, ease: "back.out(1.8)" },
            1.53,
          )
          .to(
            ".hero-stickers span:nth-child(3)",
            { opacity: 0, scale: 0.72, y: -36, duration: 0.07, ease: "power2.in" },
            1.64,
          )
          // Final exit leaves a clean yellow frame before the showreel begins.
          .to(
            ".hero-device",
            {
              opacity: 0,
              yPercent: -170,
              scale: 1.18,
              rotate: 13,
              duration: 0.2,
              ease: "power3.in",
            },
            1.68,
          )
          .to(".hero-meta", { opacity: 0, y: -18, duration: 0.1 }, 1.78);
      }

      if (!reducedMotion) {
        gsap.set(".journey-card", {
          opacity: 0,
          scale: 0.5,
          y: 100,
          rotateX: 12,
          filter: "blur(18px)",
          transformPerspective: 1100,
        });
        gsap.set(".journey-card__body > *, .journey-card__aside > *", {
          opacity: 0,
          y: 34,
        });
        gsap.set(".journey-step", { opacity: 0.28, scale: 0.92 });
        gsap.set(".journey-progress__fill", {
          scaleX: 0,
          transformOrigin: "0% 50%",
        });

        const journey = gsap.timeline({
          scrollTrigger: {
            trigger: ".showreel",
            start: "top top",
            end: compact ? "+=330%" : "+=440%",
            pin: true,
            scrub: compact ? 0.7 : 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        journey
          .fromTo(
            ".showreel-frame",
            { scale: 0.7, rotate: -2.5, borderRadius: "22px" },
            { scale: 1, rotate: 0, borderRadius: "0px", duration: 0.3, ease: "power3.inOut" },
            0,
          )
          .from(
            ".journey-header > *",
            { opacity: 0, y: 22, duration: 0.2, stagger: 0.05, ease: "power3.out" },
            0.12,
          )
          .to(
            ".journey-progress__fill",
            { scaleX: 1, duration: 3.45, ease: "none" },
            0.2,
          );

        const journeyCards = gsap.utils.toArray<HTMLElement>(".journey-card");
        const journeySteps = gsap.utils.toArray<HTMLElement>(".journey-step");
        journeyCards.forEach((card, index) => {
          const enterAt = 0.28 + index * 0.66;
          const step = journeySteps[index];
          const copy = card.querySelectorAll(".journey-card__body > *, .journey-card__aside > *");

          journey
            .to(
              card,
              {
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
                filter: "blur(0px)",
                duration: 0.26,
                ease: "power3.out",
              },
              enterAt,
            )
            .to(
              step,
              { opacity: 1, scale: 1.08, duration: 0.13, ease: "back.out(1.6)" },
              enterAt,
            )
            .to(
              copy,
              { opacity: 1, y: 0, duration: 0.18, stagger: 0.025, ease: "power3.out" },
              enterAt + 0.08,
            )
            .to(
              card,
              {
                opacity: 0,
                scale: 1.48,
                y: -92,
                rotateX: -8,
                filter: "blur(15px)",
                duration: 0.2,
                ease: "power3.in",
              },
              enterAt + 0.46,
            )
            .to(
              step,
              { opacity: 0.28, scale: 0.92, duration: 0.1 },
              enterAt + 0.48,
            );
        });

        journey.to(
          ".showreel-frame",
          { scale: 0.86, rotate: 1.4, opacity: 0, duration: 0.28, ease: "power3.in" },
          3.65,
        );
      } else {
        gsap.set(".journey-card", { opacity: 0 });
        gsap.set(".journey-card:first-child", { opacity: 1, scale: 1, y: 0 });
      }

      gsap.utils.toArray<HTMLElement>(".manifest-line").forEach((line, index) => {
        gsap.from(line, {
          yPercent: 120,
          rotate: index % 2 ? -2 : 2,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: { trigger: line, start: "top 92%", toggleActions: "play none none reverse" },
        });
      });
      gsap.to(".manifest-device--right", {
        yPercent: 30,
        rotate: 16,
        scrollTrigger: { trigger: ".manifest", start: "top bottom", end: "bottom top", scrub: 1.1 },
      });

      gsap.utils.toArray<HTMLElement>(".project-node").forEach((node, index) => {
        gsap.from(node, {
          opacity: 0,
          scale: 0.42,
          y: 150,
          rotate: index % 2 ? 15 : -14,
          duration: 1.15,
          ease: "back.out(1.35)",
          scrollTrigger: { trigger: node, start: "top 94%" },
        });
        if (!reducedMotion) {
          gsap.to(node.querySelector("img"), {
            y: index % 2 ? 16 : -16,
            rotate: index % 2 ? 3 : -3,
            duration: 2.2 + index * 0.35,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });
      gsap.to(".grid-paint--one", {
        clipPath: "polygon(0 0,100% 8%,92% 100%,3% 91%)",
        rotate: 5,
        scrollTrigger: { trigger: ".project-grid", start: "top 70%", end: "bottom 40%", scrub: 1 },
      });
      gsap.to(".grid-paint--two", {
        clipPath: "circle(68% at 50% 50%)",
        scale: 1.2,
        scrollTrigger: { trigger: ".project-grid", start: "top 55%", end: "bottom 35%", scrub: 1 },
      });

      const reach = gsap.timeline({
        scrollTrigger: {
          trigger: ".reach",
          start: "top top",
          end: compact ? "+=80%" : "+=135%",
          pin: !compact,
          scrub: reducedMotion ? false : 1,
          anticipatePin: 1,
        },
      });
      reach
        .fromTo(".reach-black", { yPercent: 100 }, { yPercent: 0, duration: 0.62, ease: "power3.inOut" }, 0)
        .fromTo(".reach-word--left", { xPercent: -90 }, { xPercent: 0, duration: 0.58, ease: "power3.out" }, 0.27)
        .fromTo(".reach-word--right", { xPercent: 90 }, { xPercent: 0, duration: 0.58, ease: "power3.out" }, 0.27)
        .from(".reach-actions", { opacity: 0, y: 35, duration: 0.26 }, 0.67)
        .to(".reach-float", { yPercent: -65, rotate: -18, scale: 0.78, duration: 1, ease: "none" }, 0);

      gsap.from(".finale-word", {
        xPercent: (index) => (index % 2 ? 95 : -95),
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: ".finale", start: "top 78%" },
      });
      gsap.fromTo(
        ".finale-brush",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".finale", start: "top 66%" },
        },
      );
      gsap.to(".finale-orbit", {
        rotate: 300,
        scrollTrigger: { trigger: ".finale", start: "top bottom", end: "bottom top", scrub: 1 },
      });
    }, root);

    const cursor = cursorRef.current;
    const moveX = cursor ? gsap.quickTo(cursor, "x", { duration: 0.18, ease: "power3" }) : null;
    const moveY = cursor ? gsap.quickTo(cursor, "y", { duration: 0.18, ease: "power3" }) : null;
    const onPointerMove = (event: PointerEvent) => {
      moveX?.(event.clientX);
      moveY?.(event.clientY);
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!cursor || !target) return;
      cursor.classList.add("is-active");
      cursor.dataset.label = target.dataset.cursor ?? "VIEW";
    };
    const onPointerOut = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!cursor || !target) return;
      cursor.classList.remove("is-active");
      cursor.dataset.label = "";
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerover", onPointerOver);
    root.addEventListener("pointerout", onPointerOut);
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 450);

    return () => {
      window.clearTimeout(refresh);
      window.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerover", onPointerOver);
      root.removeEventListener("pointerout", onPointerOut);
      context.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const open = activeProject || contactMode;
    document.body.classList.toggle("panel-open", Boolean(open));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        setContactMode(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("panel-open");
    };
  }, [activeProject, contactMode]);

  const submitContact = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactMode) return;
    setSubmitState("submitting");
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.type = contactMode;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <div className="site" ref={rootRef}>
      {!introDone && (
        <div className="loader" aria-hidden="true">
          <div className="loading-grid">
            {loaderPixels.map((_, index) => <i className="loading-pixel" key={index} />)}
          </div>
          <p>DM® / LOADING THE GOOD STUFF</p>
        </div>
      )}

      <div className="cursor" ref={cursorRef} data-label="" aria-hidden="true" />

      <header className="site-nav">
        <a className="site-mark" href="#top" aria-label="Devansh Mishra home">DM<span>®</span></a>
        <p><i /> Available for internships</p>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <button type="button" onClick={() => setContactMode("meeting")}>Contact</button>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-dotfield" aria-hidden="true" />
          <div className="hero-meta">
            <span>FULL-STACK DEVELOPER</span>
            <span>GREATER NOIDA / INDIA</span>
          </div>
          <div className="hero-identity">
            <h1 className="hero-title" aria-label="Devansh Mishra">
              <span className="hero-title__sans">
                <span className="hero-title__line">
                  {firstNameLetters.map((letter, index) => (
                    <span className="hero-letter-wrap" key={`first-${letter}-${index}`}>
                      <span className="hero-letter">{letter}</span>
                    </span>
                  ))}
                </span>
                <span className="hero-title__line hero-title__line--last">
                  {lastNameLetters.map((letter, index) => (
                    <span className="hero-letter-wrap" key={`last-${letter}-${index}`}>
                      <span className="hero-letter">{letter}</span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <nav className="hero-socials" aria-label="Social profiles">
              <a href="https://github.com/dev-ops-sudo" target="_blank" rel="noreferrer" data-cursor="OPEN">
                <span>GITHUB</span><i aria-hidden="true">↗</i>
              </a>
              <a href="https://linkedin.com/in/devansh-mishra-637184372" target="_blank" rel="noreferrer" data-cursor="OPEN">
                <span>LINKEDIN</span><i aria-hidden="true">↗</i>
              </a>
            </nav>
          </div>
          <div className="hero-tech" aria-hidden="true">
            <div className="tech-status"><i /> FULL-STACK PIPELINE / LIVE</div>
            <div className="tech-route">
              <div className="tech-node tech-node--react">
                <span className="tech-node__index">01 / CLIENT</span>
                <strong>&lt;UI/&gt;</strong>
                <small>REACT + MOTION</small>
              </div>
              <div className="tech-connector">
                <span className="tech-connector__line" />
                <i className="tech-packet tech-packet--one" />
                <i className="tech-packet tech-packet--two" />
              </div>
              <div className="tech-node tech-node--node">
                <span className="tech-node__index">02 / SERVER</span>
                <strong>{"{API}"}</strong>
                <small>NODE.JS + EXPRESS</small>
              </div>
              <div className="tech-connector">
                <span className="tech-connector__line" />
                <i className="tech-packet tech-packet--one" />
                <i className="tech-packet tech-packet--two" />
              </div>
              <div className="tech-node tech-node--data">
                <span className="tech-node__index">03 / DATA</span>
                <strong>DB</strong>
                <small>SQL + MONGODB</small>
              </div>
            </div>
            <div className="tech-terminal">
              <div className="tech-terminal__bar">
                <span><i /><i /><i /></span>
                <b>devansh@portfolio: ~/build</b>
                <em>● 200 OK</em>
              </div>
              <code>
                <span className="tech-code-line"><b>const</b> developer = <i>&quot;Devansh Mishra&quot;</i>;</span>
                <span className="tech-code-line"><b>await</b> build({"{ react, node, sql, motion }"});</span>
                <span className="tech-code-line"><b>return</b> &lt;Experience fast=<i>&quot;true&quot;</i> /&gt;;<em>_</em></span>
              </code>
            </div>
            <span className="tech-float tech-float--one">GIT / MAIN ✓</span>
            <span className="tech-float tech-float--two">DSA / C++</span>
            <span className="tech-float tech-float--three">DEPLOY / LIVE</span>
          </div>
          <img className="hero-device" src="/hero-device-minimal.png" alt="" width={1254} height={1254} decoding="async" fetchPriority="high" draggable={false} />
          <div className="hero-stickers" aria-hidden="true">
            <span>REACT</span><span>MOTION</span><span>NODE</span>
          </div>
          <div className="hero-scroll"><span>SCROLL TO UNFOLD</span><i>↓</i></div>
        </section>

        <section className="showreel journey" aria-label="Devansh Mishra education and development journey">
          <div className="showreel-frame journey-frame">
            <div className="journey-grid" aria-hidden="true" />
            <header className="journey-header">
              <span>DM® / THE JOURNEY SO FAR</span>
              <strong>SCROLL TO MOVE THROUGH TIME</strong>
            </header>

            <div className="journey-card-stack">
              <article className="journey-card journey-card--icse">
                <span className="journey-card__ghost" aria-hidden="true">10</span>
                <div className="journey-card__body">
                  <span>01 / SCHOOL / LUCKNOW</span>
                  <h2>ST. ANN&apos;S<br />CONVENT</h2>
                  <p>Class X · Indian Certificate of Secondary Education</p>
                </div>
                <aside className="journey-card__aside">
                  <span>FOUNDATION</span>
                  <strong>ICSE</strong>
                  <p>A disciplined academic base with strong English, analytical thinking, and problem-solving fundamentals.</p>
                  <div><span>CLASS X</span><span>LUCKNOW</span><span>FOUNDATION</span></div>
                </aside>
              </article>

              <article className="journey-card journey-card--cbse">
                <span className="journey-card__ghost" aria-hidden="true">12</span>
                <div className="journey-card__body">
                  <span>02 / SENIOR SCHOOL / LUCKNOW</span>
                  <h2>THE<br />MILLENNIUM</h2>
                  <p>Class XII · Central Board of Secondary Education</p>
                </div>
                <aside className="journey-card__aside">
                  <span>DIRECTION</span>
                  <strong>CBSE</strong>
                  <p>The stage that led into computer science, engineering, and building technology as a career.</p>
                  <div><span>CLASS XII</span><span>LUCKNOW</span><span>NEXT: CSE</span></div>
                </aside>
              </article>

              <article className="journey-card journey-card--university">
                <span className="journey-card__ghost" aria-hidden="true">28</span>
                <div className="journey-card__body">
                  <span>03 / UNIVERSITY / GREATER NOIDA</span>
                  <h2>BENNETT<br />UNIVERSITY</h2>
                  <p>B.Tech · Computer Science Engineering</p>
                </div>
                <aside className="journey-card__aside">
                  <span>PRESENT CHAPTER</span>
                  <strong>3RD YEAR</strong>
                  <p>Full Stack Development specialization with expected graduation in 2028.</p>
                  <div><span>B.TECH CSE</span><span>FULL STACK</span><span>2028</span></div>
                </aside>
              </article>

              <article className="journey-card journey-card--build">
                <span className="journey-card__ghost" aria-hidden="true">&lt;/&gt;</span>
                <div className="journey-card__body">
                  <span>04 / THE BUILD PHASE</span>
                  <h2>FULL-STACK<br />IN MOTION</h2>
                  <p>Learning by turning ambitious ideas into working products.</p>
                </div>
                <aside className="journey-card__aside">
                  <span>TOOLKIT</span>
                  <strong>REACT → NODE</strong>
                  <p>Next.js, React, Node.js, Express, PostgreSQL, MongoDB and Git/GitHub, applied through BreachWise, LifeSync, and the College Gym platform.</p>
                  <div><span>REACT</span><span>NODE.JS</span><span>DSA / C++</span></div>
                </aside>
              </article>

              <article className="journey-card journey-card--next">
                <span className="journey-card__ghost" aria-hidden="true">→</span>
                <div className="journey-card__body">
                  <span>05 / WHAT COMES NEXT</span>
                  <h2>PLACEMENT<br />MODE</h2>
                  <p>Building toward internships now and campus placements next semester.</p>
                </div>
                <aside className="journey-card__aside">
                  <span>CURRENT TARGET</span>
                  <strong>READY TO SHIP</strong>
                  <p>Seeking high-fit full-stack opportunities in Delhi NCR or remote, with a focus on production-ready work.</p>
                  <div><span>AVAILABLE</span><span>NCR / REMOTE</span><span>FULL STACK</span></div>
                </aside>
              </article>
            </div>

            <footer className="journey-progress">
              <div className="journey-progress__track"><i className="journey-progress__fill" /></div>
              <div className="journey-progress__steps">
                <span className="journey-step">01 SCHOOL</span>
                <span className="journey-step">02 XII</span>
                <span className="journey-step">03 BENNETT</span>
                <span className="journey-step">04 BUILD</span>
                <span className="journey-step">05 NEXT</span>
              </div>
            </footer>
          </div>
        </section>

        <section className="manifest" id="about">
          <div className="manifest-kicker"><span>01</span> TECHNOLOGY INTERN / FULL-STACK DEVELOPER</div>
          <div className="manifest-copy">
            <span className="manifest-clip"><span className="manifest-line">I BUILD FULL-STACK</span></span>
            <span className="manifest-clip"><span className="manifest-line manifest-line--outline">PRODUCTS WITH REACT,</span></span>
            <span className="manifest-clip"><span className="manifest-line">APIs, DATA &amp; <em>PURPOSE.</em></span></span>
          </div>
          <p className="manifest-note">
            Third-year B.Tech CSE student at Bennett University with hands-on experience
            building and deploying full-stack applications using React/Next.js,
            Node.js/Express, PostgreSQL, and REST APIs—including BreachWise, delivered
            during a cybersecurity internship at Lysandra Group.
          </p>
          <img className="manifest-device manifest-device--right" src="/projects/lifesync.png" alt="" width={1024} height={1024} loading="lazy" decoding="async" />
        </section>

        <section className="project-grid" id="work">
          <div className="grid-paint grid-paint--one" aria-hidden="true" />
          <div className="grid-paint grid-paint--two" aria-hidden="true" />
          <header className="grid-heading">
            <div><span>02</span> CV PROJECTS / REAL SYSTEMS</div>
            <h2>BUILT TO SOLVE<br /><em>REAL THINGS.</em></h2>
          </header>
          <div className="project-layout">
            {projects.map((project) => (
              <button
                className={`project-node project-node--${project.tone}`}
                key={project.id}
                type="button"
                data-cursor="OPEN"
                onClick={() => setActiveProject(project)}
              >
                <span className="project-node__index">{project.number}</span>
                <span className="project-node__plate" aria-hidden="true" />
                <span className="project-node__orbit" aria-hidden="true"><i /><i /><i /></span>
                <img src={project.image} alt="" width={1024} height={1024} loading="lazy" decoding="async" draggable={false} />
                <span className="project-node__status"><i /> {project.context}</span>
                <span className="project-node__copy">
                  <strong>{project.shortTitle}</strong>
                  <small>{project.kicker}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="grid-ticker" aria-hidden="true">
            <div>NEXT.JS ✳ GROQ API ✳ SUPABASE ✳ POSTGRESQL ✳ REACT ✳ NODE.JS ✳ EXPRESS ✳ GOOGLE OAUTH ✳ NEXT.JS ✳ GROQ API ✳ SUPABASE ✳ POSTGRESQL ✳</div>
          </div>
        </section>

        <section className="reach">
          <div className="reach-yellow">
            <span>03 / CONTACT</span>
            <img className="reach-float" src="/hero-device-minimal.png" alt="" width={1254} height={1254} loading="lazy" decoding="async" />
          </div>
          <div className="reach-black">
            <h2>
              <span className="reach-word reach-word--left">REACH</span>
              <span className="reach-word reach-word--right">OUT</span>
            </h2>
            <div className="reach-actions">
              <button type="button" data-cursor="TALK" onClick={() => setContactMode("meeting")}>Schedule a meeting <i>↗</i></button>
              <button type="button" data-cursor="WRITE" onClick={() => setContactMode("review")}>Leave a review <i>↗</i></button>
            </div>
          </div>
        </section>

        <section className="finale">
          <div className="finale-orbit" aria-hidden="true" />
          <div className="finale-brush" aria-hidden="true" />
          <p>DEVANSH MISHRA / CREATIVE DEVELOPER</p>
          <h2>
            <span className="finale-word">THE NEXT</span>
            <span className="finale-word finale-word--yellow">STANDARD</span>
            <span className="finale-word">IS BUILT,</span>
            <span className="finale-word finale-word--outline">NOT FOUND.</span>
          </h2>
          <footer>
            <span>GREATER NOIDA / INDIA</span>
            <span>FULL-STACK • MOTION • PRODUCT</span>
            <a href="#top">BACK TO TOP ↑</a>
          </footer>
        </section>
      </main>

      {activeProject && (
        <div className="overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setActiveProject(null);
        }}>
          <article className={`project-panel project-panel--${activeProject.tone}`} role="dialog" aria-modal="true" aria-labelledby="project-title">
            <button className="panel-close" type="button" onClick={() => setActiveProject(null)} aria-label="Close project">×</button>
            <span>{activeProject.number} / CASE STUDY</span>
            <h2 id="project-title">{activeProject.title}</h2>
            <h3>{activeProject.kicker}</h3>
            <p className="project-panel__context">{activeProject.context}</p>
            <img src={activeProject.image} alt="" width={1024} height={1024} decoding="async" />
            <p>{activeProject.description}</p>
            <div className="project-panel__features">
              <span>WHAT IT DELIVERS</span>
              <div>{activeProject.features.map((item) => <b key={item}>{item}</b>)}</div>
            </div>
            <span className="project-panel__stack-label">TOOLS &amp; SYSTEMS</span>
            <ul>{activeProject.stack.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        </div>
      )}

      {contactMode && (
        <div className="overlay" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setContactMode(null);
        }}>
          <section className="contact-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title">
            <button className="panel-close" type="button" onClick={() => setContactMode(null)} aria-label="Close contact form">×</button>
            <span>LET&apos;S MAKE SOMETHING MOVE</span>
            <h2 id="contact-title">{contactMode === "meeting" ? "Schedule a meeting" : "Leave a review"}</h2>
            <form onSubmit={submitContact}>
              <label><span>Name</span><input name="name" required maxLength={80} autoComplete="name" /></label>
              <label><span>Email</span><input name="email" type="email" required maxLength={120} autoComplete="email" /></label>
              {contactMode === "meeting" ? (
                <label><span>Preferred date</span><input name="preferredDate" type="date" required /></label>
              ) : (
                <label><span>Rating</span><select name="rating" defaultValue="5"><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Needs work</option><option value="1">1 — Poor</option></select></label>
              )}
              <label className="contact-panel__message"><span>{contactMode === "meeting" ? "What should we discuss?" : "Your review"}</span><textarea name="message" required maxLength={1500} /></label>
              {contactMode === "review" && <label className="contact-consent"><input type="checkbox" name="consent" value="yes" /><span>You may display this review publicly.</span></label>}
              <input className="honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <button className="form-submit" type="submit" disabled={submitState === "submitting"}>{submitState === "submitting" ? "SENDING…" : "SEND IT"}<i>↗</i></button>
              <p className={`form-status form-status--${submitState}`} aria-live="polite">
                {submitState === "success" && "Received. Devansh will get back to you."}
                {submitState === "error" && "It did not go through. Please try again."}
              </p>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
