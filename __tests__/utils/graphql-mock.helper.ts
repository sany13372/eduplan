import { Page, Route } from '@playwright/test';

interface Operation {
  name: string;
  response: () => unknown;
}

/**
 * На текущий момент, в связи с отсутствием возможности
 * генерировать дополнительный параметр «operationName» в схеме,
 * используются регулярные выражения для вычленения имени операции.
 * Решение данной проблемы ожидается в рамках https://github.com/gqty-dev/gqty/pull/1281
 */
export class GraphqlMockHelper {
  public static async generateGraphqlResponse(route: Route, method: string | unknown): Promise<void> {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(method),
    });
  }

  public static mockOperations(page: Page, operations: Operation[]): Promise<void> {
    return page.route(/graphql/, async (route) => {
      const body: { query: string } = await route.request().postDataJSON();
      const { query } = body;

      for (const operation of operations) {
        if (GraphqlMockHelper.hasOperationName(query, operation.name)) {
          // eslint-disable-next-line no-await-in-loop
          await GraphqlMockHelper.generateGraphqlResponse(route, operation.response());
        }
      }
    });
  }

  public static hasOperationName(query: string, operationName: string): boolean {
    const operation = this.extractRequestName(query);
    return operation === operationName;
  }

  private static extractRequestName(query: string) {
    const regex = /(?:query|mutation)\s*(?:\([^)]*\))?\s*{([^:\s\d{}]+)/;

    const matches = query.match(regex);

    if (matches && matches.length > 1) {
      return matches[1].trim();
    }
    return null;
  }
}
