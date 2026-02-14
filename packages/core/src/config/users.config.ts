import fs from 'fs';
import path from 'path';
import { UsersSchema } from './users.schema';
import { env } from '@core/env';
import { logZodError } from '@core/loggers/zodLogger';
import chalk from 'chalk';

const file = path.join(process.cwd(), `users.${env.ENV}.json`);
let raw: any;

// I
try {
    const file = path.join(process.cwd(), `users.${env.ENV}.json`);
    const fileContent = fs.readFileSync(file, 'utf-8');
    raw = JSON.parse(fileContent);
} catch (error) {
    logZodError(error);
    throw new Error(chalk.red('Failed to load or parse users JSON file. Check for files following the naming convention users.<env>.json.'));
}

let users: any;
try {
    users = UsersSchema.parse(raw);
} catch (err) {
    logZodError(err);
    throw new Error(chalk.red('Zod error! User config files are not present or correct. Check for files following the naming convention users.<env>.json.'))
}

export { users };
