import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { translations, getTranslation } from '../utils/translations'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { language, setLanguage } = useLanguage()
  const langMenuRef = useRef(null)
  const location = useLocation()

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' }
  ]

  const currentLangName = languages.find(lang => lang.code === language)?.name || 'English'

  const navItems = [
    { path: '/', key: 'home' },
    { path: '/products', key: 'products' },
    { path: '/about', key: 'about' },
    { path: '/news', key: 'news' },
    { path: '/contact', key: 'contact' },
  ]

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setIsLangOpen(false)
  }

  // 点击外部关闭语言选择器
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangOpen(false)
      }
    }

    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isLangOpen])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24 lg:h-28">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img 
                src={`${import.meta.env.BASE_URL}logos/logo-horizental.png`}
                alt={translations[language].companyName}
                className="h-16 md:h-20 lg:h-24 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-colors text-base md:text-lg lg:text-xl font-medium ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {getTranslation(language, `nav.${item.key}`)}
                </Link>
              )
            })}
          </div>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary text-base md:text-lg font-medium"
              >
                <span>{currentLangName}</span>
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        language === lang.code ? 'bg-primary text-white hover:bg-blue-700' : 'text-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/contact"
              className="bg-primary text-white px-5 py-2.5 rounded hover:bg-blue-700 transition-colors text-base md:text-lg font-semibold"
            >
              {getTranslation(language, 'buttons.requestQuote')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || 
                (item.path !== '/' && location.pathname.startsWith(item.path))
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 px-4 rounded-lg text-lg font-medium ${
                    isActive
                      ? 'bg-primary text-white'
                      : 'text-gray-700 hover:text-primary'
                  }`}
                >
                  {getTranslation(language, `nav.${item.key}`)}
                </Link>
              )
            })}
            <div className="mt-4 pt-4 border-t">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 text-gray-700 mb-2 text-lg font-medium"
              >
                <span>{currentLangName}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isLangOpen && (
                <div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`block w-full text-left py-2 text-base ${
                        language === lang.code ? 'text-primary font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-2 bg-primary text-white px-4 py-3 rounded text-center text-lg font-semibold"
              >
                {getTranslation(language, 'buttons.requestQuote')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar


