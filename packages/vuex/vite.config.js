import { defineConfig } from 'rollup';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.js',
      name: 'Test',
      formats: 'umd'
    },
    output: "dist/umd/test.js"
  }
})