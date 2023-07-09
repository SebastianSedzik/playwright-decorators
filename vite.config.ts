import path from 'path';
import { defineConfig } from 'vite';
import { cjsInterop } from "vite-plugin-cjs-interop";

module.exports = defineConfig({
    base: './',
    plugins: [
        cjsInterop({
            dependencies: [
                "@playwright/test"
            ],
        })
    ],
    build: {
        ssr: true,
        outDir: './dist',
        lib: {
            name: 'playwright-decorators',
            entry: path.resolve(__dirname, 'lib/index.ts'),
            formats: ['cjs'],
        },
        rollupOptions: {
            external: ["@playwright/test"]
        }
    }
});
