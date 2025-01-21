import { formatDistanceToNow } from "date-fns";

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

export function formatDateDistance(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
