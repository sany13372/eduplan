import { Disclosure } from '@headlessui/react';
import { GroupCard } from '@src/pages/StudentGroupList/components/GroupCard/GroupCard';
import React, { FC } from 'react';
import { ShortUserInfo } from '@src/pages/StudentGroupList/model/types';
import { Reference } from '@src/types';

import { StudentsInfoContainer } from './StudentsInfoContainer';
import { StudentsInfoContent } from './StudentsInfoContent';

interface GroupDisclosureProps {
  students: ShortUserInfo[];
  studentsCount: number;
  group: Reference;
}
export const GroupDisclosure: FC<GroupDisclosureProps> = ({ students, group, studentsCount }) => {
  return (
    <Disclosure defaultOpen={false}>
      {({ open }) => (
        <StudentsInfoContainer>
          <Disclosure.Button className="bg-white py-3 px-6 w-full flex justify-between items-center rounded-md">
            <GroupCard group={group} isOpen={open} studentsLength={studentsCount} />
          </Disclosure.Button>
          <Disclosure.Panel static={false}>
            <StudentsInfoContent students={students} groupId={group.id} />
          </Disclosure.Panel>
        </StudentsInfoContainer>
      )}
    </Disclosure>
  );
};
