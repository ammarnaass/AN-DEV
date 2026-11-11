export const isColorDark = (hex: string): boolean => {
  if (!hex || !hex.startsWith("#")) return true;
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 140;
};

export const adjustBrightness = (hex: string, percent: number): string => {
  if (!hex || !hex.startsWith("#")) return hex;
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return hex;
  const num = parseInt(clean, 16);
  if (isNaN(num)) return hex;
  const amt = Math.round(2.55 * percent);
  const R = Math.min(255, Math.max(0, (num >> 16) + amt));
  const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00ff) + amt));
  const B = Math.min(255, Math.max(0, (num & 0x0000ff) + amt));
  return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1);
};

export const getFontFamilyStyle = (font?: string): string => {
  switch (font) {
    case "tajawal":
      return "font-tajawal font-sans";
    case "ibm":
      return "font-ibm font-sans";
    case "inter":
      return "font-inter font-sans";
    case "mono":
      return "font-mono";
    case "cairo":
    default:
      return "font-cairo font-sans";
  }
};
