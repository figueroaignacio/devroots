import { formatDistanceToNow } from "date-fns";

export function getInitials(name: string): string {
  if (!name) return "";
  const nameParts = name.split(" ");
  const initials = nameParts
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
  return initials;
}

export function timeAgo(date: Date) {
  return `${formatDistanceToNow(new Date(date), { addSuffix: true })}`;
}
