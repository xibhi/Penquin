import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
// Import explicit order matching sidebar
import { docsOrderedSlugs } from '@/lib/docsOrder';
// Import docs meta as secondary fallback
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - JSON import for simple config
import docsMeta from '@/../content/docs/meta.json';

type DocsMeta = { pages?: string[] };

function getOrderedSlugsFromMeta(): string[] {
  const meta = (docsMeta as unknown as DocsMeta) || {};
  const raw = Array.isArray(meta.pages) ? meta.pages : [];
  return raw.filter((p) => typeof p === 'string' && !p.startsWith('---') && !p.startsWith('...'));
}

function resolveOrderSlugs(): string[] {
  // 1) Use explicit list if available and slugs exist
  const explicit = docsOrderedSlugs.filter((s) => source.getPage(s ? [s] : undefined));
  if (explicit.length) return explicit;
  // 2) Fallback to meta.json order
  const meta = getOrderedSlugsFromMeta().filter((s) => source.getPage([s]));
  if (meta.length) return meta;
  return [];
}

function getPageBySlug(slug: string | undefined) {
  if (slug === undefined) return undefined;
  // Treat empty string as the root docs page
  return slug ? source.getPage([slug]) : source.getPage(undefined);
}

export default async function Page(props: { params: Promise<{ slug?: string[] }>; }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  const currentKey = (params.slug ?? []).join('/');

  let orderedSlugs = resolveOrderSlugs();
  if (orderedSlugs.length === 0 || !orderedSlugs.includes(currentKey)) {
    const allParams = await source.generateParams();
    orderedSlugs = allParams.map((p) => (p.slug ?? []).join('/'));
  }

  const index = orderedSlugs.findIndex((s) => s === currentKey);
  const prevSlug = index > 0 ? orderedSlugs[index - 1] : undefined;
  const nextSlug = index >= 0 && index < orderedSlugs.length - 1 ? orderedSlugs[index + 1] : undefined;

  const prevPage = getPageBySlug(prevSlug);
  const nextPage = getPageBySlug(nextSlug);

  const prevHref = prevSlug !== undefined ? `/docs/${prevSlug}` : undefined; // '' -> /docs/
  const nextHref = nextSlug !== undefined ? `/docs/${nextSlug}` : undefined;

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">{page.data.title}</h1>
      {page.data.description && (
        <p className="text-lg text-muted-foreground mb-8">{page.data.description}</p>
      )}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDX components={getMDXComponents()} />
      </div>

      {(prevHref || nextHref) && (
        <div className="flex flex-col md:flex-row mt-6 gap-2 max-w-3xl mx-auto text-muted-foreground">
          {prevHref && (
            <a
              className="group text-sm p-2.5 flex gap-4 flex-1 flex-row-reverse items-center pl-4 border border-border rounded-sm md:p-4 md:text-base hover:border-primary no-underline"
              href={prevHref}
            >
              <span className="flex flex-col flex-1 text-right">
                <span className="text-xs">Previous</span>
                <span className="text-foreground group-hover:text-primary line-clamp-2">{prevPage?.data.title}</span>
              </span>
              <i className="fas fa-chevron-left hidden md:block text-xs text-muted-foreground group-hover:text-primary" />
            </a>
          )}

          {nextHref && (
            <a
              className="group text-sm p-2.5 flex gap-4 flex-1 flex-row items-center pr-4 border border-border rounded-sm md:p-4 md:text-base hover:border-primary no-underline"
              href={nextHref}
            >
              <span className="flex flex-col flex-1">
                <span className="text-xs">Next</span>
                <span className="text-foreground group-hover:text-primary line-clamp-2">{nextPage?.data.title}</span>
              </span>
              <i className="fas fa-chevron-right hidden md:block text-xs text-muted-foreground group-hover:text-primary" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }>; }) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return { title: page.data.title, description: page.data.description };
}


