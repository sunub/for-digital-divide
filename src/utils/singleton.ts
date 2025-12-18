declare global {
  var __singleton: Record<string, unknown> | undefined;
}

export function singleton<Value>(name: string, factory: () => Value): Value {
  if (!globalThis.__singleton) {
    globalThis.__singleton = {};
  }
  if (!(name in globalThis.__singleton)) {
    globalThis.__singleton[name] = factory();
  }
  return globalThis.__singleton[name] as Value;
}
