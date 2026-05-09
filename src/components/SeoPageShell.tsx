import Link from "next/link";
import type { ReactNode } from "react";

type BreadcrumbItem = {
  name: string;
  href: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10 text-xs uppercase tracking-[0.22em] text-white/60">
      <ol className="flex flex-wrap items-center gap-3">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.href} className="flex items-center gap-3">
              {isLast ? (
                <span className="text-white/65">{item.name}</span>
              ) : (
                <Link href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-white">
                  {item.name}
                </Link>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function SeoPageShell({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  children,
}: {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <div className="pointer-events-none fixed left-0 top-0 h-[520px] w-[520px] rounded-full bg-white/[0.025] blur-[120px]" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-[560px] w-[560px] rounded-full bg-white/[0.018] blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-[1120px] px-6 py-10 md:px-10 md:py-14">
        <header className="border-b border-white/10 pb-16 md:pb-24">
          <Breadcrumbs items={breadcrumbs} />
          <p className="text-sm uppercase tracking-[0.28em] text-white/60">{eyebrow}</p>
          <h1 className="mt-8 max-w-5xl text-5xl font-medium leading-[0.9] tracking-[-0.06em] text-white md:text-7xl lg:text-8xl">
            {title}
          </h1>
          <div className="mt-8 max-w-4xl text-lg leading-relaxed text-white/72 md:text-2xl md:leading-relaxed">
            {intro}
          </div>
        </header>

        <div className="py-16 md:py-24">{children}</div>
      </div>
    </main>
  );
}

export function EditorialSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-6 border-b border-white/10 py-12 md:grid-cols-[280px_1fr] md:gap-12 md:py-16">
      <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-white/60">
        {title}
      </h2>
      <div className="max-w-3xl space-y-5 text-base leading-relaxed text-white/72 md:text-xl md:leading-relaxed">
        {children}
      </div>
    </section>
  );
}

export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-white/70"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className="text-white underline decoration-white/25 underline-offset-4 transition-colors hover:text-white/70"
    >
      {children}
    </Link>
  );
}

export function CtaBand({
  title = "Work with Kunal Builds",
  text,
}: {
  title?: string;
  text: string;
}) {
  return (
    <section className="mt-16 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-8 md:p-10">
      <h2 className="text-3xl font-medium tracking-[-0.04em] text-white md:text-5xl">
        {title}
      </h2>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/72 md:text-lg">
        {text}
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="inline-flex min-h-11 items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
        >
          Contact Kunal Builds
        </Link>
        <Link
          href="/services"
          className="inline-flex min-h-11 items-center rounded-full border border-white/15 bg-white/[0.03] px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
        >
          View services
        </Link>
      </div>
    </section>
  );
}
