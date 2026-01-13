import dotenv from 'dotenv';
import { EnvSchema } from './env.schema';

dotenv.config({ path: `.env.${process.env.ENV || 'test'}` });

export const env = EnvSchema.parse(process.env);