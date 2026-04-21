import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
const constantsFile = path.join(process.cwd(), 'data', 'constants.ts');

console.log('--- CHECKING CONSTANTS.TS PATHS (REGEX MODE) ---');

const content = fs.readFileSync(constantsFile, 'utf8');
const paths = content.match(/\/img\/[^\s",']+|\/sound\/[^\s",']+/g) || [];

let brokenCount = 0;

const uniquePaths = [...new Set(paths)];

uniquePaths.forEach(p => {
    const fullPath = path.join(publicDir, p);
    if (!fs.existsSync(fullPath)) {
        console.error(`Broken Path: ${p}`);
        brokenCount++;
    }
});

if (brokenCount === 0) {
    console.log('All paths found in constants.ts are valid!');
} else {
    console.log(`Found ${brokenCount} broken paths.`);
}
