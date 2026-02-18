export const ROLES = ['guest', 'user', 'zboradmin', 'superadmin'] as const;
export const AUTHENTICATED_ROLES = ROLES.filter(
  (role): role is Exclude<Role, 'guest'> => role !== 'guest'
);
export type Role = typeof ROLES[number];