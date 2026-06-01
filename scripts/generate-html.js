const fs = require('fs');
const files = fs.readdirSync('public/logos').filter(f => !f.includes('BG'));

let html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Logo Check &middot; Raymond Gray</title>
<link rel="stylesheet" href="./design-tokens.css">
<link rel="stylesheet" href="./docs.css">
<style>
  .logo-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
  .logo-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; display: flex; flex-direction: column; align-items: center; background: white; }
  .logo-card img { max-width: 100%; max-height: 80px; object-fit: contain; margin-bottom: 1rem; background: #f8fafc; border: 1px dashed #94a3b8; }
  .logo-card code { font-size: 0.75rem; color: #64748b; }
</style>
</head>
<body>
<div class="he-shell">
<nav class="he-nav">
  <a class="he-nav__brand" href="#">Raymond Gray Remote Support <small>docs</small></a>
</nav>
<main>
<header>
  <p class="he-eyebrow">Visual QA</p>
  <h1 class="he-title">Logo Padding Check</h1>
  <p class="he-deck">The dashed box shows the absolute bounds of the image file. If the logo appears tiny inside the dashed box, it needs cropping.</p>
</header>
<div class="logo-grid">
`;

files.forEach(f => {
  html += `  <div class="logo-card">
    <img src="../../public/logos/${f}" alt="${f}" />
    <code>${f}</code>
  </div>\n`;
});

html += `</div>
</main>
</div>
</body>
</html>`;

fs.writeFileSync('docs/html/logo-check.html', html);
console.log('Created docs/html/logo-check.html');
