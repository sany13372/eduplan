export class NetworkError extends Error {
  constructor(private response: Response) {
    super(response.statusText);
    this.name = 'NetworkError';
  }

  get status() {
    return this.response.status;
  }
}
