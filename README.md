# Portfolio Website — Karthik

A beautiful, modern portfolio website built with **Tailwind CSS**, **vanilla JavaScript**, and **Chatbase AI integration**. This responsive site showcases your work, experience, and skills with stunning animations and a sleek dark theme.

## ✨ Features

- **Modern Design**: Gradient backgrounds, glass-morphism cards, smooth animations
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Chatbase Integration**: AI-powered chatbot for visitor engagement (Agent ID: E6STcuZmzvVkcTWQDwNLu)
- **Smooth Animations**: Fade-up effects, floating elements, scroll interactions
- **Fast Loading**: No heavy frameworks, just Tailwind CSS CDN + vanilla JS
- **Easy Customization**: All content lives in `data.json` — no code changes needed
- **Dark Theme**: Eye-friendly dark mode with indigo/purple accents

## 📁 Files

- `index.html` — Main HTML with Tailwind CSS and Chatbase widget
- `styles.css` — Custom animations and overrides (Tailwind handles most styling)
- `script.js` — Data loader, interactions, mobile menu, smooth scroll
- `data.json` — All content (name, experience, projects, skills, contact)
- `assets/` — Folder for your resume PDF and images
- `README.md` — This file

## 🚀 Quick Start

### 1. Customize Your Portfolio

Edit `data.json` with your information:
- `name`, `title`, `summary`, `about`
- Add your `skills`, `projects`, `experience`, `education`
- Update `contact` email, LinkedIn, GitHub links

Example:
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "contact": { "email": "you@example.com", "linkedin": "https://...", "github": "https://..." },
  "skills": ["Skill1", "Skill2", ...],
  "projects": [...],
  "experience": [...],
  "education": [...]
}
```

### 2. Add Your Resume

Place your PDF at `assets/resume.pdf` so the download button works.

### 3. Open Locally

Double-click `index.html` to view in your browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server
```

Then open `http://localhost:8000` in your browser.

## 🌐 Deploy to GitHub Pages

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Push to GitHub**:
   Create a repository on GitHub and push:
   ```bash
   git remote add origin https://github.com/yourusername/portfolio.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to **Settings** → **Pages**
   - Set source to `main` branch and root folder
   - Save — your site will be live at `https://yourusername.github.io/portfolio`

## 🤖 Chatbase Integration

Your Chatbase chatbot is already integrated with Agent ID: `E6STcuZmzvVkcTWQDwNLu`

The chat widget appears in the "Let's Talk" section. Visitors can chat directly from your portfolio!

**To change the chatbot:**
1. Get your Chatbase Agent ID
2. Find `window.embeddedChatbotConfig` in `index.html`
3. Replace `"E6STcuZmzvVkcTWQDwNLu"` with your new Agent ID

## 🎨 Customization

### Colors
Edit the Tailwind classes in `index.html` to change colors:
- `from-indigo-300 to-purple-300` → gradients
- `bg-indigo-500/20` → background colors
- Change `slate-950` to different Tailwind colors

### Fonts
Add a Google Font by updating `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

Then update the body font-family in `styles.css`.

## 📱 Browser Support

Works on all modern browsers:
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile browsers (iOS Safari, Chrome Android)

## 📞 Support

For issues or questions:
1. Check your `data.json` is valid JSON (use a JSON validator)
2. Ensure `assets/resume.pdf` exists for the download button
3. Clear browser cache if changes don't appear

## 📄 License

Free to use and modify for your personal portfolio.

---

**Built with love using Tailwind CSS & modern web technologies.**
