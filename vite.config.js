import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        outDir: './public',
        emptyOutDir: true,
    },
    server: {
        open: '/index.html'
    }
});