import fs from 'fs';
import path from 'path';
import { ConfigSchema } from './config.schema';
import { env } from '@core/env';

const file = path.join(process.cwd(), `config.${env.ENV}.json`);
const raw = JSON.parse(fs.readFileSync(file, 'utf-8'));
export const config = ConfigSchema.parse(raw);