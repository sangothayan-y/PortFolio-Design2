# Sangothayan | Portfolio Website

A personal portfolio website for Sangothayan — BICT (Hons) undergraduate at the University of Vavuniya, backend software development enthusiast (Java, Spring Boot, MySQL). Built as a fully static site with vanilla HTML, CSS, and JavaScript.

🔗 **Live site:** _add your GitHub Pages / custom domain link here_
📄 **Repo:** [sangothayan-y/portfolio-website]([https://github.com/sangothayan-y/portfolio-website](https://sangothayan-y.github.io/sangothayan/))

---

## ✨ Features

- **Dark / light theme toggle** — persists across visits via `localStorage`, with `prefers-color-scheme` fallback for first-time visitors
- **Scroll-reveal animations** — sections and cards animate in using `IntersectionObserver`
- **Responsive, glassmorphism navbar** — shrinks on scroll, fully responsive on mobile
- **Certificate lightbox modal** — click any certificate to view a larger image or open the original PDF/download it
- **Project detail modal** — expandable cards showing problem, solution, tags, and links for each project
- **Contact section** — with confirmation modal on message send
- **Downloadable CV** — embedded PDF viewer/download link

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Main page markup (all sections)
├── style.css                # Theme system, layout, animations
├── script.js                 # Navigation, theme toggle, modals, animations
├── assets/
│   ├── images/                # Profile photos, misc site images
│   ├── certs/                  # Certificate images/PDFs (see certs README)
│   └── projects/               # Project thumbnails and CV
└── README.md
```

## 🧩 Sections

`Home` → `About Me` → `Education` → `Skills` → `Projects` → `Experience` → `Curriculum Vitae` → `Let's Connect`

**Featured projects:** Pharmacy Management System, Ride Booking System, Secret Garden Flower Shop, Simple Chatbot GUI, Passenger Count App

## 🛠️ Tech Stack

- HTML5, CSS3 (custom properties / CSS variables for theming)
- Vanilla JavaScript (no frameworks or build step)
- [Font Awesome](https://fontawesome.com/) for icons
- Google Fonts — Poppins & Nunito

## 🚀 Running Locally

No build tools or dependencies required.

1. Clone the repo:
   ```bash
   git clone https://github.com/sangothayan-y/portfolio-website.git
   cd portfolio-website
   ```
2. Open `index.html` directly in your browser, **or** serve it locally (recommended, avoids relative-path issues):
   ```bash
   # Using VS Code Live Server extension, or:
   python -m http.server 8000
   ```
3. Visit `http://localhost:8000`

## 🌐 Deployment

This is a static site, so it can be hosted anywhere that serves static files — GitHub Pages, Netlify, Vercel, etc.

**GitHub Pages:**
1. Push to the `main` branch
2. Repo → Settings → Pages → set source to `main` / root (or `/docs` if you move files there)
3. Site will be live at `https://sangothayan-y.github.io/portfolio-website/`

## 📝 Adding Certificates

See `assets/certs/README.txt` for exact filenames the site looks for — drop a matching image in and it appears automatically; if it's missing, the card just falls back to its icon.

## 📬 Contact

- **GitHub:** [github.com/sangothayan-y](https://github.com/sangothayan-y)
- **LinkedIn:** [Yoganantham Sangothayan](https://www.linkedin.com/in/yoganantham-sangothayan-244068396/)

---

*Built with plain HTML/CSS/JS as part of a Systems Analysis & Design (SAD) coursework project.*
