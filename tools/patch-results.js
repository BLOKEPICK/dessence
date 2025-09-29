// tools/patch-results.js
// One-command hotfix: replaces ONLY the <section id="results">...</section> in src/pages/index.astro
// Usage: node tools/patch-results.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(process.cwd(), 'src', 'pages', 'index.astro');
const newSectionPath = path.join(process.cwd(), 'src', 'partials', 'results-section-new.html');

if (!fs.existsSync(indexPath)) {
  console.error('ERROR: src/pages/index.astro not found.');
  process.exit(1);
}
if (!fs.existsSync(newSectionPath)) {
  console.error('ERROR: src/partials/results-section-new.html not found.');
  process.exit(1);
}

const original = fs.readFileSync(indexPath, 'utf8');
const replacement = fs.readFileSync(newSectionPath, 'utf8');

// Match from <section ... id="results" ...> up to the nearest closing </section>
const re = /<section[^>]*id=["']results["'][^>]*>[\s\S]*?<\/section>/i;
if (!re.test(original)) {
  console.error('ERROR: Could not find <section id="results"> in index.astro. No changes made.');
  process.exit(2);
}

// Backup original
fs.writeFileSync(indexPath + '.bak', original, 'utf8');

const updated = original.replace(re, replacement);
fs.writeFileSync(indexPath, updated, 'utf8');
console.log('✅ Hotfix applied: #results section replaced. Backup at src/pages/index.astro.bak');