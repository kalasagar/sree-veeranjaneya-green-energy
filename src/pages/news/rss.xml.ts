import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../../lib/site';

export async function GET(context: { site: string | URL }) {
  const posts = (await getCollection('news', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: `${SITE.name} · News`,
    description: 'Monthly receipts from the SVGE construction record.',
    site: context.site,
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.summary,
      link: `/news/${p.id}/`,
      categories: p.data.tags ?? [],
    })),
    customData: '<language>en-IN</language>',
  });
}
