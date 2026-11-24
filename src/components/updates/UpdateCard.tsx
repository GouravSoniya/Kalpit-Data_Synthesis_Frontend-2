import ReactMarkdown from "react-markdown";
import { formatUpdateDate, type Update } from "@/lib/updates";

export default function UpdateCard({ update }: { update: Update }) {
  const external = update.link ? /^https?:\/\//.test(update.link.href) : false;

  return (
    <article
      id={update.slug}
      className="relative scroll-mt-32 rounded-2xl border border-clay/25 bg-paper px-6 py-5 md:px-7 md:py-6"
    >
      {/* star marker: centred on the timeline, and on the card's height */}
      <span
        aria-hidden
        className="absolute top-1/2 -left-[34px] grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-cream text-clay md:-left-[42px]"
      >
        <svg viewBox="0 0 24 24" className="size-4 fill-current">
          <path d="M12 1Q12 12 23 12Q12 12 12 23Q12 12 1 12Q12 12 12 1Z" />
        </svg>
      </span>

      <a
        href={`#${update.slug}`}
        className="text-sm font-medium text-clay underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
      >
        <time dateTime={update.date}>{formatUpdateDate(update.date)}</time>
      </a>

      <div className="mt-2 text-lg leading-8 text-ink">
        <ReactMarkdown
          allowedElements={["p", "a", "strong", "em", "code"]}
          unwrapDisallowed
          components={{
            p: ({ node: _n, ...p }) => <p className="[&:not(:first-child)]:mt-3" {...p} />,
            a: ({ node: _n, href = "", ...p }) => (
              <a
                href={href}
                {...(/^https?:\/\//.test(href) && {
                  target: "_blank",
                  rel: "noopener noreferrer",
                })}
                className="font-medium text-clay underline decoration-clay/40 underline-offset-4 hover:decoration-clay"
                {...p}
              />
            ),
            strong: ({ node: _n, ...p }) => <strong className="font-semibold" {...p} />,
            code: ({ node: _n, ...p }) => (
              <code
                className="rounded-md border border-clay/20 bg-cream px-1.5 py-0.5 text-[0.9em] text-clay"
                {...p}
              />
            ),
          }}
        >
          {update.content}
        </ReactMarkdown>
      </div>

      {update.link && (
        <a
          href={update.link.href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-clay"
        >
          {update.link.label} <span aria-hidden>→</span>
        </a>
      )}
    </article>
  );
}