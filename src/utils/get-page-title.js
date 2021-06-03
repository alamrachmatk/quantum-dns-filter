import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Quantum DNS Filter'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
