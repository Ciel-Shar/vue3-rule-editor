import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    host: "0.0.0.0",
    port: "3000",
    proxy: {
      // 配置需要代理的API路径
      '/rule/check': {
        target: 'http://localhost:8080', // 后端服务地址
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/rule\/check/, '/rule/check') // 路径重写
      }
    },
    allowedHosts: [
      'endorphin.w1.luyouxia.net', // 添加上你的内网穿透域名
      'localhost', // 保留localhost，确保本地开发不受影响
      '.luyouxia.net' // 也可以使用通配符，允许所有luyouxia.net的子域名
    ]
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
})
