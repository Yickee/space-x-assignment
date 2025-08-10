import { z } from "zod"

export const crewSchema = z.object({
  name: z.string(),
  agency: z.string(),
  image: z.string(),
  wikipedia: z.string(),
  launches: z.array(z.string()),
  status: z.string(),
  id: z.string()
})

export type Crew = z.infer<typeof crewSchema>;