import { PageTitleContainer, Portal } from '@sber-universe/om-component-library';
import { PORTAL_ID } from '@constants/portal';
import { Typography } from '@kit-edu/typography';
import React from 'react';

type PageTitleProps = {
  title: string;
  subtitle?: string;
};

export const PageTitle: React.FC<PageTitleProps> = ({ children, title, subtitle }) => (
  <Portal portalId={PORTAL_ID}>
    <PageTitleContainer>
      <div className="flex gap-[40px] justify-between">
        <div className="flex flex-col gap-3">
          {subtitle && (
            <Typography size="18px" color="medium">
              {subtitle}
            </Typography>
          )}
          <Typography as="h2" size="32px" fontWeight="semibold" color="white">
            {title}
          </Typography>
        </div>
        <div className="shrink-0 flex  items-end">{children}</div>
      </div>
    </PageTitleContainer>
  </Portal>
);
