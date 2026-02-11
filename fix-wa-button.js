// Script to fix WhatsApp button in all EJS files
const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

const oldPattern = /<!-- WhatsApp Floating Button -->\s*<a href="https:\/\/wa\.me\/6282297706541\?text=Hai" target="_blank" style="position: fixed; bottom: \d+px; right: 20px; z-index: 9999;[^>]+>\s*💬\s*<\/a>/g;

const newButton = `<!-- WhatsApp Floating Button (Fixed) -->
  <a href="https://wa.me/6282297706541?text=Hai" target="_blank" class="wa-float" style="position: fixed; bottom: 20px; right: 20px; z-index: 99999; width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #25D366, #128C7E); color: white; display: flex; align-items: center; justify-content: center; font-size: 26px; text-decoration: none; box-shadow: 0 4px 16px rgba(37, 211, 102, 0.6); transition: all 0.3s; will-change: transform; pointer-events: auto;">
    💬
  </a>

  <style>
    .wa-float {
      pointer-events: auto !important;
    }
    .wa-float:hover {
      transform: scale(1.1) !important;
      box-shadow: 0 6px 20px rgba(37, 211, 102, 0.8) !important;
    }
    .wa-float:active {
      transform: scale(0.95) !important;
    }
    @media (max-width: 768px) {
      .wa-float {
        bottom: 15px !important;
        right: 15px !important;
        width: 50px !important;
        height: 50px !important;
        font-size: 22px !important;
      }
    }
  </style>`;

let updated = 0;

files.forEach(file => {
  const filePath = path.join(viewsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('wa.me/6282297706541')) {
    // Simple replace for WhatsApp button
    content = content.replace(
      /<a href="https:\/\/wa\.me\/6282297706541[^>]+>[\s\S]*?💬[\s\S]*?<\/a>/g,
      newButton
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${file}`);
    updated++;
  }
});

console.log(`\n🎉 Updated ${updated} files!`);
