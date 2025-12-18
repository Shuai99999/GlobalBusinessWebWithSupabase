import { useState } from 'react'
import { products, categories, getLocalizedProduct } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const Products = () => {
  const { language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('ALL')

  const filteredProducts = selectedCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category === selectedCategory)
  
  // 获取翻译后的产品列表
  const localizedProducts = filteredProducts.map(product => 
    getLocalizedProduct(product, language)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{getTranslation(language, 'pages.products.title')}</h1>
          <p className="text-xl text-gray-600">{getTranslation(language, 'pages.products.subtitle')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {getTranslation(language, `categories.${category}`) || category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localizedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products

