import { Domain, Unit, Event, Store } from 'effector';

export interface ConfirmEffectorNodes {
  $callback: Store<() => void>;
  setCallback: Event<() => void>;
  setConfirmIsRequired: Event<boolean>;
  $confirmIsRequired: Store<boolean>;
  setShowConfirmDialog: Event<boolean>;
  $showConfirmDialog: Store<boolean>;
  reset: Event<void>;
}

export const createConfirmNodes = (domain: Domain, confirmIsRequiredDefault = false): ConfirmEffectorNodes => {
  return {
    setConfirmIsRequired: domain.createEvent(),
    setShowConfirmDialog: domain.createEvent(),
    $confirmIsRequired: domain.createStore(confirmIsRequiredDefault),
    $showConfirmDialog: domain.createStore<boolean>(false),
    $callback: domain.createStore<() => void>(() => {}),
    setCallback: domain.createEvent(),
    reset: domain.createEvent(),
  };
};

export type ConnectConfirmNodesArgs = {
  nodes: ConfirmEffectorNodes;
  resetOn?: Unit<void>[];
};

export const connectConfirmNodes = ({ nodes, resetOn = [] }: ConnectConfirmNodesArgs) => {
  nodes.$confirmIsRequired.on(nodes.setConfirmIsRequired, (_, val) => val).reset([nodes.reset, ...resetOn]);
  nodes.$showConfirmDialog.on(nodes.setShowConfirmDialog, (_, val) => val).reset([nodes.reset, ...resetOn]);
  nodes.$callback.on(nodes.setCallback, (_, val) => val).reset([nodes.reset, ...resetOn]);
};
