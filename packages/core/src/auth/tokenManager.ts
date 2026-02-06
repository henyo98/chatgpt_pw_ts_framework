export class TokenManager {
  private cache = new Map<string, { token: string; expiresAt: number }>();
  private locks = new Map<string, Promise<string>>();
  private refreshMarginMs: number;

  constructor(refreshMarginMs = 30_000) {
    this.refreshMarginMs = refreshMarginMs;
  }

  async getToken(user: string, loginFn: () => Promise<{ token: string; expiresInSec: number }>) {
    const entry = this.cache.get(user);
    if (entry && Date.now() + this.refreshMarginMs < entry.expiresAt) return entry.token;

    const ongoing = this.locks.get(user);
    if (ongoing) return ongoing;

    const p = (async () => {
      try {
        const res = await loginFn();
        if (!res || !res.token || typeof res.expiresInSec !== 'number') {
          throw new Error('loginFn returned invalid response');
        }
        const expiresAt = Date.now() + res.expiresInSec * 1000;
        this.cache.set(user, { token: res.token, expiresAt });
        return res.token;
      } finally {
        this.locks.delete(user);
      }
    })();

    this.locks.set(user, p);
    return p;
  }

  invalidate(user: string) {
    this.cache.delete(user);
    this.locks.delete(user);
  }
}