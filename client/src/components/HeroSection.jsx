import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations, getTranslation } from '../utils/translations'

const HeroSection = () => {
  const { language } = useLanguage()
  // Hero 图片列表
  const heroImages = [
    'Hero1.png',
    'Hero2.png',
    'Hero3.png'
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageScale, setImageScale] = useState(1.1) // 初始放大10%

  // 当图片切换时，触发由近到远的动画
  useEffect(() => {
    // 每次切换时，新图片从放大状态开始
    setImageScale(1.1)
    
    // 然后缩小到正常大小（由近到远效果）
    const timer = setTimeout(() => {
      setImageScale(1.0)
    }, 100) // 短暂延迟后开始缩小动画
    
    return () => clearTimeout(timer)
  }, [currentImageIndex])

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000) // 每5秒切换一次

    return () => clearInterval(interval)
  }, [heroImages.length])

  const getImageUrl = (imageName) => {
    return `${import.meta.env.BASE_URL}HeroSectionPictures/${imageName}`
  }

  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-900 text-white overflow-hidden">
      {/* Background Images with Zoom Out Animation */}
      {heroImages.map((imageName, index) => (
        <div
          key={imageName}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-out ${
            index === currentImageIndex
              ? 'opacity-80 z-10'
              : 'opacity-0 z-0'
          }`}
          style={{
            backgroundImage: `url('${getImageUrl(imageName)}')`,
            transform: index === currentImageIndex ? `scale(${imageScale})` : 'scale(1.0)',
            transition: 'transform 1s ease-out, opacity 1s ease-out'
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          {translations[language].companyName}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          {getTranslation(language, 'components.hero.subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {getTranslation(language, 'buttons.viewProducts')}
          </Link>
          <Link
            to="/contact"
            className="bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {getTranslation(language, 'nav.contact')}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection

