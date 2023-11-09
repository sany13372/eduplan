import { GroupObj, StudentTrajectory } from '@src/pages/IotManagement/model/types';
import { defaultObj, emptyGroupObj } from '@src/pages/IotManagement/model/constants';

export class StudentTrajectoryHelper {
  private trajectoryList: StudentTrajectory[];

  private eduGridElementId: string;

  constructor(trajectortList: StudentTrajectory[], eduGridElementId: string) {
    this.eduGridElementId = eduGridElementId;
    this.trajectoryList = trajectortList;
  }

  get iotList(): StudentTrajectory[] {
    return this.trajectoryList;
  }

  filterByShowAll = (showAll: boolean): StudentTrajectoryHelper => {
    if (showAll) return this;
    this.trajectoryList = this.trajectoryList.filter((e) =>
      e.trajectoryList.find((el) => el.gridElementId === this.eduGridElementId),
    );
    return this;
  };

  private fuzzyMatch = (pattern: string, str: string): boolean => {
    const regexpPattern = `.*${pattern}.*`;
    const re = new RegExp(regexpPattern, 'i');
    return re.test(str);
  };

  filterByFio = (filterVal: string): StudentTrajectoryHelper => {
    this.trajectoryList = this.trajectoryList.filter((e) => this.fuzzyMatch(filterVal, e.studentInfo.fullName));
    return this;
  };

  filterByGroup = (filterVal: GroupObj[]): StudentTrajectoryHelper => {
    if (filterVal.find((e) => e.id === defaultObj.id)) return this;
    const idList = filterVal.map((e) => e.id);
    this.trajectoryList = this.trajectoryList.filter((e) => {
      const { id: groupId } = e.groupInfo;
      return idList.includes(groupId) || (!groupId && idList.includes(emptyGroupObj.id));
    });
    return this;
  };
}
