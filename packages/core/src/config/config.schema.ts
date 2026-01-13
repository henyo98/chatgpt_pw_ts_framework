import { z } from 'zod';
export const ConfigSchema = z.object({
    apiTimeoutMs: z.number().min(1000),
    uiTimeoutMs: z.number().min(1000),
    enablePayments: z.boolean(),
    dbPoolSize: z.number().min(1).max(50),
    cookieTTLMinutes: z.number().min(1).default(60)
});
export type AppConfig = z.infer<typeof ConfigSchema>;