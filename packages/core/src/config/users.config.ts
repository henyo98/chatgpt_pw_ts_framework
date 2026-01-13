import fs from 'fs'; import path from 'path';
import { UsersSchema } from './users.schema'; import { env } from '@core/env';
const file = path.join(process.cwd(), `users.${env.ENV}.json`);
export const users = UsersSchema.parse(JSON.parse(fs.readFileSync(file, 'utf-8')));