import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/pure-snow.ts'),
            name: 'PureSnow',
            formats: ['es', 'iife'],
            fileName: (format) => `pure-snow.${format}.js`
        },
        rollupOptions: {
            external: [],
        },
    },
    plugins: [dts({ insertTypesEntry: true })]
});