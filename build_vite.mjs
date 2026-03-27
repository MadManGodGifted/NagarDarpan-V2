import { build } from 'vite';
import fs from 'fs';

async function run() {
  try {
    await build();
    fs.writeFileSync('build-res.txt', 'SUCCESS');
  } catch (e) {
    fs.writeFileSync('build-res.txt', e.toString() + '\n' + e.stack);
  }
}
run();
