/*
 * Plugin "mail" — Mail (service-level).
 *
 * Parent of the mail-<tool> plugins (mail-smtp). The legacy controller
 * was an empty define({}); this plugin ships generic i18n + the
 * parent→child delegation hooks resolved via `subPluginIdFor`. No
 * routes/component.
 */
import { useI18nStore } from '@ligoj/host'
import enMessages from './i18n/en.js'
import frMessages from './i18n/fr.js'
import service from './service.js'

const features = {
  renderFeatures: service.renderFeatures,
  renderDetailsKey: service.renderDetailsKey,
}

export default {
  id: 'mail',
  label: 'Mail',
  install() {
    const i18n = useI18nStore()
    i18n.merge(enMessages, 'en')
    i18n.merge(frMessages, 'fr')
  },
  feature(action, ...args) {
    const fn = features[action]
    if (!fn) throw new Error(`Plugin "mail" has no feature "${action}"`)
    return fn(...args)
  },
  service,
  meta: { icon: 'mdi-email', color: 'indigo-darken-1' },
}

export { service }
