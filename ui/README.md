# plugin-mail — Vue UI

Service-level plugin (`service:mail`, "Mail"), parent of the mail tools
(`mail-smtp`). Compiled to `webjars/mail/vue/`.

No routes/component (legacy controller was empty). Ships generic i18n +
the standard `subPluginIdFor` delegation hooks. The current SMTP tool is
global config (node mode `NONE`) and contributes no row features, but the
hooks are present so a future mail tool with row actions works without
parent changes.

```bash
npm install && npm run build && npm run lint && npm test
```
