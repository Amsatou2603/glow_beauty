const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, '../public/favicon.svg');
const publicDir = path.join(__dirname, '../public');

async function generateFavicons() {
  try {
    // Generate 32x32 PNG
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    
    // Generate 16x16 PNG
    await sharp(svgPath)
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    
    // Generate 192x192 PNG for Android/Apple
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'icon-192x192.png'));
    
    // Generate 512x512 PNG for Apple
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'icon-512x512.png'));
    
    // Generate ICO file (32x32)
    await sharp(svgPath)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✅ Favicons generated successfully!');
  } catch (error) {
    console.error('❌ Error generating favicons:', error);
  }
}

generateFavicons();
