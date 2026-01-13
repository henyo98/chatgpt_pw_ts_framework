import { z } from 'zod'; import { ROLES } from '@core/constants/domain';
export const UserSchema = z.object({ username: z.string(), password: z.string() });
export const UsersSchema = z.record(z.enum(ROLES), UserSchema);
export type UsersConfig = z.infer<typeof UsersSchema>;