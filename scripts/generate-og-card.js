import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0f172a"/>
  <rect x="0" y="0" width="6" height="630" fill="#0f766e"/>
  <text x="80" y="260" font-family="system-ui, -apple-system, sans-serif" font-size="64" font-weight="700" fill="#f1f5f9">Anindya Dutta</text>
  <text x="80" y="320" font-family="system-ui, -apple-system, sans-serif" font-size="28" fill="#94a3b8">Principal Software Engineering Manager</text>
  <text x="80" y="410" font-family="system-ui, -apple-system, sans-serif" font-size="22" fill="#0f766e">M365 Copilot · Alexa Hands-Free · Voice AI · 1 Patent</text>
  <text x="80" y="560" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#64748b">anindya.dev</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(__dirname, '../public/img/og-card.png'));
console.log('Generated og-card.png');
