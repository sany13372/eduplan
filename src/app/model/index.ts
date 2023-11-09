import { createDomain } from 'effector';
import { MfeBackground, ToastInfo } from '@src/app/model/types';
import { defaultRoutingInfo } from '@constants/routes';
import { RoutingInfo } from '@src/types';

export const CommonDomain = createDomain('commonDomainEduProgs');

export const addErrorToast = CommonDomain.createEvent<ToastInfo>();
export const addErrorToastFx = CommonDomain.createEffect<ToastInfo, void>();

export const addSuccessToast = CommonDomain.createEvent<ToastInfo>();
export const addSuccessToastFx = CommonDomain.createEffect<ToastInfo, void>();

export const $navigationInfo = CommonDomain.createStore<RoutingInfo>(defaultRoutingInfo);
export const $navigationInfoVisibility = CommonDomain.createStore<boolean>(true);
export const setNavigationInfoVisibility = CommonDomain.createEvent<boolean>();
export const setNavigationInfo = CommonDomain.createEvent<RoutingInfo>();
export const resetNavigationInfo = CommonDomain.createEvent();

export const $prevIsExternal = CommonDomain.createStore<boolean>(false);
export const setPrevIsExternal = CommonDomain.createEvent<boolean>();

export const $mfeBackground = CommonDomain.createStore<MfeBackground>('white');
export const setMfeBackGround = CommonDomain.createEvent<MfeBackground>();
export const resetMfeBackGround = CommonDomain.createEvent();
