import { z } from "zod"

export const rocketSchema = z.object({
  height: z.object({ meters: z.number(), feet: z.number() }),
  diameter: z.object({ meters: z.number(), feet: z.number() }),
  mass: z.object({ kg: z.number(), lb: z.number() }),
  first_stage: z.object({
    thrust_sea_level: z.object({ kN: z.number(), lbf: z.number() }),
    thrust_vacuum: z.object({ kN: z.number(), lbf: z.number() }),
    reusable: z.boolean(),
    engines: z.number(),
    fuel_amount_tons: z.number(),
    burn_time_sec: z.number()
  }),
  second_stage: z.object({
    thrust: z.object({ kN: z.number(), lbf: z.number() }),
    payloads: z.object({
      composite_fairing: z.object({
        height: z.object({ meters: z.number(), feet: z.number() }),
        diameter: z.object({ meters: z.number(), feet: z.number() })
      }),
      option_1: z.string()
    }),
    reusable: z.boolean(),
    engines: z.number(),
    fuel_amount_tons: z.number(),
    burn_time_sec: z.number()
  }),
  engines: z.object({
    isp: z.object({ sea_level: z.number(), vacuum: z.number() }),
    thrust_sea_level: z.object({ kN: z.number(), lbf: z.number() }),
    thrust_vacuum: z.object({ kN: z.number(), lbf: z.number() }),
    number: z.number(),
    type: z.string(),
    version: z.string(),
    layout: z.string(),
    engine_loss_max: z.number(),
    propellant_1: z.string(),
    propellant_2: z.string(),
    thrust_to_weight: z.number()
  }),
  landing_legs: z.object({ number: z.number(), material: z.string().nullable() }),
  payload_weights: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      kg: z.number(),
      lb: z.number()
    })
  ),
  flickr_images: z.array(z.string()),
  name: z.string(),
  type: z.string(),
  active: z.boolean(),
  stages: z.number(),
  boosters: z.number(),
  cost_per_launch: z.number(),
  success_rate_pct: z.number(),
  first_flight: z.string(),
  country: z.string(),
  company: z.string(),
  wikipedia: z.string(),
  description: z.string(),
  id: z.string()
})

export type Rocket = z.infer<typeof rocketSchema>;