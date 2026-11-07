import { z } from "zod";

export const SettingsSchema = z.record(z.string(), z.string());

export type SettingsInput = z.infer<typeof SettingsSchema>;

