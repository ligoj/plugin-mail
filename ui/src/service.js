/*
 * Service layer for plugin "mail" (service-level).
 *
 * The legacy `mail.js` controller was an empty `define({})`. The current
 * SMTP tool is global config (node mode NONE) and contributes no row
 * features, but the parent exposes the standard delegation hooks (like
 * vm/bt/build) so a future mail tool with row actions works without
 * changing the parent. Resolves the mail-<tool> via `subPluginIdFor`.
 */
import { toolPluginId, delegateFeature } from '@ligoj/host'

/** `service:mail:smtp:1` → `mail-smtp`; null when no tool segment. */
export const subPluginIdFor = toolPluginId

/** Delegate `action` to the mail-<tool> sub-plugin; degrade to [] on any failure. */
export const delegateToToolPlugin = (subscription, action) => delegateFeature(subscription, action, 'mail')

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
