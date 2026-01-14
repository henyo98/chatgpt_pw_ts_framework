import { z } from 'zod';
import { ROLES } from '@core/constants/domain';

export const UserSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1)
});

export const UsersSchema = z.record(z.enum(ROLES), UserSchema);
export type UsersConfig = z.infer<typeof UsersSchema>;