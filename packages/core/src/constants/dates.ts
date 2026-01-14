export const TODAY = () => new Date();
export const DAYS = (n: number) => new Date(Date.now() + n * 24 * 60 * 60 * 1000);
export const ISO_TODAY = () => new Date().toISOString().split('T')[0];