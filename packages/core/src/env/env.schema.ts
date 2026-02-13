import { z } from 'zod';
export const EnvSchema = z.object({
  ENV: z.enum(['test', 'dev', 'prod']).default('test'), //TODO: environment names to generate from some file where they are archived
  BASE_URL: z.string().url(),
  API_URL: z.string().url(), //TODO: this is used for making API calls in tests, should be the same as API_URL_PUBLIC but we need both for now to avoid breaking changes, eventually we should remove API_URL_PUBLIC and use only API_URL
  API_URL_PUBLIC: z.string().url(), //this is used for getting csrf token and login
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_TYPE: z.enum(['postgres', 'mysql']).default('postgres'),
  ENABLE_MEDIA: z.enum(['true', 'false']).default('true')
});
export type Env = z.infer<typeof EnvSchema>;