import fs from 'fs';
import path from 'path';

const distRoot = path.resolve(process.cwd(), 'dist');
const generatedPrivateFiles = [path.resolve(distRoot, 'about.md')];
const publicImagesRoot = path.resolve(distRoot, 'images');
const approvedPublicImagePaths = new Set([
  path.resolve(publicImagesRoot, 'og-hs-clinic.webp'),
]);

for (const target of generatedPrivateFiles) {
  if (!target.startsWith(`${distRoot}${path.sep}`)) {
    throw new Error(`Refusing to prune a path outside dist: ${target}`);
  }
  if (fs.existsSync(target)) {
    fs.unlinkSync(target);
    console.log(`Removed private build copy: ${path.relative(distRoot, target)}`);
  }
}

if (fs.existsSync(publicImagesRoot)) {
  for (const entry of fs.readdirSync(publicImagesRoot, { recursive: true, withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const target = path.resolve(entry.parentPath, entry.name);
    if (!target.startsWith(`${publicImagesRoot}${path.sep}`)) {
      throw new Error(`Refusing to prune an image outside dist/images: ${target}`);
    }
    if (!approvedPublicImagePaths.has(target)) {
      fs.unlinkSync(target);
      console.log(`Removed unapproved asset build copy: ${path.relative(distRoot, target)}`);
    }
  }

  const directories = fs
    .readdirSync(publicImagesRoot, { recursive: true, withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.resolve(entry.parentPath, entry.name))
    .sort((a, b) => b.length - a.length);

  for (const directory of directories) {
    if (fs.readdirSync(directory).length === 0) {
      fs.rmdirSync(directory);
    }
  }
}
