import { useParams, useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProductById, getImagePath, getLocalizedProduct } from '../data/products'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const ProductDetail = () => {
  const { language } = useLanguage()
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const foundProduct = getProductById(id)
    if (foundProduct) {
      // 获取本地化的产品数据
      const localizedProduct = getLocalizedProduct(foundProduct, language)
      setProduct(localizedProduct)
      setIsLoading(false)
    } else {
      // 如果产品不存在，重定向到产品列表页
      navigate('/products')
    }
  }, [id, navigate, language])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{getTranslation(language, 'pages.productDetail.loading')}</p>
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary">{getTranslation(language, 'nav.home')}</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary">{getTranslation(language, 'nav.products')}</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{getTranslation(language, `categories.${product.category}`) || product.category}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <>
                  <img
                    src={getImagePath(product.images[currentImageIndex])}
                    alt={product.title}
                    className="w-full h-[500px] object-cover"
                    onError={(e) => {
                      // 如果图片加载失败，使用占位符
                      e.target.src = 'https://via.placeholder.com/600x500?text=Product+Image'
                    }}
                  />
                  
                  {/* Image Navigation Arrows */}
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all z-10"
                        aria-label="Previous image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all z-10"
                        aria-label="Next image"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {product.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {product.images.length}
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">{getTranslation(language, 'pages.productDetail.noImage')}</p>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex
                        ? 'border-primary ring-2 ring-primary ring-offset-2'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={getImagePath(image)}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/100?text=Image'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <div>
              <span className="inline-block bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                {getTranslation(language, `categories.${product.category}`) || product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900">{product.title}</h1>

            {/* Date */}
            {product.date && (
              <p className="text-gray-500 text-sm">{getTranslation(language, 'pages.productDetail.published')}: {product.date}</p>
            )}

            {/* Short Description */}
            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>

            {/* Detailed Description */}
            {product.detailDescription && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{getTranslation(language, 'pages.productDetail.productDescription')}</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.detailDescription}</p>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{getTranslation(language, 'pages.productDetail.keyFeatures')}</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{getTranslation(language, 'pages.productDetail.specifications')}</h2>
                <dl className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value], index) => (
                    <div key={index} className="flex border-b border-gray-200 pb-3">
                      <dt className="font-semibold text-gray-900 w-1/3">{key}:</dt>
                      <dd className="text-gray-700 flex-1">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-6">
              <Link
                to="/contact"
                className="flex-1 bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors text-center"
              >
                {getTranslation(language, 'pages.productDetail.requestQuote')}
              </Link>
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                {getTranslation(language, 'pages.productDetail.backToProducts')}
              </button>
            </div>
          </div>
        </div>

        {/* Related Products Section (Optional) */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{getTranslation(language, 'pages.productDetail.relatedProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* You can add related products here based on category */}
            <Link
              to="/products"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all text-center"
            >
              <p className="text-gray-600">{getTranslation(language, 'pages.productDetail.viewAllInCategory')} {getTranslation(language, `categories.${product.category}`) || product.category}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail


