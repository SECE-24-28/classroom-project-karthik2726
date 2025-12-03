// Mobile menu toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}

function closeMobileMenu() {
  document.getElementById('mobileMenu').classList.add('hidden');
}

document.getElementById('mobileMenuBtn')?.addEventListener('click', toggleMobileMenu);

// Load data.json and populate the page
async function loadData() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('data.json not found');
    const data = await res.json();
    
    // Store globally so fallback chat can access it
    window.__portfolioData = data;

    // Update all name/title fields
    ['navName', 'heroName', 'pageTitle', 'footerName'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = data.name;
    });

    document.getElementById('pageTitle').textContent = `${data.name} — Portfolio`;
    document.getElementById('heroTitle').textContent = data.title;
    document.getElementById('heroSummary').textContent = data.summary;
    document.getElementById('aboutText').textContent = data.about;
    document.getElementById('emailLink').href = 'mailto:' + data.contact.email;
    document.getElementById('emailLink').textContent = data.contact.email;

    // Update social links if available (apply to any page anchors containing the icons)
    if (data.contact.linkedin) {
      const linkedinIcons = document.querySelectorAll('a .fa-linkedin');
      linkedinIcons.forEach(icon => {
        if (icon && icon.parentElement) {
          icon.parentElement.setAttribute('href', data.contact.linkedin);
          icon.parentElement.setAttribute('target', '_blank');
        }
      });
    }
    if (data.contact.github) {
      const githubIcons = document.querySelectorAll('a .fa-github');
      githubIcons.forEach(icon => {
        if (icon && icon.parentElement) {
          icon.parentElement.setAttribute('href', data.contact.github);
          icon.parentElement.setAttribute('target', '_blank');
        }
      });
    }

    // Render skills with Tailwind classes
    const skillsList = document.getElementById('skillsList');
    if (skillsList) {
      skillsList.innerHTML = '';
      (data.skills || []).forEach((skill, idx) => {
        const span = document.createElement('span');
        span.className = 'skill-pill inline-block bg-indigo-500/20 text-indigo-200 px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-500/40 transition cursor-default';
        span.textContent = skill;
        span.style.animationDelay = `${idx * 0.05}s`;
        skillsList.appendChild(span);
      });
    }

    // Render projects
    const projectsGrid = document.getElementById('projectsGrid');
    if (projectsGrid) {
      projectsGrid.innerHTML = '';
      (data.projects || []).forEach((p, idx) => {
        const el = document.createElement('div');
        el.className = 'project-card glass rounded-xl p-6 hover:shadow-2xl hover:shadow-indigo-500/20 fade-up';
        el.innerHTML = `
          <h3 class="text-xl font-semibold text-indigo-300 mb-2">${p.name}</h3>
          <p class="text-slate-400 mb-4 text-sm">${p.description}</p>
          ${p.tech ? `<p class="text-slate-500 text-xs mb-4">Tech: ${p.tech}</p>` : ''}
          <div class="flex gap-3">
            ${p.link && p.link !== '#' ? `<a href="${p.link}" target="_blank" class="inline-block text-indigo-400 hover:text-indigo-300 font-medium transition"><i class="fas fa-external-link mr-1"></i>View</a>` : ''}
            ${p.github && p.github !== '#' ? `<a href="${p.github}" target="_blank" class="inline-block text-indigo-400 hover:text-indigo-300 font-medium transition"><i class="fab fa-github mr-1"></i>Code</a>` : ''}
          </div>
        `;
        el.style.animationDelay = `${idx * 0.1}s`;
        projectsGrid.appendChild(el);
      });
    }

    // Render experience
    const exp = document.getElementById('experienceList');
    if (exp) {
      exp.innerHTML = '';
      (data.experience || []).forEach((e, idx) => {
        const node = document.createElement('div');
        node.className = 'experience-item glass rounded-xl p-6 border-l-4 border-indigo-500 fade-up';
        node.innerHTML = `
          <div class="flex justify-between items-start mb-2 flex-col md:flex-row">
            <div>
              <h3 class="text-xl font-semibold text-indigo-300">${e.role}</h3>
              <p class="text-slate-300 font-medium">${e.company}</p>
            </div>
            <span class="text-slate-400 text-sm mt-2 md:mt-0">${e.period}</span>
          </div>
          <p class="text-slate-400">${e.details}</p>
          ${e.achievements ? `<div class="mt-3 text-slate-400 text-sm"><strong>Key Achievements:</strong><br>${e.achievements}</div>` : ''}
        `;
        node.style.animationDelay = `${idx * 0.1}s`;
        exp.appendChild(node);
      });
    }

    // Render education
    const edu = document.getElementById('educationList');
    if (edu) {
      edu.innerHTML = '';
      (data.education || []).forEach((ed, idx) => {
        const node = document.createElement('div');
        node.className = 'glass rounded-xl p-6 border-t-4 border-purple-500 fade-up';
        node.style.animationDelay = `${idx * 0.1}s`;
        node.innerHTML = `
          <h3 class="text-lg font-semibold text-indigo-300 mb-1">${ed.degree}</h3>
          <p class="text-slate-300 font-medium">${ed.institution}</p>
          <p class="text-slate-400 text-sm mt-2">${ed.year}</p>
          ${ed.details ? `<p class="text-slate-400 text-sm mt-3">${ed.details}</p>` : ''}
        `;
        edu.appendChild(node);
      });
    }

  } catch (err) {
    console.warn('Could not load data.json — using defaults.', err);
  }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      closeMobileMenu();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Intersection Observer for fade-up animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-up');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .experience-item').forEach(el => {
  observer.observe(el);
});

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  
  // Initialize Chatbase widget with enhanced retry logic
  if (window.embeddedChatbotConfig) {
    console.log('Chatbase widget initialized with ID:', window.embeddedChatbotConfig.chatbotId);
    
    // Check if Chatbase has loaded within 5 seconds
    setTimeout(() => {
      try {
        const container = document.getElementById('chatbaseWidget');
        if (container && container.children.length === 0) {
          console.log('Chatbase widget not loaded after 5 seconds, showing fallback');
          // Provide an email-based chat fallback
          container.innerHTML = `
            <div class="p-6 space-y-4">
              <p class="text-slate-300 text-center text-sm mb-4">Send me a message directly:</p>
              <textarea id="fallbackMessage" rows="3" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500" placeholder="Type your message here..."></textarea>
              <div class="flex justify-center gap-3">
                <button id="sendFallback" class="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-lg text-white font-medium transition">
                  <i class="fas fa-paper-plane mr-2"></i>Send
                </button>
                <a id="openLinkedInFallback" target="_blank" class="px-6 py-2 border border-indigo-500 rounded-lg text-indigo-400 hover:text-indigo-300 font-medium transition">
                  <i class="fab fa-linkedin mr-2"></i>LinkedIn
                </a>
              </div>
            </div>`;
          
          const data = window.__portfolioData || {};
          const linkedinUrl = (data.contact && data.contact.linkedin) || '#';
          const email = (data.contact && data.contact.email) || 'hello@example.com';
          
          document.getElementById('openLinkedInFallback').href = linkedinUrl;
          
          document.getElementById('sendFallback').addEventListener('click', () => {
            const msg = document.getElementById('fallbackMessage').value || 'Hello, I have a question...';
            const subject = encodeURIComponent('Portfolio Inquiry');
            const body = encodeURIComponent(msg);
            window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
          });
        }
      } catch (e) {
        console.error('Error setting up chat fallback:', e);
      }
    }, 5000);
  }
  
  // Try to load user-provided avatar (PNG or JPG).
  // Use a simple image load strategy without fetch HEAD requests.
  (function tryLoadUserAvatar(){
    const avatarEl = document.getElementById('avatarImg');
    if (!avatarEl) return;
    
    const candidates = [
      'assets/avatar.png',
      'assets/avatar.jpg',
      'assets/ProfPic.png',
      'assets/ProfPic.jpg'
    ];
    
    let index = 0;
    function tryNext() {
      if (index >= candidates.length) {
        console.log('No user avatar found, keeping SVG fallback');
        return;
      }
      
      const url = candidates[index];
      const testImg = new Image();
      testImg.onload = function() {
        console.log('User avatar loaded:', url);
        avatarEl.src = url + '?v=' + Date.now();
        avatarEl.style.objectFit = 'cover';
      };
      testImg.onerror = function() {
        console.log('Avatar not found at:', url);
        index++;
        tryNext();
      };
      testImg.src = url;
    }
    
    tryNext();
  })();

  // Create a floating chat button and panel (site-wide)
  (function createFloatingChat() {
    try {
      // Don't create twice
      if (document.getElementById('floatingChatBtn')) return;

      const btn = document.createElement('button');
      btn.id = 'floatingChatBtn';
      btn.title = 'Chat with me';
      btn.className = 'fixed bottom-6 right-6 z-60 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center';
      btn.style.width = '56px';
      btn.style.height = '56px';
      btn.style.border = 'none';
      btn.innerHTML = '<i class="fas fa-comment-alt" style="font-size:18px"></i>';

      const panel = document.createElement('div');
      panel.id = 'floatingChatPanel';
      panel.className = 'fixed bottom-20 right-6 z-60 w-80 md:w-96 h-[520px] bg-slate-900/95 rounded-xl border border-slate-700/30 shadow-xl hidden flex flex-col overflow-hidden';
      panel.style.backdropFilter = 'blur(6px)';

      // Header
      const header = document.createElement('div');
      header.className = 'flex items-center justify-between px-4 py-2 border-b border-slate-700/20';
      const title = document.createElement('div');
      title.className = 'text-sm font-semibold text-indigo-300';
      title.textContent = 'Chat Assistant';
      const closeBtn = document.createElement('button');
      closeBtn.className = 'text-slate-300 hover:text-white';
      closeBtn.innerHTML = '<i class="fas fa-times"></i>';
      closeBtn.onclick = () => { panel.classList.add('hidden'); };
      header.appendChild(title);
      header.appendChild(closeBtn);

      // Content container for iframe or widget
      const content = document.createElement('div');
      content.id = 'floatingChatIframeContainer';
      content.className = 'flex-1 bg-transparent';
      content.style.minHeight = '0';

      panel.appendChild(header);
      panel.appendChild(content);

      // Append to body
      document.body.appendChild(panel);
      document.body.appendChild(btn);

      let floatingLoaded = false;

      function buildChatSrc() {
        const id = encodeURIComponent(window.embeddedChatbotConfig?.chatbotId || window.chatbotId || '');
        const params = new URLSearchParams();
        if (id) {
          params.set('chatbotId', id);
          params.set('botId', id);
          params.set('agentId', id);
          params.set('id', id);
        }
        return `https://www.chatbase.co/chat?${params.toString()}`;
      }

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (panel.classList.contains('hidden')) {
          panel.classList.remove('hidden');
          // Lazy-load iframe only once
          if (!floatingLoaded) {
            const iframe = document.createElement('iframe');
            iframe.style.border = 'none';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.display = 'block';
            iframe.style.borderRadius = '8px';
            iframe.setAttribute('aria-label', 'Chat assistant');
            iframe.src = buildChatSrc();
            // Add small timeout in case Chatbase needs query params set globally
            content.appendChild(iframe);
            floatingLoaded = true;
          }
        } else {
          panel.classList.add('hidden');
        }
      });

      // Close on ESC
      document.addEventListener('keydown', (ev) => {
        if (ev.key === 'Escape') panel.classList.add('hidden');
      });

    } catch (e) {
      console.error('Failed creating floating chat UI', e);
    }
  })();

      // Debug banner to display resolved Chatbase ID values
      (function addChatDebugBanner(){
        try {
          if (document.getElementById('chatDebugBanner')) return;
          const banner = document.createElement('div');
          banner.id = 'chatDebugBanner';
          banner.style.position = 'fixed';
          banner.style.top = '16px';
          banner.style.right = '16px';
          banner.style.zIndex = '99999';
          banner.style.background = 'rgba(15,23,42,0.85)';
          banner.style.color = '#E6EEF8';
          banner.style.padding = '10px 12px';
          banner.style.borderRadius = '8px';
          banner.style.fontSize = '12px';
          banner.style.boxShadow = '0 8px 20px rgba(2,6,23,0.6)';
          banner.style.maxWidth = '320px';
          banner.style.fontFamily = "Segoe UI, Roboto, Arial, sans-serif";
          banner.style.lineHeight = '1.2';

          const close = document.createElement('button');
          close.innerHTML = '\u2715';
          close.title = 'Close debug banner';
          close.style.float = 'right';
          close.style.marginLeft = '8px';
          close.style.background = 'transparent';
          close.style.border = 'none';
          close.style.color = '#cbd5e1';
          close.style.cursor = 'pointer';
          close.onclick = () => banner.remove();

          const header = document.createElement('div');
          header.style.display = 'flex';
          header.style.justifyContent = 'space-between';
          header.style.alignItems = 'center';
          const h = document.createElement('div');
          h.textContent = 'Chatbase Debug';
          h.style.fontWeight = '600';
          h.style.marginRight = '8px';
          header.appendChild(h);
          header.appendChild(close);

          const body = document.createElement('div');
          body.style.marginTop = '6px';

          // Read meta tags
          const metaChatbot = document.querySelector('meta[name="chatbase-chatbot-id"]')?.getAttribute('content') || '';
          const metaBot = document.querySelector('meta[name="chatbase-bot-id"]')?.getAttribute('content') || '';
          const metaAgent = document.querySelector('meta[name="chatbase-agent-id"]')?.getAttribute('content') || '';

          // Read JSON config script
          let jsonCfg = {};
          try {
            const cfgEl = document.getElementById('chatbase-config');
            if (cfgEl) jsonCfg = JSON.parse(cfgEl.textContent || '{}');
          } catch (e) { jsonCfg = {}; }

          // Read globals
          const globalCfg = window.embeddedChatbotConfig || {};
          const globalBot = window.chatbotId || window.botId || window.agentId || '';

          const rows = [
            ['meta(chatbotId)', metaChatbot],
            ['meta(botId)', metaBot],
            ['meta(agentId)', metaAgent],
            ['json.chatbotId', jsonCfg.chatbotId || ''],
            ['json.botId', jsonCfg.botId || ''],
            ['json.agentId', jsonCfg.agentId || ''],
            ['window.embeddedChatbotConfig', JSON.stringify(globalCfg)],
            ['window.chatbotId/botId/agentId', globalBot]
          ];

          rows.forEach(([k,v]) => {
            const line = document.createElement('div');
            line.style.marginTop = '4px';
            line.innerHTML = `<strong style="color:#93C5FD">${k}:</strong> <span style="color:#E6EEF8">${v || '<empty>'}</span>`;
            body.appendChild(line);
          });

          banner.appendChild(header);
          banner.appendChild(body);
          document.body.appendChild(banner);
        } catch (e) {
          console.error('Failed to create chat debug banner', e);
        }
      })();

});
async function resolveResumeAsset() {
  const embed = document.getElementById('resumeEmbed');
  const img = document.getElementById('resumeImg');
  const missing = document.getElementById('resumeMissing');
  const downloadLink = document.getElementById('downloadResumeLink');
  try {
    // Try PDF first
    const pdfRes = await fetch('assets/resume.pdf', { method: 'HEAD' });
    if (pdfRes && pdfRes.ok) {
      if (embed) embed.style.display = 'block';
      if (img) img.style.display = 'none';
      if (missing) missing.style.display = 'none';
      if (downloadLink) downloadLink.href = 'assets/resume.pdf';
      return;
    }
  } catch (e) {
    // ignore
  }
  try {
    const jpgRes = await fetch('assets/resume.jpg', { method: 'HEAD' });
    if (jpgRes && jpgRes.ok) {
      if (embed) embed.style.display = 'none';
      if (img) img.style.display = 'block';
      if (missing) missing.style.display = 'none';
      if (downloadLink) downloadLink.href = 'assets/resume.jpg';
      return;
    }
  } catch (e) {
    // ignore
  }
  // neither found
  if (embed) embed.style.display = 'none';
  if (img) img.style.display = 'none';
  if (missing) missing.style.display = 'block';
  if (downloadLink) downloadLink.href = '#';
}

// Run after DOMContentLoaded to determine resume asset availability
document.addEventListener('DOMContentLoaded', resolveResumeAsset);

// Navbar background on scroll
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('bg-slate-950/80');
  } else {
    nav.classList.remove('bg-slate-950/80');
  }
});
