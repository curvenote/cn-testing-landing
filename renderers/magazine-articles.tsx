import React from "react";
import type { ComponentType } from "react";

import {
  TOKENS,
  articleHref,
  byline,
  colorVar,
  fullDate,
  label,
  published,
  relativeDate,
  type Item,
} from "./shared";

// The theme fills `items`, `total` and `error` on the server before render.
type ArticlesNode = {
  items?: Item[];
  total?: number;
  error?: string;
  wide?: boolean;
  collection?: string;
  children?: unknown;
  "show-thumbnails"?: boolean;
  "show-collection"?: boolean;
  "show-kind"?: boolean;
  "show-date"?: boolean;
  "show-count"?: boolean;
  "show-authors"?: boolean;
  "show-doi"?: boolean;
};

const CSS =
  TOKENS +
  `
.cnm-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;border-top:3px solid var(--cnm-strong);padding-top:8px;margin-bottom:16px}
.cnm-head h2{font-size:13px;line-height:1;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin:0}
.cnm-count{font-size:13px;color:var(--cnm-ink-3);font-variant-numeric:tabular-nums}
.cnm-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
.cnm-lead,.cnm-sec article{display:flex;flex-direction:column;gap:9px}
.cnm-sec{display:flex;flex-direction:column;gap:20px}
.cnm-sec article+article{border-top:1px solid var(--cnm-rule);padding-top:18px}
.cnm-rail h3{font-size:11.5px;line-height:1;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--cnm-ink-2);margin:0 0 4px}
.cnm-rail ol{list-style:none;margin:0;padding:0}
.cnm-rail li{display:grid;grid-template-columns:54px minmax(0,1fr);gap:10px;padding-block:11px;border-bottom:1px solid var(--cnm-rule)}
.cnm-rail li:last-child{border-bottom:0}
.cnm-rail ol.nodate li{grid-template-columns:minmax(0,1fr)}
.cnm-when{font-size:12px;line-height:1.4;font-weight:500;color:var(--cnm-c);font-variant-numeric:tabular-nums}
.cnm-lead .cnm-hl{font-size:clamp(24px,5cqi,38px);line-height:1.1}
.cnm-sec .cnm-hl{font-size:19px}
.cnm-rail .cnm-hl{font-size:15.5px;line-height:1.3;font-weight:500}
.cnm-meta{display:flex;flex-wrap:wrap;gap:10px;font-size:12.5px;color:var(--cnm-ink-3)}
.cnm-doi{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px}
.cnm-rail .cnm-kicker{margin-top:4px;font-size:10.5px}
/* section fronts: blocks filtered by \`collection\` */
.cnm-sechead{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:baseline;gap:4px 20px;border-top:3px solid var(--cnm-c);padding-top:9px;margin-bottom:16px}
.cnm-sechead h2{font-size:24px;line-height:1.15;font-weight:700;margin:0}
.cnm-sechead p{grid-column:1/-1;margin:0;color:var(--cnm-ink-2);font-size:14px;max-width:62ch}
.cnm-pa{display:grid;grid-template-columns:minmax(0,1fr);gap:20px}
.cnm-pa-lead,.cnm-pb article,.cnm-pc article{display:flex;flex-direction:column;gap:8px}
.cnm-pa-lead .cnm-hl{font-size:24px;line-height:1.15}
.cnm-pa-mid{display:flex;flex-direction:column;gap:16px}
.cnm-pa-mid article{display:grid;grid-template-columns:minmax(0,1fr) 110px;gap:14px;align-items:start}
.cnm-pa-mid article>div{display:flex;flex-direction:column;gap:7px}
.cnm-pa-mid article+article{border-top:1px solid var(--cnm-rule);padding-top:16px}
.cnm-pa-mid .cnm-thumb{aspect-ratio:1/1}
.cnm-pa-mid .cnm-hl{font-size:17px;line-height:1.25}
.cnm-pa-list article{padding-block:10px;border-bottom:1px solid var(--cnm-rule)}
.cnm-pa-list article:first-child{padding-top:0}
.cnm-pa-list article:last-child{border-bottom:0}
.cnm-pa-list .cnm-hl{font-size:15.5px;line-height:1.3;font-weight:500}
.cnm-pb{display:grid;grid-template-columns:minmax(0,1fr);gap:22px}
.cnm-pb .cnm-hl{font-size:18px;line-height:1.22}
.cnm-pc{display:grid;grid-template-columns:minmax(0,1fr);gap:14px}
.cnm-pc .cnm-hl{font-size:17px;line-height:1.25}
.cnm-pc article+article{border-top:1px solid var(--cnm-rule);padding-top:14px}
@container (min-width:600px){
  .cnm-pa{grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0 26px}
  .cnm-pa-lead{grid-column:1/-1;margin-bottom:22px}
  .cnm-pa-list{border-left:1px solid var(--cnm-rule);padding-left:26px}
  .cnm-pb{grid-template-columns:repeat(2,minmax(0,1fr))}
  .cnm-pc{grid-template-columns:repeat(3,minmax(0,1fr));gap:0 24px}
  .cnm-pc article+article{border-top:0;padding-top:0;border-left:1px solid var(--cnm-rule);padding-left:24px}
}
@container (min-width:960px){
  .cnm-pa{grid-template-columns:minmax(0,5fr) minmax(0,4fr) minmax(0,3fr)}
  .cnm-pa-lead{grid-column:auto;margin-bottom:0}
  .cnm-pa-mid{border-left:1px solid var(--cnm-rule);padding-left:26px}
  .cnm-pb{grid-template-columns:repeat(4,minmax(0,1fr))}
}
@container (min-width:600px){
  .cnm-grid.n2,.cnm-grid.n3,.cnm-grid.n4{grid-template-columns:minmax(0,3fr) minmax(0,2fr);gap:0 26px}
  .cnm-grid.n4 .cnm-lead{grid-column:1/-1;margin-bottom:24px}
  .cnm-grid.n4 .cnm-rail{border-left:1px solid var(--cnm-rule);padding-left:26px}
  .cnm-grid.n2 .cnm-sec,.cnm-grid.n3 .cnm-sec{border-left:1px solid var(--cnm-rule);padding-left:26px}
}
@container (min-width:960px){
  .cnm-grid.n4{grid-template-columns:minmax(0,6fr) minmax(0,3fr) minmax(0,3fr);gap:0 28px}
  .cnm-grid.n4 .cnm-lead{grid-column:auto;margin-bottom:0}
  .cnm-grid.n4 .cnm-sec{border-left:1px solid var(--cnm-rule);padding-left:28px}
}
`;

export default function ASTRenderer({
  ASTComponent,
}: {
  ASTComponent: ComponentType<{ ast?: unknown }>;
}) {
  function MagazineArticles({ node }: { node: ArticlesNode }) {
    // No server data (e.g. local preview): keep the directive's placeholder.
    if (!node.items && !node.error) return <ASTComponent ast={node.children} />;

    const items = node.items ?? [];
    const show = {
      thumbnails: node["show-thumbnails"] ?? false,
      collection: node["show-collection"] ?? false,
      kind: node["show-kind"] ?? false,
      date: node["show-date"] ?? false,
      authors: node["show-authors"] ?? false,
      doi: node["show-doi"] ?? false,
    };

    const color = (item: Item) => colorVar(item.collection);
    const href = articleHref;

    const Kicker = ({ item }: { item: Item }) => {
      const col = show.collection ? label(item.collection) : undefined;
      const kind = show.kind ? label(item.kind) : undefined;
      if (!col && !kind) return null;
      return (
        <div className="cnm-kicker">
          {col && <span className="cnm-col">{col}</span>}
          {kind && <span className="cnm-kind">{kind}</span>}
        </div>
      );
    };

    const Thumb = ({ item }: { item: Item }) =>
      show.thumbnails && item.links?.thumbnail ? (
        <a
          className="cnm-thumb"
          href={href(item)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img src={item.links.thumbnail} alt="" loading="lazy" />
        </a>
      ) : null;

    const rootClass = `cnm${node.wide === false ? " cnm-narrow" : ""}`;
    if (node.collection) return <SectionFront />;

    function SectionFront() {
      // Title, description and colour come from the collection on the first item.
      const collection = items[0]?.collection;
      if (!collection && !node.error) return null; // hide empty sections
      const title = label(collection) ?? node.collection;
      const total = node.total ?? items.length;
      const Kind = ({ item }: { item: Item }) =>
        show.kind && label(item.kind) ? (
          <div className="cnm-kicker">
            <span className="cnm-kind">{label(item.kind)}</span>
          </div>
        ) : null;
      const Byline = ({ item }: { item: Item }) =>
        show.authors && item.authors?.length ? (
          <div className="cnm-by">{byline(item.authors)}</div>
        ) : null;
      const Headline = ({
        item,
        as: Tag = "h3",
      }: {
        item: Item;
        as?: "h3" | "h4";
      }) => (
        <a href={href(item)}>
          <Tag className="cnm-hl">{item.title}</Tag>
        </a>
      );

      let body;
      const band = items.length <= 3;
      if (band) {
        body = (
          <div className="cnm-pc">
            {items.map((item) => (
              <article key={item.id}>
                <Kind item={item} />
                <Headline item={item} />
                <Byline item={item} />
              </article>
            ))}
          </div>
        );
      } else if (total < 10) {
        body = (
          <div className="cnm-pb">
            {items.slice(0, 4).map((item) => (
              <article key={item.id}>
                <Thumb item={item} />
                <Kind item={item} />
                <Headline item={item} />
                <Byline item={item} />
              </article>
            ))}
          </div>
        );
      } else {
        const [first, ...rest] = items;
        body = (
          <div className="cnm-pa">
            <article className="cnm-pa-lead">
              <Thumb item={first} />
              <Kind item={first} />
              <Headline item={first} />
              {first.description && (
                <p className="cnm-dek">{first.description}</p>
              )}
              <Byline item={first} />
            </article>
            <div className="cnm-pa-mid">
              {rest.slice(0, 2).map((item) => (
                <article key={item.id}>
                  <div>
                    <Headline item={item} />
                    <Byline item={item} />
                  </div>
                  <Thumb item={item} />
                </article>
              ))}
            </div>
            {rest.length > 2 && (
              <div className="cnm-pa-list">
                {rest.slice(2, 5).map((item) => (
                  <article key={item.id}>
                    <Headline item={item} as="h4" />
                  </article>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <section
          className={rootClass}
          style={colorVar(collection)}
          aria-label={title}
        >
          <style>{CSS}</style>
          <div className="cnm-in">
            <header className="cnm-sechead">
              <h2>{title}</h2>
              {node["show-count"] && (
                <span className="cnm-count">
                  {total} article{total === 1 ? "" : "s"}
                </span>
              )}
              {collection?.content?.description && (
                <p>{collection.content.description}</p>
              )}
            </header>
            {node.error && <div className="cnm-error">{node.error}</div>}
            {!node.error && !band && body}
          </div>
          {!node.error && band && (
            <div className="cnm-bleed">
              <div className="cnm-in">{body}</div>
            </div>
          )}
        </section>
      );
    }

    const [lead, ...others] = items;
    const secondary = others.slice(0, 2);
    const rail = others.slice(2);
    const size = Math.min(items.length, 4);
    const leadDate = lead && published(lead);

    return (
      <section className={rootClass} aria-label="Latest articles">
        <style>{CSS}</style>
        <div className="cnm-in">
          <div className="cnm-head">
            <h2>Latest</h2>
            {node["show-count"] && node.total != null && (
              <span className="cnm-count">
                {node.total} article{node.total === 1 ? "" : "s"}
              </span>
            )}
          </div>
          {node.error && <div className="cnm-error">{node.error}</div>}
          {!node.error && items.length === 0 && (
            <div className="cnm-empty">
              There are no articles in this listing yet.
            </div>
          )}
          {lead && (
            <div className={`cnm-grid n${size}`}>
              <article className="cnm-lead" style={color(lead)}>
                <Thumb item={lead} />
                <Kicker item={lead} />
                <a href={href(lead)}>
                  <h3 className="cnm-hl">{lead.title}</h3>
                </a>
                {lead.description && (
                  <p className="cnm-dek">{lead.description}</p>
                )}
                {show.authors && lead.authors?.length ? (
                  <div className="cnm-by">{byline(lead.authors)}</div>
                ) : null}
                {((show.date && leadDate) || (show.doi && lead.doi)) && (
                  <div className="cnm-meta">
                    {show.date && leadDate && (
                      <time dateTime={leadDate.toISOString()}>
                        {fullDate(leadDate)}
                      </time>
                    )}
                    {show.doi && lead.doi && (
                      <span className="cnm-doi">doi:{lead.doi}</span>
                    )}
                  </div>
                )}
              </article>
              {secondary.length > 0 && (
                <div className="cnm-sec">
                  {secondary.map((item) => (
                    <article key={item.id} style={color(item)}>
                      <Thumb item={item} />
                      <Kicker item={item} />
                      <a href={href(item)}>
                        <h3 className="cnm-hl">{item.title}</h3>
                      </a>
                      {show.authors && item.authors?.length ? (
                        <div className="cnm-by">{byline(item.authors)}</div>
                      ) : null}
                    </article>
                  ))}
                </div>
              )}
              {rail.length > 0 && (
                <aside className="cnm-rail" aria-label="More latest">
                  <h3>More latest</h3>
                  <ol className={show.date ? undefined : "nodate"}>
                    {rail.map((item) => {
                      const d = published(item);
                      return (
                        <li key={item.id} style={color(item)}>
                          {show.date && (
                            <span className="cnm-when">
                              {d ? relativeDate(d) : ""}
                            </span>
                          )}
                          <div>
                            <a href={href(item)}>
                              <h4 className="cnm-hl">{item.title}</h4>
                            </a>
                            <Kicker item={item} />
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </aside>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  return {
    curvenoteArticles: {
      'curvenoteArticles[layout="cards"]': MagazineArticles,
    },
  };
}
