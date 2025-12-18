import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getImagePath } from '../data/products'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const ProductCard = ({ product }) => {
  const { language } = useLanguage()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // 自动轮播（鼠标悬停时暂停）
  useEffect(() => {
    if (!product.images || product.images.length <= 1) return
    if (isHovered) return // 悬停时暂停自动轮播

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }, 3000) // 每3秒切换一次

    return () => clearInterval(interval)
  }, [product.images?.length, isHovered])

  // 手动切换图片
  const nextImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.images || product.images.length === 0) return
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!product.images || product.images.length === 0) return
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-48 overflow-hidden group">
          <img
            src={getImagePath(product.images && product.images.length > 0 ? product.images[currentImageIndex] : 'placeholder.jpg')}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              // 如果图片加载失败，使用占位符
              e.target.src = 'https://via.placeholder.com/400x300?text=Product+Image'
            }}
          />
        
        {/* 分类标签 */}
        <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold z-10">
          {getTranslation(language, `categories.${product.category}`) || product.category}
        </div>

        {/* 图片数量指示器 */}
        {product.images && product.images.length > 1 && (
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs z-10">
            {currentImageIndex + 1} / {product.images.length}
          </div>
        )}

        {/* 左右箭头按钮 */}
        {product.images && product.images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all z-20"
              aria-label="Previous image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all z-20"
              aria-label="Next image"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* 图片指示点 */}
        {product.images && product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  goToImage(index)
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex
                    ? 'bg-white w-6'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="block w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition-colors text-center"
        >
          {getTranslation(language, 'buttons.viewDetails')}
        </Link>
      </div>
    </div>
  )
}

export default ProductCard

