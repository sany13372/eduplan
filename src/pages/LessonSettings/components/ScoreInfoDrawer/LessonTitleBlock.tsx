import { ContentPanel, Label, TextContent } from '@src/pages/LessonSettings/components';
import React from 'react';

export const LessonTitleBlock = ({ title }: { title: string }) => {
  return (
    <ContentPanel variant="white" className="flex flex-col gap-y-5">
      <Label label="Занятие">
        <TextContent color="dark">{title}</TextContent>
      </Label>
    </ContentPanel>
  );
};
