import path from 'path';
import sharp from 'sharp';

const publicRoot = path.resolve(process.cwd(), 'public');
const outputPath = path.resolve(publicRoot, 'images/og-hs-clinic.webp');

if (!outputPath.startsWith(`${publicRoot}${path.sep}`)) {
  throw new Error(`Refusing to write outside public: ${outputPath}`);
}

const card = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="halo" cx="72%" cy="28%" r="72%">
      <stop offset="0" stop-color="#d4af37" stop-opacity="0.28"/>
      <stop offset="0.48" stop-color="#a88122" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#07090c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f0d77b"/>
      <stop offset="1" stop-color="#9a741c"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.035"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#07090c"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#halo)"/>
  <path d="M82 80H1118M82 550H1118" stroke="url(#line)" stroke-width="2" opacity="0.62"/>
  <circle cx="960" cy="315" r="168" fill="none" stroke="#d4af37" stroke-opacity="0.15" stroke-width="2"/>
  <circle cx="960" cy="315" r="112" fill="none" stroke="#d4af37" stroke-opacity="0.28" stroke-width="2"/>
  <path d="M865 315C895 250 1025 250 1055 315C1025 380 895 380 865 315Z" fill="none" stroke="#d4af37" stroke-opacity="0.38" stroke-width="2"/>
  <text x="90" y="246" fill="#d4af37" font-size="94" font-family="Georgia, Times New Roman, serif" font-weight="700" letter-spacing="6">HS</text>
  <text x="90" y="330" fill="#f7f4ec" font-size="62" font-family="Georgia, Times New Roman, serif" font-weight="700" letter-spacing="4">CLINIC</text>
  <text x="94" y="390" fill="#c7c9ce" font-size="24" font-family="Arial, Helvetica, sans-serif" letter-spacing="9">CAIRO EGYPT</text>
  <text x="94" y="468" fill="#e8e2d1" font-size="25" font-family="Arial, Helvetica, sans-serif" letter-spacing="1.2">Records first  |  Clinician review required</text>
</svg>`;

await sharp(Buffer.from(card)).webp({ quality: 92, effort: 5 }).toFile(outputPath);
console.log(`Generated safe social preview: ${path.relative(publicRoot, outputPath)}`);
