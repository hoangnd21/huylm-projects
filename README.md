# Front-end projects workspace

This repository is a **projects workspace** for learning front-end development. You will grow **one restaurant brand** across **seven build phases**. Each phase is a real surface of that business and a focused exercise in HTML, CSS, and JavaScript—so the work stays connected instead of feeling like seven unrelated demos.

**Working name:** *<TBD>* (rename it to whatever fits your story.)

## One restaurant, seven build phases

**Intent:** Every phase belongs to the **same** dining concept. Reuse a coherent **brand**—name, voice, colors, typography, and imagery—so you practice systems thinking, not one-off pages. When you talk about this work in a portfolio, you can honestly say you shipped **one live site** with **distinct technical milestones**, not scattered toys.

**How each phase fits the venue**

- **Multi-Page Restaurant Site** — Flagship content (menus, hours, story, contact) split across **several real pages** with working **navigation**. **Goal:** make the **structure** correct and the site **usable**—semantic HTML, sensible headings, links that move you between pages. **Do not** sink time here on polish, grids, or “final” visual design; plain, readable CSS is enough.
- **Professional Portfolio** — Same brand, now **made to look good**: typography, spacing, color, layout. Use **plenty of images** (food, space, people, mood). **Find images on the web, download them, and commit them under `/assets`** (see below)—do not hot-link random URLs in production work.
- **Landing Page with Animations** — A **campaign** or moment (seasonal menu, opening night, private dining). **Goal:** **finalize** the look and feel: refined styling plus motion—scroll-driven or entrance effects, **Intersection Observer**, **transitions** and **transforms**—so this page feels finished and intentional.
- **Interactive Quiz Platform** — Guest engagement: menu knowledge, wine pairings, dietary trivia.
- **Restaurant Finance Tracker** — Model the room: **who ate what**, **who paid what**, **revenue** vs. costs, and **profit** derived from your inputs (for example **covers**, **checks**, **headcount / employees**, wages or simple payroll assumptions). Let the UI **recalculate** totals as numbers change.
- **Weather Widget (OpenWeather)** — Surface a **weather strip or card** somewhere on the site that answers “**Is this a good night to eat out?**” (copy, icons, or simple rules from forecast data). Load conditions with the **[OpenWeather API](https://openweathermap.org/api)** (current conditions and/or forecast endpoints); keep the **API key out of the client** in production (see Deployment).
- **Employee & Task Tracker** — **Who is on the floor**, **who owns what**, **assign tasks to people by name**, and **add or remove** team members from the roster. Keep it in-world (FOH/BOH, shifts, prep) so it reads as restaurant ops, not a generic todo app.

**How you organize files is up to you.** This README does **not** prescribe folders or URLs that must “match” the table below, except: for **phase 2**, keep downloaded images in an `**/assets`** directory at the **repository root** (e.g. `assets/hero.jpg`, `assets/menu-*.webp`) so paths stay predictable and assets ship with the deploy. One practical tip: an `**index.html` at the repository root** aligns with Vercel’s default **Root Directory** (the repo root), which keeps deployment simple. Prefer **shared tokens** (CSS variables, typography) and a single tone of voice wherever files actually live.

## Projects overview


| #   | Project                      | Primary Focus    | Key Concepts & Architectural Decisions                                                                                                                            |
| --- | ---------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Multi-Page Restaurant Site   | HTML (structure) | Multiple pages, working navigation, semantic HTML; **function over styling**—only enough CSS to make content readable and navigable                               |
| 2   | Professional Portfolio       | HTML & CSS       | Visual polish: CSS variables (theming), layout and positioning; **many images** found online, **saved under `/assets`**, optimized formats and sizes              |
| 3   | Landing Page with Animations | CSS & Basic JS   | **Finalize styling** for a campaign-quality page; scroll/entrance animations, Intersection Observer, CSS transitions and transforms                               |
| 4   | Dish Quiz Platform           | Simple JS        | DOM Manipulation, Event Delegation, Array methods (map, filter)                                                                                                   |
| 5   | Restaurant Finance Tracker   | Simple JS        | LocalStorage persistence, Form handling, basic State Management, Derived totals (revenue, per-head spend, profit) from inputs such as employees and who paid what |
| 6   | Weather Widget (OpenWeather) | Complex JS       | Asynchronous JS (Async/Await), Fetch API, [OpenWeather API](https://openweathermap.org/api) integration, UX copy tied to “good night to dine out”                 |
| 7   | Employee & Task Tracker      | Complex JS       | Data structures (roster, assignments), Add/remove people by name, Assign tasks to named staff, DOM updates, Event delegation                                      |


## Deployment

Deploy the whole workspace as **one application** on **[Vercel](https://vercel.com)**.

1. **One Vercel project** — Link this Git repository to a **single** Vercel project. You get **one production URL**; all seven phases are part of that site, not seven separate Vercel apps.
2. **Root Directory** — Use the **repository root** (Vercel’s default when you import the repo). That way whatever you keep at the top level—starting with something like `index.html`—is what gets served.
3. **Framework preset** — Choose **Other** or a **static** setup if you are serving plain HTML/CSS/JS. If you add a build tool later, switch the preset and set **Output Directory** in the project settings to match your build output.
4. **Environment variables** — Store your **OpenWeather API key** (and any other secrets) in Vercel **Project Settings → Environment Variables**, not in committed source. Expose them to the client **only** if you accept the tradeoff (prefer serverless or build-time patterns for production); use **Preview** vs **Production** values if you want separate keys per environment.

For the full platform overview, start with [Vercel Documentation](https://vercel.com/docs).