import { babel } from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.ts'];

function createPlugins(minify) {
  return [
    postcss({
      inject: true,
      extract: false,
      minimize: minify,
      sourceMap: !minify,
      use: ['sass']
    }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: !minify
    }),
    babel({
      babelHelpers: 'bundled',
      extensions,
      exclude: 'node_modules/**',
      presets: [
        [
          '@babel/preset-env',
          {
            bugfixes: true,
            modules: false,
            targets: {
              chrome: '49',
              safari: '10',
              samsung: '5'
            }
          }
        ]
      ]
    }),
    ...(minify
      ? [
          terser({
            compress: {
              passes: 2,
              pure_getters: true
            },
            format: {
              comments: /^!/
            }
          })
        ]
      : [])
  ];
}

function output(file, minify) {
  return {
    input: 'src/index.ts',
    output: {
      file,
      format: 'iife',
      name: 'LampaIptvBundle',
      sourcemap: !minify,
      generatedCode: {
        arrowFunctions: false,
        constBindings: false
      },
      banner: '/*! Lampa IPTV v1.0.0 | MIT | no telemetry */'
    },
    plugins: createPlugins(minify),
    treeshake: {
      moduleSideEffects: false
    }
  };
}

export default [output('dist/plugin.js', false), output('dist/plugin.min.js', true)];
