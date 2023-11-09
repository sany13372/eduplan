import { ErrorInfo } from '@src/gql-client/types';

export class NormalizedError extends Error {
  readonly info: ErrorInfo[] = [];

  constructor(info: ErrorInfo[] = []) {
    super();
    this.info = info;
    this.name = 'NormalizedError';
  }
}
