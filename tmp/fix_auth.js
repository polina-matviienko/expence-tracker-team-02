const fs = require('fs');
const path = require('path');

const target = path.join(process.cwd(), 'app', 'api', 'auth', 'login', 'route.ts');

try {
  if (fs.existsSync(target)) {
    fs.unlinkSync(target);
    console.log('SUCCESS: Deleted ' + target);
  } else {
    console.log('FILE NOT FOUND: ' + target);
  }
} catch (err) {
  console.error('ERROR: ' + err.message);
  process.exit(1);
}
