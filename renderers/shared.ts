// Shapes follow `SiteWorkDTO` in next-theme's @curvenote/common.
export type Labelled = {
  name?: string;
  slug?: string;
  content?: { title?: string; description?: string };
};
export type Item = {
  id: string;
  slug?: string | null;
  title: string;
  description?: string;
  authors?: { name: string }[];
  date_published?: string;
  date?: string;
  doi?: string;
  kind?: Labelled | string;
  collection?: Labelled;
  links?: { thumbnail?: string };
};

// Colour tokens shared by every magazine block so a collection keeps its colour everywhere.
export const TOKENS = `
.cnm{--cnm-ink:#16181d;--cnm-ink-2:#4a4f59;--cnm-ink-3:#6b717c;--cnm-rule:#d9dbd6;--cnm-strong:#16181d;--cnm-thumb:#eceee9;--cnm-band:#f0f1ee;
  --cnm-c0:#1f45b8;--cnm-c1:#0f7f78;--cnm-c2:#b0620c;--cnm-c3:#6a3fb5;--cnm-c4:#b3243b;--cnm-c5:#3d6b1f;
  --cnm-pad:clamp(16px,4vw,48px);color:var(--cnm-ink);padding-block:1.25rem}
/* Full width by default: span the theme grid's \`screen\` track (\`:wide: false\` keeps the body column).
   Theme grid children get margin-top:0 !important, so spacing uses padding. */
.cnm{grid-column:screen;padding-inline:var(--cnm-pad)}
.cnm.cnm-narrow{grid-column:body;padding-inline:0}
.cnm-in{max-width:1440px;margin-inline:auto;container-type:inline-size}
.cnm-bleed{margin-inline:calc(-1 * var(--cnm-pad));padding:20px var(--cnm-pad);background:var(--cnm-band)}
.cnm-narrow .cnm-bleed{margin-inline:0;padding-inline:18px}
.dark .cnm{--cnm-ink:#eceef2;--cnm-ink-2:#b4b9c3;--cnm-ink-3:#8b919c;--cnm-rule:#2c3039;--cnm-strong:#eceef2;--cnm-thumb:#1a1d24;--cnm-band:#1a1d24;
  --cnm-c0:#8fa8ff;--cnm-c1:#4fd1c5;--cnm-c2:#f0a24a;--cnm-c3:#b89bff;--cnm-c4:#ff7a8e;--cnm-c5:#9bd46a}
.cnm a{color:inherit;text-decoration:none}
.cnm a:hover .cnm-hl{text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
.cnm-kicker{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:11.5px;line-height:1.2;font-weight:700;letter-spacing:.07em;text-transform:uppercase}
.cnm-col{color:var(--cnm-c)}
.cnm-kind{color:var(--cnm-ink-3);font-weight:600}
.cnm-col+.cnm-kind::before{content:"";display:inline-block;width:3px;height:3px;border-radius:50%;background:currentColor;margin-right:8px;vertical-align:middle}
.cnm-hl{margin:0;font-weight:600;line-height:1.2;text-wrap:balance}
.cnm-dek{margin:0;color:var(--cnm-ink-2);font-size:16.5px;line-height:1.5}
.cnm-by{font-size:13px;color:var(--cnm-ink-2)}
.cnm-thumb{display:block;aspect-ratio:16/10;max-width:100%;overflow:hidden;background:var(--cnm-thumb)}
.cnm-thumb img{display:block;width:100%;height:100%;object-fit:cover;margin:0}
.cnm-empty{padding:16px;border:1px solid var(--cnm-rule);color:var(--cnm-ink-3)}
.cnm-error{padding:16px;border:1px solid #d33;color:#b3243b}
`;

const PALETTE = 6;

export function collectionKey(collection?: Labelled) {
  // The default collection has an empty slug, so fall back to its name.
  return collection?.slug || collection?.name || "";
}

export function colorVar(collection?: Labelled) {
  let h = 0;
  for (const ch of collectionKey(collection))
    h = (h * 31 + ch.charCodeAt(0)) | 0;
  return { ["--cnm-c" as string]: `var(--cnm-c${Math.abs(h) % PALETTE})` };
}

export function label(value: Labelled | string | undefined) {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  return value.content?.title ?? value.name;
}

export function byline(authors: { name: string }[] = []) {
  const names = authors.map((a) => a.name);
  if (names.length <= 2) return names.join(" & ");
  const rest = names.length - 2;
  return `${names[0]}, ${names[1]} & ${rest} other${rest > 1 ? "s" : ""}`;
}

export function published(item: Item) {
  const raw = item.date_published ?? item.date;
  const d = raw ? new Date(raw) : undefined;
  return d && !Number.isNaN(d.valueOf()) ? d : undefined;
}

export function fullDate(d: Date) {
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function relativeDate(d: Date) {
  const hours = Math.max(0, Math.round((Date.now() - d.valueOf()) / 3.6e6));
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export const articleHref = (item: Item) => `/articles/${item.slug ?? item.id}`;
