const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  rollup(config, options) {
    // console.log('rollup ', config, options);
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        // extract: !!options.writeMeta,
        extract: 'react-big-screen-scale.min.css',
        // yarn add rollup-plugin-postcss autoprefixer cssnano less --dev
      })
    );
    return config;
  },
};
