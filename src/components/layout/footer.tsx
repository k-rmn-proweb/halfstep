import Link from "next/link";

import { footerContent } from "@/content/footer";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  return (
    <footer className="border-t border-edge bg-canvas-subtle py-16">
      <Container>
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-measure">
            <Logo />
            <p className="mt-4 text-body text-ink-muted">
              {footerContent.tagline}
            </p>
          </div>

          <div className="flex gap-16">
            {footerContent.columns.map((column) => (
              <div key={column.heading}>
                <p className="font-mono text-label text-ink-muted uppercase">
                  {column.heading}
                </p>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-small text-ink transition-colors duration-200 hover:text-brand-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-edge pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-lead text-small text-ink-muted">
            {footerContent.disclaimer}
          </p>
          <p className="shrink-0 text-small text-ink-muted">
            {footerContent.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
