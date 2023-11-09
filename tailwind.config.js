const theme = require('@sber-universe/om-component-library/tailwind.config');
const mergeWith = require('lodash/mergeWith');
const isArray = require('lodash/isArray');

function customizer(objValue, srcValue) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const localTheme = {
  theme: {
    extend: {
      colors: {
        base: {
          100: '#f5f5f5',
          200: '#eceef2',
          300: '#E4E4E7',
          400: '#A1A1AA',
          600: '#262626',
          700: '#171717',
        },
      },
      backgroundColor: {
        base: {
          100: '#f5f5f5',
          200: '#eceef2',
          300: '#E4E4E7',
          400: '#A1A1AA',
          600: '#262626',
        },
        primary: {
          3: '#21BA72',
        },
      },
      borderColor: {
        neutral: {
          200: '#E5E5E5',
        },
        base: {
          100: '#f5f5f5',
          200: '#eceef2',
          300: '#E4E4E7',
          400: '#A1A1AA',
          600: '#262626',
          700: '#171717',
        },
      },
      spacing: {
        participant: '57px',
        sidebar: '320px',
        'sidebar-toast': '350px',
      },
      width: {
        3.5: '56px',
      },
      inset: {
        sidebar: '320px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  important: process.env.BOOTSTRAP_INDEPENDENT ? true : `.${process.env.APP_NAME_VERSION}`,
  theme: {},
  variants: {
    extend: {},
  },
  content: [],
  ...mergeWith(localTheme, theme, customizer),
};
