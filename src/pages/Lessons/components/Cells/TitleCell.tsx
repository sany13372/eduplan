import { Tooltip } from '@kit-edu/tooltip';
import { Typography } from '@kit-edu/typography';
import React, { FC, useMemo, useRef } from 'react';
import { Lesson } from '@src/pages/Lessons/model/types';
import { Link } from 'react-router-dom';
import { getPath, MfeRoutes } from '@constants/routes';

type TitleCellProps = {
  data: Lesson;
  enableLessonCardRedirect?: boolean;
};

export const TitleCell: FC<TitleCellProps> = ({ children, data, enableLessonCardRedirect = false }): JSX.Element => {
  const ref = useRef<HTMLParagraphElement>(null);
  const title = useMemo(() => {
    return data.elementType === 'group'
      ? `${data.groupInfo.objType?.title ?? 'Тема'}: ${data.groupInfo.title}`
      : data.itemInfo.title;
  }, [data]);

  const itemDepth = useMemo(() => data.path.split('.').length - 1, [data]);
  const isGroup = useMemo(() => data.elementType === 'group', [data]);
  const goToPath = useMemo(() => {
    const lessonId = data.elementType === 'lesson' ? data.itemInfo.id : '';
    return lessonId ? getPath(MfeRoutes.LESSON_INFO_CONTENT, { ':lessonId': lessonId }) : '';
  }, [data]);

  return (
    <div className="space-x-2 flex items-center ">
      <Tooltip
        trigger="mouseenter click"
        delay={500}
        reference={ref.current}
        content={
          <Typography as="p" size="12px" className="whitespace-pre-wrap">
            {title}
          </Typography>
        }
      >
        {null}
      </Tooltip>
      <Typography
        ref={ref}
        as="p"
        size="14px"
        className={`truncate ${isGroup ? 'font-semibold ' : ''} pl-${2 * itemDepth}`}
      >
        {!enableLessonCardRedirect || isGroup ? (
          title
        ) : (
          <Link to={goToPath} className="text-[#60a5fa] underline text-center block truncate">
            {title}
          </Link>
        )}
      </Typography>

      {children}
    </div>
  );
};
