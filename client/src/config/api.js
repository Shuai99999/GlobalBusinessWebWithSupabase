// API 配置
// 根据环境变量自动选择 API 地址

const getApiUrl = () => {
  // 如果设置了环境变量，使用环境变量
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // 开发环境使用 localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:3001'
  }
  
  // 生产环境默认（如果没有设置环境变量，需要手动设置）
  // 注意：在生产环境中，应该设置 VITE_API_URL 环境变量
  return 'http://localhost:3001'
}

export const API_BASE_URL = getApiUrl()

// API 端点
export const API_ENDPOINTS = {
  CONTACT: `${API_BASE_URL}/api/contact`,
  HEALTH: `${API_BASE_URL}/api/health`,
}

