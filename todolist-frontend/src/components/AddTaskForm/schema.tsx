import * as z from "zod";

export const schema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export type ToDoListFormData = z.infer<typeof schema>;
