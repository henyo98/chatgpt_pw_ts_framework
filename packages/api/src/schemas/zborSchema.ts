import { z } from 'zod';
import * as generalSchemas from './generalSchemas';

export const ZborSchema = z.object({
    "id": z.number(),
    "user_id": z.number(),
    "name": z.string(),
    "slug": z.string(),
    "name_last_changed_at": generalSchemas.LaravelDate,
    "location": z.string(),
    "latitude": z.union([z.null(), z.string()]),
    "longitude": z.union([z.null(), z.string()]),
    "description": z.string(),
    "telegram_url": z.union([z.null(), z.string()]),
    "x_url": z.union([z.null(), z.string()]),
    "web_url": z.union([z.null(), z.string()]),
    "facebook_url": z.union([z.null(), z.string()]),
    "viber_url": z.union([z.null(), z.string()]),
    "instagram_url": z.union([z.null(), z.string()]),
    "confirmation_email": z.string(),
    "confirmation_token": z.string(),
    "confirmed": z.boolean(),
    "is_active": z.boolean(),
    "confirmed_at": generalSchemas.isoDateSchema, //TODO: If this is not specific enough, change to z.string().datetime({ offset: true }).transform((s) => new Date(s)); which accepts only ISO 8601 format with timezone offset
    "is_public": z.number(),
    "approved": z.boolean(),
    "tiktok_url": z.union([z.null(), z.string()]),
    "mail_accepted": z.boolean(),
    "approved_at": generalSchemas.isoDateSchema,
    "ip_address": z.string(),
    "terms": z.boolean(),
    "created_at": generalSchemas.isoDateSchema,
    "updated_at": generalSchemas.isoDateSchema,
    "profile_image": z.union([z.null(), z.string()]),
    "followers_count": z.number(),
    "events_count": z.number(),
    "announcements_count": z.number(),
    "new_announcements_count": z.number(),
    "new_events_count": z.number(),
});
export type Zbor = z.infer<typeof ZborSchema>;

export const LinkSchema = z.object({
    "url": generalSchemas.urlNullable,
    "label": z.string(),
    "page": z.union([z.number(), z.null()]),
    "active": z.boolean(),
});
export type Link = z.infer<typeof LinkSchema>;

export const ZboroviSchema = z.object({
    "current_page": z.number(),
    "data": z.array(ZborSchema),
    "first_page_url": z.string(),
    "from": z.number(),
    "last_page": z.number(),
    "last_page_url": z.string(),
    "links": z.array(LinkSchema),
    "next_page_url": generalSchemas.urlNullable,
    "path": z.string(),
    "per_page": z.number(),
    "prev_page_url": generalSchemas.urlNullable,
    "to": z.number(),
    "total": z.number(),
});
export const ZboroviTopSchema = z.object({
    "zborovi": ZboroviSchema,
});
// export type Zborovi = z.infer<typeof ZboroviSchema>;


