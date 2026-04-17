const recipes = {
  recipe1: `
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

  </div>
  `,

  recipe2: `
  <div class="recipe-card">

    <h2>Makaron Louisiana</h2>

    <p class="story">
Wyjął makaron z szafki, a następnie energicznie podbiegł do lodówki, aby wyciągnąć z niej ser i śmietankę.<br>
Na końcu sięgnął po uwielbiane w tym domu krewetki.<br>
-Co to będzie? -zapytał zaintrygowany Ernest.<br>
-Chyba makaron z krewetkami. Coś takiego. -niezbyt pewnie nazwał to danie, ale gdy zaczął je przyrządzać, nie wydawał się być całkowitym amatorem w kuchni.<br>
-Co zazwyczaj robiłeś w urodziny? -Ernest chciał skorzystać z okazji i wybadać grunt.<br>
Louis w skupieniu podrzucał krewetki na patelni i dopiero jak skończył, był gotów się odezwać.<br>
-Urodziny? -zaśmiał się. -Chlałem piwo pod Żabką, a co?
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

  </div>
  `
};

function openRecipe(recipeId) {
  const modal = document.getElementById("recipeModal");
  const details = document.getElementById("recipeDetails");

  const content = recipes[recipeId] || `
    <div class="recipe-card">
      <p>Nie znaleziono przepisu.</p>
    </div>
  `;

  details.innerHTML = content;
  modal.style.display = "block";
}

function closeRecipe() {
  const modal = document.getElementById("recipeModal");
  const details = document.getElementById("recipeDetails");

  modal.style.display = "none";
  details.innerHTML = "";
}
