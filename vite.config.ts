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
      include: ['src/components/**/*', 'src/types/**/*'],
      exclude: ['src/demo/**/*', 'src/main.tsx'],
      beforeWriteFile: (filePath, content) => {
        // 移除 CSS 模块导入的类型错误
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
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    cssCodeSplit: false,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});