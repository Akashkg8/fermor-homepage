/**
 * A figure set in tabular numerals (so digits don't jitter as values change),
 * with , and . kept proportional — Schibsted's tnum feature widens them.
 */
export function Num({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`tnum ${className}`}>
      {children.split(/([,.])/).map((part, i) =>
        part === "," || part === "." ? (
          <span key={i} className="sep">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
}

const ESC: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };

/** Same markup as <Num>, as an HTML string for direct DOM writes. */
export function numHTML(text: string): string {
  return text.replace(/[&<>"]/g, (c) => ESC[c]).replace(/([,.])/g, '<span class="sep">$1</span>');
}
