import { APIRequestContext, APIResponse } from '@playwright/test'
import { ZodSchema } from 'zod'
import { withRetry } from '@core/errors/retry'
export class BaseAPI {
    constructor(protected request: APIRequestContext) { }
    private async handle<T>(
        res: Promise<APIResponse>,
        schema?: ZodSchema<T>,
        allow204 = false
    ): Promise<T> {
        const r = await res
        const status = r.status()
        if (allow204 && status === 204) return undefined as any
        if (status < 200 || status >= 300)
            throw new Error(`API ${status}: ${await r.text()}`)
        const json = await r.json()
        return schema ? schema.parse(json) : json
    }
    get<T>(u: string, s?: ZodSchema<T>) {
        return withRetry(() => this.handle(this.request.get(u), s))
    }
    post<T>(u: string, d: any, s?: ZodSchema<T>) {
        return withRetry(() => this.handle(this.request.post(u, { data: d }), s))
    }
    put<T>(u: string, d: any, s?: ZodSchema<T>) {
        return withRetry(() => this.handle(this.request.put(u, { data: d }), s))
    }
    delete<T>(u: string, s?: ZodSchema<T>) {
        return withRetry(() => this.handle(this.request.delete(u), s, true))
    }
}
