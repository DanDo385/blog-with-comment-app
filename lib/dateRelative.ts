// lib/dateRelative.ts
export default function formatFullDate(dateTime: number | Date) {
    return new Date(dateTime).toLocaleDateString();
  }