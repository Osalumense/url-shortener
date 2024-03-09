import { z } from "zod"

export const validateShortenUrl = z.object({
    url: z.string(),
    slug: z.string().optional(),
});

