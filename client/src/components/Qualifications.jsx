import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const Qualifications = () => {
  const { language } = useLanguage()
  // Get image path helper
  const getImagePath = (imageName) => {
    const baseUrl = import.meta.env.BASE_URL
    return `${baseUrl}companyIntroPictures/${imageName}`
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {getTranslation(language, 'components.qualifications.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {getTranslation(language, 'components.qualifications.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={getImagePath('Qualifications1.jpg')}
              alt="Company Qualifications Certificate 1"
              className="w-full h-auto rounded-lg object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Certificate+1'
              }}
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img
              src={getImagePath('Qualifications2.jpg')}
              alt="Company Qualifications Certificate 2"
              className="w-full h-auto rounded-lg object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400?text=Certificate+2'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Qualifications

