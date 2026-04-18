/* =====================================================
   app.js – logika nawigacji i quizu (SPA)
   ===================================================== */

// Cache dla załadowanych ekranów
const screenCache = {};

// Mapowanie id → plik HTML
const SCREEN_FILES = {
    'hero':    'hero.html',
    'scene':   'scene.html',
    'choose':  'choose.html',
    'result':  'result.html',
    'recipes': 'recipes.html',
};

// ── Nawigacja ──────────────────────────────────────────
async function showScreen(id, navEl) {
    // 🔥 aktywny link w nav
    if (navEl) {
        document.querySelectorAll('.nav-link')
            .forEach(l => l.classList.remove('active'));

        navEl.classList.add('active');
    }

    // Załaduj ekran (jeśli nie ma w cache)
    await loadScreen(id);

    // Ukryj wszystkie ekrany
    document.querySelectorAll('.screen').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('animate');
    });

    // Pokaż wybrany ekran
    const target = document.getElementById(id);
    if (!target) {
        console.error('Brak ekranu:', id);
        return;
    }

    target.style.display = 'block';
    requestAnimationFrame(() => target.classList.add('animate'));

    window.scrollTo({ top: 0, behavior: 'smooth' });

// poczekaj aż layout się wyrenderuje
requestAnimationFrame(() => {
    requestAnimationFrame(() => {
        initCharRowScroll();
    });
});
}


// Ładowanie HTML do kontenera
async function loadScreen(id) {
    if (screenCache[id]) return;

    const file = SCREEN_FILES[id];
    if (!file) return;

    try {
        const res = await fetch(file);
        const html = await res.text();

        let el = document.getElementById(id);

        if (!el) {
            el = document.createElement('div');
            el.id = id;
            el.className = 'screen';
            document.getElementById('app').appendChild(el);
        }

        el.innerHTML = html;
        screenCache[id] = true;

    } catch (e) {
        console.error(`Nie można załadować ${file}:`, e);
    }
}


// ── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    // Załaduj ekran startowy
    await loadScreen('hero');

    const hero = document.getElementById('hero');

    if (hero) {
        hero.style.display = 'block';
        requestAnimationFrame(() => hero.classList.add('animate'));
    }

    // 🔥 ustaw aktywny link na start
    const firstLink = document.querySelector('.nav-link');
    if (firstLink) firstLink.classList.add('active');
});

// ── Auto-scroll przy tooltipie postaci ─────────────────
document.addEventListener('mouseover', (e) => {
    const circle = e.target.closest('.char-circle');
    const heroCard = e.target.closest('.hero-card');
    const target = circle || heroCard;
    if (!target) return;

    // tooltip tylko dla char-circle
    const tooltip = circle?.querySelector('.char-tooltip');

    setTimeout(() => {
        const rect = (tooltip ?? target).getBoundingClientRect();
        const overflowBottom = rect.bottom - window.innerHeight;

        if (overflowBottom > 0) {
            window.scrollBy({
                top: overflowBottom + 20,
                behavior: 'smooth'
            });
        }
    }, 150);
});
