import type { NisumEventMap } from '@nisum/shared-types';

type EventName = keyof NisumEventMap;
type Handler<Name extends EventName> = (payload: NisumEventMap[Name]) => void;

export interface NisumEventBus {
  emit<Name extends EventName>(name: Name, payload: NisumEventMap[Name]): void;
  listener<Name extends EventName>(name: Name, handler: Handler<Name>): () => void;
}

declare global {
  interface Window {
    NISUM?: NisumEventBus;
  }
}

const eventKey = (name: EventName) => `nisum:${name}`;

export function installNisumEventSystem(target: Window = window): NisumEventBus {
  if (target.NISUM) return target.NISUM;

  const bus: NisumEventBus = {
    emit(name, payload) {
      target.dispatchEvent(new CustomEvent(eventKey(name), { detail: payload }));
    },
    listener(name, handler) {
      const listener = (event: Event) =>
        handler((event as CustomEvent<NisumEventMap[typeof name]>).detail);
      target.addEventListener(eventKey(name), listener);
      return () => target.removeEventListener(eventKey(name), listener);
    },
  };

  target.NISUM = bus;
  return bus;
}

export function nisumEvents(): NisumEventBus {
  if (typeof window === 'undefined')
    throw new Error('NISUM events are only available in the browser.');
  return installNisumEventSystem(window);
}
