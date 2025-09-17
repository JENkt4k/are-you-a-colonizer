# Are You a Colonizer? — React PWA

A fun, educational Progressive Web App (PWA) that helps users explore the historical distinction between **colonizers** and **immigrants** through a guided decision-tree.

---

## 🚀 Current Functionality

- **Decision Tree UI**
  - Series of structured questions with Yes/No/Unknown options.
  - Covers timing of migration, participation in colonial projects, forced migration, and colonization of origin country.

- **Classification Categories**
  - Colonizer (foundational/participatory)
  - Colonizer (arrival during colonial period)
  - Immigrant (to a settler-colonial state)
  - Immigrant (origin colonized elsewhere later)
  - Enslaved/Forced (distinct category)
  - Inconclusive (requires more data)

- **Persistent State**
  - Answers saved to `localStorage` so progress is not lost on refresh.

- **Result Display**
  - Dynamic result card with color-coded background, label, and explanation.

- **Share to Clipboard**
  - Copy summary of answers + result for sharing or discussion.

- **PWA Ready**
  - Works offline with vite-plugin-pwa.
  - Installable on desktop and mobile devices.

- **UI/UX Details**
  - Tailwind CSS styling.
  - Accessible radio button groups.
  - Reset button for clearing all answers.

---

## 📋 Planned Functionality

- **Regional Timelines**
  - JSON dataset of colonial periods by region.
  - Automatic classification based on arrival year + location.

- **Timeline Input**
  - Allow users to enter ancestral arrival year and place, then compute colonizer/immigrant status against regional data.

- **Advanced Results**
  - Show visual timeline and highlight where user ancestry fits.
  - Provide references to historical sources.

- **Data Export/Import**
  - Save results as JSON file.
  - Load answers from JSON for sharing or classroom use.

- **Multilingual Support (i18n)**
  - English, Spanish, and other languages.

- **Expanded Categories**
  - Add distinctions like: Indigenous, Mixed status (e.g., colonizer + colonized ancestry).

- **Accessibility Enhancements**
  - ARIA roles, screen-reader labels.
  - High-contrast mode.

- **Mobile Optimizations**
  - Touch-friendly controls.
  - Homescreen-friendly layout.

---

## 🛠️ Development Setup

1. Create the project:
   ```bash
   npm create vite@latest are-you-a-colonizer -- --template react-ts
   cd are-you-a-colonizer && npm i
   ```

2. Add PWA support:
   ```bash
   npm i -D vite-plugin-pwa workbox-window
   ```

3. Copy code:
   - Replace `src/App.tsx` with the app code.
   - Add icons (192x192, 512x512, maskable 512x512) into `/public`.
   - Configure `vite.config.ts` with vite-plugin-pwa.

4. Run locally:
   ```bash
   npm run dev
   ```

5. Build & preview:
   ```bash
   npm run build && npm run preview
   ```

6. Install to device:
   - Open in Chrome/Edge/Firefox and use the "Install App" option.

---

## 📜 Notes

- This tool is **educational** and applies historical definitions, not personal judgments.
- Colonial period boundaries vary by region; results are general unless paired with local datasets.
- Forced migration (e.g., enslaved Africans, indentured laborers) is categorized separately.

---

## 📅 Roadmap

- [ ] Add regional datasets
- [ ] Implement timeline-based decision logic
- [ ] JSON export/import
- [ ] i18n (Spanish, others)
- [ ] Accessibility pass
- [ ] Deploy demo (Netlify/Vercel)

---

## 📄 License

MIT License — free to use, modify, and share.

