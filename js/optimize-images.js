const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    profile: {
        input: 'Assets/Profile/Profile Pic.jpg',
        output: 'Assets/Profile/profile-pic-optimized.webp',
        width: 800,
        quality: 80
    },
    cover: {
        input: 'Assets/Cover image/vestaearth_cover.webp',
        output: 'Assets/Cover image/vestaearth_cover-optimized.webp',
        width: 1920,
        quality: 80
    }
};

// Optimize images
async function optimizeImages() {
    for (const [key, settings] of Object.entries(config)) {
        try {
            await sharp(settings.input)
                .resize(settings.width, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .webp({
                    quality: settings.quality,
                    effort: 6
                })
                .toFile(settings.output);

            const originalSize = fs.statSync(settings.input).size;
            const optimizedSize = fs.statSync(settings.output).size;
            const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

            console.log(`Optimized ${key}:`);
            console.log(`Original size: ${(originalSize / 1024).toFixed(2)}KB`);
            console.log(`Optimized size: ${(optimizedSize / 1024).toFixed(2)}KB`);
            console.log(`Savings: ${savings}%\n`);
        } catch (error) {
            console.error(`Error optimizing ${key}:`, error);
        }
    }
}

optimizeImages(); 
