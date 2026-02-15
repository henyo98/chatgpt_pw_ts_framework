import { z } from 'zod';

export const authCsrfSchema = z.object({ "csrfToken": z.string() })