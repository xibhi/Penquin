import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
// Import explicit order matching sidebar
import { docsOrderedSlugs } from '@/lib/docsOrder';
// Import docs meta as secondary fallback
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - JSON import for simple config
import docsMeta from '@/../content/docs/meta.json';
import Link from 'next/link';
import HighlightQuery from '@/components/HighlightQuery';

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

function getBreadcrumb(slug: string): { label: string; href: string }[] {
  // Map slugs to their parent folder label in the sidebar
  const bugHunters = new Set([
    'arsenal', 'reconnaissance', 'methodology', 'extensions', 'writeups', 'youtube-channels'
  ]);
  const basics = new Set([
    'cyber-security-types', 'common-job-roles', 'get-started-with-infosec', 'best-bug-bounty-platform', 'best-infosec-writeups-website', 'hacking-books', 'cli-commands', 'learn-wsl'
  ]);
  const hackers = new Set(['twitter', 'medium', 'youtube', 'discord', 'security-gitbooks']);

  let trail: { label: string; href: string }[];

  if (slug === '' || slug === 'index') {
    trail = [
      { label: 'Getting Started', href: '/docs' },
      { label: 'Introduction', href: '/docs' },
    ];
  } else if (bugHunters.has(slug)) {
    trail = [
      { label: "Bug Hunter's Toolkit", href: '/docs/arsenal' },
      { label: slugToTitle(slug), href: `/docs/${slug}` },
    ];
  } else if (basics.has(slug)) {
    trail = [
      { label: 'Learn the Basics', href: '/docs/cyber-security-types' },
      { label: slugToTitle(slug), href: `/docs/${slug}` },
    ];
  } else if (hackers.has(slug)) {
    trail = [
      { label: 'Hackers to Follow', href: '/docs/twitter' },
      { label: slugToTitle(slug), href: `/docs/${slug}` },
    ];
  } else {
    trail = [{ label: slugToTitle(slug || 'docs'), href: `/docs/${slug}` }];
  }

  return [{ label: 'Docs', href: '/docs' }, ...trail];
}

function slugToTitle(slug: string): string {
  const map: Record<string, string> = {
    'index': 'Introduction',
    'arsenal': 'Arsenal',
    'reconnaissance': 'Reconnaissance',
    'methodology': 'Methodology',
    'extensions': 'Extensions',
    'writeups': 'Writeups',
    'youtube-channels': 'YouTube Channels',
    'cyber-security-types': 'Cyber Security Types',
    'common-job-roles': 'Common Job Roles',
    'get-started-with-infosec': 'Get Started with Infosec',
    'best-bug-bounty-platform': 'Best Bug Bounty Platform',
    'best-infosec-writeups-website': 'Best Infosec Writeups Website',
    'hacking-books': 'Hacking Books',
    'cli-commands': 'CLI Commands',
    'learn-wsl': 'Learn WSL',
    'twitter': 'Twitter',
    'medium': 'Medium',
    'youtube': 'YouTube',
    'discord': 'Discord',
    'security-gitbooks': 'Security GitBooks',
  };
  return map[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());
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

  const crumbSlug = currentKey === '' ? 'index' : currentKey;
  const breadcrumbs = getBreadcrumb(crumbSlug);

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      {/* Breadcrumbs */}
      <nav className="mb-3 text-sm text-muted-foreground flex items-center gap-1">
        {breadcrumbs.map((c, i) => (
          <span key={`${c.href}-${i}`} className="inline-flex  my-3 ml-1 font-medium text-md items-center gap-1">
            <Link className="hover:text-primary no-underline" href={c.href}>{c.label}</Link>
            {i < breadcrumbs.length - 1 && <span className="px-1 text-muted-foreground">/</span>}
          </span>
        ))}
      </nav>

      <h1 className="text-3xl font-bold mb-4">{page.data.title}</h1>
      {page.data.description && (
        <p className="text-lg text-muted-foreground mb-8">{page.data.description}</p>
      )}
      <div id="docs-content-root" className="prose prose-gray dark:prose-invert max-w-none">
        <MDX components={getMDXComponents()} />
      </div>
      {/* Client-side highlighter mounts here and highlights with query param ?q= */}
      <HighlightQuery />

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