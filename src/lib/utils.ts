import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tagsToString(tags: string[]) {
  return tags.join(",");
}

export function stringToTags(tagsString: string) {
  return tagsString.split(",").filter((tag) => tag.length > 0);
}
