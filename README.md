# MFE для управления образовательными программами и планами обучения

Чтобы развернуть новое MFE, на основе данного шаблона, Вам необходимо:

1. В файл `.npmrc`, расположенный в домашней директории, добавить строку:
   `@sber-universe:registry=https://git.sbereducation.site/api/v4/packages/npm/`.
   Это позволит работать со скоупом `@sber-universe`;
2. Выполнить команду `npx -p @baldrick/cli@latest create mfe --template=@sber-universe/mfe-template`.Если Вы используете `Windows + PowerShell` и получили ошибку при создании MFE, то одним из решений будет:
   - Перейти в директорию ` %USERPROFILE%/AppData/Roaming/npm/node_modules/@baldrick/cli/dist`
   - В файле ` /utils/initTemplate.js` заменить строку 10
   ```
   await $`cd ${folderName} && touch yarn.lock && yarn add ${packageName}`;
   ```
   на
   ```
    await $ `cd ${folderName} && touch yarn.lock && cmd.exe /c "yarn add ${packageName}"`;
   ```
   - В файле `/utils/initGitRepo.js` заменить строку 3
   ```
   await $`cd ${path.resolve(folderName)} && git init --initial-branch=main`;
   ```
   на
   ```
    await $ `cd ${folderName} && cmd.exe /c "git init --initial-branch=main"`;
   ```
   - В вашей рабочей директории повторно выполнить команду `npx -p @baldrick/cli@latest create mfe --template=@sber-universe/mfe-template`
3. Перейти в директорию с созданным MFE;
4. Установить зависимости с помощью команды `yarn install`;
5. Добавить пакет с темой ui-kit `yarn add @pcbl-ui-v4/theme@5.22.1 @pcbl-ui-v4/toast:2.2.5` ;
6. Получить файл `schema.json`.Для этого доступны следующие варианты:
   - Скопировать в корень проекта файл `k8s/schema.json` и переименовать его в `schema.json`;
   - Получить схему с помощью `graphqurl`.
     1. Установить `graphqurl` с помощью команды `npm install -g graphqurl`;
     2. Выполнить команду `gq <url> --introspect --format json -H 'x-hasura-admin-secret: <password>' > schema.json`
   - Получить схему с помощью `Apollo CLI`.
     1. Установить `apollo` с помощью команды `npm install -g apollo`;
     2. Выполнить команду `apollo schema:download --endpoint <url> --header "X-Hasura-Admin-Secret: <password>"`
7. Сгенерировать типы для схемы `yarn generate:gql` (в корне проекта должен находиться файл `schema.json` с актуальной схемой);
