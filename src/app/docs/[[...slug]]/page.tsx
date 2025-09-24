import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-4">{page.data.title}</h1>
      {page.data.description && (
        <p className="text-lg text-muted-foreground mb-8">{page.data.description}</p>
      )}
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <MDX components={getMDXComponents()} />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}


