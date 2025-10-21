const SITE = {
  name: "Bhavya Patel",
  tagline: "CS student focused on data and human-centered AI.",
  major: "B.S. Computer Science",
  university: "Kent State University",
  location: "Kent, OH, USA",
  email: "bpatel28@kent.edu",
  github: "https://github.com/deadman-26",

  linkedin: "https://www.linkedin.com/in/bhavya-patel-40079338b/",

  cv: "assets/CV.pdf",
  profilePhoto: "assets/profile.jpg",

  skills: {
    Programming: ["Python", "Java", "C++"],
    Web: ["HTML", "CSS", "JavaScript"],
    "Data & AI": ["Pandas", "scikit-learn", "SQL"],
    Tools: ["Git", "Docker", "Linux"]
  },

  education: [
    { title: "Kent State University — B.S. Computer Science", when: "2023 — Present", where: "Kent, OH" }
  ],

  projects: [
    {
      title: "Doc2Video Pipeline",
      pitch: "Converts PDFs/PPTs into narrated educational videos.",
      stack: ["Python", "FastAPI", "Docker", "FFmpeg"],
      bullets: [
        "Extracts text/visuals, generates script, synthesizes audio.",
        "Modular pipeline with logging & CLI.",
        "Deployed on Linux; configurable durations."
      ],
      links: { github: "https://github.com/deadman-26", demo: "" },
      tags: ["AI", "Data"]
    },
    {
      title: "Portfolio Website",
      pitch: "Accessible personal site with HCI best practices.",
      stack: ["HTML", "CSS", "JS"],
      bullets: [
        "Keyboard navigation, skip links, ARIA feedback.",
        "WCAG AA color contrast and responsive layout.",
        "No build tools; runs on CS server."
      ],
      links: { github: "https://github.com/deadman-26", demo: "" },
      tags: ["Web"]
    },
    {
      title: "Network Tracer Analyzer",
      pitch: "Traceroute data visualizer and report generator.",
      stack: ["Python", "Pandas", "Matplotlib"],
      bullets: [
        "Parses multiple traceroutes and computes stats.",
        "Exports CSV and charts for reports.",
        "CLI + notebook workflows."
      ],
      links: { github: "https://github.com/deadman-26", demo: "" },
      tags: ["Data"]
    }
  ],

  experience: [
    {
      role: "Student Researcher — SURE 2025",
      org: "Kent State University",
      when: "Summer 2025",
      where: "Kent, OH",
      bullets: [
        "Analyzed AI adoption in accounting firms using a checklist method.",
        "Built reproducible pipelines and open-data artifacts."
      ]
    },
    {
      role: "Culinary Services — Night Auditor",
      org: "Kent State",
      when: "2024 — Present",
      where: "Kent, OH",
      bullets: [
        "Coordinated shift schedules and incident logs.",
        "Improved nightly reconciliation time by ~15%."
      ]
    }
  ],

  blog: [
    {
      title: "Designing HCI-Friendly Student Portfolios",
      date: "2025-10-01",
      summary: "Small choices (contrast, focus states) make big differences for accessibility.",
      tags: ["HCI","Accessibility"]
    },
    {
      title: "From PDFs to Videos: A Pipeline Story",
      date: "2025-09-15",
      summary: "How a modular approach turns static documents into engaging explainers.",
      tags: ["AI","Video"]
    }
  ]
};


const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function setText(id, text){ const el = document.getElementById(id); if(el) el.textContent = text; }
function setAttr(id, attr, val){ const el = document.getElementById(id); if(el) el.setAttribute(attr, val); }

document.addEventListener("DOMContentLoaded", () => {
  // profile photo
  setText("brandName", SITE.name);
  setText("heroName", SITE.name);
  setText("heroTagline", SITE.tagline);
  setAttr("profilePhoto", "src", SITE.profilePhoto);
  setAttr("profilePhoto", "alt", `Profile photo of ${SITE.name}`);

  // major
  const meta = $("#heroMeta");
  meta.innerHTML = `
    <li><strong>${SITE.major}</strong></li>
    <li>${SITE.university}</li>
    <li>${SITE.location}</li>
  `;

  // social
  const social = $("#socialLinks");
  social.innerHTML = `
    <a href="${SITE.github}" target="_blank" rel="noopener">GitHub</a>
    <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
  `;

  // footer
  setText("footerName", SITE.name);
  $("#footerMeta").textContent = `${SITE.major} • ${SITE.university}`;
  $("#footerGit").href = SITE.github;
  $("#footerLinkedIn").href = SITE.linkedin;
  $("#updatedDate").textContent = new Date().toLocaleDateString();
  $("#footerNameCopy").textContent = SITE.name;
  $("#copyrightYear").textContent = new Date().getFullYear();

  // about
  const aboutBio = $("#aboutBio");
  aboutBio.textContent = `Hi, I’m ${SITE.name}. ${SITE.tagline} I study ${SITE.major} at ${SITE.university} in ${SITE.location}. I enjoy building useful tools and sharing clear, accessible explanations.`;

  const skillsWrap = $("#skillsBadges");
  for (const [group, items] of Object.entries(SITE.skills)) {
    const label = document.createElement("div");
    label.className = "badge";
    label.style.borderColor = "rgba(154,198,255,.35)";
    label.textContent = group;
    skillsWrap.appendChild(label);

    items.forEach(s => {
      const b = document.createElement("span");
      b.className = "badge";
      b.textContent = s;
      b.setAttribute("role", "listitem");
      skillsWrap.appendChild(b);
    });
  }

  // education
  const eduList = $("#eduTimeline");
  SITE.education?.forEach(e => {
    const li = document.createElement("li");
    li.innerHTML = `<div class="role">${e.title}</div><div class="when">${e.when} — ${e.where}</div>`;
    eduList.appendChild(li);
  });

  // projects
  renderProjects("All");
  initProjectFilters();

  // experience
  const expUL = $("#expTimeline");
  SITE.experience.forEach(x => {
    const li = document.createElement("li");
    const bullets = x.bullets.map(b => `<li>${b}</li>`).join("");
    li.innerHTML = `
      <div class="role">${x.role}</div>
      <div class="when">${x.when} — ${x.where} • ${x.org}</div>
      <ul>${bullets}</ul>
    `;
    expUL.appendChild(li);
  });

  // blog
  const blogWrap = $("#blogGrid");
  SITE.blog?.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <div class="sub">${new Date(p.date).toLocaleDateString()} • ${p.tags.join(", ")}</div>
      <p>${p.summary}</p>
    `;
    blogWrap.appendChild(card);
  });

  // contact mailto
  $("#mailtoBtn").href = `mailto:${SITE.email}?subject=Portfolio%20Contact&body=Hi%20${encodeURIComponent(SITE.name)},%0D%0A%0D%0A`;

  // mobile nav
  const toggle = $("#navToggle");
  const menu = $("#navMenu");
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    menu.classList.toggle("show");
    toggle.classList.toggle("open");
  });

  $$("#navMenu a").forEach(a => a.addEventListener("click", () => {
    $("#navMenu").classList.remove("show");
    $("#navToggle").setAttribute("aria-expanded", "false");
    $("#navToggle").classList.remove("open");
  }));

  // cv button 
  const cvHero = document.getElementById("cvLinkHero");
  if (cvHero) cvHero.href = SITE.cv;

  // scroll behaviour
  const header = document.getElementById("siteHeader");
  function onScroll(){
    if(window.scrollY > 20) header.classList.add("scrolled"); 
    else header.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const navLinks = $$("#navMenu a");
  const sections = $$("main .section");
  sections.forEach(s => s && new IntersectionObserver(entries => {
    entries.forEach(en => {
      if(en.isIntersecting){
        const id = en.target.id;
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
      }
    });
  }, { root: null, threshold: 0.45 }).observe(s));

  // scroll cue
  const scrollCue = $("#scrollCue");
  if(scrollCue) scrollCue.addEventListener("click", () => {
    document.getElementById('about').scrollIntoView({behavior:'smooth'});
  });

  // reveal on scroll
  const revealEls = $$(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add("is-visible"); revealObserver.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
});

// project render
function renderProjects(tag = "All"){
  const grid = $("#projectGrid");
  grid.innerHTML = "";
  const list = SITE.projects.filter(p => tag === "All" || p.tags.includes(tag));
  list.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    const hasLink = (p.links.github || p.links.demo);
    if(hasLink) card.classList.add("clickable");

    const stackBadges = p.stack.map(s => `<span class="badge">${s}</span>`).join(" ");
    const bullets = p.bullets.map(b => `<li>${b}</li>`).join("");
    const git = p.links.github ? `<a href="${p.links.github}" target="_blank" rel="noopener">GitHub</a>` : "";
    const demo = p.links.demo ? ` • <a href="${p.links.demo}" target="_blank" rel="noopener">Demo</a>` : "";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <div class="sub">${p.pitch}</div>
      <div class="badge-group">${stackBadges}</div>
      <ul style="margin-top:.6rem">${bullets}</ul>
      <p style="margin-top:.6rem">${git}${demo}</p>
    `;
    if(hasLink){
      card.addEventListener("click", () => {
        const url = p.links.demo || p.links.github;
        window.open(url, "_blank", "noopener");
      });
      card.tabIndex = 0;
      card.addEventListener("keydown", (ev) => {
        if(ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); card.click(); }
      });
    }
    grid.appendChild(card);
  });
  if(list.length === 0){
    const empty = document.createElement("div");
    empty.className = "card";
    empty.textContent = "No projects match this filter yet.";
    grid.appendChild(empty);
  }
}

function initProjectFilters(){
  const chips = $$(".chip");
  chips.forEach(c => {
    c.addEventListener("click", () => {
      chips.forEach(x => { x.classList.remove("is-active"); x.setAttribute("aria-pressed", "false"); });
      c.classList.add("is-active"); c.setAttribute("aria-pressed", "true");
      const tag = c.dataset.filter;
      renderProjects(tag);
    });

    c.addEventListener("keydown", (e) => {
      if(e.key === "ArrowRight" || e.key === "ArrowDown"){
        e.preventDefault();
        const next = c.nextElementSibling || chips[0];
        next.focus();
      } else if(e.key === "ArrowLeft" || e.key === "ArrowUp"){
        e.preventDefault();
        const prev = c.previousElementSibling || chips[chips.length-1];
        prev.focus();
      } else if(e.key === "Enter" || e.key === " "){
        e.preventDefault();
        c.click();
      }
    });
  });
}
