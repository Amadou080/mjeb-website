const fs = require('fs');
const path = require('path');

const galleryDir = path.join(__dirname, 'client', 'public', 'gallery');

const subdirs = fs.readdirSync(galleryDir).filter(f => fs.statSync(path.join(galleryDir, f)).isDirectory());

subdirs.forEach(subdir => {
  const dirPath = path.join(galleryDir, subdir);
  const files = fs.readdirSync(dirPath).filter(f => f.toLowerCase().endsWith('.jpg'));
  
  // separate already numbered files vs others
  const numbered = files.filter(f => /^\d+\.jpg$/.test(f));
  const unnumbered = files.filter(f => !/^\d+\.jpg$/.test(f));
  
  let counter = 1;
  while(numbered.includes(`${counter}.jpg`)) {
    counter++;
  }
  
  unnumbered.forEach(f => {
    while(numbered.includes(`${counter}.jpg`)) {
      counter++;
    }
    fs.renameSync(path.join(dirPath, f), path.join(dirPath, `${counter}.jpg`));
    numbered.push(`${counter}.jpg`);
  });
});

console.log("Subdirectories renamed.");

// Try to find correct names for root copies
const getSubdirFile = (kw, num) => {
  const matched = subdirs.find(s => s.toLowerCase().includes(kw.toLowerCase()));
  if (matched) {
    return path.join(galleryDir, matched, `${num}.jpg`);
  }
  return null;
};

const copies = [
  { kw: 'art', num: 1, dest: 'bababe-art-1.jpg' },
  { kw: 'art', num: 2, dest: 'bababe-art-2.jpg' },
  { kw: 'art', num: 3, dest: 'bababe-art-3.jpg' },
  { kw: 'clean', num: 1, dest: 'bababe-clean-1.jpg' },
  { kw: 'clean', num: 2, dest: 'bababe-clean-2.jpg' },
  { kw: 'green', num: 1, dest: 'bababe-green-1.jpg' },
  { kw: 'concert', num: 1, dest: 'concert-1.jpg' },
  { kw: 'concert', num: 2, dest: 'concert-2.jpg' }
];

copies.forEach(c => {
  const src = getSubdirFile(c.kw, c.num);
  if (src && fs.existsSync(src)) {
    console.log(`Copying ${src} to ${c.dest}`);
    try {
      fs.copyFileSync(src, path.join(galleryDir, c.dest));
    } catch (e) {
      console.log('Error copying', src, e);
    }
  }
});

// Also deal with the root files that are unnumbered like IMG*.jpg if any
const rootFiles = fs.readdirSync(galleryDir).filter(f => f.toLowerCase().endsWith('.jpg') && !fs.statSync(path.join(galleryDir, f)).isDirectory());
let rootCounter = 1;
rootFiles.forEach(f => {
  if (f.startsWith('IMG') || f.startsWith('WhatsApp')) {
    fs.renameSync(path.join(galleryDir, f), path.join(galleryDir, `unused-${rootCounter}.jpg`));
    rootCounter++;
  }
});

console.log("Renamed images successfully!");
