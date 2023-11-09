import { PageTitleContainer, Portal } from '@sber-universe/om-component-library';
import { PORTAL_ID } from '@constants/portal';
import { Typography } from '@kit-edu/typography';
import { EduPlansActionsWidget } from '@src/pages/EduPlansList';
import React from 'react';

type HeaderInfoProps = {
  title: string;
  id: string;
  eduProgId?: string;
};
export const HeaderInfo = ({ id, title, eduProgId }: HeaderInfoProps) => {
  return (
    <Portal portalId={PORTAL_ID}>
      <PageTitleContainer>
        <div className="flex flex-col gap-3">
          <Typography size="18px" color="medium">
            План обучения
          </Typography>
          <div className="flex gap-[50px] justify-between">
            <Typography as="h2" size="32px" fontWeight="semibold" color="white">
              {title}
            </Typography>
            <div className="shrink-0 flex  items-end">
              <EduPlansActionsWidget id={id} programId={eduProgId} variant="dark" />
            </div>
          </div>
        </div>
      </PageTitleContainer>
    </Portal>
  );
};
