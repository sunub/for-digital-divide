import type { FieldErrors, FieldValues, Resolver } from "react-hook-form";
import type { ZodType } from "zod";

export const zodResolver =
  <TFieldValues extends FieldValues>(
    schema: ZodType<TFieldValues>,
  ): Resolver<TFieldValues> =>
  async (values) => {
    const result = schema.safeParse(values);
    if (result.success) {
      return { values: result.data, errors: {} };
    }

    const errors = result.error.issues.reduce(
      (acc, issue) => {
        const path = issue.path.join(".");
        acc[path] = {
          type: issue.code,
          message: issue.message,
        };
        return acc;
      },
      {} as Record<string, { type: string; message: string }>,
    ) as FieldErrors<TFieldValues>;

    return { values: {}, errors };
  };
