# Group 2 – ACSAD Automata Lab Portfolio

Lavender Haze themed lab portfolio for Group 2, hosted on Vercel.  
Mirrors the structure of the main [ACSAD-AUTOMATA](https://github.com/Jerothegreat/ACSAD-AUTOMATA) repo for seamless integration.

---

## 🚀 Running Locally

```bash
npm install
npm run dev
```

## ☁️ Deploying to Vercel

1. Push this repo to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Vercel auto-detects Vite — just click Deploy

---

## 📁 Project Structure

```
group2-automata/
├── index.html                  ← Main shell (mirrors Jero's index.html structure)
├── src/
│   ├── app.js                  ← App logic (mirrors src/app.js)
│   └── style.css               ← Lavender Haze theme (mirrors src/style.css)
├── groups/
│   └── group2/
│       ├── info.json           ← Group metadata + lab act definitions
│       ├── DivisionAlgorithm.js
│       ├── EuclideanAlgorithm.js
│       ├── CollatzSequence.js
│       ├── PalindromeChecker.js
│       ├── Fibonacci.js
│       ├── Lucas.js
│       ├── Tribonacci.js
│       └── screenshots/        ← Add screenshots here
├── package.json
├── vite.config.js
└── vercel.json
```

---

## 🔗 Integrating into the Main Repo

When you're ready to integrate into [Jerothegreat/ACSAD-AUTOMATA](https://github.com/Jerothegreat/ACSAD-AUTOMATA):

1. Copy the entire `groups/group2/` folder into the main repo's `groups/` directory
2. That's it — the main `app.js` will auto-discover Group 2 from `info.json`

---

## ✏️ Updating Member Names

Open `groups/group2/info.json` and edit the `"members"` array:

```json
"members": [
  "Your Name",
  "Teammate Name",
  ...
]
```

## 📸 Adding Screenshots

Drop PNG screenshots into `groups/group2/screenshots/` matching the filenames in `info.json`.
