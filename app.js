const PROFILE = {
  name: `Hi, I'm Tom`,
  title: 'Software Engineer',
  location: 'Poznań, PL · remote-friendly',
  github: 'https://github.com/thefelixiam',
  linkedin: 'https://www.linkedin.com/in/tomasz-agaci%C5%84ski-57901911a',
  summary:
    'Software Engineer with 7 years of experience building fullstack apps and distributed services. JavaScript/TypeScript, React ecosystem and Node.js. I care about simple design, security and scaling.',
  aboutLong:
    "I build frontend systems and full-stack apps. For the last 3 years I've worked on SaaS platforms: REST/GraphQL APIs, Postgres, Docker, Nextjs. I like boring technology, clean contracts, and simplicity. Outside work: pursuit curiosity, classical music, sim racing.",
  roles: [
    'Software Engineer',
    'Frontend · JavaScript / TypeScript / Next.js',
    'Node.js · Postgres / SQLite / MongoDB',
    'open to work_',
  ],
  skills: {
    Languages: ['TypeScript', 'JavaScript', 'SQL', 'Bash'],
    Frontend: ['React', 'Next.js', 'HTML/CSS', 'Tailwind'],
    Backend: [
      'Node.js',
      'Express',
      'REST',
      'GraphQL',
      'PostgreSQL',
      'Redis',
      'S3',
    ],
    DevOps_Tools: [
      'Docker',
      'AWS',
      'CI/CD (GitHub Actions)',
      'Coolify',
      'Git',
      'Linux',
      'Prometheus/Grafana',
    ],
  },
  experience: [
    {
      role: 'Full-Stack Developer',
      company: 'Colgate, IBM, Guinness',
      period: '2023-now',
      location: 'Remote',
      bullets: [
        'Designed and developed full-stack web applications using Next.js, Node.js and TypeScript.',
        'Built end-to-end features spanning frontend interfaces, server-side logic, APIs, and application integrations.',
        'Developed scalable and reusable application components with a focus on maintainability and clean architecture.',
        'Implemented backend functionality and APIs using Node.js and integrated them with modern frontend applications.',
        'Worked with Next.js across both client-side and server-side application layers.',
        'Collaborated with cross-functional teams to define technical solutions and deliver features from concept to production.',
        'Contributed to improving existing systems through refactoring, architectural improvements, and implementation of new functionality.',
        'Balanced technical considerations with business requirements while working across projects for global clients.',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'GSK, Browning, JTI',
      period: '2019-2023',
      location: 'Remote',
      bullets: [
        'Designed and developed production-grade web applications using React, Vue.js, and Next.js.',
        'Built reusable, maintainable, and scalable frontend architectures and UI components.',
        'Worked extensively with the React ecosystem, integrating libraries and tools for state management, data fetching, forms, routing, and UI development.',
        'Translated business and product requirements into robust, user-focused frontend solutions.',
        'Collaborated closely with backend engineers, designers, and stakeholders throughout the development lifecycle.',
        'Focused on code quality, maintainability, performance, and scalability across client projects.',
        'Contributed to technical decision-making and helped establish consistent development patterns across applications.',
        'Worked in diverse client environments, adapting solutions to different technical requirements, products, and development processes.',
      ],
    },
  ],
  projects: [],
  education: [
    {
      school: 'AI_devs 4 Builders',
      period: 'in progress',
      note: 'AI_devs',
    },
    {
      school: 'AWS Certified Cloud Practitioner',
      period: '2025',
      note: 'Amazon Web Services (AWS)',
    },
    {
      school: 'ITIL® Foundation Certificate in IT Service Management',
      period: '2018',
      note: 'AXELOS Global Best Practice',
    },
  ],
  languages: ['Polish (native)', 'English (B2)', 'German (A2)'],
};

function h(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value == null) continue;
      if (key === 'class') node.className = value;
      else node.setAttribute(key, value);
    }
  }
  for (const child of children.flat(9)) {
    if (child == null || child === false) continue;
    node.append(
      typeof child === 'object'
        ? child
        : document.createTextNode(String(child)),
    );
  }
  return node;
}

function renderInto(el, ...children) {
  if (!el) return;
  el.replaceChildren(
    ...children.flat(9).filter((c) => c != null && c !== false),
  );
}

function safeUrl(u) {
  try {
    const url = new URL(String(u), location.origin);
    return url.protocol === 'http:' || url.protocol === 'https:'
      ? url.href
      : '#';
  } catch {
    return '#';
  }
}

document.getElementById('hero-name').textContent = PROFILE.name;
renderInto(
  document.getElementById('hero-meta'),
  h('b', null, PROFILE.title),
  h('br'),
  h('span', { 'aria-hidden': 'true' }, '📍'),
  ` ${PROFILE.location}`,
);
document.getElementById('hero-about').textContent = PROFILE.summary;
document.getElementById('about-text').textContent = PROFILE.aboutLong;
document.getElementById('hero-github').href = safeUrl(PROFILE.github);
document.getElementById('hero-linkedin').href = safeUrl(PROFILE.linkedin);
document.getElementById('f-github').href = safeUrl(PROFILE.github);
document.getElementById('f-linkedin').href = safeUrl(PROFILE.linkedin);
document.getElementById('f-name').textContent = PROFILE.name;
document.getElementById('year').textContent = new Date().getFullYear();

const skillsEl = document.getElementById('skills');
const skillGroupsSite = Object.entries(PROFILE.skills || {}).filter(
  ([, a]) => Array.isArray(a) && a.length,
);
renderInto(
  skillsEl,
  skillGroupsSite.length
    ? skillGroupsSite.map(([g, arr]) => [
        h('div', { class: 'group-label' }, g),
        h(
          'div',
          { class: 'tags' },
          arr.map((s) => h('span', { class: 'tag' }, s)),
        ),
      ])
    : h('p', { style: 'color: var(--muted); margin: 0' }, 'in progress'),
);

const jobsEl = document.getElementById('jobs');
renderInto(
  jobsEl,
  PROFILE.experience && PROFILE.experience.length
    ? PROFILE.experience.map((j) =>
        h(
          'div',
          { class: 'card' },
          h('span', { class: 'period' }, j.period),
          h('h3', null, j.role),
          h('div', { class: 'where' }, `@ ${j.company} · ${j.location}`),
          h(
            'ul',
            null,
            (j.bullets || []).map((b) => h('li', null, b)),
          ),
        ),
      )
    : h('div', { class: 'card' }, 'in progress'),
);

const projGridEl = document.getElementById('proj-grid');
const projSection = document.getElementById('projects');
const hasProjects = !!(PROFILE.projects && PROFILE.projects.length);
if (projSection) projSection.hidden = !hasProjects;
const projNav = document.querySelector('.nav-links a[href="#projects"]');
if (projNav) projNav.hidden = !hasProjects;
if (hasProjects) {
  renderInto(
    projGridEl,
    PROFILE.projects.map((p) =>
      h(
        'div',
        { class: 'card' },
        h(
          'h3',
          null,
          h(
            'a',
            {
              href: safeUrl(p.link),
              target: '_blank',
              rel: 'noopener',
            },
            p.name,
            ' ',
            h('span', { 'aria-hidden': 'true' }, '↗'),
          ),
        ),
        h('p', null, p.desc),
        h('div', { class: 'stack' }, p.stack),
      ),
    ),
  );
}

const eduEl = document.getElementById('edu');
renderInto(
  eduEl,
  PROFILE.education && PROFILE.education.length
    ? PROFILE.education.map((e) =>
        h(
          'div',
          { class: 'card' },
          h('span', { class: 'period' }, e.period),
          h('h3', null, e.school),
          h('div', { class: 'where' }, e.note),
        ),
      )
    : h('div', { class: 'card' }, 'in progress'),
  h('div', { class: 'group-label' }, 'Languages'),
  PROFILE.languages && PROFILE.languages.length
    ? h(
        'div',
        { class: 'tags' },
        PROFILE.languages.map((l) => h('span', { class: 'tag' }, l)),
      )
    : h('p', { style: 'color: var(--muted); margin: 0' }, 'in progress'),
);

(function typing() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.getElementById('typed').textContent = PROFILE.roles[0];
    return;
  }
  const el = document.getElementById('typed');
  let ri = 0,
    ci = 0,
    del = false;
  (function tick() {
    const word = PROFILE.roles[ri];
    el.textContent = word.slice(0, ci);
    if (!del && ci < word.length) {
      ci++;
      setTimeout(tick, 55);
    } else if (!del) {
      del = true;
      setTimeout(tick, 1400);
    } else if (ci > 0) {
      ci--;
      setTimeout(tick, 28);
    } else {
      del = false;
      ri = (ri + 1) % PROFILE.roles.length;
      setTimeout(tick, 300);
    }
  })();
})();

(function reveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
})();

const themeBtn = document.getElementById('btn-theme');
const metaTheme = document.querySelector('meta[name="theme-color"]');
function currentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}
function applyTheme(t) {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem('ta-theme', t);
  } catch {}
  if (metaTheme)
    metaTheme.setAttribute('content', t === 'light' ? '#f7f5f0' : '#0d1117');
  themeBtn.setAttribute('aria-pressed', String(t === 'light'));
  themeBtn.textContent = t === 'dark' ? '☀' : '☾';
  themeBtn.setAttribute(
    'aria-label',
    t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
  );
}
themeBtn.addEventListener('click', () => {
  applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
});
applyTheme(currentTheme());
if (location.hash) {
  const target = document.getElementById(location.hash.slice(1));
  if (target) target.scrollIntoView();
}
