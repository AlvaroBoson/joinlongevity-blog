'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import BlogLogo from '@icons/blog-logo.svg';
import { LanguageSelector } from '@src/components/features/language-selector';
import { Container } from '@src/components/shared/container';

export const Header = () => {
  const { t } = useTranslation();

  return (
    <header className="py-5">
      <nav>
        <Container className="flex items-center justify-between">
          <Link href="/" title={t('common.homepage')}>
            <BlogLogo />
          </Link>
          <div className="flex gap-4">
            <Link href="https://www.joinlongevity.org" className="text-lg">
              Home
            </Link>
            <Link href="https://www.joinlongevity.org/longevity-explorer" className="text-lg">
              Explorer
            </Link>
            <Link href="https://www.joinlongevity.org/longevity-map" className="text-lg">
              Map
            </Link>
          </div>
          <LanguageSelector />
        </Container>
      </nav>
    </header>
  );
};
