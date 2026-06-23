const modules = import.meta.glob('./*/*.ts', { eager: true }) as Record<string, { default?: Record<string, string> }>;
const messages: Record<string, { translation: Record<string, string> }> = {};
for (const path of Object.keys(modules)) {
  const parts = path.split('/');
  const lang = parts[1];
  if (!messages[lang]) {
    messages[lang] = { translation: {} };
  }
  const mod = modules[path];
  if (mod.default) {
    Object.assign(messages[lang].translation, mod.default);
  }
}
export default messages;
