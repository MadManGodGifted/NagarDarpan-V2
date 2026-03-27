const { execSync } = require('child_process');
try {
  const out = execSync('npm run build', { encoding: 'utf-8' });
  console.log('SUCCESS');
  console.log(out);
} catch (e) {
  console.log('FAILED');
  console.log(e.stdout);
  console.log(e.stderr);
}
