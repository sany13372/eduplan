import { $groupSelected, resetGroupSelected, setGroupSelected } from '@src/pages/StudentGroupList/model';

$groupSelected.on(setGroupSelected, (_, selectedGroup) => selectedGroup).reset(resetGroupSelected);
