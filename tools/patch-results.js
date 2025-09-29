// tools/patch-results.js
// Usage: node tools/patch-results.js
// It will back up src/pages/index.astro to index.astro.bak and replace ONLY <section id="results">...</section>
// with the contents of src/partials/results-section-new.html

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

// Regex: match from <section ... id="results" ...> up to the closing </section>
const re = /<section[^>]*id=["']results["'][^>]*>[\s\S]*?<\/section>/i;

if (!re.test(original)) {
  console.error('ERROR: Could not find <section id="results"> in index.astro. No changes made.');
  process.exit(2);
}

// Backup
fs.writeFileSync(indexPath + '.bak', original, 'utf8');

// Replace once
const updated = original.replace(re, replacement);
fs.writeFileSync(indexPath, updated, 'utf8');

console.log('✅ Patched: replaced the results section only. Backup at src/pages/index.astro.bak');
