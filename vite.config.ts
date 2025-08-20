import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import dts from 'vite-plugin-dts';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src/**/*'],
      exclude: ['src/demo/**/*', 'src/main.tsx', '**/*.test.tsx', '**/*.spec.tsx'],
      beforeWriteFile: (filePath, content) => {
        if (content.includes("'.module.css'")) {
          return {
            filePath,
            content: content.replace(/import\s+.*?from\s+['"].*?\.module\.css['"];?\s*/g, '')
          };
        }
        return { filePath, content };
      }
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactDayNightToggle',
      formats: ['es', 'umd'],
      fileName: (format) => `react-day-night-toggle.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // UMD 特定配置
        name: 'ReactDayNightToggle',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'React'
        },
        // 重要：确保导出格式正确
        exports: 'named',
        assetFileNames: '[name][extname]'
      },
    },
    cssCodeSplit: false,
    copyPublicDir: false,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});