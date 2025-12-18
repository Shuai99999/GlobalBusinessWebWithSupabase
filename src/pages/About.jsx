import { useEffect } from 'react'
import Advantages from '../components/Advantages'
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const About = () => {
  const { language } = useLanguage()
  // 页面加载时滚动到顶部（使用 instant 避免动画）
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])
  const stats = [
    { number: '18+', key: 'yearsExperience' },
    { number: '100+', key: 'countries' },
    { number: '300+', key: 'machines' },
    { number: '200+', key: 'employees' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{getTranslation(language, 'pages.about.title')}</h1>
          <p className="text-xl text-gray-600">{getTranslation(language, 'pages.about.subtitle')}</p>
        </div>
      </div>

      {/* Company Introduction */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {getTranslation(language, 'pages.about.enterpriseIntro')}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {getTranslation(language, 'components.companyIntro.paragraph1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {getTranslation(language, 'components.companyIntro.paragraph2')}
              </p>
            </div>
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
      </div>

      {/* Advantages */}
      <Advantages showTitle={true} bgColor="bg-gray-50" />

      {/* Global Marketing */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{getTranslation(language, 'pages.about.globalMarketing')}</h2>
          <p className="text-xl text-gray-600 mb-8">{getTranslation(language, 'pages.about.globalMarketingDesc')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Australia', 'Southeast Asia', 'Asia', 'North America', 'South America', 'Africa', 'Middle East', 'Europe', 'Russia'].map((region) => (
              <div
                key={region}
                className="group relative bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-4 rounded-xl border-2 border-blue-200 hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative text-gray-800 font-semibold text-sm md:text-base tracking-wide">
                  {region}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About


