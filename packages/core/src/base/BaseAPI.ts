import { APIRequestContext, APIResponse } from '@playwright/test'
import { ZodSchema } from 'zod'
import { withRetry } from '@core/errors/retry'
import { logZodError } from '@core/loggers/zodLogger'
import { logger } from '@core/loggers/logger'
import { trimResponseBody } from '@core/utils/responseBodyTrimmer'
export class BaseAPI {
    constructor(protected request: APIRequestContext) { }
    private async handle<T>(
        res: Promise<APIResponse>,
        schema?: ZodSchema<T>,
        allow204 = false,
        method?: string,
        url?: string
    ): Promise<T> {
        // logger.debug(`API ${method} → ${url}`)
        const r = await res
        const status = r.status()
        // logger.debug(`API ${method} ← ${url} [${status}]`)
        if (allow204 && status === 204) {
            logger.info(`API ${method} ${url} returned 204 (No Content)`)
            return undefined as any
        }
        if (status < 200 || status >= 300) {
            const body = await r.text()
            logger.error(`API ${method} ${url} failed`, {
                status,
                body: trimResponseBody(body)
            })
            // throw new Error(`API ${status}: ${body}`)
            const error = new Error(`API method: '${method}' with url: '${url}' failed with ${status}\nResponse: `);
            (error as any).responseBody = body
            throw error
        }
        const json = await r.json()
        if (!schema) {
            logger.debug(`API ${method} ${url} response parsed (no schema validation)`)
            return json
        }

        try {
            const parsed = schema.parse(json)
            // logger.debug(`API ${method} ${url} schema validation passed`)
            return parsed

        } catch (err) {
            logger.error(`API ${method} ${url} schema validation failed`)
            logZodError(err)
            logger.debug(`Invalid response body`, { body: json })
            throw err // directly throw
        }



        //     if (!schema) return json;
        //     const parsed = schema.safeParse(json);
        //     if (parsed.success) return parsed.data;
        //     // parsed.error is a ZodError with detailed issues
        //     throw new Error(`Schema validation failed: ${parsed.error.toString()}\nResponse body: ${JSON.stringify(json)}`);
    }
    get<T>(u: string, s?: ZodSchema<T>) {
        return withRetry(() => this.handle(this.request.get(u), s, false, 'GET', u))
    }
    post<T>(u: string, d: any, s?: ZodSchema<T>) {
        return withRetry(() => this.handle(this.request.post(u, { data: d }), s, false, 'POST', u))
    }
    put<T>(u: string, d: any, s?: ZodSchema<T>) {
        return withRetry(() => this.handle(this.request.put(u, { data: d }), s, false, 'PUT', u))
    }
    delete<T>(u: string, s?: ZodSchema<T>) {
        return withRetry(() => this.handle(this.request.delete(u), s, true, true, 'DELETE', u))
    }
}
