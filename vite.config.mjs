import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const external = [
  'react',
  'react-dom',
  'react/jsx-runtime',
  'prop-types',
  'recoil',
  'pandasuite-bridge',
  'html2canvas',
];

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'PandaSuiteBridgeReact',
    },
    sourcemap: true,
    target: 'es2019',
    rollupOptions: {
      external,
      treeshake: {
        moduleSideEffects: false,
      },
      output: [
        {
          format: 'es',
          dir: 'dist',
          entryFileNames: '[name].js',
          chunkFileNames: 'chunks/[name]-[hash].js',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        {
          format: 'cjs',
          dir: 'dist',
          entryFileNames: '[name].cjs',
          chunkFileNames: 'chunks/[name]-[hash].cjs',
          exports: 'named',
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
    },
  },
});
