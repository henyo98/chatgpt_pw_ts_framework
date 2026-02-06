import { config } from '@core/config';
import { TokenManager } from './tokenManager';

export class CookieManager {
    private path(user: string, env: string) {
        return `./.auth/${env}-${user}.json`;
    }

    async save(user: string, env: string, context: any) {
        const fs = await import('fs');
        await fs.promises.mkdir('./.auth', { recursive: true });
        await context.storageState({ path: this.path(user, env) });
    }

    async load(user: string, env: string) {
        const fs = await import('fs');
        const p = this.path(user, env);
        if (!fs.existsSync(p)) return null;
        return { storageState: p };
    }
}
// OLD
// import { config } from '@core/config'
// import { TokenManager } from './tokenManager'
// export class CookieManager {
//     private meta = new Map<string, { createdAt: number }>()
//     private tokenManager = new TokenManager()
//     isExpired(user: string) {
//         const m = this.meta.get(user)
//         if (!m) return true
//         return Date.now() - m.createdAt > config.cookieTTLMinutes * 60000
//     }
//     async load(user: string, context: any) {
//         if (this.isExpired(user)) {
//             this.tokenManager.invalidate(user)
//             return
//         }
//     }
//     async save(user: string, context: any) {
//         this.meta.set(user, { createdAt: Date.now() })
//     }
// }
