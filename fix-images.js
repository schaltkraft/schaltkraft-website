const fs = require('fs');
const path = require('path');

// 1. Move hero image
const heroOldPath = path.join(__dirname, 'public/images/hero/jobs-hero.jpg');
const heroNewDir = path.join(__dirname, 'public/images/hero/jobs/blocks/0/value');
const heroNewPath = path.join(heroNewDir, 'jobs-hero.jpg');

if (fs.existsSync(heroOldPath)) {
    fs.mkdirSync(heroNewDir, { recursive: true });
    // Move using git if possible, or just fs.rename
    fs.renameSync(heroOldPath, heroNewPath);
    console.log(`Moved hero image to ${heroNewPath}`);
}

// 2. Move gallery images
const galleryDir = path.join(__dirname, 'public/images/jobs');
const images = ['jobs-01.webp', 'jobs-02.webp', 'jobs-03.webp'];

images.forEach((img, idx) => {
    const oldPath = path.join(galleryDir, img);
    const newDir = path.join(galleryDir, `jobs/blocks/1/value/images/${idx}/image`);
    const newPath = path.join(newDir, img);

    if (fs.existsSync(oldPath)) {
        fs.mkdirSync(newDir, { recursive: true });
        fs.renameSync(oldPath, newPath);
        console.log(`Moved ${img} to ${newPath}`);
    }
});
