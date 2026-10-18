import {writeFile,mkdir} from 'node:fs/promises';
import {scenarioAnalyses,scenarioCSV} from '../src/scenarioAnalyses.js';
await mkdir('public/downloads',{recursive:true});
for(const analysis of Object.values(scenarioAnalyses)){
 if(analysis.rows.length!==20||analysis.rows.some(r=>!r.result.valid))throw Error('Invalid scenario grid');
 await writeFile('public'+analysis.download,scenarioCSV(analysis));
 console.log(`${analysis.kind}: ${analysis.rows.length} reproducible rows → ${analysis.download}`);
}
