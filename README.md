# Cyber-Deck Developer Portfolio // BY.SEC

An award-winning, premium developer portfolio website built for **BANAVATHU YOGANANDHA**, a final-year (4th year) Computer Science Engineering student specializing in Cybersecurity. 

Designed with a futuristic, cyber-security inspired dark-cyber theme featuring neon accents, glassmorphism card panels, interactive terminal consoles, and performance-optimized canvas overlays.

---

## 🚀 Key Features

- **System Boot Preloader**: A professional, terminal-like boot loader that initializes UI components ("Initializing Portfolio...", "Loading Projects...", "Loading Certifications...", "Portfolio Ready").
- **Terminal Command Palette (Ctrl+K)**: A keyboard-accessible command console. Recruiters can hit `Ctrl+K` (or click the floating console dock) and search and run commands to navigate sections (`> view projects`, `> download resume`, etc.) instantly.
- **Custom Inertia Cursor**: A canvas-and-spring custom cursor with magnetic hover attraction. **Optimized for recruiters**: automatically disabled on mobile/touch interfaces to ensure high performance.
- **Why Hire Me? Recruiter Grid**: A dedicated grid mapping core skillsets directly to recruiter evaluation vectors (Cybersecurity knowledge, Web Dev experience, Problem solving, Team collaboration, Continuous learning).
- **Interactive System Logs (Timeline & Skills)**: Chronological education and experience lines styled as interactive system logs that recruiters can click to expand and audit detailed deliverables.
- **Security Audit Modals**: Project showcase cards (featuring LexAI, Collab Board, Salary Predictor) that expand into detail sheets containing a "Security Audit & Hardening Report" detailing specific vulnerability mitigations (XSS, input sanitization, PII scrubbing) implemented on each project.
- **GA4 Secure Telemetry**: Embedded telemetry tracker logging resume downloads, social profile clicks, and contact transmissions to Google Analytics 4, falling back to clean terminal styled console outputs when analytics are blocked or in dev environments.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Typings)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Implements theme directives, `@theme` configuration, and CSS-first extensions)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Intersection observers, spring inertias, layout transitions, exit anims)
- **Icons**: [Lucide React](https://lucide.dev/) (Modern vector UI details)
- **Interactive Triggers**: [Canvas Confetti](https://github.com/catdad/canvas-confetti) (Celebrates secure message delivery handshakes)

---

## 📂 Project Structure

```text
rattesting/
├── public/
│   └── resume.pdf            # Placeholder resume file for download CTAs
├── src/
│   ├── assets/               # Local static assets
│   ├── components/           # Reusable UI & infrastructure blocks
│   │   ├── CommandPalette.tsx # Ctrl+K CLI Console
│   │   ├── CustomCursor.tsx  # Desktop inertia custom cursor
│   │   ├── CyberParticles.tsx # HTML5 Canvas backdrop network
│   │   ├── MouseGlow.tsx     # Follow-mouse radial gradient background
│   │   ├── Navbar.tsx        # Floating cyber dock with real-time ping tracker
│   │   ├── SectionWrapper.tsx # Animate-on-scroll trigger
│   │   └── TerminalIntro.tsx # Boot preloader
│   ├── sections/             # Core page view sections
│   │   ├── About.tsx         # Bio, education system log, counters
│   │   ├── Achievements.tsx  # Coding profiles, CTF results, and badges
│   │   ├── Certifications.tsx # Infinite marquee slider of 10 real credentials
│   │   ├── Contact.tsx       # Secure transmission form with console feedback
│   │   ├── Experience.tsx    # Interactive vertical history timeline
│   │   ├── Footer.tsx        # System clocks & simulated CPU/Memory telemetry
│   │   ├── Hero.tsx          # Headline, B.Tech CSE details, typing console
│   │   └── WhyHireMe.tsx     # Recruiter-focused feature matrix
│   ├── utils/
│   │   └── analytics.ts      # GA4 Telemetry handler and logger
│   ├── App.tsx               # Orchestrates loading state, theme, layouts
│   ├── index.css             # Main stylesheet loading fonts and Tailwind v4 themes
│   └── main.tsx              # Application entry point
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript compile parameters
└── vite.config.ts            # Vite compile plugins (@tailwindcss/vite)
```

---

## 💻 Local Setup & Execution

### 1. Prerequisite
Ensure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Install Dependencies
Clone the repository and run:
```bash
npm install
```

### 3. Start Development Server
Launch the local development environment:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build Production Bundle
To compile and optimize the website for deployment (Vercel, Netlify, GitHub Pages, etc.):
```bash
npm run build
```
This generates optimized static files inside the `dist/` directory.

---

## 🔒 Security & Analytics Customization

- **Google Analytics 4**: If you wish to attach a live GA4 Tag, include the standard tracking script in `index.html`. The `src/utils/analytics.ts` module will automatically resolve `window.gtag` and route download/click logs there.
- **Resume PDF**: Replace `public/resume.pdf` with your actual resume document to make the download buttons active.
