let lenis = null

export const setLenis = (instance) => {
  lenis = instance
}

export function scrollTo(target) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6 })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
    return
  }
  document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}

export const stopScroll = () => lenis?.stop()
export const startScroll = () => lenis?.start()
