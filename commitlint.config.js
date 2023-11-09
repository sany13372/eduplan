const defaultConfig = require('@baldrick/commitlint-config/dist/index');

module.exports = {
  ...defaultConfig,
  parserPreset: {
    parserOpts: {
      referenceActions: null,
      issuePrefixes: ['SU-'],
    },
  },
};
