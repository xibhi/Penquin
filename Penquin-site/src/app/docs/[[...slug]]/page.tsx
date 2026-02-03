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
import { Suspense } from 'react';
import HighlightQuery from '@/components/docs/HighlightQuery';

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
  const androidBugBounty = new Set(['video-tutorials', 'android-youtube-channels', 'bestbugreports', 'blogs-and-writeups', 'github-repository', 'intentionally-vulnerable-apps', 'learn-drozer-for-android-pentesting', 'learn-frida-for-android-pentesting', 'bypassing-security-protections-in-apks-via-objection-and-frida', 'automated-scanners', 'security-tools-for-android-pentesting', 'pidcat-bug-bounty-logging', 'cli-commands-and-shortcuts']);

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
  } else if (androidBugBounty.has(slug)) {
    trail = [
      { label: 'Android Bug Bounty', href: '/docs/video-tutorials' },
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
    'video-tutorials': 'Video Tutorials',
    'android-youtube-channels': 'Android YouTube Channels',
    'android-bug-bounty': 'Android Bug Bounty',
    'bestbugreports': 'Best Bug Reports',
    'github-repository': 'GitHub Repository',
    'blogs-and-writeups': 'Blogs and Writeups',
    'intentionally-vulnerable-apps': 'Intentionally Vulnerable Apps',
    'conference-talks': 'Conference Talks',
    'automated-scanners': 'Automated Scanners',
    'learn-drozer-for-android-pentesting': 'Learn Drozer for Android Pentesting',
    'learn-frida-for-android-pentesting': 'Learn Frida for Android Pentesting',
    'bypassing-security-protections-in-apks-via-objection-and-frida': 'Bypassing Security Protections in APKs via Objection and Frida',
    'security-tools-for-android-pentesting': 'Security Tools for Android Pentesting',
    'pidcat-bug-bounty-logging': 'PIDCAT for Android Bug Bounty Logging',
    'cli-commands-and-shortcuts': 'CLI Commands & Shortcuts',
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
    orderedSlugs = allParams.map((p: { slug?: string[] }) => (p.slug ?? []).join('/'));
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
      <nav className="mb-4 flex flex-wrap items-center gap-y-1 text-sm font-medium text-muted-foreground/70" aria-label="Breadcrumbs">
        {breadcrumbs.map((c, i) => (
          <div key={`${c.href}-${i}`} className="flex items-center">
            <Link
              className="hover:text-primary transition-colors no-underline py-1 whitespace-nowrap"
              href={c.href}
            >
              {c.label}
            </Link>
            {i < breadcrumbs.length - 1 && (
              <span className="mx-2.5 text-muted-foreground/30 select-none">/</span>
            )}
          </div>
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
      <Suspense fallback={null}>
        <HighlightQuery />
      </Suspense>

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

  return {
    title: page.data.title,
    description: page.data.description || `Learn about ${page.data.title} in the Penquin Tool documentation. Advanced Cyber Security resources and Bug Bounty workflows.`,
    openGraph: {
      title: `${page.data.title} | Penquin Tool Docs`,
      description: page.data.description,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${page.data.title} | Penquin Tool Docs`,
      description: page.data.description,
    }
  };
}