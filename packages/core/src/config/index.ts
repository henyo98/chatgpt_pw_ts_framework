import fs from 'fs';
import path from 'path';
import { ConfigSchema } from './config.schema';
import { env } from '@core/env';
import { logZodError } from '@core/loggers/zodLogger';

const file = path.join(process.cwd(), `config.${env.ENV}.json`);
const raw = JSON.parse(fs.readFileSync(file, 'utf-8'));

let config: any;
try {
    config = ConfigSchema.parse(raw);
} catch (err) {
    logZodError(err);
    throw new Error('Zod error! Config files are not present or correct. Check for files following the naming convention config.<env>.json.')
}

export { config };
