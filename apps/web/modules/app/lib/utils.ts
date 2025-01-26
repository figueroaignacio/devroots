import { format, formatDistanceToNow } from "date-fns";

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

export const formatDate = (dateString: string | Date): string => {
  return format(new Date(dateString), "MMM dd, yyyy, hh:mm a");
};
