import { z } from 'zod';
export const UserDataSchema=z.object({
 firstName:z.string().min(1),
 lastName:z.string().min(1),
 email:z.string().email(),
 password:z.string().min(8)
});
export type UserData=z.infer<typeof UserDataSchema>;