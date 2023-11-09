import { createDomain } from 'effector';
import { status } from 'patronum';
import {
  AcademicHourDuration,
  AddEduPlanInfo,
  CompetitionPeriod,
  EduForm,
  EduGrid,
  EduPlanInfo,
  EduTechnology,
  GetUsersDataParams,
  UsersData,
} from '@src/pages/EduPlans/model/types';
import { ValidationErrors } from '@utils/validation';
import { createAddActionNodes, createConfirmNodes, createGetActionNodes } from '@utils/effector';
import { Reference } from '@src/types';
import { defaultUsersData } from '@src/pages/EduPlans/model/constants';

export const EduPlanManagementDomain = createDomain('EduPlanManagementDomain');

export const $eduFormList = EduPlanManagementDomain.createStore<EduForm[]>([]);
export const getEduFormList = EduPlanManagementDomain.createEvent<string>();
export const getEduFormListFx = EduPlanManagementDomain.createEffect<string, EduForm[]>();
export const $eduFormListStatus = status({ effect: getEduFormListFx, defaultValue: 'pending' });

export const $eduTechnologyList = EduPlanManagementDomain.createStore<EduTechnology[]>([]);
export const getEduTechnologyList = EduPlanManagementDomain.createEvent<string>();
export const getEduTechnologyListFx = EduPlanManagementDomain.createEffect<string, EduTechnology[]>();
export const $eduTechnologyListStatus = status({ effect: getEduTechnologyListFx, defaultValue: 'pending' });

export const $eduGridList = EduPlanManagementDomain.createStore<EduGrid[]>([]);
export const getEduGridList = EduPlanManagementDomain.createEvent<string>();
export const getEduGridListFx = EduPlanManagementDomain.createEffect<string, EduGrid[]>();
export const $eduGridListStatus = status({ effect: getEduGridListFx, defaultValue: 'pending' });

export const $academicHourDurationList = EduPlanManagementDomain.createStore<AcademicHourDuration[]>([]);
export const getAcademicHourDurationList = EduPlanManagementDomain.createEvent<string>();
export const getAcademicHourDurationListFx = EduPlanManagementDomain.createEffect<string, AcademicHourDuration[]>();
export const $academicHourDurationListStatus = status({
  effect: getAcademicHourDurationListFx,
  defaultValue: 'pending',
});

export const $competitionPeriodList = EduPlanManagementDomain.createStore<CompetitionPeriod[]>([]);
export const getCompetitionPeriodList = EduPlanManagementDomain.createEvent<string>();
export const getCompetitionPeriodListFx = EduPlanManagementDomain.createEffect<string, CompetitionPeriod[]>();
export const $competitionPeriodListStatus = status({ effect: getCompetitionPeriodListFx, defaultValue: 'pending' });

export const $eduPlanInfo = EduPlanManagementDomain.createStore<EduPlanInfo | null>(null);
export const $eduPlanNotFound = EduPlanManagementDomain.createStore<boolean>(false);
export const resetEduPlanInfo = EduPlanManagementDomain.createEvent();
export const getEduPlanInfo = EduPlanManagementDomain.createEvent<string>();
export const getEduPlanInfoFx = EduPlanManagementDomain.createEffect<string, EduPlanInfo | null>();
export const $getEduPlanInfoStatus = status({ effect: getEduPlanInfoFx, defaultValue: 'pending' });

export const $createEduPlanInfo = EduPlanManagementDomain.createStore<AddEduPlanInfo | null>(null);
export const $createdId = EduPlanManagementDomain.createStore<string>('');
export const $createEduPlanValidationErrors = EduPlanManagementDomain.createStore<ValidationErrors>({});
export const resetCreateEduPlanValidationErrors = EduPlanManagementDomain.createEvent();
export const createEduPlan = EduPlanManagementDomain.createEvent<AddEduPlanInfo>();
export const createEduPlanFx = EduPlanManagementDomain.createEffect<AddEduPlanInfo, string>();
export const resetCreateEduPlanInfo = EduPlanManagementDomain.createEvent();
export const getCreateEduPlanInfo = EduPlanManagementDomain.createEvent<string>();
export const getCreateEduPlanInfoFx = EduPlanManagementDomain.createEffect<string, AddEduPlanInfo>();
export const $getCreateEduPlanInfoStatus = status({ effect: getCreateEduPlanInfoFx, defaultValue: 'pending' });

export const $updateEduPlanInfo = EduPlanManagementDomain.createStore<EduPlanInfo | null>(null);
export const $updateEduPlanInfoNotFound = EduPlanManagementDomain.createStore<boolean>(false);
export const $updatedId = EduPlanManagementDomain.createStore<string>('');
export const $updateEduPlanValidationErrors = EduPlanManagementDomain.createStore<ValidationErrors>({});
export const resetUpdateEduPlanValidationErrors = EduPlanManagementDomain.createEvent();
export const updateEduPlan = EduPlanManagementDomain.createEvent<EduPlanInfo>();
export const updateEduPlanFx = EduPlanManagementDomain.createEffect<EduPlanInfo, string>();
export const resetUpdateEduPlanInfo = EduPlanManagementDomain.createEvent();
export const getUpdateEduPlanInfo = EduPlanManagementDomain.createEvent<string>();
export const getUpdateEduPlanInfoFx = EduPlanManagementDomain.createEffect<string, EduPlanInfo | null>();
export const $getUpdateEduPlanInfoStatus = status({ effect: getUpdateEduPlanInfoFx, defaultValue: 'pending' });

export const isAvailableData = createGetActionNodes<string, boolean>(EduPlanManagementDomain, false);
export const resetDomainData = EduPlanManagementDomain.createEvent();

// Список администраторов плана обучения
export const admins = createGetActionNodes<string, Reference[]>(EduPlanManagementDomain, [], 'pending');
// Количество сотрудников доступных для добавления. Нужно чтобы отобразить заглушку.
export const availableToLinkAdminsCount = createGetActionNodes<string, number>(EduPlanManagementDomain, 0, 'pending');

// Управление видимостью  Drawer'a с формой управления списком админов
export const $adminsDrawerIsVisible = EduPlanManagementDomain.createStore(false);
export const setAdminsDrawerVisibility = EduPlanManagementDomain.createEvent<boolean>();

// Данные о сотрудниках, которых можно сделать админом плана
export const availableToLinkAdmins = createGetActionNodes<GetUsersDataParams, UsersData>(
  EduPlanManagementDomain,
  defaultUsersData,
  'initial',
);
// Загрузка первой страницы данных о сотрудниках, которых можно сделать админом плана. Показывается preloader. Далее используется динамическая подгрузка страниц
export const initialAvailableToLinkAdmins = createGetActionNodes<GetUsersDataParams, UsersData>(
  EduPlanManagementDomain,
  defaultUsersData,
  'initial',
);

// Сохранение данных формы
export const linkAdmins = createAddActionNodes<{ checkedUsers: string[]; planId: string }>(EduPlanManagementDomain);
// Служебный объект. Служит для показа предупреждения при закрытии Drawer'a с измененными данными
export const linkAdminsCloseConfirm = createConfirmNodes(EduPlanManagementDomain);
