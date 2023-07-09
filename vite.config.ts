import path from 'path';
import { defineConfig } from 'vite';

module.exports = defineConfig({
    base: './',
    build: {
        outDir: './dist',
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            formats: ['es'],
            fileName: 'index'
        },
        rollupOptions: {
            external: '@playwright/test'
        }
    }
});
