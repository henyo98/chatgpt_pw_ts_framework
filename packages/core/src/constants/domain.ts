export const ROLES = ['guest', 'user', 'zboradmin', 'superadmin'] as const;
export type Role = typeof ROLES[number];