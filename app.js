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

    // Akcje specjalne
    if (id === 'choose') startQuiz();

    window.scrollTo({ top: 0, behavior: 'smooth' });
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

// ── Quiz ───────────────────────────────────────────────
const questions = [
    {
        q: "Na derbowy mecz zakładasz:",
        answers: [
            { text: "Szalik i kurtkę w barwach. Innej opcji nie ma.", stal: 2, res: 0 },
            { text: "Co popadnie, byle wygodnie.",                   stal: 1, res: 1 },
            { text: "Strój w kolorach, które akurat pasują.",        stal: 0, res: 2 },
        ]
    },
    {
        q: "Twoja lojalność należy do:",
        answers: [
            { text: "Zawsze biało-niebiescy!", stal: 3, res: 0 },
            { text: "Tylko biało-czerwoni!",   stal: 0, res: 3 },
            { text: "To skomplikowane...",     stal: 1, res: 1 },
        ]
    }
];

let current = 0, stalS = 0, resS = 0;

function startQuiz() {
    current = 0;
    stalS = 0;
    resS = 0;
    renderQuestion();
}

function renderQuestion() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    if (current >= questions.length) {
        showResult();
        return;
    }

    const q = questions[current];

    container.innerHTML = `
        <p style="text-align:center; margin-bottom:20px; font-weight:500;">
            ${q.q}
        </p>
    `;

    q.answers.forEach(a => {
        const card = document.createElement('div');
        card.className = 'choice-card';
        card.innerHTML = `<p style="font-size:14px; margin:0;">${a.text}</p>`;

        card.onclick = () => {
            stalS += a.stal;
            resS  += a.res;
            current++;
            renderQuestion();
        };

        container.appendChild(card);
    });
}

async function showResult() {
    await showScreen('result', null);

    const rc = document.getElementById('result-content');
    if (!rc) return;

    const isLou = stalS > resS;
    const win = isLou
        ? "Louisem (Stal)"
        : "Ernestem (Resovia)";

    rc.innerHTML = `
        <div style="font-size:40px; margin-bottom:15px;">🧣</div>
        <h2 style="margin-bottom:10px;">Jesteś ${win}!</h2>
        <p style="color:rgba(255,255,255,0.6); font-size:14px; max-width:300px; margin:0 auto;">
            Twoje serce bije w rytmie rzeszowskich trybun.
            Czy dasz szansę komuś zza miedzy?
        </p>
    `;
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



  if (modal) modal.style.display = "none";
  if (details) details.innerHTML = "";
}
