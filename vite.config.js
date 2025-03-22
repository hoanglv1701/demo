import react from '@vitejs/plugin-react';
import * as path from 'path';
import { defineConfig, loadEnv } from 'vite';

const fs = require('fs');

/**
 * Get project root path
 * @descrition without trailing slash
 */
export function getRootPath() {
  return path.resolve(process.cwd());
}

/**
 * Get the project src path
 * @param srcName - src directory name (default: "src")
 * @descrition without trailing slash
 */
export function getSrcPath(srcName = 'src') {
  const rootPath = getRootPath();

  return `${rootPath}/${srcName}`;
}

export default defineConfig(({ mode }) => {
  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  const envDir = './';
  const env = loadEnv(mode, envDir);

  return {
    define: {
      'process.env': env
    },
    experimental: {
      renderBuiltUrl(filename, type) {
          return `/${filename}`;
      }
    },
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath
      }
    },
    build: {
      base:'',
      cssMinify: true,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.endsWith('antd')) {
              return 'antd';
            }
          }
        }
      }
    },
    plugins: [
      react(),
      {
        name: 'version-plugin',
        writeBundle() {
          const hash = Date.now().toString();
          fs.writeFileSync('dist/version.json', JSON.stringify({ hash }));
        }
      }
    ],
    css: {
      modules: {
        localsConvention: 'dashes'
      }
    }
  };
});
