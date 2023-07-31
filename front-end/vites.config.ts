import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
    viteConfig({ mode: "test" }),
    Promise.resolve(defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/setup-vitest.ts'],
        },
    }))
)