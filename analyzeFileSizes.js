const fs = require('fs');
const path = require('path');

const dirToScan = path.join(__dirname, 'public/images');
const MIN_SIZE_KB = 100; // Only report files larger than 100KB

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

const files = [];

if (fs.existsSync(dirToScan)) {
    walkDir(dirToScan, function (filePath) {
        const ext = path.extname(filePath).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'].includes(ext)) {
            const stats = fs.statSync(filePath);
            const sizeKB = stats.size / 1024;
            if (sizeKB > MIN_SIZE_KB) {
                files.push({
                    file: filePath.replace(__dirname, ''),
                    sizeKB: sizeKB,
                    ext: ext
                });
            }
        }
    });
}

// Sort by size descending
files.sort((a, b) => b.sizeKB - a.sizeKB);

console.log(`Gefunden: ${files.length} Bilder über ${MIN_SIZE_KB} KB`);
console.log('--- Top 20 grösste Bilder ---');
files.slice(0, 20).forEach(f => {
    console.log(`${Math.round(f.sizeKB)} KB \t | ${f.ext} \t | ${f.file}`);
});
