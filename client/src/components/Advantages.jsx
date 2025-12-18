import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const Advantages = ({ showTitle = false, bgColor = 'bg-white' }) => {
  const { language } = useLanguage()
  const advantages = [
    {
      number: '01',
      key: 'costAdvantage',
    },
    {
      number: '02',
      key: 'talentAdvantages',
    },
    {
      number: '03',
      key: 'innovationAbility',
    },
    {
      number: '04',
      key: 'strategicPartnerships',
    }
  ]

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{getTranslation(language, 'components.advantages.title')}</h2>
            <p className="text-xl text-gray-600">{getTranslation(language, 'components.advantages.subtitle')}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-lg hover:shadow-lg transition-shadow ${
                bgColor === 'bg-gray-50' ? 'bg-white' : ''
              }`}
            >
              <div className="text-6xl font-bold text-primary opacity-20 mb-4">
                {advantage.number}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {getTranslation(language, `components.advantages.${advantage.key}.title`)}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {getTranslation(language, `components.advantages.${advantage.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Advantages

