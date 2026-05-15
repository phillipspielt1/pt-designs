import { Block, headingId } from "@/lib/blog";

/* Editorial palette — fixed (the blog isn't subject to the carousel
   theme system; a blog needs to stay legible and consistent). */
const INK = "#15110B";
const MUTED = "#5C554C";
const ACCENT = "#B45309";
const SERIF = "'Fraunces', 'Iowan Old Style', Georgia, serif";
const BODY = "'Hanken Grotesk', system-ui, sans-serif";

/**
 * Renders a blog post's content blocks as clean, semantic HTML.
 * Headings carry slugified ids so the table of contents can deep-link
 * and search engines can surface passage anchors.
 */
export default function BlogArticle({ content }: { content: Block[] }) {
  return (
    <div>
      {content.map((block, i) => {
        if (block.kind === "h2") {
          return (
            <h2
              key={i}
              id={headingId(block.text)}
              className="scroll-mt-24 text-3xl sm:text-4xl leading-[1.1] tracking-tight mt-16 mb-5"
              style={{ fontFamily: SERIF, fontWeight: 500, color: INK }}
            >
              {block.text}
            </h2>
          );
        }
        if (block.kind === "h3") {
          return (
            <h3
              key={i}
              id={headingId(block.text)}
              className="scroll-mt-24 text-xl sm:text-2xl leading-snug tracking-tight mt-10 mb-3"
              style={{ fontFamily: SERIF, fontWeight: 500, color: INK }}
            >
              {block.text}
            </h3>
          );
        }
        if (block.kind === "ul") {
          return (
            <ul key={i} className="my-5 space-y-2.5 pl-1">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="flex gap-3 text-[17px] leading-[1.6]"
                  style={{ fontFamily: BODY, color: MUTED }}
                >
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 rounded-full shrink-0"
                    style={{ background: ACCENT }}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p
            key={i}
            className="my-5 text-[17px] leading-[1.75]"
            style={{ fontFamily: BODY, color: MUTED }}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
