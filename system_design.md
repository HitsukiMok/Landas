# Landas System Design: Neuro-Inclusive K-12 Learning Platform

## 1. Project Overview
**Landas** is an interactive, neuro-inclusive learning sanctuary designed specifically for K-12 students with ADHD, Autism, and Dyslexia. The platform moves away from high-stimulus, high-pressure traditional learning and provides a "Zero-Penalty" environment where curiosity is celebrated and executive function is supported.

---

## 2. Core Architecture

### Frontend (Client-Side)
- **Framework**: React 19 (Vite)
- **State Management**: **Zustand** (Global state for XP, Leveling, and Auth).
- **Styling**: **Tailwind CSS** (Utility-first styling with custom theme tokens).
- **Icons**: **Lucide React** (High-fidelity, scalable SVG iconography).
- **Physics Engine**: **Matter.js** (Used for interactive labs like the Anti-Gravity Sandbox).
- **Theming**: **React Context API** (Enforces GlobalThemeProvider for font, color, and motion preferences).

### Potential Backend (Server-Side)
For an Ideathon, we recommend a **BaaS (Backend as a Service)** approach for speed, or a lightweight Node.js server.
- **Option A (Speed)**: **Supabase** (PostgreSQL + Auth + Real-time).
- **Option B (Custom)**: **Node.js / Express** with **PostgreSQL (Prisma ORM)**.
- **Database Schema**:
  - `Users`: ID, email, password_hash, current_xp, level, preferred_theme.
  - `Quests`: ID, name, difficulty, category (Low/High Energy).
  - `UserQuests`: ID, user_id, quest_id, time_taken, completion_status, sanctuary_triggers.
  - `Streaks`: ID, user_id, count, freeze_available, last_active_date.

---

## 3. Tech Stack for Ideathon

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | Fast HMR, modern ecosystem, and great for rapid prototyping. |
| **Styling** | Tailwind CSS | Rapid UI development and easy implementation of theme switching. |
| **Animation** | CSS Keyframes + Framer Motion | Smooth, non-distracting transitions (crucial for neuro-inclusivity). |
| **Database** | Supabase / Firebase | Instant Auth and Database setup without managing a server. |
| **Deployment** | Vercel | Automatic CI/CD and optimized for Vite apps. |
| **AI Integration** | OpenAI / Gemini API | To generate "Actionable Insights" for the Educator Portal. |

---

## 4. Key Functional Modules

### A. The Global Theme Engine
- Physically enforces "Sanctuary" (Low-stim) vs "Arcade" (High-stim) modes.
- Supports Dyslexic-friendly typography and reduced motion profiles.

### B. Active Concept Labs
- **Physics Sandbox**: Matter.js driven 2D interaction.
- **Algebra Balancer**: Visual equation scaling.
- **Logic Gates**: Data flow routing simulations.

### C. The Adaptive Learning Profile
- Dual-view system for Student (Gamified) and Educator (Analytical).
- Tracks "Energy Load" to help parents understand when a student is reaching cognitive burnout.

---

## 5. Neuro-Inclusive Design Principles (The "Landas" Standard)
1. **Zero-Penalty Loop**: No fail states. Learning is an infinite retry process.
2. **Low-Stim UI**: Default palette (#FDFBF7, #4A5568) avoids eye strain and sensory overload.
3. **Executive Function Scaffolding**: Decomposing large tasks into micro-quests.
4. **Emotional Safety**: The "Sanctuary" breathing exercise is always one click away (via Rek the Chameleon).

---

## 6. Future Roadmap
- **Voice-to-Task**: Allowing students to answer labs using voice input.
- **Collaborative Expeditions**: Real-time multiplayer quests for social-emotional learning.
- **Educator AI Co-Pilot**: Automated IEP (Individualized Education Program) goal tracking based on dashboard analytics.
