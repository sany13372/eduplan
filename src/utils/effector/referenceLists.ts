import { Domain, Unit, Event, Effect, Store, forward, createEvent, sample } from 'effector';
import { resolved } from '@src/gql-client';
import { addErrorToast } from '@src/app/model';
import { Reference } from '@src/types';
import { EffectState } from 'patronum/status';
import { status } from 'patronum';

export interface ReferenceListEffectorNodes<TRequestArgs, TResult extends Reference = Reference> {
  get: Event<TRequestArgs>;
  getFx: Effect<TRequestArgs, TResult[]>;
  $items: Store<TResult[]>;
  $loading: Store<boolean>;
  $status: Store<EffectState>;
  reset: Event<void>;
}

export const createReferenceListNodes = <TRequestArgs, TResult extends Reference = Reference>(
  domain: Domain,
): ReferenceListEffectorNodes<TRequestArgs, TResult> => {
  const getFx = domain.createEffect<TRequestArgs, TResult[]>();
  const $status = status({ effect: getFx });

  return {
    get: domain.createEvent<TRequestArgs>(),
    getFx,
    $items: domain.createStore<TResult[]>([]),
    $loading: domain.createStore<boolean>(false),
    $status,
    reset: createEvent(),
  };
};

export type ConnectReferenceListNodesArgs<TRequestArgs, TResult extends Reference = Reference> = {
  nodes: ReferenceListEffectorNodes<TRequestArgs, TResult>;
  query?: (args: TRequestArgs) => TResult[];
  handler?: (args: TRequestArgs) => Promise<TResult[]>;
  resetOn?: Unit<void>[];
};

export const connectReferenceListNodes = <TRequestArgs, TResult extends Reference = Reference>({
  nodes,
  query,
  handler,
  resetOn = [],
}: ConnectReferenceListNodesArgs<TRequestArgs, TResult>) => {
  forward({ from: nodes.get, to: nodes.getFx });

  if (query) {
    nodes.getFx.use(async (args) => resolved(() => query(args), { noCache: true }));
  } else if (handler) {
    nodes.getFx.use(handler);
  }

  nodes.getFx.fail.watch(() => addErrorToast({}));

  nodes.$items.on(nodes.getFx.doneData, (_, value) => value).reset(nodes.reset);

  nodes.$loading.on(nodes.getFx.pending, (_, value) => value).reset(nodes.reset);

  if (resetOn.length > 0) {
    sample({
      clock: resetOn,
      target: nodes.reset,
    });
  }
};
