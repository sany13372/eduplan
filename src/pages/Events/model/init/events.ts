import { sample } from 'effector';
import {
  $deleteItemSelectedId,
  $eventListInfo,
  $filters,
  decrimentCurrentTabCount,
  deleteEvent,
  deleteEventFx,
  getEventListPage,
  getEventListPageFx,
  publicateEvent,
  publicateEventFx,
  resetDeleteItem,
  resetDomainData,
  setDateFilter,
  setDeleteItem,
  setKindFilter,
} from '@src/pages/Events/model';
import { resolved } from '@src/gql-client';
import { deleteEventMutation, getEventListPageQuery } from '@src/pages/Events/model/init/queries';
import { publicateEventMutation } from '@src/pages/Events/model/init/queries/publicateEventMutation';
import { addErrorToast } from '@src/app/model';
import { toast } from '@kit-edu/toast';

sample({
  clock: publicateEventFx.fail,
  fn: () => ({ message: 'Не удалось опубликовать событие' }),
  target: addErrorToast,
});

sample({
  source: publicateEvent,
  target: publicateEventFx,
});

publicateEventFx.use(async (params) => {
  const resp = await resolved(() => publicateEventMutation(params), {
    noCache: true,
  });
  return resp;
});

sample({
  clock: getEventListPage,
  source: { filters: $filters, events: $eventListInfo },
  fn: (source) => ({ filters: source.filters, pagination: source.events.pagination }),
  target: getEventListPageFx,
});

getEventListPageFx.use(async (params) => {
  const resp = await resolved(() => getEventListPageQuery(params), {
    noCache: true,
  });
  return resp;
});

$eventListInfo
  .on(getEventListPageFx.doneData, (state, newVal) => {
    return {
      pagination: newVal.pagination,
      data: [...state.data, ...newVal.data],
    };
  })
  .on(publicateEventFx.done, (state, { params, result }) => {
    return {
      ...state,
      data: state.data.map((e) => ({ ...e, isPublished: e.id === params.id ? result : e.isPublished })),
    };
  })
  .on(deleteEventFx.done, (state, { params, result }) => {
    if (!result) return state;
    const {
      data,
      pagination: { count, pageIndex, pageSize },
    } = state;
    return {
      data: data.filter((e) => e.id !== params.id),
      pagination: { pageIndex, pageSize, count: count >= 1 ? count - 1 : count },
    };
  })
  .reset([resetDomainData, setKindFilter, setDateFilter]);

sample({
  clock: deleteEvent,
  target: deleteEventFx,
});

sample({
  clock: deleteEventFx.fail,
  fn: () => ({ message: 'Не удалось удалить событие' }),
  target: addErrorToast,
});

sample({
  clock: deleteEventFx.done,
  fn: (e) => {
    if (!e.params.isSilently)
      toast({
        iconName: 'master-check',
        message: 'Событие было успешно удалено',
        appearance: 'dark',
        position: 'bottom-right',
        containerId: 'main',
        // @ts-ignore
        closeButton: false,
      });
  },
});

sample({
  clock: deleteEventFx.done,
  target: decrimentCurrentTabCount,
});

deleteEventFx.use(async (params) => {
  const resp = await resolved(() => deleteEventMutation(params.id), { noCache: true });
  return resp;
});

$deleteItemSelectedId.on(setDeleteItem, (_, id) => id).reset([resetDomainData, resetDeleteItem, deleteEventFx.done]);
