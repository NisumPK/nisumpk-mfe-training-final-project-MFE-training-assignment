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
export declare function installNisumEventSystem(target?: Window): NisumEventBus;
export declare function nisumEvents(): NisumEventBus;
export {};
