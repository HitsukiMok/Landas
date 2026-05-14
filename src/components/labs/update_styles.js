const fs = require('fs');
const path = require('path');
const dir = 'c:/Users/jomalyne/Landas/src/components/labs';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(f => {
  const filepath = path.join(dir, f);
  let content = fs.readFileSync(filepath, 'utf8');

  // Replace common light theme classes with glassmorphic dark theme classes
  content = content.replace(/bg-\[#FDFBF7\]/g, 'bg-transparent text-white');
  content = content.replace(/bg-\[#F4F7F6\]/g, 'bg-white/10 backdrop-blur-sm');
  content = content.replace(/border-\[#E8E5DF\]/g, 'border-white/20');
  content = content.replace(/text-\[#718096\]/g, 'text-white/60');
  content = content.replace(/text-\[#4A5568\]/g, 'text-white/90');
  content = content.replace(/bg-\[#E8F4F8\]/g, 'bg-white/10');
  content = content.replace(/border-\[#B2D8E8\]/g, 'border-white/30');
  content = content.replace(/bg-\[#D4EAF5\]\/40/g, 'bg-white/10');
  
  // Specific to Physics lab
  content = content.replace(/fillStyle: '#F4F7F6'/g, "fillStyle: '#1A202C'");
  content = content.replace(/fillStyle: '#E8E5DF'/g, "fillStyle: '#4A5568'");

  fs.writeFileSync(filepath, content, 'utf8');
});
console.log('Done updating ' + files.length + ' files.');
