import { useEffect, useRef } from 'react'

/**
 * 自定义 Hook：实现流畅的按 section 滚动效果
 * 替代 CSS scroll-snap，提供更好的滚动体验
 */
export const useSectionScroll = () => {
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)
  const lastWheelTimeRef = useRef(0)

  useEffect(() => {
    // 获取所有 section
    const getSections = () => {
      return Array.from(document.querySelectorAll('.snap-section'))
    }

    // 找到当前最接近顶部的 section
    const getCurrentSection = () => {
      const sections = getSections()
      if (sections.length === 0) return null

      const scrollY = window.scrollY + window.innerHeight / 3 // 使用视口上1/3位置作为参考点

      let currentSection = sections[0]
      
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= scrollY) {
          currentSection = sections[i]
          break
        }
      }

      return currentSection
    }

    // 平滑滚动到指定的 section
    const scrollToSection = (section) => {
      if (!section || isScrollingRef.current) return false

      isScrollingRef.current = true
      const sectionTop = section.offsetTop

      // 使用 smooth scroll
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      })

      // 清除之前的 timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // 滚动完成后重置标志（600ms 后）
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 600)

      return true
    }

    // 处理滚轮事件
    const handleWheel = (e) => {
      const now = Date.now()
      
      // 限制滚动频率（至少间隔 300ms）
      if (now - lastWheelTimeRef.current < 300) {
        return
      }

      // 如果正在滚动中，阻止默认行为
      if (isScrollingRef.current) {
        e.preventDefault()
        return
      }

      const sections = getSections()
      if (sections.length === 0) return

      const currentSection = getCurrentSection()
      if (!currentSection) return

      // 判断滚动方向
      const isScrollingDown = e.deltaY > 0
      const currentIndex = sections.indexOf(currentSection)

      // 判断是否应该切换到下一个/上一个 section
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      const sectionTop = currentSection.offsetTop
      const sectionBottom = sectionTop + currentSection.offsetHeight

      // 检查是否接近 section 边界（80px 容差）
      const threshold = 80
      const isNearTop = scrollY <= sectionTop + threshold
      const isNearBottom = scrollY + windowHeight >= sectionBottom - threshold

      let shouldSnap = false
      let targetSection = null

      if (isScrollingDown) {
        // 向下滚动
        if (isNearBottom && currentIndex < sections.length - 1) {
          // 接近底部，且有下一个 section
          targetSection = sections[currentIndex + 1]
          shouldSnap = true
        } else if (isNearTop && currentIndex < sections.length - 1) {
          // 接近顶部，但有下一个 section（可能滚动速度很快）
          targetSection = sections[currentIndex + 1]
          shouldSnap = true
        }
      } else {
        // 向上滚动
        if (isNearTop && currentIndex > 0) {
          // 接近顶部，且有上一个 section
          targetSection = sections[currentIndex - 1]
          shouldSnap = true
        } else if (isNearBottom && currentIndex > 0) {
          // 接近底部，但有上一个 section
          targetSection = sections[currentIndex - 1]
          shouldSnap = true
        }
      }

      if (shouldSnap && targetSection) {
        e.preventDefault()
        lastWheelTimeRef.current = now
        scrollToSection(targetSection)
      }
    }

    // 添加事件监听器（使用 passive: false 以便可以 preventDefault）
    window.addEventListener('wheel', handleWheel, { passive: false })

    // 清理函数
    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return null
}

