import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const ContactSection = () => {
  const { language } = useLanguage()
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-4">{getTranslation(language, 'components.contactSection.title')}</h2>
        <p className="text-xl mb-8 text-blue-100">
          {getTranslation(language, 'components.contactSection.subtitle')}
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-primary px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {getTranslation(language, 'components.contactSection.button')}
        </a>
      </div>
    </section>
  )
}

export default ContactSection


