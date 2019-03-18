import * as fs from 'fs';
import { convert } from './create';

const contents = fs.readFileSync('SUMMARY.md').toString();

console.log(convert(contents));
