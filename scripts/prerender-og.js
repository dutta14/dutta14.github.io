/**
 * Post-build script: generates static HTML shells for each case study page
 * with correct OG/Twitter meta tags so social media crawlers can read them.
 *
 * Similar to the blog's prerender-og.js but for portfolio case studies.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '../dist');

// Case study data (mirrors src/data/caseStudies.ts)
const caseStudies = [
  {
    slug: 'alexa-hands-free',
    title: 'Alexa Hands-Free',
    subtitle: 'Shipping the first hands-free Alexa experience on Android in India',
  },
  {
    slug: 'voice-assistant-outlook',
    title: 'Voice Assistant in Outlook',
    subtitle: 'Building one of the first production LLM features inside Microsoft 365',
  },
  {
    slug: 'm365-copilot',
    title: 'Microsoft 365 Copilot',
    subtitle: 'Shipping AI chat experiences across Outlook, Teams, and Office',
  },
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

let count = 0;
for (const cs of caseStudies) {
  const url = `https://anindya.dev/case-study/${cs.slug}`;
  const title = escapeHtml(cs.title);
  const subtitle = escapeHtml(cs.subtitle);

  const ogImage = existsSync(join(distDir, 'og', `${cs.slug}.png`))
    ? `https://anindya.dev/og/${cs.slug}.png`
    : 'https://anindya.dev/img/og-card.png';

  const metaTags = `
    <title>${title} — Case Study — Anindya Dutta</title>
    <meta name="description" content="${subtitle}" />
    <meta property="og:title" content="${title} — Case Study" />
    <meta property="og:description" content="${subtitle}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:site_name" content="Anindya Dutta" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title} — Case Study" />
    <meta name="twitter:description" content="${subtitle}" />
    <meta name="twitter:image" content="${ogImage}" />
    <link rel="canonical" href="${url}" />`;

  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, '');
  html = html.replace(/<meta name="description"[^>]*>/g, '');
  html = html.replace(/<meta property="og:[^>]*>/g, '');
  html = html.replace(/<meta name="twitter:[^>]*>/g, '');
  html = html.replace(/<link rel="canonical"[^>]*>/g, '');

  html = html.replace(
    '<meta charset="UTF-8" />',
    `<meta charset="UTF-8" />${metaTags}`
  );

  const outDir = join(distDir, 'case-study', cs.slug);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'index.html'), html);
  count++;
}

console.log(`Prerendered OG tags for ${count} case study pages`);
