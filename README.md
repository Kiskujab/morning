# Morning Dashboard

A premium, single-page morning dashboard built with **React + TypeScript + Tailwind CSS**, styled after Samsung One UI 6 aesthetics — a *Phantom Black* deep background, *Mystic Bronze* + crisp white accents, heavy rounded corners and frosted glassmorphism widgets.

## Features

1. **Transit Command** — live countdown to the next departures on the `45` bus route, ticking every second.
2. **Academic & Language Glance** — the day's Grade‑10 timetable (Italian lessons highlighted) plus a flippable daily Italian vocabulary flashcard.
3. **Dev & Sec Dock** — quick‑launch tiles for GitHub, Netlify, common localhost ports, and UTM lab VMs.
4. **Hyper‑Local Weather & Wardrobe** — real‑time Budapest weather (Open‑Meteo, no API key) with explicit "what to wear" and "umbrella?" advice. Falls back to cached values offline.
5. **Mechanics & Mastery Tracker** — ranked stat blocks for high‑mechanic champions (Yasuo, Akali, Zed) with win‑rate, KDA, recent‑form sparkline and quick W/L logging.
6. **Hydration & Caffeine Matrix** — one‑tap fluid tracker that animates a glassmorphism ring chart toward the daily goal, plus a caffeine counter.
7. **Deep Focus Priority Queue** — a task list split into **Frontend / Backend / Pentesting** columns with inline add + complete.

## Getting started

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Tech

- React 18 + TypeScript (strict)
- Vite 6
- Tailwind CSS 3 (custom `phantom` / `bronze` palette, glass + animation utilities)
- Open‑Meteo API for live weather

All widgets are self-contained under `src/widgets/`, share the `Widget` shell in `src/components/`, and lay out responsively in a bento grid in `src/App.tsx`.
