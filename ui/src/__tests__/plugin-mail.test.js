import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useI18nStore } from '@ligoj/host'
import def from '../index.js'
import { subPluginIdFor } from '../service.js'

beforeEach(() => { setActivePinia(createPinia()) })

describe('plugin-mail manifest', () => {
  it('exports service-level fields (no requires, no routes)', () => {
    expect(def.id).toBe('mail')
    expect(def.requires).toBeUndefined()
    expect(def.routes).toBeUndefined()
    expect(def.meta).toMatchObject({ icon: expect.any(String), color: expect.any(String) })
  })
  it('install() merges i18n', () => {
    const i18n = useI18nStore()
    def.install()
    expect(i18n.t('service:mail')).toBe('Mail')
  })
  it('feature() throws for unknown action', () => {
    expect(() => def.feature('nope')).toThrow(/no feature "nope"/)
  })
  it('renders nothing without a registered tool (mail-smtp has no row features)', () => {
    expect(def.feature('renderFeatures', { node: { id: 'service:mail:smtp:1' }, parameters: {} })).toEqual([])
    expect(def.feature('renderDetailsKey', { node: { id: 'service:mail:smtp:1' }, parameters: {} })).toBeNull()
  })
})

describe('subPluginIdFor', () => {
  it('maps tool node → mail-<tool>', () => {
    expect(subPluginIdFor({ node: { id: 'service:mail:smtp:1' } })).toBe('mail-smtp')
  })
  it('null without a tool segment', () => {
    expect(subPluginIdFor({ node: { id: 'service:mail' } })).toBeNull()
  })
})
