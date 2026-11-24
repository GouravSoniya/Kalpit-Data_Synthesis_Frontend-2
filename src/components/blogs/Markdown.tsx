import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  h2: ({ node: _n, ...p }) => (
    <h2
      className="mt-14 mb-4 font-serif text-[clamp(1.75rem,3vw,2.35rem)] leading-[1.15] tracking-tight text-ink"
      {...p}
    />
  ),
  h3: ({ node: _n, ...p }) => (
    <h3
      className="mt-10 mb-3 font-serif text-2xl leading-snug tracking-tight text-ink"
      {...p}
    />
  ),
  p: ({ node: _n, ...p }) => <p className="my-6 text-lg leading-8 text-brown" {...p} />,
  a: ({ node: _n, href = "", ...p }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        className="font-medium text-clay underline decoration-clay/40 underline-offset-4 transition-colors hover:decoration-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
        {...p}
      />
    );
  },
  strong: ({ node: _n, ...p }) => <strong className="font-semibold text-ink" {...p} />,
  ul: ({ node: _n, ...p }) => (
    <ul
      className="my-6 list-disc space-y-2 pl-6 text-lg leading-8 text-brown marker:text-clay"
      {...p}
    />
  ),
  ol: ({ node: _n, ...p }) => (
    <ol
      className="my-6 list-decimal space-y-2 pl-6 text-lg leading-8 text-brown marker:font-medium marker:text-clay"
      {...p}
    />
  ),
  blockquote: ({ node: _n, ...p }) => (
    <blockquote
      className="my-8 border-l-2 border-clay pl-6 font-serif text-xl leading-9 text-ink italic [&>p]:my-0 [&>p]:text-xl [&>p]:text-ink"
      {...p}
    />
  ),
  hr: () => (
    <div
      aria-hidden
      className="my-12 text-center text-xl tracking-[1em] text-clay"
    >
      ✦ ✦ ✦
    </div>
  ),
  pre: ({ node: _n, ...p }) => (
    <pre
      className="my-8 overflow-x-auto rounded-2xl bg-ink p-6 text-sm leading-7 text-cream"
      {...p}
    />
  ),
  code: ({ node: _n, className, children, ...p }) => {
    const isBlock = Boolean(className) || String(children).includes("\n");
    return isBlock ? (
      <code className={className} {...p}>
        {children}
      </code>
    ) : (
      <code
        className="rounded-md border border-clay/20 bg-paper px-1.5 py-0.5 text-[0.9em] text-clay"
        {...p}
      >
        {children}
      </code>
    );
  },
  img: ({ node: _n, alt = "", ...p }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt}
      loading="lazy"
      className="my-8 h-auto max-w-full rounded-2xl border border-clay/25"
      {...p}
    />
  ),
  table: ({ node: _n, ...p }) => (
    <div className="my-8 overflow-x-auto rounded-2xl border border-clay/25">
      <table className="w-full text-left text-base text-brown" {...p} />
    </div>
  ),
  th: ({ node: _n, ...p }) => (
    <th className="border-b border-clay/25 bg-paper px-4 py-3 font-semibold text-ink" {...p} />
  ),
  td: ({ node: _n, ...p }) => <td className="border-b border-clay/15 px-4 py-3" {...p} />,
};

export default function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}