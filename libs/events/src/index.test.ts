import { installNisumEventSystem } from './index';

describe('window.NISUM event system', () => {
  beforeEach(() => {
    delete window.NISUM;
  });

  it('delivers a typed payload and supports unsubscribe', () => {
    const bus = installNisumEventSystem();
    const handler = vi.fn();
    const unsubscribe = bus.listener('notification:show', handler);

    bus.emit('notification:show', { message: 'Saved', level: 'success' });
    expect(handler).toHaveBeenCalledWith({
      message: 'Saved',
      level: 'success',
    });

    unsubscribe();
    bus.emit('notification:show', { message: 'Ignored', level: 'info' });
    expect(handler).toHaveBeenCalledTimes(1);
  });
});
