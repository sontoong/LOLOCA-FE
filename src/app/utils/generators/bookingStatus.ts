export function bookingStatusGenerator(status: number) {
  switch (status) {
    case 0:
      return "Pending";
    case 1:
      return "Approved";
    case 2:
      return "Rejected";
    case 3:
      return "Completed";
    default:
      return "Unknown";
  }
}
