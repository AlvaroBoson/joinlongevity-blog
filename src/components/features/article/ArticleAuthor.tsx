'use client';

import { useContentfulInspectorMode } from '@contentful/live-preview/react';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleAuthorProps {
  article: PageBlogPostFieldsFragment;
}

export const ArticleAuthor = ({ article }: ArticleAuthorProps) => {
  return null;
  /*
  const { author } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: author?.sys.id });

  return (
    <div className="flex items-center" {...inspectorProps({ fieldId: 'name' })}>
      <div
        className="mr-2 overflow-hidden rounded-full border border-blue500"
        {...inspectorProps({ fieldId: 'avatar' })}
      >
        {author?.avatar && (
          <CtfImage
            nextImageProps={{
              width: 28,
              height: 28,
              sizes: undefined,
              placeholder: undefined,
            }}
            {...author.avatar}
          />
        )}
      </div>
      <span className="text-xs leading-none text-gray600" {...inspectorProps({ fieldId: 'name' })}>
        {author?.name}
      </span>
    </div>
  );
  */
};
