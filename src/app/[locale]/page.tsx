import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { Container } from '@src/components/shared/container';
import TranslationsProvider from '@src/components/shared/i18n/TranslationProvider';
import initTranslations from '@src/i18n';
import { defaultLocale, locales } from '@src/i18n/config';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';

interface LandingPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { isEnabled: preview } = draftMode();
  const gqlClient = preview ? previewClient : client;
  const landingPageData = await gqlClient.pageLanding({ locale: params.locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];

  const languages = Object.fromEntries(
    locales.map(locale => [locale, locale === defaultLocale ? '/' : `/${locale}`]),
  );
  const metadata: Metadata = {
    alternates: {
      canonical: '/',
      languages: languages,
    },
  };
  if (page?.seoFields) {
    metadata.title = page.seoFields.pageTitle;
    metadata.description = page.seoFields.pageDescription;
    metadata.robots = {
      follow: !page.seoFields.nofollow,
      index: !page.seoFields.noindex,
    };
  }

  return metadata;
}

export default async function Page({ params: { locale } }: LandingPageProps) {
  const { isEnabled: preview } = draftMode();
  const { t, resources } = await initTranslations({ locale });
  const gqlClient = preview ? previewClient : client;

  const blogPostsData = await gqlClient.pageBlogPostCollection({
    limit: 100, // Fetch up to 100 posts
    locale,
    order: PageBlogPostOrder.PublishedDateDesc,
    preview,
  });

  const allPosts = blogPostsData.pageBlogPostCollection?.items;

  if (!allPosts || allPosts.length === 0) {
    // If there are no posts, you can render a placeholder or a message
    return (
        <Container>
            <div className="my-8 text-center">
                <h2 className="text-2xl font-bold">Welcome to the Blog!</h2>
                <p>No posts have been published yet. Check back soon!</p>
            </div>
        </Container>
    );
  }

  const featuredPost = allPosts[0];
  const latestPosts = allPosts.slice(1);

  return (
    <TranslationsProvider locale={locale} resources={resources}>
      <Container>
        {featuredPost && (
          <Link href={`/${locale}/${featuredPost.slug}`}>
            <ArticleHero article={featuredPost} />
          </Link>
        )}
      </Container>
      
      {latestPosts.length > 0 && (
        <Container className="my-8  md:mb-10 lg:mb-16">
          <h2 className="mb-4 md:mb-6">{t('landingPage.latestArticles')}</h2>
          <ArticleTileGrid className="md:grid-cols-2 lg:grid-cols-3" articles={latestPosts} />
        </Container>
      )}
    </TranslationsProvider>
  );
}
