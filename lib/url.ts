const officialWhatsappNumber = "6285355333364";
const legacyPlaceholderPattern = /^62000000000[0-2]$/;
const legacyPlaceholderLinkPattern = /62000000000[0-2]/g;

export function emailHref(email?: string) {
  const value = email || "debroderapparel@gmail.com";
  return value.startsWith("mailto:") ? value : `mailto:${value}`;
}

export function whatsappHref(value: string, message?: string) {
  if (value.startsWith("http")) {
    return normalizeWhatsappLink(value);
  }

  const digits = value.replace(/\D/g, "");
  const raw = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits || officialWhatsappNumber;
  const normalized = legacyPlaceholderPattern.test(raw)
    ? officialWhatsappNumber
    : raw;
  const suffix = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${normalized}${suffix}`;
}

export function normalizeWhatsappLink(value: string) {
  return value.replace(legacyPlaceholderLinkPattern, officialWhatsappNumber);
}

export function instagramHref(value?: string) {
  if (value?.startsWith("http")) {
    return value;
  }

  const handle = value?.replace("@", "").trim() || "de_broder";
  return `https://instagram.com/${handle}`;
}

export function facebookHref(value?: string) {
  if (!value) {
    return "https://www.facebook.com/debroderapparel/";
  }

  if (value.startsWith("http")) {
    return value;
  }

  const handle = value.replace("@", "").replace(/^\/+/, "").trim();
  return `https://www.facebook.com/${handle || "debroderapparel"}/`;
}
