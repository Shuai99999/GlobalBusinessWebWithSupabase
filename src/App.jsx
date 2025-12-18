import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import News from './pages/News'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useLanguage } from './context/LanguageContext'
import { translations } from './utils/translations'

// 获取 base path（用于 GitHub Pages）
// 自动检测当前路径，如果是 GitHub Pages 则使用仓库名作为 base
const getBasePath = () => {
  // 检查是否是 GitHub Pages 环境
  const hostname = window.location.hostname
  const path = window.location.pathname
  
  // 如果是 GitHub Pages 域名（*.github.io）
  if (hostname.includes('github.io')) {
    const pathParts = path.split('/').filter(Boolean)
    // GitHub Pages 的路径格式通常是 /repository-name/...
    // 第一个非空部分通常是仓库名
    if (pathParts.length > 0) {
      const repoName = pathParts[0]
      // 确保不是文件扩展名（如 .html, .js 等）
      if (repoName && !repoName.includes('.')) {
        return `/${repoName}/`
      }
    }
  }
  
  // 本地开发或自定义域名使用根路径
  return '/'
}

function App() {
  const basename = getBasePath()
  const { language } = useLanguage()

  // 根据语言更新页面标题
  useEffect(() => {
    const companyName = translations[language]?.companyName || 'EverMotion Trading Co.'
    document.title = `${companyName} - ${language === 'zh' ? '国际贸易公司' : 'International Trade Company'}`
  }, [language])

  return (
    <Router basename={basename}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

