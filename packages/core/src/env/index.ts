import dotenv from 'dotenv';
import { EnvSchema } from './env.schema';
import { logZodError } from '@core/loggers/zodLogger';

dotenv.config({ path: `.env.${process.env.ENV || 'test'}` });

let env: any;
try {
    env = EnvSchema.parse(process.env);
} catch (err) {
    logZodError(err);
    throw new Error('Zod error! User config files are not present or correct. Check for files following the naming convention .env.<env>.')
}

export { env };