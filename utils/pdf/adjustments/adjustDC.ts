import type { Action } from "~/models/action";

export function adjustDC(entries: Action[], adjustment: number): Action[] {
  return entries.map((action) => {
    const updatedDescription = action.description.replace(
      /\bDC\s+(\d+)\b/g,
      (_, num) => `DC ${parseInt(num, 10) + adjustment}`,
    );

    return {
      ...action,
      description: updatedDescription,
    };
  });
}
