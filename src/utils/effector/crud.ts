import isEmpty from 'lodash/isEmpty';
import { status } from 'patronum';
import { EffectState } from 'patronum/status';
import { Domain, Unit, Event, Effect, Store, forward, sample } from 'effector';
import { ValidationErrors } from '@utils/validation';
import { addErrorToast, addSuccessToast } from '@src/app/model';

// Add Action

export type AddActionEffectorNode<TParams> = {
  add: Event<TParams>;
  addFx: Effect<TParams, string>;
  $validationErrors: Store<ValidationErrors>;
  $status: Store<EffectState>;
  $createdId: Store<string>;
  reset: Event<void>;
  resetErrors: Event<void>;
};

export const createAddActionNodes = <TParams>(domain: Domain): AddActionEffectorNode<TParams> => {
  const addFx = domain.createEffect<TParams, string>();
  const $status = status({ effect: addFx });
  return {
    add: domain.createEvent<TParams>(),
    addFx,
    $validationErrors: domain.createStore<ValidationErrors>({}),
    $status,
    $createdId: domain.createStore<string>(''),
    reset: domain.createEvent(),
    resetErrors: domain.createEvent(),
  };
};

export type ConnectAddActionNodesArgs<TParams> = {
  nodes: AddActionEffectorNode<TParams>;
  handler: (params: TParams) => Promise<string>;
  convertErrors: (e: Error) => ValidationErrors;
  resetOn?: Unit<void>[];
  resetErrorsOn?: Unit<void>[];
  disableToasts?: boolean;
};

export const connectAddActionNodes = <TParams>({
  nodes,
  handler,
  convertErrors,
  resetOn = [],
  resetErrorsOn = [],
  disableToasts = false,
}: ConnectAddActionNodesArgs<TParams>) => {
  forward({ from: nodes.add, to: nodes.addFx });

  nodes.addFx.use(handler);

  const addFailed = nodes.addFx.failData.map(convertErrors);

  if (!disableToasts) {
    sample({
      clock: nodes.addFx.doneData,
      fn: () => ({}),
      target: addSuccessToast,
    });
    addFailed.watch((validationErrors) => {
      if (isEmpty(validationErrors)) {
        addErrorToast({});
      }
    });
  }

  nodes.$status.reset([nodes.reset, ...resetOn]);
  nodes.$createdId.on(nodes.addFx.doneData, (_, value) => value).reset([nodes.reset, ...resetOn]);

  nodes.$validationErrors
    .on(nodes.addFx.doneData, () => ({}))
    .on(addFailed, (_, validationErrors) => validationErrors)
    .reset([nodes.resetErrors, ...resetErrorsOn]);
};

// Update Action

export type UpdateActionEffectorNode<TParams> = {
  update: Event<TParams>;
  updateFx: Effect<TParams, string>;
  $validationErrors: Store<ValidationErrors>;
  $status: Store<EffectState>;
  $updatedId: Store<string>;
  reset: Event<void>;
  setErrors: Event<ValidationErrors>;
  resetErrors: Event<void>;
};

export const createUpdateActionNodes = <TParams>(domain: Domain): UpdateActionEffectorNode<TParams> => {
  const updateFx = domain.createEffect<TParams, string>();
  const $status = status({ effect: updateFx });
  return {
    update: domain.createEvent<TParams>(),
    updateFx,
    $validationErrors: domain.createStore<ValidationErrors>({}),
    $status,
    $updatedId: domain.createStore<string>(''),
    reset: domain.createEvent(),
    setErrors: domain.createEvent(),
    resetErrors: domain.createEvent(),
  };
};

export type ConnectUpdateActionNodesArgs<TParams> = {
  nodes: UpdateActionEffectorNode<TParams>;
  handler: (params: TParams) => Promise<string>;
  convertErrors: (e: Error) => ValidationErrors;
  resetOn?: Unit<void>[];
  resetErrorsOn?: Unit<void>[];
  showSuccessToast?:boolean;
};

export const connectUpdateActionNodes = <TParams>({
  nodes,
  handler,
  convertErrors,
  resetOn = [],
  resetErrorsOn = [],
  showSuccessToast = true
}: ConnectUpdateActionNodesArgs<TParams>) => {
  forward({ from: nodes.update, to: nodes.updateFx });

  nodes.updateFx.use(handler);

  const updateFailed = nodes.updateFx.failData.map(convertErrors);

  if (showSuccessToast){
    sample({
      clock: nodes.updateFx.doneData,
      fn: () => ({}),
      target: addSuccessToast,
    });
  }
  updateFailed.watch((validationErrors) => {
    if (isEmpty(validationErrors)) {
      addErrorToast({});
    }
  });

  nodes.$status.reset([nodes.reset, ...resetOn]);
  nodes.$updatedId.on(nodes.updateFx.doneData, (_, value) => value).reset([nodes.reset, ...resetOn]);

  nodes.$validationErrors
    .on(nodes.setErrors, (_, errors) => errors)
    .on(nodes.updateFx.doneData, () => ({}))
    .on(updateFailed, (_, validationErrors) => validationErrors)
    .reset([nodes.resetErrors, ...resetErrorsOn]);
};

// Delete Action

export type DeleteActionEffectorNode<TParams = string> = {
  $item: Store<TParams | null>;
  setItem: Event<TParams>;
  delete: Event<TParams>;
  deleteFx: Effect<TParams, string>;
  $validationError: Store<string>;
  dismissValidationError: Event<void>;
  $isDeleting: Store<boolean>;
  $isDeleted: Store<boolean>;
  reset: Event<void>;
};

export const createDeleteActionNodes = <TParams = string>(domain: Domain): DeleteActionEffectorNode<TParams> => {
  return {
    $item: domain.createStore<TParams | null>(null),
    setItem: domain.createEvent<TParams>(),
    delete: domain.createEvent<TParams>(),
    deleteFx: domain.createEffect<TParams, string>(),
    $validationError: domain.createStore<string>(''),
    dismissValidationError: domain.createEvent(),
    $isDeleting: domain.createStore<boolean>(false),
    $isDeleted: domain.createStore<boolean>(false),
    reset: domain.createEvent(),
  };
};

export type ConnectDeleteActionNodes<TParams = string> = {
  nodes: DeleteActionEffectorNode<TParams>;
  handler: (params: TParams) => Promise<string>;
  convertErrors: (e: Error) => string;
  showErrorToast?: boolean;
};

export const connectDeleteActionNodes = <TParams = string>({
  nodes,
  handler,
  convertErrors,
  showErrorToast = true,
}: ConnectDeleteActionNodes<TParams>) => {
  forward({ from: nodes.delete, to: nodes.deleteFx });

  nodes.deleteFx.use(handler);

  const deleteFailed = nodes.deleteFx.failData.map(convertErrors);

  // sample({
  //   clock: nodes.deleteFx.doneData,
  //   fn: () => ({}),
  //   target: addSuccessToast
  // });
  if (showErrorToast)
    deleteFailed.watch((validationError) => {
      if (!validationError) {
        addErrorToast({});
      }
    });

  nodes.$isDeleted.on(nodes.deleteFx.doneData, (_, value) => Boolean(value)).reset(nodes.reset);

  nodes.$isDeleting.on(nodes.deleteFx.pending, (_, value) => value).reset(nodes.reset);

  nodes.$validationError
    .on(nodes.dismissValidationError, () => '')
    .on(nodes.deleteFx.doneData, () => '')
    .on(deleteFailed, (_, validationError) => validationError)
    .reset(nodes.reset);

  nodes.$item.on(nodes.setItem, (_, val) => val).reset(nodes.reset);
};

// Get Action

export type GetActionEffectorNode<TParams, TResult> = {
  $value: Store<TResult>;
  $status: Store<EffectState>;
  get: Event<TParams>;
  getFx: Effect<TParams, TResult>;
  reset: Event<void>;
};

export const createGetActionNodes = <TParams, TResult>(
  domain: Domain,
  defaultValue: TResult,
  defaultStatus: EffectState = 'pending',
): GetActionEffectorNode<TParams, TResult> => {
  const getFx = domain.createEffect<TParams, TResult>();
  const $status = status({ effect: getFx, defaultValue: defaultStatus });
  const reset = domain.createEvent();

  return {
    $value: domain.createStore<TResult>(defaultValue),
    get: domain.createEvent<TParams>(),
    getFx,
    $status,
    reset,
  };
};

export type ConnectGetActionNodesArgs<TParams, TResult> = {
  nodes: GetActionEffectorNode<TParams, TResult>;
  handler: (params: TParams) => Promise<TResult>;
  resetOn?: Unit<void>[];
};

export const connectGetActionNodes = <TParams, TResult>({
  nodes,
  handler,
  resetOn = [],
}: ConnectGetActionNodesArgs<TParams, TResult>) => {
  forward({ from: nodes.get, to: nodes.getFx });

  nodes.getFx.use(handler);

  // nodes.getFx.fail.watch(() => addErrorToast({}));

  nodes.$value.on(nodes.getFx.doneData, (_, res) => res).reset(nodes.reset);
  nodes.$status.reset(nodes.reset);

  if (resetOn.length > 0) {
    sample({
      clock: resetOn,
      target: nodes.reset,
    });
  }
};
