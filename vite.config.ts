import { defineConfig } from 'vite'
import devServer from '@hono/vite-dev-server'
import build from '@hono/vite-build/cloudflare-workers'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      build: {
        rollupOptions: {
          input: ['./src/client.tsx'],
          output: {
            entryFileNames: 'static/client.js',
            chunkFileNames: 'static/assets/[name]-[hash].js',
            assetFileNames: 'static/assets/[name].[ext]',
          },
        },
        emptyOutDir: false,
        copyPublicDir: false,
      },
    }
  } else {
    return {
      plugins: [
        build(),
        devServer({
          entry: './src/server.tsx',
        }),
      ],
    }
  }
})
