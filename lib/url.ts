export function emailHref(email: string) {
  return email.startsWith("mailto:") ? email : `mailto:${email}`;
}

export function whatsappHref(value: string, message?: string) {
  if (value.startsWith("http")) {
    return value;
  }

  const digits = value.replace(/\D/g, "");
  const normalized = digits.startsWith("0")
    ? `62${digits.slice(1)}`
    : digits || "620000000000";
  const suffix = message ? `?text=${encodeURIComponent(message)}` : "";

  return `https://wa.me/${normalized}${suffix}`;
}

export function instagramHref(value: string) {
  if (value.startsWith("http")) {
    return value;
  }

  const handle = value.replace("@", "").trim() || "debroder";
  return `https://instagram.com/${handle}`;
}
