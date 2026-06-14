// Rotating title
const titleEl = document.getElementById('rotating-title');
if (titleEl) {
    const titles = JSON.parse(titleEl.dataset.titles);
    let idx = 0;
    setInterval(() => {
        titleEl.classList.add('title-exit');
        setTimeout(() => {
            idx = (idx + 1) % titles.length;
            titleEl.textContent = titles[idx];
            titleEl.classList.remove('title-exit');
            titleEl.classList.add('title-enter');
            requestAnimationFrame(() => requestAnimationFrame(() => {
                titleEl.classList.remove('title-enter');
            }));
        }, 350);
    }, 2800);
}

// Language toggle
const langBtn = document.getElementById('lang-toggle');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        const hash = window.location.hash || '';
        const isEn = document.documentElement.lang === 'en';
        window.location.href = (isEn ? 'es.html' : 'en.html') + hash;
    });
}

// Theme toggle
const toggleBtn = document.getElementById('theme-toggle');
if (toggleBtn) {
    const updateIcon = (theme) => {
        const icon = toggleBtn.querySelector('i');
        if (icon) icon.className = theme === 'dark' ? 'las la-sun' : 'las la-moon';
    };

    updateIcon(document.documentElement.getAttribute('data-theme'));

    toggleBtn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateIcon(next);
    });
}

AOS.init();

// Dynamic experience counter
const expEl = document.getElementById('years-exp');
if (expEl) {
    const start = new Date('2023-06-01');
    const now = new Date();
    const totalMonths = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    expEl.textContent = months > 0 ? `${years}.${Math.round(months / 12 * 10)}+ years` : `${years}+ years`;
}

// Side nav dots scroll spy
const sections = document.querySelectorAll('section[id]');
const dots = document.querySelectorAll('.side-dot');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            dots.forEach(dot => dot.classList.remove('active'));
            const active = document.querySelector(`.side-dot[href="#${entry.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => observer.observe(section));
// You can also pass an optional settings object
// below listed default settings
AOS.init({
  
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});