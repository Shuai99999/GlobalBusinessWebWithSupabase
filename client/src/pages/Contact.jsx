import { useState, useRef, useEffect } from 'react'
import { API_ENDPOINTS } from '../config/api'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const Contact = () => {
  const { language } = useLanguage()
  // 页面加载时滚动到顶部（使用 instant 避免动画）
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [copiedEmail, setCopiedEmail] = useState(null)
  const isSubmittingRef = useRef(false) // 使用 ref 防止重复提交

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 防止重复提交：如果正在提交，直接返回
    if (isSubmittingRef.current || isSubmitting) {
      return
    }
    
    setIsSubmitting(true)
    isSubmittingRef.current = true
    setSubmitStatus(null)

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus({ type: 'success', message: getTranslation(language, 'pages.contact.form.success') })
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus({ type: 'error', message: data.error || getTranslation(language, 'pages.contact.form.error') })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ type: 'error', message: getTranslation(language, 'pages.contact.form.errorServer') })
    } finally {
      setIsSubmitting(false)
      // 延迟重置 ref，防止快速连续点击
      setTimeout(() => {
        isSubmittingRef.current = false
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{getTranslation(language, 'pages.contact.title')}</h1>
          <p className="text-xl text-gray-600">{getTranslation(language, 'pages.contact.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            {/* Google Maps Embed */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <a 
                href="https://maps.app.goo.gl/VFqft7YGvXaVRjT79" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block relative group"
              >
                <iframe
                  src="https://www.google.com/maps?q=187-1+Zhuzhou+Road,+Zhonghan+Street,+Laoshan+District,+Qingdao,+Shandong,+China&output=embed&hl=en"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Company Location"
                  className="w-full transition-opacity group-hover:opacity-90"
                ></iframe>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all pointer-events-none">
                  <div className="bg-white px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-primary font-semibold inline-flex items-center gap-2">
                      <span>🗺️</span>
                      <span>{getTranslation(language, 'pages.contact.clickToOpenMaps')}</span>
                    </span>
                  </div>
                </div>
                {/* 添加一个透明覆盖层，让整个地图都可以点击 */}
                <div className="absolute inset-0 z-10" aria-label="Click to open location in Google Maps"></div>
              </a>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{getTranslation(language, 'pages.contact.getInTouch')}</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-xl">
                  📍
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{getTranslation(language, 'pages.contact.address')}</h3>
                  <p className="text-gray-600">
                    <a 
                      href="https://maps.app.goo.gl/VFqft7YGvXaVRjT79" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors underline"
                    >
                      187-1 Zhuzhou Road, Zhonghan Street, Laoshan District, Qingdao, Shandong, China
                    </a>
                    <span className="block mt-2 text-sm text-gray-500">
                      <a 
                        href="https://maps.app.goo.gl/VFqft7YGvXaVRjT79" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors inline-flex items-center gap-1"
                      >
                        <span>🗺️</span>
                        <span>{getTranslation(language, 'pages.contact.viewOnMaps')}</span>
                      </a>
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-white text-xl">
                  ✉️
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{getTranslation(language, 'pages.contact.email')}</h3>
                  <p className="text-gray-600">
                    <button
                      onClick={() => copyEmail('sales@evermotion.ca')}
                      className="hover:text-primary transition-colors text-left cursor-pointer relative group inline-flex items-center gap-2"
                      title="Click to copy email address"
                    >
                      <span>sales@evermotion.ca</span>
                      <span className="text-xs text-gray-400 group-hover:text-primary transition-colors" title="Copy">📋</span>
                      {copiedEmail === 'sales@evermotion.ca' ? (
                        <span className="text-sm text-green-600 font-semibold">✓ {getTranslation(language, 'pages.contact.copied')}</span>
                      ) : (
                        <span className="text-xs text-gray-400 opacity-60">({getTranslation(language, 'pages.contact.clickToCopy')})</span>
                      )}
                      <span className="absolute -top-8 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                        {getTranslation(language, 'pages.contact.clickToCopy')}
                      </span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{getTranslation(language, 'pages.contact.leaveMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation(language, 'pages.contact.form.name')} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={getTranslation(language, 'pages.contact.form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation(language, 'pages.contact.form.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={getTranslation(language, 'pages.contact.form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation(language, 'pages.contact.form.phone')}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={getTranslation(language, 'pages.contact.form.phonePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {getTranslation(language, 'pages.contact.form.message')} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={getTranslation(language, 'pages.contact.form.messagePlaceholder')}
                />
              </div>

              {submitStatus && (
                <div className={`p-4 rounded-lg ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary text-white px-6 py-3 rounded-lg text-lg font-semibold transition-colors ${
                  isSubmitting 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-blue-700'
                }`}
              >
                {isSubmitting ? getTranslation(language, 'pages.contact.form.sending') : getTranslation(language, 'pages.contact.form.sendMessage')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact


