import sharp from'sharp';import fs from'node:fs/promises';
await fs.mkdir('public/images/title-covers',{recursive:true});
for(const slug of ['mortgage-calculator','other-comprehensive-income'])for(const width of [1200,800,400])await sharp(`docs/pending-close-20261126/image-source/${slug}.webp`).resize(width,width*9/16).webp({quality:82}).toFile(`public/images/title-covers/pending-${slug}-20261126${width===1200?'':'-'+width}.webp`);

await fs.mkdir('public/downloads',{recursive:true});await fs.copyFile('docs/pending-close-20261126/other-comprehensive-income-worksheet.html','public/downloads/other-comprehensive-income-worksheet.html');
