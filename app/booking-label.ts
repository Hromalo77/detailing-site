export const bookingLabel = "Schedule a cleaning";

// Keep older saved content consistent while preserving custom admin labels.
export function normalizeBookingLabel(label: string) {
  return /^(request (a detail|detail|this service)|start your request|send my request)$/i.test(label.trim())
    ? bookingLabel
    : label;
}
