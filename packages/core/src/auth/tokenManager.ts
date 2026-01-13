export class TokenManager {
 private cache=new Map<string,{token:string;expiresAt:number}>();
 async getToken(user:string, loginFn:()=>Promise<{token:string;expiresInSec:number}>){
  const e=this.cache.get(user);
  if(e && Date.now()<e.expiresAt) return e.token;
  const r=await loginFn();
  this.cache.set(user,{token:r.token,expiresAt:Date.now()+r.expiresInSec*1000});
  return r.token;
 }
 invalidate(user:string){ this.cache.delete(user); }
}