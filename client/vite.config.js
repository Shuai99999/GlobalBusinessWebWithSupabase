import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 部署配置
// GitHub Pages: 需要使用仓库名作为 base path (例如: /GlobalBusinessWeb/)
// Netlify/Vercel: 使用根路径 '/'
// 本地开发: 使用根路径 '/'
const getBasePath = () => {
  // 检查是否在 GitHub Pages 环境（通过环境变量判断）
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1]
    return `/${repoName}/`
  }
  // Netlify 和其他平台使用根路径
  // 本地开发也使用根路径
  return '/'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: getBasePath(),
})

