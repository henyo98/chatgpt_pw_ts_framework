export const TODAY = () => new Date();
export const DAYS = (n:number) => new Date(Date.now()+n*86400000);
export const ISO_TODAY = () => new Date().toISOString().split('T')[0];