import type { MDXComponents } from "mdx/types";

/**
 * Brand-aware MDX element overrides for long-form content (Journal posts and
 * Work case-study bodies). Passed to compileMDX in the [slug] routes.
 *
 * Every element maps to an existing typography utility from globals.css. Prose
 * is set bone-on-ink (the editorial reading column sits on the dark base).
 */
export const proseMdxComponents: MDXComponents = {
  // Heading top-margin rhythm is set on the prose wrapper via [&>h2]/[&>h3]
  // child selectors (see the [slug] pages) — those outrank the .heading-*
  // utilities' `margin: 0`, which an mt-* here could not.
  h2: ({ children, ...props }) => (
    <h2 className="heading-lg" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="heading-md" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="body-reading mt-6 text-bone/90" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }) => (
    <a
      className="text-champagne underline underline-offset-4 decoration-from-font transition-opacity hover:opacity-70 rounded-sm"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="body-reading mt-6 list-disc list-outside pl-6 space-y-2 text-bone/90 marker:text-champagne"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="body-reading mt-6 list-decimal list-outside pl-6 space-y-2 text-bone/90 marker:text-champagne"
      {...props}
    >
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="pl-1.5 leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="blockquote my-10 text-bone" {...props}>
      {children}
    </blockquote>
  ),
  hr: (props) => <hr className="my-12 border-0 border-t rule-dark" {...props} />,
  // alt = accessibility only. Visible caption is opt-in via the image title:
  // ![alt](src "this becomes the caption"). No title → no caption.
  img: ({ src, alt, title, ...props }) => (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        loading="lazy"
        className="w-full h-auto"
        {...props}
      />
      {title ? <figcaption className="label mt-3 text-clay">{title}</figcaption> : null}
    </figure>
  ),
};

// @next/mdx convention hook — kept so either MDX integration resolves this file.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...proseMdxComponents, ...components };
}
