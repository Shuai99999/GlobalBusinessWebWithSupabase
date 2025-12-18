import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const Footer = () => {
  const { language } = useLanguage()
  const [copiedEmail, setCopiedEmail] = useState(null)

  // 复制邮箱地址到剪贴板
  const copyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopiedEmail(email)
      // 2秒后清除提示
      setTimeout(() => {
        setCopiedEmail(null)
      }, 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea')
      textArea.value = email
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopiedEmail(email)
        setTimeout(() => {
          setCopiedEmail(null)
        }, 2000)
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <footer className="bg-gray-900 text-gray-300 snap-section-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{getTranslation(language, 'footer.contactUs')}</h3>
            <div className="space-y-2">
              <p className="flex items-start">
                <span className="mr-2">📍</span>
                <span>187-1 Zhuzhou Road, Zhonghan Street, Laoshan District, Qingdao, Shandong, China</span>
              </p>
              <div className="space-y-1">
                <p className="flex items-center">
                  <span className="mr-2">✉️</span>
                  <button
                    onClick={() => copyEmail('sales@evermotion.ca')}
                    className="hover:text-white transition-colors cursor-pointer relative group inline-flex items-center gap-1"
                    title="Click to copy email address"
                  >
                    <span>sales@evermotion.ca</span>
                    <span className="text-gray-500 group-hover:text-gray-300 transition-colors text-xs" title="Copy">📋</span>
                    {copiedEmail === 'sales@evermotion.ca' ? (
                      <span className="text-green-400 text-xs">✓</span>
                    ) : (
                      <span className="text-gray-500 text-xs opacity-60">(copy)</span>
                    )}
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{getTranslation(language, 'footer.products')}</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="hover:text-white transition-colors">{getTranslation(language, 'categories.BANNER')}</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">{getTranslation(language, 'categories.SPORTS ACCESSORIES')}</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">{getTranslation(language, 'categories.FLAG')}</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">{getTranslation(language, 'categories.BEACH FLAG')}</Link></li>
              <li><Link to="/products" className="hover:text-white transition-colors">{getTranslation(language, 'categories.DISPLAY STAND')}</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{getTranslation(language, 'footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">{getTranslation(language, 'nav.about')}</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">{getTranslation(language, 'nav.news')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{getTranslation(language, 'nav.contact')}</Link></li>
            </ul>
          </div>

          {/* Inquiry Form */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{getTranslation(language, 'footer.sendInquiry')}</h3>
            <p className="text-sm mb-4">
              {getTranslation(language, 'footer.inquiryText')}
            </p>
            <Link
              to="/contact"
              onClick={() => {
                // 立即滚动到顶部，避免从底部跳到顶部的动画
                window.scrollTo({ top: 0, behavior: 'instant' })
              }}
              className="inline-block bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              {getTranslation(language, 'footer.clickForInquiry')}
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>{getTranslation(language, 'footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer


