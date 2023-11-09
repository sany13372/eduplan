const { mergeWithRules } = require('webpack-merge');
const defaultConfig = require('@baldrick/webpack/dist/webpack.config');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

const mode = process.env.NODE_ENV || 'production';
const isProdMode = mode === 'production';
const { version: packageVersion } = require(path.join(process.cwd(), 'package.json'));
const version = packageVersion.replaceAll('.', '_');

const config = {
  devtool: isProdMode ? 'source-map' : undefined,
  cache: true,
  devServer: {
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(mp4)$/,
        type: 'asset/resource',
        generator: {
          filename: isProdMode ? `${version}/static/video/[contenthash][ext]` : `[name].[ext]`,
        },
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        type: 'asset/resource',
        generator: {
          filename: isProdMode ? `${version}/static/fonts/[contenthash][ext]` : `[name].[ext]`,
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        type: 'asset',
        generator: {
          filename: isProdMode ? `${version}/static/images/[contenthash][ext]` : `[name].[ext]`,
        },
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            quality: 85,
          },
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: [0.7, 0.75],
          },
          // webp: {
          //   quality: 85,
          // },
        },
      },

      {
        test: /\.(css)$/,
        exclude: [/\**\/*.module.css/],
        use: [
          isProdMode ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader', // postcss loader needed for tailwindcss
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [postcssImport, tailwindcss(), autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\**\/*.module.css/,
        include: [/\**\/*.module.css/],
        exclude: [/\**\/*.module.css.js/],
        use: [
          isProdMode ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ident: 'postcss',
                plugins: [postcssImport, tailwindcss(), autoprefixer],
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            include: /node_modules/,
            loader: '@svgr/webpack',
          },
          {
            include: /src/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  ref: true,
                },
              },
              'url-loader',
            ],
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProdMode ? `${version}/static/styles/[name].[contenthash].css` : '[name].css',
    }),
    isProdMode
      ? sentryWebpackPlugin({
          authToken: process.env.SENTRY_AUTH_TOKEN,
          org: process.env.SENTRY_ORG,
          project: process.env.SENTRY_PROJECT,
          url: process.env.SENTRY_URL,
          release: {
            name: process.env.SENTRY_RELEASE,
            uploadLegacySourcemaps: {
              paths: ['dist'],
              ignore: ['node_modules'],
              urlPrefix: '~/mfe/plans',
            },
            deploy: {
              env: process.env.SENTRY_ENV,
            },
          },
          _experiments: {
            moduleMetadata: () => ({ mfe: 'plans', mfeVersion: process.env.SENTRY_RELEASE }),
          },
        })
      : undefined,
  ].filter((e) => e),
};

module.exports = mergeWithRules({
  devtool: 'replace',
  module: {
    rules: 'replace',
  },
})(defaultConfig, config);
