const GOOGLE_ANALYTICS_ID_PATTERN = /^G-[A-Z0-9]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeGoogleAnalyticsId(value: string | undefined) {
  const normalized = value?.trim().toUpperCase();
  return normalized && GOOGLE_ANALYTICS_ID_PATTERN.test(normalized)
    ? normalized
    : undefined;
}

export function normalizeSupportEmail(value: string | undefined) {
  const normalized = value?.trim().toLowerCase();
  return normalized && EMAIL_PATTERN.test(normalized) ? normalized : undefined;
}
