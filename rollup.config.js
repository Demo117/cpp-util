import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
// import {visualizer} from 'rollup-plugin-visualizer';

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'umd',
      name: 'ImmotorsTools',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts'],
      babelrc: false,
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 1%, not dead',
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            corejs: {
              version: 3,
              proposals: true,
            },
          },
        ],
      ],
    }),
    terser(),
    // visualizer({open: true}),
  ],
  external: [
    /@babel\/runtime/,
  ],
};
