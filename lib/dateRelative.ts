// lib/dateRelative.ts
import { formatDistanceToNow } from 'date-fns';

export default function distanceToNow(date: number | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
}
