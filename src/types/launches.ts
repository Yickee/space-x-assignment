import { z } from "zod";

export const fairingsSchema = z.object({
  reused: z.boolean().nullable(),
  recovery_attempt: z.boolean().nullable(),
  recovered: z.boolean().nullable(),
  ships: z.array(z.string()),
});

export const patchSchema = z.object({
  small: z.string().nullable(),
  large: z.string().nullable(),
});

export const redditSchema = z.object({
  campaign: z.string().nullable(),
  launch: z.string().nullable(),
  media: z.string().nullable(),
  recovery: z.string().nullable(),
});

export const flickrSchema = z.object({
  small: z.array(z.any()),
  original: z.array(z.string()),
});

export const failureSchema = z.object({
  time: z.number(),
  altitude: z.number().nullable(),
  reason: z.string(),
});

export const coreSchema = z.object({
  core: z.string().nullable(),
  flight: z.number().nullable(),
  gridfins: z.boolean().nullable(),
  legs: z.boolean().nullable(),
  reused: z.boolean().nullable(),
  landing_attempt: z.boolean().nullable(),
  landing_success: z.boolean().nullable(),
  landing_type: z.string().nullable(),
  landpad: z.string().nullable(),
});

export const linksSchema = z.object({
  patch: patchSchema,
  reddit: redditSchema,
  flickr: flickrSchema,
  presskit: z.string().nullable(),
  webcast: z.string().nullable(),
  youtube_id: z.string().nullable(),
  article: z.string().nullable(),
  wikipedia: z.string().nullable(),
});

export const launchSchema = z.object({
  fairings: fairingsSchema.nullable(),
  links: linksSchema,
  static_fire_date_utc: z.string().nullable(),
  static_fire_date_unix: z.number().nullable(),
  net: z.boolean(),
  window: z.number().nullable(),
  rocket: z.string(),
  success: z.boolean().nullable(),
  failures: z.array(failureSchema),
  details: z.string().nullable(),
  crew: z.array(z.string()),
  ships: z.array(z.string()),
  capsules: z.array(z.string()),
  payloads: z.array(z.string()),
  launchpad: z.string(),
  flight_number: z.number(),
  name: z.string(),
  date_utc: z.string(),
  date_unix: z.number(),
  date_local: z.string(),
  date_precision: z.string(),
  upcoming: z.boolean(),
  cores: z.array(coreSchema),
  auto_update: z.boolean(),
  tbd: z.boolean(),
  launch_library_id: z.string().nullable(),
  id: z.string(),
});

export type Launch = z.infer<typeof launchSchema>;
