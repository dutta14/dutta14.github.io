/**
 * Build-time script: generates unique OG images (1200×630 PNG) for each case study.
 * Uses satori (JSX → SVG) + sharp (SVG → PNG).
 * Runs after `vite build`.
 */
import { readFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import satori from 'satori';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '../dist/og');

// Load Inter fonts (static weights)
const regularPath = join(__dirname, 'fonts/Inter-Regular.ttf');
const boldPath = join(__dirname, 'fonts/Inter-Bold.ttf');
if (!existsSync(regularPath) || !existsSync(boldPath)) {
  console.error('Error: Font files not found at scripts/fonts/Inter-{Regular,Bold}.ttf');
  process.exit(1);
}
const interRegular = readFileSync(regularPath);
const interBold = readFileSync(boldPath);

// Case study data (mirrors src/data/caseStudies.ts)
const caseStudies = [
  {
    slug: 'alexa-hands-free',
    title: 'Alexa Hands-Free',
    subtitle: 'Shipping the first hands-free Alexa experience on Android in India',
    role: 'Software Engineer 2 / Technical Lead',
    year: '2018 - 2020',
    impact: '5M+ users in under a year',
  },
  {
    slug: 'voice-assistant-outlook',
    title: 'Voice Assistant in Outlook',
    subtitle: 'Building one of the first production LLM features inside Microsoft 365',
    role: 'Principal Software Engineering Manager',
    year: '2020 - 2022',
    impact: 'Foundation for M365 Copilot',
  },
  {
    slug: 'm365-copilot',
    title: 'Microsoft 365 Copilot',
    subtitle: 'Shipping AI chat experiences across Outlook, Teams, and Office',
    role: 'Principal Software Engineering Manager',
    year: '2022 - Present',
    impact: 'Enterprise platform, 400M+ seats',
  },
];

function truncate(str, max) {
  if (!str || str.length <= max) return str || '';
  return str.slice(0, max - 1).trim() + '…';
}

async function generateOgImage(cs) {
  const title = truncate(cs.title, 80);
  const subtitle = truncate(cs.subtitle, 120);
  const statsText = `${cs.role} · ${cs.year} · ${cs.impact}`;

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '1200px',
          height: '630px',
          display: 'flex',
          backgroundColor: '#0f172a',
          position: 'relative',
        },
        children: [
          // Teal accent bar
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                left: 0,
                top: 0,
                width: '6px',
                height: '630px',
                backgroundColor: '#0f766e',
              },
            },
          },
          // Content area
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '80px 80px 50px 80px',
                width: '100%',
                height: '100%',
              },
              children: [
                // Top: label + title + subtitle
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column' },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '16px',
                            fontWeight: 500,
                            color: '#0f766e',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                          },
                          children: 'CASE STUDY',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '52px',
                            fontWeight: 700,
                            color: '#f1f5f9',
                            lineHeight: 1.2,
                            maxWidth: '1000px',
                            marginTop: '16px',
                          },
                          children: title,
                        },
                      },
                      subtitle ? {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '24px',
                            fontWeight: 400,
                            color: '#94a3b8',
                            lineHeight: 1.4,
                            maxWidth: '1000px',
                            marginTop: '20px',
                          },
                          children: subtitle,
                        },
                      } : null,
                    ].filter(Boolean),
                  },
                },
                // Bottom: stats + author
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '18px',
                            color: '#64748b',
                          },
                          children: statsText,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '20px',
                            color: '#64748b',
                          },
                          children: 'Anindya Dutta · anindya.dev',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: interRegular, weight: 400, style: 'normal' },
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
      ],
    }
  );

  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, `${cs.slug}.png`));
}

// Main
mkdirSync(outDir, { recursive: true });

let count = 0;
for (const cs of caseStudies) {
  try {
    await generateOgImage(cs);
    count++;
  } catch (err) {
    console.warn(`Warning: Failed to generate OG image for "${cs.slug}": ${err.message}`);
  }
}

console.log(`Generated ${count} case study OG images`);
