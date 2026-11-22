import {mkdir,copyFile} from 'node:fs/promises';
const files=['index.html','app.js','model.js','wellbeing.js','wellbeing-ui.js','sounds.js','style.css','sw.js','icon.svg','manifest.webmanifest'];
await mkdir('dist',{recursive:true});
await Promise.all(files.map(file=>copyFile(file,`dist/${file}`)));
console.log(`VapeFree: ${files.length} archivos preparados en dist/`);
