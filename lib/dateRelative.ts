import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

export default function distanceToNow(dateTime: number | Date) {
  if (isNaN(new Date(dateTime).getTime())) {
    // If the dateTime is not a valid date, return a fallback string or handle it accordingly
    console.error("Invalid date passed to distanceToNow:", dateTime);
    return "Invalid date";
  }
  return formatDistanceToNowStrict(dateTime, {
    addSuffix: true,
  });
}
