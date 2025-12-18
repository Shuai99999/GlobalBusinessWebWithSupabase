import { useScrollAnimation } from '../hooks/useScrollAnimation'

const AnimatedItem = ({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = '',
  ...props 
}) => {
  const [ref, isVisible] = useScrollAnimation({ 
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
  })

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-700 ease-out'
    
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return `${baseClass} translate-y-12 opacity-0`
        case 'down':
          return `${baseClass} -translate-y-12 opacity-0`
        case 'left':
          return `${baseClass} -translate-x-12 opacity-0`
        case 'right':
          return `${baseClass} translate-x-12 opacity-0`
        case 'fade':
          return `${baseClass} opacity-0 scale-95`
        default:
          return `${baseClass} translate-y-12 opacity-0`
      }
    }
    
    return `${baseClass} translate-x-0 translate-y-0 opacity-100 scale-100`
  }

  return (
    <div
      ref={ref}
      className={`${getAnimationClass()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  )
}

export default AnimatedItem

