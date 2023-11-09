import { InputMaybe } from '@src/gql-client/schema.generated';

export type BackendError = {
  extensions: {
    code: string;
    exception: string;
  };
  message?: string | null;
  path: string[];
};

export type HasuraError = {
  extensions: {
    code: string;
    path: string;
  };
  message?: string | null;
};

export type ApiError = {
  extensions: [
    {
      code: string;
      path: string;
    },
  ];
  message?: string | null;
};

export type ErrorData = ApiError | BackendError | HasuraError;

export type ResponseErrorDataObj = {
  api: ApiError[];
  backend: BackendError[];
  hasura: HasuraError[];
  io: Error[];
};

export type ErrorInfo = {
  code: string;
  path: string;
  isBackend: boolean;
  message?: string;
};

export interface ObjBoolExp<T extends Record<string, unknown> = Record<string, unknown>> {
  _and?: InputMaybe<Array<T>>;
  _not?: InputMaybe<T>;
  _or?: InputMaybe<Array<T>>;
}

export type BoolOperator = keyof Pick<ObjBoolExp, '_or' | '_and' | '_not'>;
