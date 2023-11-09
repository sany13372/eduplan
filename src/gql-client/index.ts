import type { QueryFetcher } from 'gqty';
import { createClient } from 'gqty';
import { createSubscriptionsClient } from '@gqty/subscriptions';
import { NetworkError, NormalizedError } from '@src/gql-client/errors';
import { SUCCESS_STATUS } from '@src/gql-client/constants';
import { hasExpiredTokenError, prepareErrorInfoList, prepareErrors } from '@src/gql-client/utils';
import { ErrorData } from '@src/gql-client/types';
import { refreshTokenFailHandler, refreshTokenDebounced } from '@sber-universe/om-component-library';
import PandoraBox from '@baldrick/pandora-box';

import type { GeneratedSchema, SchemaObjectTypes, SchemaObjectTypesNames } from './schema.generated';
import { generatedSchema, scalarsEnumsHash } from './schema.generated';

const getHeaders = (): Record<string, string> => {
  const token: string = window.localStorage.getItem('token') ?? '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

const queryFetcher: QueryFetcher = async (query, variables) => {
  const token: string | undefined = window.localStorage.getItem('token') ?? undefined;
  try {
    const response = await fetch(`${process.env.MFE_GQL_API_URL}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        query,
        variables,
      }),
      mode: 'cors',
      credentials: token ? 'include' : 'omit',
    });

    if (response.status !== SUCCESS_STATUS) {
      throw new NetworkError(response);
    }
    const json = await response.json();

    if (json.errors) {
      throw json.errors;
    }

    return json;
  } catch (error) {
    const errors = prepareErrors(error as Error | ErrorData[]);
    if (hasExpiredTokenError(errors.hasura)) {
      const refreshResult = await refreshTokenDebounced(process.env.MFE_AUTH_REST_API_URL ?? '');
      if (refreshResult) return queryFetcher(query, variables);
      refreshTokenFailHandler();
    }
    if (!hasExpiredTokenError(errors.hasura)) {
      const { events } = PandoraBox();
      const reportError = error instanceof Error ? error : new Error(JSON.stringify(error));
      events.dispatch('app:reportError', reportError);
    }
    throw new NormalizedError(prepareErrorInfoList(errors));
  }
};

const subscriptionsClient = createSubscriptionsClient({
  wsEndpoint: () => {
    const url = new URL(`${process.env.MFE_GQL_API_URL}`);
    url.protocol = 'wss';
    return url.href;
  },
  connectionInitPayload: () => ({
    headers: getHeaders(),
  }),
  maxReconnectAttempts: 10,
  failedConnectionCallback: async () => {
    const refreshResult = await refreshTokenDebounced(process.env.MFE_AUTH_REST_API_URL ?? '');
    if (!refreshResult) refreshTokenFailHandler();
  },
  failedReconnectCallback: async () => {
    console.info('WebSocket reconnect attempt failed');
  },
});

const { query, mutation, mutate, subscription, resolved, refetch, track } = createClient<
  GeneratedSchema,
  SchemaObjectTypesNames,
  SchemaObjectTypes
>({
  schema: generatedSchema,
  scalarsEnumsHash,
  queryFetcher,
  defaults: {
    resolved: {
      noCache: true,
    },
  },
  // remove auto-adding of "id" field
  // sometimes we don't have permissions to access it
  normalization: false,
  subscriptionsClient,
});

export { query, mutation, mutate, subscription, resolved, refetch, track };

export * from './utils';
export * from './schema.generated';
