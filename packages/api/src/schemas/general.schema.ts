import { z } from "zod";
// export const LaravelDate = z
//     .string()
//     .transform(str => new Date(str.replace(" ", "T")));

// export const urlNullable = z.string().url().nullable();
// export const isoDateSchema = z.string().datetime({ offset: true }).transform((s) => new Date(s))

// export const LaravelDate = z
//   .string()
//   .transform(str => new Date(str.replace(" ", "T")))
//   .pipe(z.date());

export const urlNullable = z.string().url().nullable();
// export const isoDateSchema = z
//   .string()
//   .datetime({ offset: true })
//   .transform((s) => new Date(s))
//   .pipe(z.date());

export const LaravelDate = z
    .string()
    .regex(
        /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
        "Invalid datetime format (YYYY-MM-DD HH:mm:ss)"
    )
    .refine((value) => {
        const iso = value.replace(" ", "T");
        return !isNaN(Date.parse(iso));
    }, "Invalid datetime value");

export const isoDateSchema = z
    .string()
    .regex(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z$/,
        "Invalid Laravel timestamp"
    )
    .refine((value) => !isNaN(Date.parse(value)), "Invalid datetime value");