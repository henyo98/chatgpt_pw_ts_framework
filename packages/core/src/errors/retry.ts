export async function withRetry<T>(fn:()=>Promise<T>, retries=3, delay=500):Promise<T>{
 try { return await fn(); }
 catch(e){ if(retries<=0) throw e; await new Promise(r=>setTimeout(r,delay)); return withRetry(fn,retries-1,delay*2); }
}