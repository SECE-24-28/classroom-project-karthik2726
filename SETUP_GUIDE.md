# 🚀 Portfolio Setup Guide

## Your Portfolio is Ready! 

I've built you a **stunning, modern portfolio website** with:
✨ **Tailwind CSS** — beautiful, responsive design
🤖 **Chatbase AI Integration** — Agent ID: `E6STcuZmzvVkcTWQDwNLu`
⚡ **Smooth Animations** — floating hero, fade-up effects
📱 **Fully Responsive** — perfect on mobile & desktop
💜 **Dark Theme** — eye-friendly indigo/purple color scheme

---

## ⚡ Quick Setup (5 mins)

### Step 1: Edit `data.json` with YOUR Info

Open `data.json` and fill in:
- **name** → Your name
- **title** → Your job title
- **summary** → 1-line tagline
- **about** → 2-3 sentence bio
- **contact.email** → Your email
- **contact.linkedin** → Your LinkedIn URL
- **contact.github** → Your GitHub URL
- **skills** → List your skills
- **projects** → Add your projects (name, description, link)
- **experience** → Add your work history
- **education** → Add your degrees

### Step 2: Add Your Resume PDF

Copy your `Karthik Resume Final 1...pdf` to:
```
d:/clg/Kart Port/assets/resume.pdf
```

The download button will work automatically!

### Step 3: Preview Locally

Option A - Double-click `index.html` to open in browser

Option B - Run a local server in PowerShell:
```powershell
cd "d:\clg\Kart Port"
python -m http.server 8000
# Then open: http://localhost:8000
```

---

## 🌐 Deploy to GitHub Pages (FREE!)

### Option 1: Using Git (Recommended)

1. **Initialize Git** in PowerShell:
```powershell
cd "d:\clg\Kart Port"
git init
git add .
git commit -m "My awesome portfolio"
```

2. **Create GitHub repo** at https://github.com/new
   - Name it: `portfolio` or `karthik-portfolio`
   - Click "Create repository"

3. **Push to GitHub** from PowerShell:
```powershell
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

4. **Enable GitHub Pages**:
   - Go to your repo → **Settings** → **Pages**
   - Source: `Deploy from a branch`
   - Branch: `main` → `root`
   - Click **Save**
   - Wait 2 mins → Your site is live at: `https://YOUR_USERNAME.github.io/portfolio`

### Option 2: Drag & Drop (Netlify)

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your portfolio repo
5. Click "Deploy"
6. Your site is live (Netlify gives a free domain)

---

## 🎨 Customization Tips

### Change Colors
Edit the **Tailwind classes** in `index.html`:
- `from-indigo-400 to-purple-500` → gradient colors
- `slate-950` → background color
- `indigo-300` → accent color

Example: To make it green, replace `indigo` with `emerald` and `purple` with `green`

### Add Your Avatar
Replace the placeholder in hero section:
```html
<i class="fas fa-code text-6xl text-indigo-400 mb-4"></i>
```

With an image:
```html
<img src="assets/avatar.jpg" alt="Karthik" class="w-32 h-32 rounded-full border-4 border-indigo-500">
```

### Change Font
Add Google Font in `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

Then update CSS in `styles.css`:
```css
body { font-family: 'Poppins', sans-serif; }
```

---

## 🤖 Chatbase Widget

Your chatbot is already integrated! Visitors can chat in the "Let's Talk" section.

**To change the chatbot ID:**
1. Open `index.html`
2. Find: `"chatbotId": "E6STcuZmzvVkcTWQDwNLu"`
3. Replace with your new ID from https://chatbase.co

---

## 📱 Mobile Preview

All devices supported:
- ✅ iPhone, iPad, Android
- ✅ Desktop (Chrome, Firefox, Safari, Edge)
- ✅ Tablets

Test responsive design: Press `F12` → Toggle Device Toolbar (Ctrl+Shift+M)

---

## 🔧 Troubleshooting

### Website won't load locally?
- Right-click `index.html` → "Open with" → Browser
- Or use Python server: `python -m http.server 8000`

### data.json not loading?
- Check JSON syntax: Use https://jsonlint.com
- Ensure file is in the same folder as `index.html`

### PDF download doesn't work?
- Rename your PDF to `resume.pdf`
- Place it in `d:/clg/Kart Port/assets/`
- Refresh browser (Ctrl+Shift+R)

### GitHub Pages not updating?
- Wait 2-3 minutes after pushing
- Clear browser cache (Ctrl+Shift+Delete)
- Try incognito/private browsing

---

## 📧 Next Steps

1. ✅ Edit `data.json` with your real information
2. ✅ Add your resume PDF to `assets/`
3. ✅ Test locally
4. ✅ Push to GitHub Pages
5. ✅ Share your new portfolio! 🎉

---

**Your portfolio is production-ready. Customize it, deploy it, and showcase your work!**

Built with ❤️ using Tailwind CSS, vanilla JS, and your Chatbase AI assistant.
