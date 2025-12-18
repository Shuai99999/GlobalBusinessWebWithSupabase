import { Link } from 'react-router-dom'
import { products, getLocalizedProduct } from '../data/products'
import ProductCard from './ProductCard'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

// 优先从指定分类中随机选择产品
const getRandomProducts = (count) => {
  // 优先分类
  const priorityCategories = ['BANNER', 'SPORTS ACCESSORIES']
  
  // 从优先分类中筛选产品
  const priorityProducts = products.filter(p => priorityCategories.includes(p.category))
  // 其他分类的产品
  const otherProducts = products.filter(p => !priorityCategories.includes(p.category))
  
  // 打乱顺序
  const shuffledPriority = [...priorityProducts].sort(() => 0.5 - Math.random())
  const shuffledOther = [...otherProducts].sort(() => 0.5 - Math.random())
  
  // 尽可能多地从优先分类中选择，不足的用其他分类补充
  const selected = []
  selected.push(...shuffledPriority.slice(0, count))
  
  // 如果优先分类的产品不够，从其他分类补充
  if (selected.length < count) {
    const remaining = count - selected.length
    selected.push(...shuffledOther.slice(0, remaining))
  }
  
  return selected.slice(0, count)
}

const ProductShowcase = () => {
  const { language } = useLanguage()
  // 随机选择4个产品，优先从BANNER和SPORTS ACCESSORIES中选择
  const featuredProducts = getRandomProducts(4)
  // 获取翻译后的产品
  const localizedProducts = featuredProducts.map(p => getLocalizedProduct(p, language))

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{getTranslation(language, 'components.productShowcase.title')}</h2>
          <p className="text-xl text-gray-600">{getTranslation(language, 'components.productShowcase.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {localizedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {getTranslation(language, 'buttons.viewAllProducts')}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase

