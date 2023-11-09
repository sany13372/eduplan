const fs = require('node:fs');
const path = require('node:path');
const data = fs.readFileSync('./src/types/preimportTypes.ts');
require('dotenv').config();

/*
 * На текущий момент файл ./src/types/testTypes.ts сначала будет считан в память,
 *  а потом подставлен в сгенерированные типы (см. поле preImport конфига).
 * После импорта произвольных типов мы можем указать любой из импортированных ранее
 *  типов для скаляров (см. поле scalarTypes конфига)
 */

/**
 * @type {import("@gqty/cli").GQtyConfig}
 */
const config = {
  react: false,
  scalarTypes: {
    uuid: 'string',
    timestamp: 'string',
    timestamptz: 'string',
    Date: 'string',
    numeric: 'number',
    smallint: 'number',
    json: 'unknown',
    jsonb: 'unknown',
    Int: 'number',
    BigInteger: 'number',
  },
  introspection: {
    endpoint: process.env.MFE_GQL_API_URL,
    headers: {
      'x-hasura-admin-secret': process.env.MFE_GQL_API_ADMIN_SECRET,
    },
  },
  preImport: data.toString(),
  destination: './src/gql-client/index.ts',
  subscriptions: false,
  javascriptOutput: false,
  transformSchema: (schema, gql) => {
    const schemaPath = path.resolve(__dirname, './k8s/schema/k8s-schema.gql');
    fs.writeFileSync(schemaPath, gql.printSchema(schema));
    return schema;
  },
};

module.exports = config;
