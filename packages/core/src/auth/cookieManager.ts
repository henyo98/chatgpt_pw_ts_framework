import { config } from '@core/config';
import { TokenManager } from './tokenManager';
export class CookieManager {
 private meta=new Map<string,{createdAt:number}>();
 private tokenManager=new TokenManager();
 isExpired(user:string){
  const m=this.meta.get(user);
  if(!m) return true;
  return Date.now()-m.createdAt>config.cookieTTLMinutes*60000;
 }
 async load(user:string, context:any){
  if(this.isExpired(user)){ this.tokenManager.invalidate(user); return; }
 }
 async save(user:string, context:any){ this.meta.set(user,{createdAt:Date.now()}); }
}