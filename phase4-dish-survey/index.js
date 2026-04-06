/**
 * Dish survey data — how answers become a protein + dish
 *
 * Flow (two steps after start):
 *   q-origin (step 1)
 *     land  → q-land-detail → deep-red → beef
 *                          → sweet-fat → pork
 *     sea   → q-sea-detail  → fin      → fish
 *                          → shell    → shrimp
 *
 * Walking the graph in code:
 * 1. Start at `data.entry` (always "q-origin").
 * 2. Load `data.survey[currentId]`. Show `question` and `options`.
 * 3. On choice: if the option has `next`, go to that survey id; if it has
 *    `outcome`, you are done — outcome is one of `data.proteins`.
 * 4. Resolve the plate with `data.dishes[outcome]`.
 *
 * `decisionMap.edges` is the same routing in edge form: from + optionId → to
 * (either another question id or a protein). Use it to draw a tree, validate
 * paths, or debug without simulating clicks.
 * `decisionMap.proteinRoutes` lists the option ids you must pick, in order,
 * to reach each protein.
 */

const data = {
  brand: "Northline Bistro",
  proteins: ["beef", "pork", "fish", "shrimp"],

  /** First question id — always begin traversal here. */
  entry: "q-origin",

  /** Question nodes: options use `next` (another key in survey) or `outcome` (protein). */
  survey: {
    "q-origin": {
      step: 1,
      question: "Are you craving land or sea tonight?",
      options: [
        {
          id: "land",
          label: "Land — cuts from the farm",
          next: "q-land-detail",
        },
        {
          id: "sea",
          label: "Sea — something from the water",
          next: "q-sea-detail",
        },
      ],
    },
    "q-land-detail": {
      step: 2,
      question: "Which land mood fits better?",
      options: [
        {
          id: "deep-red",
          label: "Bold, mineral-rich red meat",
          outcome: "beef",
        },
        {
          id: "sweet-fat",
          label: "Sweet-savory, crackling, or slow shoulder",
          outcome: "pork",
        },
      ],
    },
    "q-sea-detail": {
      step: 2,
      question: "What kind of seafood sounds right?",
      options: [
        {
          id: "fin",
          label: "Flaky fillets or whole fin fish",
          outcome: "fish",
        },
        {
          id: "shell",
          label: "Sweet pop and quick sear",
          outcome: "shrimp",
        },
      ],
    },
  },

  /** Keys match `outcome` / `data.proteins`. */
  dishes: {
    beef: {
      name: "Grilled ribeye, red wine jus",
      rationale: "Matches a steakhouse craving and deep red-meat flavor.",
    },
    pork: {
      name: "Cider-glazed pork chop, apple mostarda",
      rationale: "Plays to sweet-savory pork and caramelized edges.",
    },
    fish: {
      name: "Roasted branzino, lemon and herbs",
      rationale: "Light, flaky fin fish without the shellfish bounce.",
    },
    shrimp: {
      name: "Garlic shrimp scampi, parsley and lemon",
      rationale: "Quick, sweet shellfish with bright acid and butter.",
    },
  },

  /**
   * Parallel view of the same decisions: edges for graphs/debugging;
   * proteinRoutes spells out answer sequences → beef | pork | fish | shrimp.
   */
  decisionMap: {
    edges: [
      { from: "q-origin", optionId: "land", to: "q-land-detail" },
      { from: "q-origin", optionId: "sea", to: "q-sea-detail" },
      { from: "q-land-detail", optionId: "deep-red", to: "beef" },
      { from: "q-land-detail", optionId: "sweet-fat", to: "pork" },
      { from: "q-sea-detail", optionId: "fin", to: "fish" },
      { from: "q-sea-detail", optionId: "shell", to: "shrimp" },
    ],
    proteinRoutes: {
      beef: ["q-origin → land", "q-land-detail → deep-red"],
      pork: ["q-origin → land", "q-land-detail → sweet-fat"],
      fish: ["q-origin → sea", "q-sea-detail → fin"],
      shrimp: ["q-origin → sea", "q-sea-detail → shell"],
    },
  },
};

export { data };
