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

function openRecipe(recipeId) {
  const modal = document.getElementById("recipeModal");
  const details = document.getElementById("recipeDetails");

  let content = "";

  if (recipeId === "recipe1") {
    content = `
  <div class="recipe-card">

    <h2>🥗 Sałatka z jogurtem greckim à la wujek Marek</h2>

    <p class="story">
      Wyrafinowana kompozycja inspirowana klasyczną kuchnią Europy Środkowo-Wschodniej,
      w której tradycja spotyka się z nowoczesnym podejściem do tekstury i lekkości.
      To danie redefiniuje pojęcie świeżości — chłodne, kremowe, a jednocześnie zadziorne.
    </p>

    <div class="block">
      <h3>🧾 Składniki</h3>
      <ul>
        <li>2 ogórki</li>
        <li>3–4 łyżki jogurtu greckiego</li>
        <li>ząbek czosnku</li>
        <li>sól, pieprz</li>
      </ul>
    </div>

    <div class="block">
      <h3>👩‍🍳 Przygotowanie</h3>
      <p>
        Ogórki kroimy w cienkie plastry, mieszamy z jogurtem,
        dodajemy przeciśnięty czosnek, doprawiamy do smaku.
      </p>
    </div>

  </div>;
`;
  } else if (recipeId === "recipe2") {
    content = `
    <main class="recipes">
  <div class="recipe-card">

    <h2>Makaron Louisiana</h2>

    <p class="story">
Wyjął makaron z szafki, a następnie energicznie podbiegł do lodówki, aby wyciągnąć z niej ser i śmietankę. Na końcu sięgnął po uwielbiane w tym domu krewetki. 
-Co to będzie? -zapytał zaintrygowany Ernest. 
-Chyba makaron z krewetkami. Coś takiego. -niezbyt pewnie nazwał to danie, ale gdy zaczął je przyrządzać, nie wydawał się być całkowitym amatorem w kuchni. 
-Co zazwyczaj robiłeś w urodziny? -Ernest chciał skorzystać z okazji i wybadać grunt. 
Louis w skupieniu podrzucał krewetki na patelni i dopiero jak skończył, był gotów się odezwać. -Urodziny? -zaśmiał się. -Chlałem piwo pod Żabką, a co?
    </p>

      <div class="block">
    <h3>🧾 Składniki</h3>
    <ul>
      <li>250 g krewetek (obranych)</li>
      <li>ok. 1/4 opakowania mascarpone</li>
      <li>100–150 ml śmietanki 30%</li>
      <li>ok. 50 ml mleka</li>
      <li>2–3 łyżki tartego parmezanu</li>
      <li>3 papryczki jalapeño (ze słoika)</li>
      <li>1–2 ząbki czosnku</li>
      <li>sok z cytryny</li>
      <li>sól, pieprz</li>
      <li>opcjonalnie: zioła prowansalskie</li>
      <li>makaron (np. spaghetti lub tagliatelle)</li>
      <li>odrobina masła</li>
    </ul>
  </div>

  <div class="block">
    <h3>👩‍🍳 Przygotowanie</h3>
    <p>
      Makaron ugotuj w osolonej wodzie według instrukcji na opakowaniu,
      zachowując około pół szklanki wody z gotowania.
    </p>

    <p>
      Na patelni rozpuść masło, dodaj posiekany czosnek i chwilę podsmaż.
      Wrzuć krewetki, dopraw solą i smaż około 1,5 minuty z każdej strony.
      Następnie zdejmij je z patelni i odłóż na bok.
    </p>

    <p>
      Na tej samej patelni połącz mascarpone, śmietankę i mleko.
      Podgrzewaj na małym ogniu, aż powstanie gładki, kremowy sos.
    </p>

    <p>
      Dodaj pokrojone papryczki jalapeño, sok z cytryny, sól i pieprz.
      Opcjonalnie wsyp zioła prowansalskie.
    </p>

    <p>
      Dodaj starty parmezan i mieszaj, aż sos zgęstnieje
      do kremowej konsystencji.
    </p>

    <p>
      Na koniec dodaj makaron, krewetki oraz odrobinę wody z gotowania.
      Wymieszaj dokładnie, aż sos równomiernie oblepi makaron.
    </p>
  </div>

  <div class="block">
    <h3>💡 Wskazówki</h3>
    <ul>
      <li>Jeśli sos jest za gęsty — dodaj wodę z makaronu lub mleko</li>
      <li>Jeśli za rzadki — dodaj więcej parmezanu</li>
    </ul>
  </div>

</div>;
`;
  }

  details.innerHTML = content;
  modal.style.display = "block";
}
function closeRecipe() {
  const modal = document.getElementById("recipeModal");
  const details = document.getElementById("recipeDetails");

  if (modal) modal.style.display = "none";
  if (details) details.innerHTML = "";
}
