import { RoutingInfo } from '@src/types';
import { Event, createEvent, createStore, sample } from 'effector';

import { setNavigationInfo } from '.';

interface Connection {
  connect: Event<void>;
  drop: Event<void>;
}

export function connectNavigation(outerSetNavigationInfo: Event<RoutingInfo>): Connection {
  const drop = createEvent();
  const connect = createEvent();
  const $keepAlive = createStore(true)
    .on(connect, () => true)
    .on(drop, () => false);

  sample({
    clock: setNavigationInfo,
    filter: $keepAlive,
    target: outerSetNavigationInfo,
  });

  return { connect, drop };
}
