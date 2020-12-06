import {execSync} from 'child_process';

const arg = process.argv[2] || 'saft.xml'; // Default value `saft.xml` if no args provided via CLI.

execSync('node src/parser.js -s ' + arg, {stdio:[0, 1, 2]});