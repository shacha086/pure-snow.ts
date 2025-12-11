import { defineConfig } from 'vite';
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
});