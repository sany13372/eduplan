/**
 * client: {
 *    Путь к папке где будет находиться клиент
 *  clientFolder?: './src/gql-client/', optional
 *    Путь к файлу конфигурации gqty
 *  configFilePath?: './src/gql-client/configs/gqty.config.base.cjs', optional
 *    Массив путей к gql схемам
 *  schemasArray: ['schema1', 'schema2'],
 * }
 */
module.exports = {
  clientsArray: [
    {
      /** Массив путей к gql схемам */
      schemasArray: ['./schema.gql'],
    },
  ],
};

/**
 * Config example https://gqty.dev/docs/getting-started
 *
 * const config = {
 *  enumsAsStrings: false,
 *  react: true,
 *  scalarTypes: { DateTime: 'string' },
 *  introspection: {
 *    endpoint: './src/gql-client/graphql-schema.json',
 *    headers: {},
 *  },
 *  destination: './src/gql-client/newClient/index.ts',
 *  subscriptions: false,
 *  javascriptOutput: false,
 * };
 */
