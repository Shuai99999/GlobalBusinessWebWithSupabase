import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const CompanyIntro = () => {
  const { language } = useLanguage()
  const stats = [
    { number: '18+', key: 'yearsExperience' },
    { number: '100+', key: 'countries' },
    { number: '300+', key: 'machines' },
    { number: '200+', key: 'employees' }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {getTranslation(language, 'components.companyIntro.title')}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {getTranslation(language, 'components.companyIntro.paragraph1')}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {getTranslation(language, 'components.companyIntro.paragraph2')}
            </p>
            <Link 
              to="/about" 
              onClick={() => {
                // 立即滚动到顶部，避免从底部飞到顶部的动画
                window.scrollTo({ top: 0, behavior: 'instant' })
              }}
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {getTranslation(language, 'buttons.viewMore')}
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {getTranslation(language, `pages.about.stats.${stat.key}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CompanyIntro

