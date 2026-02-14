// zodLogger.ts
import { ZodError } from 'zod'
import { logger } from './logger'

export function logZodError(err: unknown) {
    // check if err has a Zod-like structure
    const isZodError = (err as any)?.errors && Array.isArray((err as any).errors)

    if (isZodError) {
        const zodErr = err as ZodError
        logger.error('Zod validation failed', {
            issues: zodErr.errors.map(e => ({
                path: e.path.length ? e.path.join('.') : '<root>',
                message: e.message,
                code: e.code,
            })),
        })
    } else {
        logger.error('Unknown validation error', err)
    }
}
