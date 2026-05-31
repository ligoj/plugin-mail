/*
 * Service layer for plugin "mail" (service-level).
 *
 * The legacy `mail.js` controller was an empty `define({})`. The current
 * SMTP tool is global config (node mode NONE) and contributes no row
 * features, but the parent exposes the standard delegation hooks (like
 * vm/bt/build) so a future mail tool with row actions works without
 * changing the parent. Resolves the mail-<tool> via `subPluginIdFor`.
 */
import { pluginRegistry } from '@ligoj/host'

/** `service:mail:smtp:1` → `mail-smtp`; null when no tool segment. */
export function subPluginIdFor(subscription) {
  const id = subscription?.node?.id || ''
  const parts = id.split(':').filter(Boolean)
  if (parts.length < 3) return null
  return `${parts[1]}-${parts[2]}`
}

/** Delegate `action` to the mail-<tool> sub-plugin; degrade to [] on any failure. */
export function delegateToToolPlugin(subscription, action) {
  const subId = subPluginIdFor(subscription)
  if (!subId) return []
  const plugin = pluginRegistry.get(subId)
  if (typeof plugin?.feature !== 'function') return []
  try {
    const result = plugin.feature(action, subscription)
    if (result == null) return []
    return Array.isArray(result) ? result : [result]
  } catch (err) {
    if (!new RegExp(`no feature ["']${action}["']`).test(err?.message || '')) {
      console.warn(`[plugin:mail] delegate to ${subId}.${action} threw`, err)
    }
    return []
  }
}

const service = {
  subPluginIdFor,
  delegateToToolPlugin,
  renderFeatures(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderFeatures')
    return out.length ? out : []
  },
  renderDetailsKey(subscription) {
    const out = delegateToToolPlugin(subscription, 'renderDetailsKey')
    return out.length ? out : null
  },
}

export default service
