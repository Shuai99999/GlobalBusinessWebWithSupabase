import { useEffect, useRef, useState } from 'react'

const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // 可选：一旦动画触发后就不再观察，提高性能
          if (options.once !== false) {
            observer.unobserve(entry.target)
          }
        } else if (!options.once) {
          setIsVisible(false)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px'
      }
    )

    const currentElement = elementRef.current
    if (currentElement) {
      observer.observe(currentElement)
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement)
      }
    }
  }, [options.threshold, options.rootMargin, options.once])

  return [elementRef, isVisible]
}

export default useScrollAnimation


