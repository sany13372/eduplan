import { EventReference } from '@src/pages/Events/model/types';

export const isOnline = (format: EventReference): boolean => format.systemCode === 'online';
export const isOffline = (format: EventReference): boolean => format.systemCode === 'offline';
export const isMixed = (format: EventReference): boolean => format.systemCode === 'mixed';
export const isOnlineWithLink = (videoConfKind: EventReference): boolean => videoConfKind.systemCode !== 'webinar';
export const isVideoConfWebinarLink = (videoConfKind: EventReference): boolean =>
  videoConfKind.systemCode === 'webinar';
