import { ReactHTML, createElement, useMemo } from "react";
import sanitizeHtml from "sanitize-html";
export type RichTextRender = {
  content: string;
  className?: string;
  component?: keyof ReactHTML
};
export const RichTextRender = ({ content, className = "", component = "div" }: RichTextRender) => {
  const contentSanitize = useMemo(() => {
    return sanitizeHtml(content);
  }, [content]);

  return createElement(component, {
    className,
    dangerouslySetInnerHTML: { __html: contentSanitize }
  })
}
