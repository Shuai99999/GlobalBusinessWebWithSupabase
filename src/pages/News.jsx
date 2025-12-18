import { useState } from "react";
import { useLanguage } from '../context/LanguageContext'
import { getTranslation } from '../utils/translations'

const News = () => {
  const { language } = useLanguage()
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Get image path helper
  const getImagePath = (imageName) => {
    const baseUrl = import.meta.env.BASE_URL;
    return `${baseUrl}newsPictures/${imageName}`;
  };

  const newsItems = [
    {
      id: 1,
      key: 'annualMeeting',
      date: "2025-02-28",
      image: "1.jpg",
    },
    {
      id: 2,
      key: 'partnership',
      date: "2024-02-20",
      image: "2.jpg",
    },
    {
      id: 3,
      key: 'training',
      date: "2023-12-05",
      image: "3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">{getTranslation(language, 'pages.news.title')}</h1>
          <p className="text-xl text-gray-600">
            {getTranslation(language, 'pages.news.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImagePath(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/600x400?text=News+Image";
                  }}
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">{item.date}</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  {getTranslation(language, `pages.news.items.${item.key}.title`)}
                </h2>
                <div className="text-gray-600 mb-4">
                  {expandedItems[item.id] ? (
                    <p className="leading-relaxed">{getTranslation(language, `pages.news.items.${item.key}.fullContent`)}</p>
                  ) : (
                    <p className="line-clamp-3">{getTranslation(language, `pages.news.items.${item.key}.excerpt`)}</p>
                  )}
                </div>
                <button
                  onClick={() => toggleExpand(item.id)}
                  className="text-primary hover:text-blue-700 font-semibold transition-colors"
                >
                  {expandedItems[item.id] ? getTranslation(language, 'buttons.showLess') : getTranslation(language, 'buttons.readMore')}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
